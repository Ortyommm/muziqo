import * as React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import AppHeader from "./components/AppHeader/AppHeader";
import { getUserData } from "./store/modules/user";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import ProtectedRoute from "./components/AppRouter/ProtectedRoute";
import UserPage from "@/pages/User/UserPage";
import AuthPage from "@/pages/AuthPage/AuthPage";
import Discover from "@/pages/Discover/Discover";
import Home from "@/pages/Home/Home";
import PlaylistSongsPage from "@/pages/Playlists/PlaylistSongsPage";
import AuthorPage from "@/pages/Author/AuthorPage";
import PlaylistsPage from "@/pages/Playlists/PlaylistsPage";

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
              <PlaylistsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <PlaylistsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors/:id"
          element={
            <ProtectedRoute>
              <AuthorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistSongsPage />
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
