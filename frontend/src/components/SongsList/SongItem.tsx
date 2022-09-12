import { Box, IconButton, ListItem, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PauseIcon from "@mui/icons-material/Pause";
import { durationConverter } from "../../utils/durationConverter";
import { useAppDispatch, useAppSelector } from "../../store";
import { ISong } from "../../types/SongsTypes";
import { addFavorite, removeFavorite } from "../../store/modules/songs";

export default function SongItem({
  name,
  authors,
  id,
  file,
  duration,
  onAudio,
}: {
  onAudio: (audioSrc: string, id: number, duration: number) => void;
} & ISong) {
  const dispatch = useAppDispatch();

  const currentSongId = useAppSelector((state) => state.audio.currentSongId);
  const isCurrent = currentSongId === id;
  const isPlaying = useAppSelector((state) => state.audio.isPlaying);
  const currentTime = useAppSelector((state) => state.audio.currentTime);
  const isFavorite = useAppSelector((state) => state.songs.favorites).some(
    (favSong) => favSong.id === id
  );
  // console.log(isFavorite);
  async function onAudioClick() {
    onAudio(file, id, +duration);
  }

  function onFavoriteClick() {
    dispatch(isFavorite ? removeFavorite(id) : addFavorite(id));
  }

  return (
    <ListItem
      sx={{
        background: (theme) => theme.palette.grey.A700,
        height: 70,
        mb: 0.5,
      }}
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
    </ListItem>
  );
}
