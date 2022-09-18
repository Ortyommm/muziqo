import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogContent,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddSongForm from "./AddSongForm";
import AddAuthorForm from "./AddAuthorForm";

export default function AddSongOrAuthor() {
  type AddItems = "author" | "song";

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<AddItems | null>(null);

  function onClose() {
    setOpen(false);
    setTimeout(() => {
      setItem(null);
    }, 300);
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
        {item ? null : (
          <DialogContent>
            <Grid
              container
              justifyContent="space-between"
              sx={{
                "& .MuiButtonBase-root": { width: "45%" },
              }}
            >
              <Button variant="outlined" onClick={() => setItem("song")}>
                Add Song
              </Button>
              <Button variant="outlined" onClick={() => setItem("author")}>
                Add Author
              </Button>
            </Grid>
          </DialogContent>
        )}
        {item === "song" ? (
          <AddSongForm onClose={onClose} />
        ) : item === "author" ? (
          <AddAuthorForm onClose={onClose} />
        ) : null}
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", right: 16, bottom: 100 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
