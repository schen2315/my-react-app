import { GenreInfo } from "../../services/rawg-client";
import rawgClient from "../../services/rawg-client";
import { useQuery } from "@tanstack/react-query";

function useGenres() {
  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery<GenreInfo[], Error>({
    queryKey: ["genres"],
    queryFn: () => rawgClient.getResults<GenreInfo>("/genres"),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  return { genres, genresError, genresLoading };
}
export default useGenres;
