import { Box, Grid } from "@mui/material";
import ShuffleAndRepeat from "./ShuffleAndRepeat";
import PrevPlayNext from "./PrevPlayNext";
import SongDurationSlider from "./SongDurationSlider";
import SongsData from "../SongsData";

export default function MobileFooter() {
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
        <Grid item xs={3.5} />
        <Grid item xs={5}>
          <PrevPlayNext />
        </Grid>
        <Grid item xs={3.5}>
          <ShuffleAndRepeat />
        </Grid>
      </Grid>
    </>
  );
}
