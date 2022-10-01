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
import PlaylistsDialog from "../Playlists/PlaylistsDialog";
import React, { ReactElement, useState } from "react";
import FavoriteSongIcon from "../FavoriteSongIcon/FavoriteSongIcon";

export default function SongItem({
  name,
  authors,
  id,
  file,
  duration,
  moreItems,
  style,
}: ISong & {
  moreItems: ReactElement[] | ReactElement;
  style?: React.CSSProperties;
}) {
  const dispatch = useAppDispatch();

  const currentSongId = useAppSelector((state) => state.audio.currentSongId);
  const isCurrent = currentSongId === id;
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);
  const currentTime = useAppSelector((state) => state.audio.currentTime);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const moreOpen = Boolean(anchorEl);

  const [openPlaylistDialog, setOpenPlaylistDialog] = useState(false);

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
        style={style}
        secondaryAction={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            <Typography
              sx={{ mr: 2, display: { xs: "none", sm: "none", md: "block" } }}
            >
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
            <FavoriteSongIcon songId={id} />
          </Box>
        }
      >
        <IconButton sx={{ mr: 2 }} onClick={onAudioClick}>
          {isCurrent && isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            width: { xs: "63%", sm: "79%" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: (theme) => theme.palette.text.primary,
              mr: 1,
              fontSize: { xs: 14, sm: 14, md: 16 },
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name} {/*<Box*/}
            {/*  component="span"*/}
            {/*  sx={{ display: { sm: "none", xs: "none", md: "inline" } }}*/}
            {/*>*/}
            {/*  {authors?.[0] && "|"}*/}
            {/*</Box>*/}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: 11,
              display: { md: "block", sm: "none", xs: "none" },
            }}
          >
            {/*TODO many authors*/}
            {authors?.[0]?.name}
          </Typography>
        </Box>
      </AppListItem>
    </>
  );
}
