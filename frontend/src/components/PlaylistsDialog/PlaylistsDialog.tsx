import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAppSelector } from "../../store";
import PlaylistsList from "../Playlists/PlaylistsList";

export default function PlaylistsDialog({
  open,
  onClose,
  songId,
}: {
  open: boolean;
  onClose: () => void;
  songId: number;
}) {
  const playlists = useAppSelector((state) => state.playlists.userPlaylists);

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Select playlist</DialogTitle>
      <DialogContent>
        <PlaylistsList items={playlists} isFetching={false} songId={songId} />
      </DialogContent>
    </Dialog>
  );
}
