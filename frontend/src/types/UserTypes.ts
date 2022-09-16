import { ISong } from "./SongsTypes";
import { IPlaylist } from "./PlaylistsTypes";

export interface IUser {
  id: number;
  name: string;
  email: string;
  created: string;
  // TODO roles
  favorites: ISong[];
  // TODO playlists
  playlists: IPlaylist[];
}
