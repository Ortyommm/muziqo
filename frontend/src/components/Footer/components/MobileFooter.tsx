import { Box, Grid } from "@mui/material";
import ShuffleAndRepeat from "./ShuffleAndRepeat";
import PrevPlayNext from "./PrevPlayNext";
import SongDurationSlider from "./SongDurationSlider";
import SongsData from "../SongsData";
import FavoriteSongIcon from "../../FavoriteSongIcon/FavoriteSongIcon";
import { useAppSelector } from "../../../store";

export default function MobileFooter() {
  const currentSongId = useAppSelector((state) => state.audio.currentSongId);

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <SongsData />
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={10}>
          <SongDurationSlider />
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          xs={3.5}
        >
          {currentSongId && <FavoriteSongIcon songId={currentSongId} />}
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" xs={5}>
          <PrevPlayNext />
        </Grid>
        <Grid item xs={3.5}>
          <ShuffleAndRepeat />
        </Grid>
      </Grid>
    </>
  );
}
