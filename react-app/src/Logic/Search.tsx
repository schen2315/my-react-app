import { CanceledError } from "axios";
import rawgClient, { GameInfo } from "../services/rawg-client";

/*

class Search {
  private setGamesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  private setGames: React.Dispatch<React.SetStateAction<GameInfo[]>>;
  private setGamesError: React.Dispatch<React.SetStateAction<string>>;

  constructor(
    setGames: React.Dispatch<React.SetStateAction<GameInfo[]>>,
    setGamesLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setGamesError: React.Dispatch<React.SetStateAction<{}>>
  ) {
    this.setGamesLoading = setGamesLoading;
    this.setGames = setGames;
    this.setGamesError = setGamesError;
  }

  searchGames = (searchInput: string) => {
    const { request } = rawgClient.getGames(`search=${searchInput}`);
    this.setGamesLoading(true);
    request
      .then((res) => {
        this.setGames(res.data.results);
        this.setGamesLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        this.setGamesError(err.message);
        this.setGamesLoading(false);
      });
  };
}

export { Search };

*/
