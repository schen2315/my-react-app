import {
  Grid,
  GridItem,
  Show,
  HStack,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import Navigation from "./components/Rawg/Navigation/Navigation";
import useGames from "./hooks/Rawg/useGames";
import { FetchResults, GameInfo, GenreInfo, PlatformInfo } from "./services/rawg-client";
import Sidebar from "./components/Rawg/Sidebar/Sidebar";
import FilterDropDown from "./components/Rawg/FilterDropDown/FilterDropDown";
import useGenres from "./hooks/Rawg/useGenres";
import usePlatforms from "./hooks/Rawg/usePlatforms";
import { useState } from "react";
import SidebarSkeleton from "./components/Rawg/Sidebar/SideBarSkeleton";
import GameGrid from "./components/Rawg/GameGrid/GameGrid";
import filterByGenre, { filterByPlatform, sortBy } from "./Logic/Filter";

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

  const allGamesAfterFiltering = (games: GameInfo[]) =>
    sortBy(filterByGenre(filterByPlatform(games, platforms?.results, platformFilter), genreFilter), sortByFilter);

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
                ? platforms.results.map((platform: PlatformInfo) => platform.name)
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
