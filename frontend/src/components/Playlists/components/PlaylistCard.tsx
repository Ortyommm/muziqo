import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PlaylistCard({
  id,
  img,
  name,
  description,
}: {
  id: number;
  name: string;
  img?: string;
  description?: string;
}) {
  const navigate = useNavigate();

  function onPlaylistClick() {
    navigate(`/playlists/${id}`);
  }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ mr: 2 }}>
        <CardActionArea onClick={onPlaylistClick}>
          <CardMedia
            component="img"
            height="200px"
            image={img || "/images/album.png"}
            alt={name}
          />
          <CardContent sx={{ height: "100px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
