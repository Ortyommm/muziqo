import { ISong } from "./SongsTypes";

export interface IUser {
  id: number;
  name: string;
  email: string;
  created: string;
  // TODO roles
  favorites: ISong[];
  // TODO playlists
}
