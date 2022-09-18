import {
  Box,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PauseIcon from "@mui/icons-material/Pause";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { durationConverter } from "../../utils/durationConverter";
import { useAppDispatch, useAppSelector } from "../../store";
import { ISong } from "../../types/SongsTypes";
import { addFavorite, removeFavorite } from "../../store/modules/songs";
import AppListItem from "../AppList/AppListItem";
import { changeSong } from "../../store/modules/dispatchSong";
import { pause, play } from "../../store/modules/audio";
import PlaylistsDialog from "../PlaylistsDialog/PlaylistsDialog";
import React, { ReactElement, useState } from "react";
import { useLocation } from "react-router-dom";

export default function SongItem({
  name,
  authors,
  id,
  file,
  duration,
  moreItems,
}: ISong & { moreItems: ReactElement[] | ReactElement }) {
  const dispatch = useAppDispatch();

  const currentSongId = useAppSelector((state) => state.audio.currentSongId);
  const isCurrent = currentSongId === id;
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);
  const currentTime = useAppSelector((state) => state.audio.currentTime);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const moreOpen = Boolean(anchorEl);

  const [openPlaylistDialog, setOpenPlaylistDialog] = useState(false);

  const isFavorite = useAppSelector((state) => state.songs.favorites).some(
    (favSong) => {
      return favSong.id === id;
    }
  );

  // console.log(isFavorite);
  async function onAudioClick() {
    if (id !== currentSongId) {
      changeSong({ file, id, duration }, dispatch);
      return;
    }

    if (isPlaying) {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  }

  function onFavoriteClick() {
    dispatch(isFavorite ? removeFavorite(id) : addFavorite(id));
  }

  function onPlaylistClick() {
    setOpenPlaylistDialog(true);
  }

  function onPlaylistDialogClose() {
    setOpenPlaylistDialog(false);
  }

  function onMoreClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function onMoreClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <PlaylistsDialog
        open={openPlaylistDialog}
        onClose={onPlaylistDialogClose}
        songId={id}
      />
      <AppListItem
        secondaryAction={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <Typography sx={{ mr: 2 }}>
              {isCurrent ? `${durationConverter(currentTime)} /` : ""}{" "}
              {durationConverter(+duration)}
            </Typography>
            <IconButton onClick={onMoreClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu open={moreOpen} onClose={onMoreClose} anchorEl={anchorEl}>
              <MenuItem onClick={onPlaylistClick}>
                <PlaylistAddIcon />
              </MenuItem>
              {moreItems}
            </Menu>
            <IconButton aria-label="comments" onClick={onFavoriteClick}>
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        }
      >
        <IconButton sx={{ mr: 2 }} onClick={onAudioClick}>
          {isCurrent && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Typography
          variant="h6"
          sx={{ color: (theme) => theme.palette.text.primary, mr: 1 }}
        >
          {name} |
        </Typography>
        <Typography
          sx={{ color: (theme) => theme.palette.text.secondary, fontSize: 11 }}
        >
          {/*TODO many authors*/}
          {authors?.[0]?.name}
        </Typography>
      </AppListItem>
    </>
  );
}
