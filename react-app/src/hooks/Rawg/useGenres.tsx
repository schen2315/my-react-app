import { GenreInfo } from "../../services/rawg-client";
import useData from "./useData";
import rawgClient from "../../services/rawg-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FetchResults } from "../../services/rawg-client";

/*
const useGenres = () => {
  const {
    data: genres,
    setData: setGenres,
    loading: genresLoading,
    setLoading: setGenresLoading,
    error: genresError,
    setError: setGenresError,
  } = useData<GenreInfo>("/genres");

  return {
    genres,
    setGenres,
    genresLoading,
    setGenresLoading,
    genresError,
    setGenresError,
  };
};

*/

const rawgApiKey = "744bc1c472594240b9ebb5c4fe77ea2b";

function useGenres() {
  const {
    data: genres,
    error: genresError,
    isLoading: genresLoading,
  } = useQuery<GenreInfo[], Error>({
    queryKey: ["genres"],
    queryFn: () => {
      return axios
        .get<FetchResults<GenreInfo>>(
          `https://rawg.io/api/genres?key=${rawgApiKey}`
        )
        .then((res) => res.data.results);
    },
    staleTime: 10 * 1000,
  });

  return { genres, genresError, genresLoading };
}
export default useGenres;
