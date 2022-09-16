import SongItem from "./SongItem";
import * as React from "react";
import { ISong } from "../../types/SongsTypes";
import AppList from "../AppList/AppList";

export default function SongsList({
  songs,
  isFetching,
}: {
  songs: ISong[];
  isFetching: boolean;
}) {
  return <AppList isFetching={isFetching} items={songs} Element={SongItem} />;
}
