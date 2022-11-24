import { Box, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { textFieldBind } from "../../../utils/input";
import { api } from "../../../utils/api";
import SubmitButton from "../../../components/Buttons/SubmitButton";

export default function AddAuthorForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    api.post("author", { name });
    onClose();
  }

  return (
    <>
      <DialogTitle>Add author</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            "& .MuiButton-root": { m: 1, width: "100%" },
          }}
          onSubmit={onFormSubmit}
        >
          <TextField label="Name" {...textFieldBind(name, setName)} required />

          <SubmitButton />
        </Box>
      </DialogContent>
    </>
  );
}
