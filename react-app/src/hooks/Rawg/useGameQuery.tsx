import useGenres from "./useGenres";
import useGames from "./useGames";
import usePlatforms from "./usePlatforms";
import { useState } from "react";

export interface GameQuery {
  sortByFilterOptions: string[];
  game: { games: any, gamesError: any, gamesLoading: any, fetchNextGamesPage: any, isFetchingNextGamesPage: any, hasNextPage: any };
  search: { searchInput: any, setSearchInput: any };
  platform: { platforms: any };
  genres: { genres: any, genresError: any, genresLoading: any };
  filter: { genreFilter: any, setGenreFilter: any, platformFilter: any, setPlatformFilter: any, sortByFilter: any, setSortByFilter: any, sortByFilterOptions: string[] };
}

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
  gameQuery.filter = { genreFilter, setGenreFilter, platformFilter, setPlatformFilter, sortByFilter, setSortByFilter, sortByFilterOptions };

  return gameQuery;
}

export default useGameQuery;