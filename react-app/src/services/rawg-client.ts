import axios, { AxiosInstance, CanceledError } from "axios";

interface GenreInfo {
  id: number;
  name: string;
  image_background: string;
}

interface PlatformInfo {
  id: number;
  name: string;
  games_count: number;
}

interface GameInfo {
  id: number;
  name: string;
  genres: GenreInfo[];
  rating: number;
  background_image: string;
  released: string;
  metacritic: number;
  platforms: { platform: { id: number; name: string; slug: string } }[]; //platform here does NOT refer to PlatformInfo type
}

interface FetchResults<T> {
  results: T[];
}
const rawgApiKey = "744bc1c472594240b9ebb5c4fe77ea2b";

class RawgClient {
  endpoint: string;
  client: AxiosInstance;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.client = axios.create({
      baseURL: endpoint,
      params: {
        key: rawgApiKey,
      },
    });
  }

  getGames(queryParam: string) {
    const controller = new AbortController();
    const request = this.client.get<{ results: GameInfo[] }>(
      `/games?${queryParam}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getGenres(queryParam: string) {
    const controller = new AbortController();
    const request = this.client.get<{ results: GenreInfo[] }>(
      `/genres?${queryParam}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getPlatforms(queryParam: string) {
    const controller = new AbortController();
    const request = this.client.get<{ results: PlatformInfo[] }>(
      `/platforms?${queryParam}`,
      {
        signal: controller.signal,
      }
    );
    return { request, cancel: () => controller.abort() };
  }

  getData<T>(path: string, queryParams: string = "") {
    const controller = new AbortController();
    const request = this.client.get<FetchResults<T>>(`${path}?${queryParams}`, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }
}

const rawgClient = new RawgClient("https://rawg.io/api");

export default rawgClient;

export type { GameInfo, GenreInfo, PlatformInfo };
