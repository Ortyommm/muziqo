import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { MenuItem } from "@mui/material";
import { api } from "../../../utils/api";

export default function PlaylistRemoveItem({
  songId,
  playlistId,
  onSongRemove,
}: {
  songId: number;
  playlistId: number;
  onSongRemove: (songId: number) => void;
}) {
  function removeSongFromPlaylist() {
    const data = { songId, playlistId };
    api.delete(`playlists/song`, { data });
    onSongRemove(songId);
  }

  return (
    <MenuItem onClick={removeSongFromPlaylist}>
      <PlaylistRemoveIcon />
    </MenuItem>
  );
}
