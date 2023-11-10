import { useEffect, useState } from "react";
import rawgClient, { PlatformInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";
import useData from "./useData";

const usePlatforms = () => {
  const {
    data: platforms,
    setData: setPlatforms,
    loading: platformsLoading,
    setLoading: setPlatformsLoading,
    error: platformsError,
    setError: setPlatformsError,
  } = useData<PlatformInfo>("/platforms");

  return {
    platforms,
    setPlatforms,
    platformsLoading,
    setPlatformsLoading,
    platformsError,
    setPlatformsError,
  };
};

export default usePlatforms;
