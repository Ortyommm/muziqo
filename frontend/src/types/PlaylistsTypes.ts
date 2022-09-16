import { ISong } from "./SongsTypes";
import { IUser } from "./UserTypes";

export interface IPlaylist {
  name: string;
  description?: string;
  img?: string;
  id: number;
  songs: ISong[];
  user: IUser;
}
