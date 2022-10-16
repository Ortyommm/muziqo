export interface ISong {
  authors: IAuthor[];
  file: string;
  id: number;
  img: string | null;
  name: string;
  duration: string;
}

export interface IAuthor {
  id: number;
  name: string;
}

export interface IAuthorWithSongs extends IAuthor {
  songs: ISong[];
}
