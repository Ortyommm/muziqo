import SongsList from "../SongsList/SongsList";
import * as React from "react";
import { useAppSelector } from "../../store";
import { Container } from "@mui/material";
import useFooterHeight from "../../hooks/useFooterHeight";
import { headerWithMarginHeight } from "../../constants";
import useCalculatedHeight from "../../hooks/useCalculatedHeight";

export default function Home() {
  const songs = useAppSelector((state) => state.songs.favorites);
  const isLoading = useAppSelector((state) => state.auth.isUserDataLoading);
  const footerHeight = useFooterHeight();
  const height = useCalculatedHeight(
    window.innerHeight - headerWithMarginHeight - footerHeight,
    "home"
  );

  return (
    <Container sx={{ mb: 0 }}>
      <SongsList items={songs} isFetching={isLoading} height={height} />
    </Container>
  );
}
