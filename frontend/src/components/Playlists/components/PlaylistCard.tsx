import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
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
    <Card>
      <CardActionArea onClick={onPlaylistClick}>
        <CardMedia
          component="img"
          height="200px"
          image={img || "/images/album.png"}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
