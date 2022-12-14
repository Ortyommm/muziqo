import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { setTempSongs } from "../../store/modules/songs";
import { IAuthorWithSongs } from "../../types/SongsTypes";
import { useAppDispatch } from "../../store";
import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import CircleCenterProgress from "../../components/Progress/CircularCenterProgress";
import SongsList from "../../components/SongsList/SongsList";

export default function AuthorPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const [authorData, setAuthorData] = useState<IAuthorWithSongs | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`author/${params.id}`)
      .then((res: AxiosResponse<IAuthorWithSongs>) => {
        setAuthorData(res.data);
        dispatch(setTempSongs(res.data.songs));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  if (isLoading) return <CircleCenterProgress />;
  if (!authorData) return <>ERROR</>;

  return (
    <Container>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <FaceIcon fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h2">{authorData.name}</Typography>
      </Box>
      <SongsList isFetching={isLoading} items={authorData?.songs || []} />
    </Container>
  );
}
