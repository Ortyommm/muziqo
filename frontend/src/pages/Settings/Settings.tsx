import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Box, Container, TextField } from "@mui/material";
import CircularCenterProgress from "@/components/Progress/CircularCenterProgress";
import { textFieldBind } from "@/utils/input";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { api } from "@/utils/api";
import { setAuthorizedUser } from "@/store/modules/user";

export default function Settings() {
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);
  const nameFromState = authorizedUser?.name;
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof nameFromState === "string") setName(nameFromState);
  }, [nameFromState]);

  if (!nameFromState) return <CircularCenterProgress />;

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    api.patch(`/users/me`, { name: name.trim() });
    dispatch(setAuthorizedUser({ ...authorizedUser!, name: name.trim() }));
  }

  return (
    <Container>
      <Box component="form" onSubmit={onFormSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onSubmit={onFormSubmit}
          {...textFieldBind(name, setName)}
        />
        <SubmitButton />
      </Box>
    </Container>
  );
}
