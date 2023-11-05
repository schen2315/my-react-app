import { useEffect, useState } from "react";
import rawgClient, { PlatformInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";

const usePlatforms = (queryParam: string) => {
  const [platforms, setPlatforms] = useState<PlatformInfo[]>([]);
  useEffect(() => {
    const { request, cancel } = rawgClient.getPlatforms(queryParam);
    request
      .then((res) => {
        setPlatforms(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.message);
      });
    return cancel;
  }, []);

  return { platforms, setPlatforms };
};

export default usePlatforms;