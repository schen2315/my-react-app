import { useEffect, useState } from "react";
import rawgClient, { GameInfo } from "../../services/rawg-client";
import { CanceledError } from "axios";
import useData from "./useData";

const useGames = () => {
  const {
    data: games,
    setData: setGames,
    loading: gamesLoading,
    setLoading: setGamesLoading,
    error: gamesError,
    setError: setGamesError,
  } = useData<GameInfo>("/games");

  return {
    games,
    setGames,
    gamesLoading,
    setGamesLoading,
    gamesError,
    setGamesError,
  };
};

export default useGames;
