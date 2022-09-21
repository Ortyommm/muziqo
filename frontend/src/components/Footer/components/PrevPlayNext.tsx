import { Button, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import * as React from "react";
import {
  changeSong,
  getNextSong,
  getPrevSong,
} from "../../../store/modules/dispatchSong";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toggle } from "../../../store/modules/audio";

export default function PrevPlayNext() {
  const dispatch = useAppDispatch();

  const currentSongsSource = useAppSelector(
    (state) => state.songs.currentSongsSource
  );

  const songs = useAppSelector((state) => state.songs[currentSongsSource]);
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  const isPlaying = useAppSelector((state) => state.audio.isPlaying);

  function onSongToggle() {
    dispatch(toggle());
  }

  navigator.mediaSession.setActionHandler("nexttrack", onNextClick);
  navigator.mediaSession.setActionHandler("previoustrack", onPrevClick);

  function onPrevClick() {
    changeSong(
      { ...getPrevSong(songs, currentSongId), changeSource: false },
      dispatch
    );
  }

  function onNextClick() {
    changeSong(
      { ...getNextSong(songs, currentSongId), changeSource: false },
      dispatch
    );
  }

  return (
    <>
      <IconButton onClick={onPrevClick} size="small">
        <SkipPreviousIcon />
      </IconButton>
      <Button variant="outlined" onClick={onSongToggle} size="small">
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <IconButton onClick={onNextClick} size="small">
        <SkipNextIcon />
      </IconButton>
    </>
  );
}
