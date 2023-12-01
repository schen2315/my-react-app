import {
  Grid,
  GridItem,
  HStack,
  Show
} from "@chakra-ui/react";
import { allGamesAfterFiltering } from "./Logic/Filter";
import FilterDropDown from "./components/Rawg/FilterDropDown/FilterDropDown";
import GameGrid from "./components/Rawg/GameGrid/GameGrid";
import Navigation from "./components/Rawg/Navigation/Navigation";
import SidebarSkeleton from "./components/Rawg/Sidebar/SideBarSkeleton";
import Sidebar from "./components/Rawg/Sidebar/Sidebar";
import useGameQuery, { GameQuery, useGenreFilterStore, usePlatformFilterStore } from "./hooks/Rawg/useGameQuery";
import { PlatformInfo } from "./services/rawg-client";
import { Outlet } from "react-router-dom";

function App() {
  const { value: genreFilter, setValue: setGenreFilter } = useGenreFilterStore();
  const { value: platformFilter, setValue: setPlatformFilter } = usePlatformFilterStore();
  const gameQuery: GameQuery = useGameQuery();
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
