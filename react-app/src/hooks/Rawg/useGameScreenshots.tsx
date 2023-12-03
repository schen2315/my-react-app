import { useInfiniteQuery } from "@tanstack/react-query";
import rawgClient, { FetchResults, GameScreenshot } from "../../services/rawg-client";

function useGameScreenshots (id: string) {
  const { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<FetchResults<GameScreenshot>>({
    queryKey: ["games", id, "screenshots"],
    queryFn: () => rawgClient.getResults<GameScreenshot>(`games/${id}/screenshots`),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    
  })

  return { data, error, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
}

export default useGameScreenshots;