import { Box, Paper, useMediaQuery, useTheme } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";
import DesktopFooter from "./components/DesktopFooter";
import MobileFooter from "./components/MobileFooter";
import useFooterHeight from "../../hooks/useFooterHeight";

export default function Footer() {
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(
    `(min-width: ${theme.breakpoints.values.sm}px)`
  );

  const footerHeight = useFooterHeight();

  if (location.pathname === "/auth") return <></>;
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: footerHeight,
        elevation: 3,
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: { xs: "block", md: "flex" },
          alignItems: "center",
        }}
      >
        {isDesktop ? <DesktopFooter /> : <MobileFooter />}
      </Box>
    </Paper>
  );
}
