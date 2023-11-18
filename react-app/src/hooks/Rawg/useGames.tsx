import { useQuery } from "@tanstack/react-query";
import rawgClient, { GameInfo } from "../../services/rawg-client";
import useData from "./useData";

/*
const useGames = () => {
  const {
    data: games,
    setData: setGames,
    loading: gamesLoading,
    setLoading: setGamesLoading,
    error: gamesError,
    setError: setGamesError,
  } = useData<GameInfo>("/games");

  return {
    games,
    setGames,
    gamesLoading,
    setGamesLoading,
    gamesError,
    setGamesError,
  };
};
*/

function useGames(searchInput: string = "") {
  const searchParams = searchInput ? `search=${searchInput}` : "";
  const {
    data: games,
    error: gamesError,
    isLoading: gamesLoading,
  } = useQuery<GameInfo[], Error>({
    queryKey: ["games", searchInput],
    queryFn: () => rawgClient.getResults<GameInfo>("/games", searchParams),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: [],
  });

  return { games, gamesError, gamesLoading };
}
export default useGames;
