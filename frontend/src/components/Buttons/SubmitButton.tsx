import { Box, Button } from "@mui/material";
import React, {ForwardedRef, forwardRef} from "react";

const SubmitButton = forwardRef((_, ref: ForwardedRef<null>) => {
  return (
    <Box sx={{ marginTop: 4 }}>
      <Button type="submit" variant="outlined" ref={ref}>
        Submit
      </Button>
    </Box>
  );
})
export default SubmitButton
