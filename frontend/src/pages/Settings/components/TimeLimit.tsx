import React, { ChangeEvent, FormEvent, useState } from "react";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useAppDispatch, useAppSelector } from "@/store";
import { setLimit } from "@/store/modules/limit";

function TimeLimit() {
  const limit = useAppSelector((state) => state.limit.value / 60);
  const dispatch = useAppDispatch();

  const [minutes, setMinutes] = useState<string>(limit.toString());

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    if (isNaN(+event.target?.value)) return;
    setMinutes(event.target.value);
  }

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(setLimit(Number(minutes || 0) * 60));
  }

  return (
    <Box component="form" onSubmit={onFormSubmit}>
      <Typography variant="h4">Time limit on this device per day</Typography>
      <Typography
        sx={{ color: (theme) => theme.palette.text.secondary, mb: 2 }}
      >
        (Empty or "0" to disable)
      </Typography>
      <TextField
        onChange={onChange}
        value={minutes}
        InputProps={{
          endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
        }}
      />
      <SubmitButton />
    </Box>
  );
}

export default TimeLimit;
