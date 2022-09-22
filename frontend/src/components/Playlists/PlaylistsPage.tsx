import React from "react";
import PlaylistCard from "./components/PlaylistCard";
import { Container, Grid } from "@mui/material";
import { useAppSelector } from "../../store";
import AppList from "../AppList/AppList";
import AddPlaylist from "./components/AddPlaylist";

const PlaylistsPage = () => {
  const playlists = useAppSelector((state) => state.playlists.userPlaylists);
  const isLoading = useAppSelector((state) => state.auth.isUserDataLoading);

  return (
    <Container>
      <Grid container alignItems="stretch">
        <AppList
          Element={PlaylistCard}
          isFetching={isLoading}
          items={playlists}
        />
      </Grid>
      <AddPlaylist />
    </Container>
  );
};
//TODO add playlists
export default PlaylistsPage;
