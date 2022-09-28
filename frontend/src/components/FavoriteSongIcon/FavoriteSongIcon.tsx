import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import React from "react";
import { addFavorite, removeFavorite } from "../../store/modules/songs";
import { useAppDispatch, useAppSelector } from "../../store";

export default function ({ songId }: { songId: number }) {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) => state.songs.favorites).some(
    (favSong) => {
      return favSong.id === songId;
    }
  );

  function onFavoriteClick() {
    dispatch(isFavorite ? removeFavorite(songId) : addFavorite(songId));
  }

  return (
    <IconButton onClick={onFavoriteClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}
