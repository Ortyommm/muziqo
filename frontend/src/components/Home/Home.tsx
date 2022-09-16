import SongsList from "../SongsList/SongsList";
import * as React from "react";
import { useAppSelector } from "../../store";
import { Container } from "@mui/material";

export default function Home() {
  const songs = useAppSelector((state) => state.songs.favorites);
  const isLoading = useAppSelector((state) => state.auth.isUserDataLoading);

  return (
    <Container>
      <SongsList songs={songs} isFetching={isLoading} />
    </Container>
  );
}
