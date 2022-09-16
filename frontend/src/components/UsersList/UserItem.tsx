import { IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IUser } from "../../types/UserTypes";
import AppListItem from "../AppList/AppListItem";

export default function UserItem(user: IUser) {
  return (
    <AppListItem>
      <IconButton>
        <AccountCircleIcon />
      </IconButton>
      <Typography>{user.name}</Typography>
    </AppListItem>
  );
}
