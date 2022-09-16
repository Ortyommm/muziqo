import * as React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage/AuthPage";
import SongsList from "./components/SongsList/SongsList";
import Footer from "./components/Footer/Footer";
import AppHeader from "./components/AppHeader/AppHeader";
import { getUserData } from "./store/modules/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import ProtectedRoute from "./components/AppRouter/ProtectedRoute";
import Playlists from "./components/Playlists/Playlists";
import Discover from "./components/Discover/Discover";
import Home from "./components/Home/Home";
import PlaylistPage from "./components/Playlists/PlaylistPage";

export default function App() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) return;
    dispatch(getUserData());
  }, [token]);

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, mb: 2 }}>
        <AppHeader />
      </Box>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
      <Footer />
    </div>
    // </div>
  );
}
