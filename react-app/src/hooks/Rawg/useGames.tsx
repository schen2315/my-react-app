import { useQuery } from "@tanstack/react-query";
import rawgClient, { GameInfo } from "../../services/rawg-client";

function useGames(searchInput: string = "") {
  const searchParams = searchInput ? `search=${searchInput}` : "";
  const {
    data: games,
    error: gamesError,
    isLoading: gamesLoading,
  } = useQuery<GameInfo[], Error>({
    queryKey: ["games", searchInput],
    queryFn: () => rawgClient.getResults<GameInfo>("/games", searchParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { games, gamesError, gamesLoading };
}
export default useGames;
