import { useParams } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { IUser } from "../../types/UserTypes";
import { AxiosResponse } from "axios";
import SongsList from "../SongsList/SongsList";
import CircleCenterProgress from "../Progress/CircularCenterProgress";
import * as React from "react";
import PlaylistsList from "../Playlists/components/PlaylistsList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "../../store";
import { setTempSongs } from "../../store/modules/songs";

export default function UsersPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`users/${params.id}`)
      .then((res: AxiosResponse<IUser>) => {
        setUserData(res.data);
        dispatch(setTempSongs(res.data.favorites));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) return <CircleCenterProgress />;

  if (!userData) return <>ERROR</>;

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <AccountCircleIcon fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h2">{userData.name}</Typography>
      </Box>
      <Typography
        mb={4}
        sx={{ color: (theme) => theme.palette.text.secondary }}
      >
        Registered in {new Date(userData.created!).toLocaleString()}
      </Typography>

      <Typography variant="h4" mb={4}>
        Favorites
      </Typography>
      <SongsList isFetching={isLoading} songs={userData.favorites || []} />
      <Typography variant="h4" mt={4} mb={4}>
        Playlists
      </Typography>
      <Grid container>
        <PlaylistsList
          isFetching={isLoading}
          items={userData?.playlists || []}
          useCard={true}
        />
      </Grid>
    </Container>
  );
}
