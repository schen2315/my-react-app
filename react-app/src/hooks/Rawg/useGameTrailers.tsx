import { useQuery } from "@tanstack/react-query";
import rawgClient, { FetchResults, GameTrailer } from "../../services/rawg-client";

function useGameTrailers(id: number) {
  console.log("useGameTrailers " + id)
  const { data: trailer, error: trailerError, isLoading: trailerLoading } = useQuery<FetchResults<GameTrailer>, Error>({
    queryKey: ["games", id, "movies"],
    queryFn: () => rawgClient.getResults<GameTrailer>(`/games/${id}/movies`),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
  return { trailer, trailerError, trailerLoading };
}

export default useGameTrailers;