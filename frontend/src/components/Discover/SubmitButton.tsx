import { Box, Button } from "@mui/material";
import React from "react";

export default function SubmitButton() {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </Box>
  );
}
