import rawgClient, {
  FetchResults,
  PlatformInfo,
} from "../../services/rawg-client";
import { useQuery } from "@tanstack/react-query";

function usePlatforms() {
  const {
    data: platforms,
    error: platformsError,
    isLoading: platformsLoading,
  } = useQuery<FetchResults<PlatformInfo>, Error>({
    queryKey: ["platforms"],
    queryFn: () => rawgClient.get<PlatformInfo>("/platforms/lists/parents"),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return { platforms, platformsError, platformsLoading };
}
export default usePlatforms;
