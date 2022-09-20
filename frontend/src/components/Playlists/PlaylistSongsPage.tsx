import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { IPlaylist } from "../../types/PlaylistsTypes";
import SongsList from "../SongsList/SongsList";
import { ISong } from "../../types/SongsTypes";
import PlaylistRemoveItem from "./components/PlaylistRemoveItem";

export default function PlaylistSongsPage() {
  const params = useParams();
  const [playlistData, setPlaylistData] = useState<IPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function onSongRemove(songId: number) {
    if (!playlistData) return;
    setPlaylistData({
      ...playlistData,
      songs: playlistData.songs.filter((song) => song.id !== songId),
    });
  }

  const playlistSongs = playlistData
    ? playlistData.songs.map((song) => {
        const songWithMoreItems = song as ISong & { moreItems: ReactElement };
        songWithMoreItems.moreItems = (
          //params.id is defined, because PlaylistPage only shows if params are '/playlists/id'
          <PlaylistRemoveItem
            songId={song.id}
            playlistId={+params.id!}
            onSongRemove={onSongRemove}
          />
        );
        return songWithMoreItems;
      })
    : [];

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`playlists/${params.id}`)
      .then((res: AxiosResponse<IPlaylist>) => setPlaylistData(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <Typography variant="h4" mb={2}>
        {!isLoading ? `Playlist: ${playlistData?.name}` : ""}
      </Typography>
      <SongsList songs={playlistSongs} isFetching={isLoading} />
    </Container>
  );
}
