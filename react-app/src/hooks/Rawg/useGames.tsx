import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import rawgClient, { FetchResults, GameInfo } from "../../services/rawg-client";

function useGames(searchInput: string = "") {
  const searchParams = searchInput ? `search=${searchInput}` : "";
  const {
    data: games,
    error: gamesError,
    isLoading: gamesLoading,
    fetchNextPage: fetchNextGamesPage,
    isFetchingNextPage: isFetchingNextGamesPage,
    hasNextPage,
  } = useInfiniteQuery<FetchResults<GameInfo>, Error>({
    queryKey: ["games", searchInput],
    queryFn: ({ pageParam = "" }) => {
      console.log(searchParams + "&" + pageParam);
      return rawgClient.get<GameInfo>("/games", pageParam + "&" + searchParams);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    getNextPageParam: (lastPage: FetchResults<GameInfo>, allPages: FetchResults<GameInfo>[]) => {
      const regex = /page=[0-9]+/g;
      console.log(lastPage);
      if (lastPage.next && lastPage.next.match(regex)!.length > 0) {
        return lastPage.next.match(regex)![0];
      }
      return undefined;
    }
  });

  return {
    games,
    gamesError,
    gamesLoading,
    fetchNextGamesPage,
    isFetchingNextGamesPage,
    hasNextPage,
  };
}
export default useGames;
