import AddFab from "../../AddFab/AddFab";
import React, { FormEvent, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { textFieldBind } from "../../../utils/input";
import SubmitButton from "../../Discover/SubmitButton";
import { addPlaylist } from "../../../store/modules/playlists";
import { useAppDispatch } from "../../../store";

export default function AddPlaylist() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    //Validation
    if (!name.trim()) return;

    dispatch(addPlaylist({ name, description }));
    onClose();
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Add playlist</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "100%" },
              "& .MuiButton-root": { m: 1, width: "100%" },
            }}
            onSubmit={onFormSubmit}
          >
            <TextField
              label="Name"
              {...textFieldBind(name, setName)}
              required
            />
            <TextField
              label="Description"
              multiline
              {...textFieldBind(description, setDescription)}
            />
            <SubmitButton />
          </Box>
        </DialogContent>
      </Dialog>
      <AddFab onClick={onOpen} />
    </>
  );
}
// Add user playlist
