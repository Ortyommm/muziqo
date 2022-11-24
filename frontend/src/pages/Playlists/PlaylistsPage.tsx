import React from "react";
import { Container, Grid } from "@mui/material";
import { useAppSelector } from "@/store";
import AddPlaylist from "./components/AddPlaylist";
import PlaylistsList from "@/components/PlaylistsList/PlaylistsList";

const PlaylistsPage = () => {
  const playlists = useAppSelector((state) => state.playlists.userPlaylists);
  const isLoading = useAppSelector((state) => state.auth.isUserDataLoading);

  return (
    <Container>
      <Grid container alignItems="stretch">
        <PlaylistsList
          isFetching={isLoading}
          useCard={true}
          items={playlists}
        />
      </Grid>
      <AddPlaylist />
    </Container>
  );
};
//TODO add playlists
export default PlaylistsPage;
