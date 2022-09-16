import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { IPlaylist } from "../../types/PlaylistsTypes";
import SongsList from "../SongsList/SongsList";

export default function PlaylistPage() {
  const params = useParams();
  const [playlistData, setPlaylistData] = useState<IPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`playlists/${params.id}`)
      .then((res: AxiosResponse<IPlaylist>) => setPlaylistData(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <SongsList songs={playlistData?.songs || []} isFetching={isLoading} />
    </Container>
  );
}
