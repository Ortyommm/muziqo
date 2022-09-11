import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import { ReactNode } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import BoltIcon from "@mui/icons-material/Bolt";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
class AppHeaderPage {
  constructor(public name: string, public icon: ReactNode, public to: string) {}
}

export default function AppHeader() {
  const pages = [
    new AppHeaderPage("Home", <HomeIcon />, ""),
    new AppHeaderPage(
      "Favourites",
      <FavoriteIcon fontSize="small" />,
      "favorites"
    ),
    new AppHeaderPage("Playlists", <QueueMusicIcon />, "playlists"),
    new AppHeaderPage("Discover", <BoltIcon />, "discover"),
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" pb={0.75} mr={10}>
              Muziqo
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <NavLink
                  to={page.to}
                  key={page.to}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="text"
                    sx={{
                      mr: 3,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {page.icon}
                    </Box>
                    <Box>{page.name}</Box>
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Box>

          <Box sx={{ ml: "auto" }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
