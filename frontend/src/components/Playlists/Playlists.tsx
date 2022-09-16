import React from "react";
import PlaylistCard from "./PlaylistCard";
import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../store";
import AppList from "../AppList/AppList";

const Playlists = () => {
  const playlists = useAppSelector((state) => state.playlists.userPlaylists);
  const isLoading = useAppSelector((state) => state.auth.isUserDataLoading);

  return (
    <Container>
      <Grid container>
        <AppList
          Element={PlaylistCard}
          isFetching={isLoading}
          items={playlists}
        />
        {/*<Grid item xs={3}>*/}
        {/*  <PlaylistCard id={1} name="Король и Шут" />*/}
        {/*</Grid>*/}
      </Grid>
    </Container>
  );
};
//TODO use real playlists
//TODO one playlist page
//TODO add playlists
//TODO add songs to playlists
export default Playlists;
