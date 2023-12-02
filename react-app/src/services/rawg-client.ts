import axios, { AxiosInstance, CanceledError } from "axios";

interface GenreInfo {
  id: number;
  slug: string;
  name: string;
  image_background: string;
}

interface PlatformInfo {
  id: number;
  slug: string;
  name: string;
  games_count: number;
}

interface PublishersInfo {
  id: number;
  slug: string;
  games_count: number;
  name: string;
}

interface GameInfo {
  id: number;
  slug: string;
  name: string;
  genres: GenreInfo[];
  rating: number;
  background_image: string;
  released: string;
  metacritic: number;
  platforms: { platform: PlatformInfo }[]; //platform here does NOT refer to PlatformInfo type
}

export interface GameDescriptionInfo {
  id: number;
  slug: string;
  name: string;
  description_raw: string;
  platforms: { platform: PlatformInfo }[];
  genres: GenreInfo[];
  publishers: PublishersInfo[];
  metacritic: number;
}

export interface GameTrailer {
  id: number;
  name: string;
  preview: string;
  data: { "480": string, max: string };
}

export interface GameScreenshot {
  image: string;
  hidden: boolean;
}

export interface FetchResults<T> {
  results: T[];
  next: string | null;
  previous: string | null;
  count: number;
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

  getResults<T>(path: string = "/", queryParams: string = "") {
    return this.client
      .get<FetchResults<T>>(`${path}?${queryParams}`)
      .then((res) => res.data);
  }

  get<T>(path: string = "/", queryParams: string = "") {
    return this.client
      .get<T>(`${path}?${queryParams}`)
      .then((res) => res.data);
  }
}

const rawgClient = new RawgClient("https://rawg.io/api");

export default rawgClient;

export type { GameInfo, GenreInfo, PlatformInfo };
