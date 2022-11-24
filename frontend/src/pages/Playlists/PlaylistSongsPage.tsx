import { useParams } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import { IPlaylist } from "@/types/PlaylistsTypes";
import { ISong } from "@/types/SongsTypes";
import PlaylistRemoveItem from "./components/PlaylistRemoveItem";
import { setTempSongs } from "@/store/modules/songs";
import { useAppDispatch, useAppSelector } from "../../store";
import RemovePlaylistDialog from "./components/RemovePlaylistDialog";
import SongsList from "@/components/SongsList/SongsList";

export default function PlaylistSongsPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth.authorizedUser?.id);
  const [playlistData, setPlaylistData] = useState<IPlaylist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const ownPlaylist = playlistData?.user.id === userId;

  const closeRemoveDialog = () => setRemoveDialogOpen(false);
  const openRemoveDialog = () => setRemoveDialogOpen(true);

  function onSongRemove(songId: number) {
    if (!playlistData) return;
    setPlaylistData({
      ...playlistData,
      songs: playlistData.songs.filter((song) => song.id !== songId),
    });
  }

  const playlistSongs = playlistData
    ? playlistData.songs.map((song) => {
        const songWithMoreItems = { ...song } as ISong & {
          moreItems: ReactElement;
        };
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
      .then((res: AxiosResponse<IPlaylist>) => {
        setPlaylistData(res.data);
        dispatch(setTempSongs(res.data.songs));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Container>
      <Typography variant="h4" mb={2}>
        {!isLoading ? `Playlist: ${playlistData?.name}` : ""}
      </Typography>
      <Box sx={{ mb: 1, mt: 1 }}>
        {ownPlaylist && (
          <Button variant="outlined" color="error" onClick={openRemoveDialog}>
            Delete playlist
          </Button>
        )}
        <RemovePlaylistDialog
          open={removeDialogOpen}
          onClose={closeRemoveDialog}
          //we can go to this page only if params contains id
          playlistId={+params.id!}
        />
      </Box>
      <SongsList items={playlistSongs} isFetching={isLoading} />
    </Container>
  );
}
