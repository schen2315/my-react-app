import { useEffect, useState } from "react";
import rawgClient, { GenreInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";

const useGenres = (queryParam: string) => {
  const [genres, setGenres] = useState<GenreInfo[]>([]);

  useEffect(() => {
    const { request, cancel } = rawgClient.getGenres(queryParam);
    request
      .then((res) => {
        setGenres(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });
    return cancel;
  }, []);

  return { genres, setGenres };
};

export default useGenres;
