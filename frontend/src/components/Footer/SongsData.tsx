import { Grid } from "@mui/material";
import * as React from "react";
import { useAppSelector } from "../../store";
import { getAllSongsExceptFavorites } from "../../store/modules/dispatchSong";

export default function SongsData() {
  const songs = useAppSelector((state) =>
    getAllSongsExceptFavorites(state.songs)
  );
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  const currentSong = songs.find((song) => song.id === currentSongId);

  if (!currentSong) return <Grid item xs={3} />;

  return (
    <Grid item xs={3}>
      <Grid sx={{ ml: 3 }}>
        <Grid item>{currentSong.name}</Grid>
        {/*TODO all authors*/}
        <Grid
          item
          sx={{ color: (theme) => theme.palette.grey.A700, fontSize: 12 }}
        >
          {currentSong.authors?.[0]?.name}
        </Grid>
      </Grid>
    </Grid>
  );
}
