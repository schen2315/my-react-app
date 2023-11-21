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

export interface FetchResults<T> {
  results: T[];
  next: string | null;
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

  get<T>(path: string = "/", queryParams: string = "") {
    return this.client
      .get<FetchResults<T>>(`${path}?${queryParams}`)
      .then((res) => res.data);
  }
}

const rawgClient = new RawgClient("https://rawg.io/api");

export default rawgClient;

export type { GameInfo, GenreInfo, PlatformInfo };
