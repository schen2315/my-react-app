import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { allGamesAfterFiltering } from "../../../Logic/Filter";
import useGameQuery, {
  GameQuery,
  useGenreFilterStore,
  usePlatformFilterStore,
} from "../../../hooks/Rawg/useGameQuery";
import FilterDropDown from "../FilterDropDown/FilterDropDown";
import GameGrid from "../GameGrid/GameGrid";
import SidebarSkeleton from "../Sidebar/SideBarSkeleton";
import Sidebar from "../Sidebar/Sidebar";
import { PlatformInfo } from "../../../services/rawg-client";

const Main = () => {
  const { value: genreFilter, setValue: setGenreFilter } =
    useGenreFilterStore();
  const { value: platformFilter, setValue: setPlatformFilter } =
    usePlatformFilterStore();
  const gameQuery: GameQuery = useGameQuery();
  return (
    <Grid
      templateAreas={{
        base: `"filter" "main"`,
        lg: `"aside filter"
             "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area={"aside"} paddingX={5}>
          {!gameQuery.genre.genresLoading && gameQuery.genre.genres && (
            <Sidebar
              heading={"Genres"}
              genres={gameQuery.genre.genres.results}
            />
          )}
          {gameQuery.genre.genresLoading && (
            <SidebarSkeleton heading={"Genres"} />
          )}
        </GridItem>
      </Show>
      <GridItem area={"filter"} width={"500px"}>
        <HStack>
          <FilterDropDown
            selected={platformFilter} //zustand
            placeholder="Filter By Platform" //convert to PlatformFilterDropDown
            options={
              gameQuery.platform.platforms
                ? gameQuery.platform.platforms.results.map(
                    (platform: PlatformInfo) => platform.name
                  )
                : []
            } //wrap these in query object
            onSelect={(platform: string) => setPlatformFilter(platform)} //zustand
          ></FilterDropDown>
          <FilterDropDown
            selected={gameQuery.filter.sortByFilter} //zustand
            placeholder="Sort By" //convert to SortByFilterDropDown
            options={gameQuery.filter.sortByFilterOptions}
            onSelect={(sortByOption: string) =>
              gameQuery.filter.setSortByFilter(sortByOption)
            } //zustand
          ></FilterDropDown>
        </HStack>
      </GridItem>
      <GridItem area={"main"}>
        {gameQuery.game.gamesLoading && (
          <GameGrid
            skeleton={true}
            onLoadMore={() => {}}
            hasMoreGames={false}
          ></GameGrid>
        )}
        {!gameQuery.game.gamesLoading && gameQuery.game.getAllGames && (
          <GameGrid
            games={allGamesAfterFiltering(
              gameQuery,
              genreFilter,
              platformFilter
            )}
            onLoadMore={gameQuery.game.fetchNextGamesPage}
            hasMoreGames={
              !gameQuery.game.isFetchingNextGamesPage &&
              !!gameQuery.game.hasNextPage
            }
          ></GameGrid> //convert to GameGridWrapper
        )}
      </GridItem>
    </Grid>
  );
};

export default Main;
