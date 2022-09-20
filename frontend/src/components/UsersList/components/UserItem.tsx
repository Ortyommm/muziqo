import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IUser } from "../../../types/UserTypes";
import AppListItem from "../../AppList/AppListItem";
import { useNavigate } from "react-router-dom";

export default function UserItem(user: IUser) {
  const navigate = useNavigate();

  function onUserIconClick() {
    navigate(`/users/${user.id}`);
  }

  return (
    <AppListItem>
      <IconButton onClick={onUserIconClick}>
        <AccountCircleIcon />
      </IconButton>
      <Typography>{user.name}</Typography>
    </AppListItem>
  );
}
