import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setUserPlaylists } from "../../../store/modules/playlists";
import { api } from "../../../utils/api";

export default function RemovePlaylistDialog({
  open,
  onClose,
  playlistId,
}: {
  open: boolean;
  onClose: () => void;
  playlistId: number;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const playlists = useAppSelector((state) => state.playlists.userPlaylists);

  const onAgree = async () => {
    await api.delete(`/playlists`, { data: { playlistId } });
    onClose();
    navigate("/playlists");
    dispatch(
      setUserPlaylists(
        playlists.filter((playlist) => playlist.id !== playlistId)
      )
    );
  };

  const onDisagree = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <Button onClick={onAgree}>Yes</Button>
        <Button onClick={onDisagree}>No</Button>
      </DialogContent>
    </Dialog>
  );
}
