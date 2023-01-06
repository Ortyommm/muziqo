import { Button, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import * as React from "react";
import {
  changeSongToNext,
  changeSongToPrev,
} from "../../../store/modules/dispatchSong";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toggle } from "../../../store/modules/audio";
import { useEffect } from "react";

export default function PrevPlayNext() {
  const dispatch = useAppDispatch();

  const isPlaying = useAppSelector((state) => state.audio.isPlaying);

  function onSongToggle() {
    dispatch(toggle());
  }

  useEffect(() => {
    function onKeyPress(event: KeyboardEvent) {
      if (
        event.code === "Space" &&
        !["input", "textarea"].includes(
          (event.target as HTMLElement)?.tagName.toLowerCase()
        )
      ) {
        event.preventDefault();
        onSongToggle();
      }
    }

    document.addEventListener("keyup", onKeyPress);
    return () => {
      document.removeEventListener("keyup", onKeyPress);
    };
  }, []);

  return (
    <>
      <IconButton onClick={changeSongToPrev} size="small">
        <SkipPreviousIcon />
      </IconButton>
      <Button variant="outlined" onClick={onSongToggle} size="small">
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>
      <IconButton onClick={changeSongToNext} size="small">
        <SkipNextIcon />
      </IconButton>
    </>
  );
}
