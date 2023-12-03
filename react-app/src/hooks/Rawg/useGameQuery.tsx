import useGenres from "./useGenres";
import useGames from "./useGames";
import usePlatforms from "./usePlatforms";
import { useState } from "react";
import { FetchResults, GameInfo } from "../../services/rawg-client";
import { create } from "zustand";

export interface GameQuery {
  game: { getAllGames: any, gamesError: any, gamesLoading: any, fetchNextGamesPage: any, isFetchingNextGamesPage: any, hasNextPage: any };
  platform: { platforms: any };
  genre: { genres: any, genresError: any, genresLoading: any };
  filter: { /* genreFilter: any, setGenreFilter: any,  platformFilter: any, setPlatformFilter: any, */ sortByFilter: any, setSortByFilter: any, sortByFilterOptions: string[] }; //zustand
}

interface genericStringStore {
  value: string;
  setValue: (value: string) => void;
}

const genericStringStoreSet = (set: any) => ({
  value: "",
  setValue: (value: string) => set({ value }),
})

export const useSearchInputStore = create<genericStringStore>(genericStringStoreSet);
export const useGenreFilterStore = create<genericStringStore>(genericStringStoreSet);
export const usePlatformFilterStore = create<genericStringStore>(genericStringStoreSet);
export const useSortByFilterStore = create<genericStringStore>(genericStringStoreSet);

export const getAllGamesFromPages = (pages: FetchResults<GameInfo>[] | undefined) => {
  const allGames: GameInfo[] = [];
  if (!pages) return allGames;
  pages.forEach((page) => {
    page.results.forEach((game) => {
      allGames.push(game);
    });
  });

  return allGames;
};

function useGameQuery () {
  const { value: searchInput } = useSearchInputStore();
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
  // const [genreFilter, setGenreFilter] = useState(""); //zustand
  // const [platformFilter, setPlatformFilter] = useState(""); //zustand
  const [sortByFilter, setSortByFilter] = useState(""); //zustand

  const sortByFilterOptions = [
    "Date added",
    "Name",
    "Release date",
    "Popularity",
    "Genre",
    "Average Rating",
  ];

  const gameQuery: GameQuery = {} as GameQuery;
  gameQuery.game = { getAllGames: () => getAllGamesFromPages(games?.pages), gamesError, gamesLoading, fetchNextGamesPage, isFetchingNextGamesPage, hasNextPage };
  gameQuery.platform = { platforms };
  gameQuery.genre = { genres, genresError, genresLoading };
  gameQuery.filter = { /*genreFilter, setGenreFilter, platformFilter, setPlatformFilter, */sortByFilter, setSortByFilter, sortByFilterOptions };

  return gameQuery;
}



// function useGameQuery() {
//   const gameQuery = createGameQuery();
//   return gameQuery;
// }

export default useGameQuery;