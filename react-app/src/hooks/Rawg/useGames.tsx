import { useEffect, useState } from "react";
import rawgClient, { GameInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";

const useGames = (queryParam: string) => {
  const [games, setGames] = useState<GameInfo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = rawgClient.getGames(queryParam);
    request
      .then((res) => {
        setGames(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return cancel;
  }, []);

  return { games, setGames, loading, setLoading, error, setError };
};

export default useGames;
