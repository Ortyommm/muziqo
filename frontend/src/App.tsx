import * as React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import SongsList from "./components/SongsList/SongsList";
import Footer from "./components/Footer/Footer";
import AppHeader from "./components/AppHeader/AppHeader";

export default function MenuAppBar() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppHeader />
      </Box>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<SongsList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    // </div>
  );
}
