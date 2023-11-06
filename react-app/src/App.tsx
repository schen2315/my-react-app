import {
  ChakraProvider,
  ColorModeScript,
  Grid,
  GridItem,
  Flex,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList,
  Show,
} from "@chakra-ui/react";
import Navigation from "./components/Rawg/Navigation/Navigation";
import useGames from "./hooks/Rawg/useGames";
import rawgClient, { GameInfo, GenreInfo } from "./services/rawg-client";
import { CanceledError } from "axios";
import Sidebar from "./components/Rawg/Sidebar/Sidebar";
import FilterDropDown from "./components/Rawg/FilterDropDown/FilterDropDown";
import useGenres from "./hooks/Rawg/useGenres";
import usePlatforms from "./hooks/Rawg/usePlatforms";
import { useState } from "react";
import { number } from "zod";
import GameCard from "./components/Rawg/GameCard/GameCard";

function App() {
  const { games, setGames, loading, setLoading, error, setError } =
    useGames("");

  const { platforms, setPlatforms } = usePlatforms("");
  const { genres, setGenres } = useGenres("");
  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortByFilter, setSortByFilter] = useState("");

  const searchGames = (searchInput: string) => {
    const { request } = rawgClient.getGames(`search=${searchInput}`);
    setLoading(true);
    request
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  };

  const filterByGenre = (games: GameInfo[]) => {
    if (genreFilter === "") return games;
    const getGenreNames = (genres: GenreInfo[]) =>
      genres.map((genre: GenreInfo) => genre.name);

    const filteredGames = games.filter((game: GameInfo) =>
      getGenreNames(game.genres).includes(genreFilter)
    );
    return filteredGames;
  };

  const filterByPlatform = (games: GameInfo[]) => {
    if (platformFilter === "") return games;
    const getPlatforms = (
      platforms: { platform: { id: number; name: string } }[]
    ) => platforms.map((platform) => platform.platform.name);

    const getPlatformsForAllGames = (games: GameInfo[]) =>
      games.map((game: GameInfo) => getPlatforms(game.platforms));

    const platformsForEachGame: string[][] = getPlatformsForAllGames(games);

    const filtered = games.filter((game: GameInfo, index: number) =>
      platformsForEachGame[index].includes(platformFilter)
    );

    console.log(filtered);

    return filtered;
  };

  const sortBy = (games: GameInfo[], sortByValue: string) => {
    const compareByName = (a: GameInfo, b: GameInfo) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    };

    const compareByGenre = (a: GameInfo, b: GameInfo) => {
      if (a.genres[0].name < b.genres[0].name) return -1;
      if (a.genres[0].name > b.genres[0].name) return 1;
      return 0;
    };

    const compareByRating = (a: GameInfo, b: GameInfo) => {
      if (a.rating < b.rating) return -1;
      if (a.rating > b.rating) return 1;
      return 0;
    };

    const compareByMetacritic = (a: GameInfo, b: GameInfo) => {
      if (a.metacritic < b.metacritic) return -1;
      if (a.metacritic > b.metacritic) return 1;
      return 0;
    };

    const compareByReleased = (a: GameInfo, b: GameInfo) => {
      //in a real production release we probably want to
      //always validate released year-month-day format

      const a_date = a.released.split("-");
      const b_date = b.released.split("-");

      if (a_date[0] < b_date[0]) return -1; //year
      if (a_date[0] > b_date[0]) return 1;

      if (a_date[1] < b_date[1]) return -1; //month
      if (a_date[1] > b_date[1]) return 1;

      if (a_date[2] < b_date[2]) return -1; //day
      if (a_date[2] > b_date[2]) return 1;

      return 0;
    };

    const sortByValues: {
      [key: string]: (a: GameInfo, b: GameInfo) => 1 | 0 | -1;
    } = {
      Name: compareByName,
      "Release date": compareByReleased,
      Popularity: compareByMetacritic,
    };

    const sortedGames =
      sortByValue in sortByValues
        ? games.sort(sortByValues[sortByValue])
        : games;
    return sortedGames;
  };

  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" 
              "aside main"`,
        }}
      >
        <GridItem pl="2" area={"nav"}>
          <Navigation onSubmit={searchGames} />
        </GridItem>
        <Show above="lg">
          <GridItem pl="2" area={"aside"}>
            {genres && (
              <Sidebar
                heading={"Genres"}
                items={genres.map((genre) => genre.name).sort()}
                onClick={setGenreFilter}
              />
            )}
          </GridItem>
        </Show>
        <GridItem pl="2" area={"main"}>
          <Stack direction="row">
            <FilterDropDown
              placeholder="Filter By Platform"
              options={platforms.map((platform) => platform.name)}
              onSelect={(platform: string) => setPlatformFilter(platform)}
            ></FilterDropDown>
            <FilterDropDown
              placeholder="Sort By"
              options={[
                "Date added",
                "Name",
                "Release date",
                "Popularity",
                "Genre",
                "Average Rating",
              ]}
              onSelect={(sortByOption: string) => setSortByFilter(sortByOption)}
            ></FilterDropDown>
          </Stack>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {loading &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <GameCard key={n} />)}
            {!loading &&
              sortBy(filterByGenre(filterByPlatform(games)), sortByFilter).map(
                (game) => <GameCard key={game.id} game={game} />
              )}
          </SimpleGrid>
        </GridItem>
      </Grid>
      <p>
        {/* <Navigation onSubmit={searchGames}></Navigation> */}
        {/* <Flex>
        {genres && (
          <Sidebar
            heading={"Genres"}
            items={genres.map((genre) => genre.name).sort()}
            onClick={setGenreFilter}
          />
        )}
        <Stack direction={"column"} align={"stretch"} spacing={4} flex="1">
          <Stack direction="row">
            <FilterDropDown
              placeholder="Filter By Platform"
              options={platforms.map((platform) => platform.name)}
              onSelect={(platform: string) => setPlatformFilter(platform)}
            ></FilterDropDown>
            <FilterDropDown
              placeholder="Sort By"
              options={[
                "Date added",
                "Name",
                "Release date",
                "Popularity",
                "Genre",
                "Average Rating",
              ]}
              onSelect={(sortByOption: string) =>
                setSortByFilter(sortByOption)
              }
            ></FilterDropDown>
          </Stack>
          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          >
            {loading &&
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <GameCard key={n} />)}
            {!loading &&
              sortBy(
                filterByGenre(filterByPlatform(games)),
                sortByFilter
              ).map((game) => <GameCard key={game.id} game={game} />)}
          </SimpleGrid>
        </Stack>
      </Flex> */}
      </p>
    </>
  );
}

export default App;
