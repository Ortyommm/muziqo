import { Grid } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../store";
import {
  getAllSongs,
  getAllSongsExceptFavorites,
} from "../../store/modules/dispatchSong";

export default function SongsData() {
  const songs = useAppSelector((state) => getAllSongs(state.songs));
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  const currentSong = songs.find((song) => song.id === currentSongId);

  if (!currentSong) return <Grid item xs={3} />;

  const textStyle = {
    width: { xs: "100%" },
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  };
  return (
    <Grid item xs={3}>
      <Grid sx={{ ml: 3 }}>
        <Grid item sx={textStyle}>
          {currentSong.name}
        </Grid>
        {/*TODO all authors*/}
        <Grid
          item
          sx={{
            color: (theme) => theme.palette.grey.A700,
            fontSize: 12,
            ...textStyle,
          }}
        >
          {currentSong.authors?.[0]?.name}
        </Grid>
      </Grid>
    </Grid>
  );
}
