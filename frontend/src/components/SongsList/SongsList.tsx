import SongItem from "./SongItem";
import * as React from "react";
import { useEffect } from "react";
import { api } from "../../utils/api";
import { ISong } from "./types";
import { AxiosResponse } from "axios";
import { Container } from "@mui/material";
import { pause, play, setSongs } from "../../store/modules/audio";
import { useAppDispatch, useAppSelector } from "../../store";
import { changeSong } from "../../store/modules/dispatchSong";

export default function SongsList() {
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);
  const songs = useAppSelector((state) => state.audio.songs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    api.get("/songs").then((res: AxiosResponse<ISong[]>) => {
      dispatch(setSongs(res.data));
    });
  }, []);

  if (!songs.length) return <>"LOADING"</>;

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

  return (
    <Container>
      {songs.map((song) => (
        <SongItem key={song.id} {...song} onAudio={onAudio} />
      ))}
    </Container>
  );
}
