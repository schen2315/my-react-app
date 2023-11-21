import useGenres from "./useGenres";
import useGames from "./useGames";
import usePlatforms from "./usePlatforms";
import { useState } from "react";
import { FetchResults, GameInfo } from "../../services/rawg-client";

export interface GameQuery {
  game: { getAllGames: any, gamesError: any, gamesLoading: any, fetchNextGamesPage: any, isFetchingNextGamesPage: any, hasNextPage: any };
  search: { searchInput: any, setSearchInput: any };
  platform: { platforms: any };
  genre: { genres: any, genresError: any, genresLoading: any };
  filter: { genreFilter: any, setGenreFilter: any, platformFilter: any, setPlatformFilter: any, sortByFilter: any, setSortByFilter: any, sortByFilterOptions: string[] };
}

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

  const gameQuery: GameQuery = {} as GameQuery;
  gameQuery.search = { searchInput, setSearchInput };
  gameQuery.game = { getAllGames: () => getAllGamesFromPages(games?.pages), gamesError, gamesLoading, fetchNextGamesPage, isFetchingNextGamesPage, hasNextPage };
  gameQuery.platform = { platforms };
  gameQuery.genre = { genres, genresError, genresLoading };
  gameQuery.filter = { genreFilter, setGenreFilter, platformFilter, setPlatformFilter, sortByFilter, setSortByFilter, sortByFilterOptions };

  return gameQuery;
}

export default useGameQuery;