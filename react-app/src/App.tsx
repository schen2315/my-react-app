import {
  Grid,
  GridItem,
  Show,
  HStack
} from "@chakra-ui/react";
import Navigation from "./components/Rawg/Navigation/Navigation";
import { PlatformInfo } from "./services/rawg-client";
import Sidebar from "./components/Rawg/Sidebar/Sidebar";
import FilterDropDown from "./components/Rawg/FilterDropDown/FilterDropDown";
import SidebarSkeleton from "./components/Rawg/Sidebar/SideBarSkeleton";
import GameGrid from "./components/Rawg/GameGrid/GameGrid";
import filterByGenre, { filterByPlatform, sortBy } from "./Logic/Filter";
import useGameQuery, { GameQuery } from "./hooks/Rawg/useGameQuery";

function App() {

  const gameQuery: GameQuery = useGameQuery();
  const allGamesAfterFiltering = (gameQuery: GameQuery) => {
    const games = gameQuery.game.getAllGames()
    return sortBy(filterByGenre(filterByPlatform(games, gameQuery.platform.platforms?.results, gameQuery.filter.platformFilter), gameQuery.filter.genreFilter), gameQuery.filter.sortByFilter);
  }

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
        <Navigation onSubmit={gameQuery.search.setSearchInput} />
      </GridItem>
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          {!gameQuery.genre.genresLoading && gameQuery.genre.genres && (
            <Sidebar
              heading={"Genres"}
              genres={gameQuery.genre.genres.results} //wrap in gameQuery object
              onClick={gameQuery.filter.setGenreFilter}
              selectedGenre={gameQuery.filter.genreFilter}
            />
          )}
          {gameQuery.genre.genresLoading && <SidebarSkeleton heading={"Genres"} />}
        </GridItem>
      </Show>
      <GridItem area={"filter"} width={"500px"}>
        <HStack>
          <FilterDropDown
            selected={gameQuery.filter.platformFilter}
            placeholder="Filter By Platform"
            options={
              gameQuery.platform.platforms
                ? gameQuery.platform.platforms.results.map((platform: PlatformInfo) => platform.name)
                : []
            } //wrap these in query object
            onSelect={(platform: string) => gameQuery.filter.setPlatformFilter(platform)}
          ></FilterDropDown>
          <FilterDropDown
            selected={gameQuery.filter.sortByFilter}
            placeholder="Sort By"
            options={gameQuery.filter.sortByFilterOptions}
            onSelect={(sortByOption: string) => gameQuery.filter.setSortByFilter(sortByOption)}
          ></FilterDropDown>
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        {gameQuery.game.gamesLoading && <GameGrid skeleton={true} onLoadMore={() => {}} hasMoreGames={false}></GameGrid>}
        {!gameQuery.game.gamesLoading && gameQuery.game.getAllGames && (
          <GameGrid
            games={allGamesAfterFiltering(gameQuery)}
            onLoadMore={gameQuery.game.fetchNextGamesPage}
            hasMoreGames={!gameQuery.game.isFetchingNextGamesPage && !!gameQuery.game.hasNextPage}
          ></GameGrid>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
