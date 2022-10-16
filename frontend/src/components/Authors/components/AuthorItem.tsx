import { IconButton, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IAuthor } from "../../../types/SongsTypes";
import AppListItem from "../../AppList/AppListItem";

//May be will different from UserItem soon
export default function AuthorItem({
  name,
  id,
  style,
}: IAuthor & {
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();

  function onAuthorIconClick() {
    navigate(`/authors/${id}`);
  }

  return (
    <AppListItem style={style}>
      <IconButton onClick={onAuthorIconClick}>
        <FaceIcon />
      </IconButton>
      <Typography>{name}</Typography>
    </AppListItem>
  );
}
