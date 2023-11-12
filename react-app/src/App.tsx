import {
  Grid,
  GridItem,
  SimpleGrid,
  Show,
  HStack,
  List,
  Text,
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
import GameCardSkeleton from "./components/Rawg/GameCard/GameCardSkeleton";
import GameCardContainer from "./components/Rawg/GameCard/GameCardContainer";
import SidebarSkeleton from "./components/Rawg/Sidebar/SideBarSkeleton";
import GameGrid from "./components/Rawg/GameGrid/GameGrid";

function App() {
  const { games, setGames, gamesLoading, setGamesLoading, setGamesError } =
    useGames();

  const { platforms } = usePlatforms();
  const { genres, genresLoading } = useGenres();
  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortByFilter, setSortByFilter] = useState("");

  const searchGames = (searchInput: string) => {
    const { request } = rawgClient.getGames(`search=${searchInput}`);
    setGamesLoading(true);
    request
      .then((res) => {
        setGames(res.data.results);
        setGamesLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setGamesError(err.message);
        setGamesLoading(false);
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
    ) => platforms.map(({ platform }) => platform.name);

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

    if (sortByValue === "Popularity") sortedGames.reverse();
    return sortedGames;
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "filter" "main"`,
        lg: `"nav nav"
               "aside filter"
               "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem area={"nav"}>
        <Navigation onSubmit={searchGames} />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          {!genresLoading && genres && (
            <Sidebar
              heading={"Genres"}
              genres={genres}
              onClick={setGenreFilter}
              selectedGenre={genreFilter}
            />
          )}
          {genresLoading && <SidebarSkeleton heading={"Genres"} />}
        </GridItem>
      </Show>
      <GridItem area={"filter"} width={"500px"}>
        <HStack>
          <FilterDropDown
            selected={platformFilter}
            placeholder="Filter By Platform"
            options={platforms.map((platform) => platform.name)}
            onSelect={(platform: string) => setPlatformFilter(platform)}
          ></FilterDropDown>
          <FilterDropDown
            selected={sortByFilter}
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
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        {gamesLoading && <GameGrid skeleton={true}></GameGrid>}
        {!gamesLoading && (
          <GameGrid
            games={sortBy(filterByGenre(filterByPlatform(games)), sortByFilter)}
          ></GameGrid>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
