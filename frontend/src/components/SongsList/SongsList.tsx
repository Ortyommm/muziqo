import SongItem from "./SongItem";
import * as React from "react";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { ISong } from "./types";
import { AxiosResponse } from "axios";
import { Container } from "@mui/material";
import {
  pause,
  play,
  setAudioControllerSrc,
  setCurrentSongId,
  setDuration,
  setSongs,
} from "../../store/modules/audio";
import { useAppDispatch, useAppSelector } from "../../store";

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

  async function onAudio(audioSrc: string, id: number, duration: number) {
    if (id !== currentSongId) {
      const audioFile = await api.get(audioSrc, { responseType: "blob" });
      dispatch(
        setAudioControllerSrc(window.URL.createObjectURL(audioFile.data))
      );
      dispatch(setCurrentSongId(id));
      dispatch(setDuration(+duration));
      dispatch(play());
      return;
    }

    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }

    // if (!audioObj) {
    //   const audio = new Audio();
    //   audio.volume = 0.2;
    //   setAudioObj(audio);
    //   play(audio);
    //   return;
    // }
  }

  return (
    <Container>
      {songs.map((song) => (
        <SongItem key={song.id} {...song} onAudio={onAudio} />
      ))}
    </Container>
  );
}
