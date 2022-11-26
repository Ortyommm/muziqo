import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import * as React from "react";
import { ReactNode } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import BoltIcon from "@mui/icons-material/Bolt";
import { NavLink } from "react-router-dom";
import UserMenu from "@/components/AppHeader/components/UserMenu";
class AppHeaderPage {
  constructor(public name: string, public icon: ReactNode, public to: string) {}
}

const pages = [
  // new AppHeaderPage("Home", <HomeIcon />, ""),
  new AppHeaderPage("Favourites", <FavoriteIcon fontSize="small" />, ""),
  new AppHeaderPage("Playlists", <QueueMusicIcon />, "playlists"),
  new AppHeaderPage("Discover", <BoltIcon />, "discover"),
];

export default function AppHeader() {
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
            {/*<IconButton*/}
            {/*  size="large"*/}
            {/*  edge="start"*/}
            {/*  color="inherit"*/}
            {/*  aria-label="menu"*/}
            {/*  sx={{ mr: 2 }}*/}
            {/*>*/}
            {/*  <MenuIcon />*/}
            {/*</IconButton>*/}
            <Typography
              variant="h6"
              component="div"
              pb={0.75}
              sx={{
                mr: { md: 6, xs: 2, xl: 10 },
                display: { xs: "none", sm: "block" },
              }}
            >
              Muziqo
            </Typography>
            <Box sx={{ display: "flex" }}>
              {pages.map((page) => (
                <NavLink
                  to={page.to}
                  key={page.to}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    variant="text"
                    color="primary"
                    sx={{
                      mr: {
                        xs: 1,
                        sm: 3,
                      },
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {page.icon}
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                      {page.name}
                    </Box>
                  </Button>
                </NavLink>
              ))}
            </Box>
          </Box>

          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
