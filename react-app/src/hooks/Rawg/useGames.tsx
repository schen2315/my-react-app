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
  } = useInfiniteQuery<FetchResults<GameInfo>, Error>({
    queryKey: ["games", searchInput],
    queryFn: ({ pageParam = "" }) => {
      console.log(searchParams + "&" + pageParam);
      return rawgClient.get<GameInfo>("/games", searchParams);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next !== "null") {
        console.log(lastPage);
        return lastPage.next.split("&").slice(-1)[0]; // BUG : page=[0-9]+ is NOT always the last key, value pair
      }
      return "";
    },
  });

  return {
    games,
    gamesError,
    gamesLoading,
    fetchNextGamesPage,
    isFetchingNextGamesPage,
  };
}
export default useGames;
