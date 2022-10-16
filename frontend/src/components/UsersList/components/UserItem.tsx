import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IUser } from "../../../types/UserTypes";
import AppListItem from "../../AppList/AppListItem";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function UserItem({
  name,
  id,
  style,
}: IUser & {
  style?: React.CSSProperties;
}) {
  const navigate = useNavigate();

  function onUserIconClick() {
    navigate(`/users/${id}`);
  }

  return (
    <AppListItem style={style}>
      <IconButton onClick={onUserIconClick}>
        <AccountCircleIcon />
      </IconButton>
      <Typography>{name}</Typography>
    </AppListItem>
  );
}
