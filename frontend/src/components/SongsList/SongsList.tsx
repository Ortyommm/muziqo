import SongItem from "./SongItem";
import * as React from "react";
import { useEffect } from "react";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { Container } from "@mui/material";
import { pause, play } from "../../store/modules/audio";
import { useAppDispatch, useAppSelector } from "../../store";
import { changeSong } from "../../store/modules/dispatchSong";
import { ISong } from "../../types/SongsTypes";
import CircleCenterProgress from "../Progress/CircularCenterProgress";

export default function SongsList({
  songs,
  isFetching,
}: {
  songs: ISong[];
  isFetching: boolean;
}) {
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);

  const dispatch = useAppDispatch();

  async function onAudio(file: string, id: number, duration: number) {
    if (id !== currentSongId) {
      changeSong({ file, id, duration }, dispatch);
      return;
    }

    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  }

  if (isFetching) {
    return <CircleCenterProgress />;
  }
  if (!songs.length) return <>No songs</>;

  return (
    <>
      {songs.map((song) => (
        <SongItem key={song.id} {...song} onAudio={onAudio} />
      ))}
    </>
  );
}
