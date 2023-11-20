import {
  Grid,
  GridItem,
  Show,
  HStack,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import Navigation from "./components/Rawg/Navigation/Navigation";
import useGames from "./hooks/Rawg/useGames";
import { FetchResults, GameInfo, GenreInfo } from "./services/rawg-client";
import Sidebar from "./components/Rawg/Sidebar/Sidebar";
import FilterDropDown from "./components/Rawg/FilterDropDown/FilterDropDown";
import useGenres from "./hooks/Rawg/useGenres";
import usePlatforms from "./hooks/Rawg/usePlatforms";
import { useState } from "react";
import SidebarSkeleton from "./components/Rawg/Sidebar/SideBarSkeleton";
import GameGrid from "./components/Rawg/GameGrid/GameGrid";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const {
    games,
    gamesLoading,
    gamesError,
    fetchNextGamesPage,
    isFetchingNextGamesPage,
    hasNextPage,
  } = useGames(searchInput);
  const { platforms } = usePlatforms();
  const { genres, genresError, genresLoading } = useGenres();
  const [genreFilter, setGenreFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [sortByFilter, setSortByFilter] = useState("");

  const sortByFilterOptions = [
    "Date added",
    "Name",
    "Release date",
    "Popularity",
    "Genre",
    "Average Rating",
  ];

  // TODO: we should ALWAYS use ID not name when referencing genres
  const filterByGenre = (games: GameInfo[]) => {
    if (genreFilter === "") return games;
    const getGenreNames = (genres: GenreInfo[]) =>
      genres.map((genre: GenreInfo) => genre.name);

    const filteredGames = games.filter((game: GameInfo) =>
      getGenreNames(game.genres).includes(genreFilter)
    );
    return filteredGames;
  };

  // TODO: we should ALWAYS use ID not name when referencing genres
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

  const allGamesAfterFiltering = (games: GameInfo[]) =>
    sortBy(filterByGenre(filterByPlatform(games)), sortByFilter);

  const getAllGamesFromPages = (pages: FetchResults<GameInfo>[]) => {
    const allGames: GameInfo[] = [];
    pages.forEach((page) => {
      page.results.forEach((game) => {
        allGames.push(game);
      });
    });

    return allGames;
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
        <Navigation onSubmit={setSearchInput} />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          {!genresLoading && genres && (
            <Sidebar
              heading={"Genres"}
              genres={genres.results} //wrap in gameQuery object
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
            options={
              platforms
                ? platforms.results.map((platform) => platform.name)
                : []
            } //wrap these in query object
            onSelect={(platform: string) => setPlatformFilter(platform)} //so we can just set the GameQuery object
          ></FilterDropDown>
          <FilterDropDown
            selected={sortByFilter}
            placeholder="Sort By"
            options={sortByFilterOptions}
            onSelect={(sortByOption: string) => setSortByFilter(sortByOption)}
          ></FilterDropDown>
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        {gamesLoading && <GameGrid skeleton={true} onLoadMore={() => {}} hasMoreGames={false}></GameGrid>}
        {!gamesLoading && games && (
          <GameGrid
            games={allGamesAfterFiltering(getAllGamesFromPages(games.pages))}
            onLoadMore={fetchNextGamesPage}
            hasMoreGames={!isFetchingNextGamesPage && !!hasNextPage}
          ></GameGrid>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
