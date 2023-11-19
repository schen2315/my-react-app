import rawgClient, { PlatformInfo } from "../../services/rawg-client";
import { useQuery } from "@tanstack/react-query";

function usePlatforms() {
  const {
    data: platforms,
    error: platformsError,
    isLoading: platformsLoading,
  } = useQuery<PlatformInfo[], Error>({
    queryKey: ["platforms"],
    queryFn: () =>
      rawgClient.getResults<PlatformInfo>("/platforms/lists/parents"),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    initialData: [],
  });

  return { platforms, platformsError, platformsLoading };
}
export default usePlatforms;
