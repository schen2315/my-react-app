import { useEffect, useState } from "react";
import rawgClient from "../../services/rawg-client";
import { CanceledError } from "axios";

const useData = <T,>(path: string, queryParams: string = "") => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = rawgClient.getData<T>(path, queryParams);
    request
      .then((res) => {
        setData(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return cancel;
  }, []);

  return { data, setData, loading, setLoading, error, setError };
};

export default useData;
