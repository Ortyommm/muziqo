import { useNavigate } from "react-router-dom";
import {  useAppSelector } from "@/store";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import * as React from "react";
import { Menu, MenuItem } from "@mui/material";

export default function UserMenu() {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.authorizedUser?.id);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function navigateToProfile() {
    navigate(`/users/${userId}`);
  }

  function navigateToSettings() {
    navigate("/settings");
  }

  return (
    <Box sx={{ ml: "auto" }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
        <MenuItem onClick={navigateToSettings}>Settings</MenuItem>
      </Menu>
    </Box>
  );
}
