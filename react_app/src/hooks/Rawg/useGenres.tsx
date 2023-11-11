import { useEffect, useState } from "react";
import rawgClient, { GenreInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";
import useData from "./useData";

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

export default useGenres;
