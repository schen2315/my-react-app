import { useQuery } from "@tanstack/react-query";
import rawgClient, { GameDescriptionInfo } from "../../services/rawg-client";

function useGamesDescription(slug: string) {
  const { data, error, isLoading } = useQuery<GameDescriptionInfo, Error>({
    queryKey: ["games", slug],
    queryFn: () => rawgClient.get<GameDescriptionInfo>(`/games/${slug}`)
  });

  return { data, error, isLoading };
}

export default useGamesDescription;