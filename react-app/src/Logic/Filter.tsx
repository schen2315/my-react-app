import { CanceledError } from "axios";
import rawgClient, {
  GameInfo,
  GenreInfo,
  PlatformInfo,
} from "../services/rawg-client";
import { GameQuery } from "../hooks/Rawg/useGameQuery";

// TODO: we should ALWAYS use ID not name when referencing genres
const filterByGenre = (games: GameInfo[], genreFilter: string) => {
  if (genreFilter === "") return games;
  const getGenreNames = (genres: GenreInfo[]) =>
    genres.map((genre: GenreInfo) => genre.name);

  const filteredGames = games.filter((game: GameInfo) =>
    getGenreNames(game.genres).includes(genreFilter)
  );
  return filteredGames;
};

export const filterByPlatform = (
  games: GameInfo[],
  platforms: PlatformInfo[] | undefined,
  platformFilter: string
) => {
  /*
  if (!platforms || platformFilter === "") return games;
  const getPlatforms = (
    platforms: { platform: { id: number; name: string } }[]
  ) => platforms.map(({ platform }) => platform.name);

  const getPlatformsForAllGames = (games: GameInfo[]) =>
    games.map((game: GameInfo) => getPlatforms(game.platforms));

  const platformsForEachGame: string[][] = getPlatformsForAllGames(games);

  const filtered = games.filter((game: GameInfo, index: number) =>
    platformsForEachGame[index].includes(platformFilter)
  );

  console.log(filtered);

  return filtered;
  */
  return games;
};

export const sortBy = (games: GameInfo[], sortByValue: string) => {
  const compareByName = (a: GameInfo, b: GameInfo) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };

  const compareByGenre = (a: GameInfo, b: GameInfo) => {
    if (a.genres[0].name < b.genres[0].name) return -1;
    if (a.genres[0].name > b.genres[0].name) return 1;
    return 0;
  };

  const compareByRating = (a: GameInfo, b: GameInfo) => {
    if (a.rating < b.rating) return -1;
    if (a.rating > b.rating) return 1;
    return 0;
  };

  const compareByMetacritic = (a: GameInfo, b: GameInfo) => {
    if (a.metacritic < b.metacritic) return -1;
    if (a.metacritic > b.metacritic) return 1;
    return 0;
  };

  const compareByReleased = (a: GameInfo, b: GameInfo) => {
    //in a real production release we probably want to
    //always validate released year-month-day format

    const a_date = a.released.split("-");
    const b_date = b.released.split("-");

    if (a_date[0] < b_date[0]) return -1; //year
    if (a_date[0] > b_date[0]) return 1;

    if (a_date[1] < b_date[1]) return -1; //month
    if (a_date[1] > b_date[1]) return 1;

    if (a_date[2] < b_date[2]) return -1; //day
    if (a_date[2] > b_date[2]) return 1;

    return 0;
  };

  const sortByValues: {
    [key: string]: (a: GameInfo, b: GameInfo) => 1 | 0 | -1;
  } = {
    Name: compareByName,
    "Release date": compareByReleased,
    Popularity: compareByMetacritic,
  };

  const sortedGames =
    sortByValue in sortByValues ? games.sort(sortByValues[sortByValue]) : games;

  if (sortByValue === "Popularity") sortedGames.reverse();
  return sortedGames;
};

export const allGamesAfterFiltering = (gameQuery: GameQuery, genreFilter: string, platformFilter: string) => {
  const games = gameQuery.game.getAllGames();
  return sortBy(
    filterByGenre(
      filterByPlatform(
        games,
        gameQuery.platform.platforms?.results,
        platformFilter
      ),
      // gameQuery.filter.genreFilter
      genreFilter
    ),
    gameQuery.filter.sortByFilter
  );
};

export default filterByGenre;
