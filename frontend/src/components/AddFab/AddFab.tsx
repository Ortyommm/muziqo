import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import React from "react";

export default function AddFab({ onClick }: { onClick: () => void }) {
  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{ position: "fixed", right: 16, bottom: 100 }}
      onClick={onClick}
    >
      <AddIcon />
    </Fab>
  );
}
