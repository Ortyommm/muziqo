import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import CircularCenterProgress from "@/components/Progress/CircularCenterProgress";
import { textFieldBind } from "@/utils/input";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { api } from "@/utils/api";
import { setAuthorizedUser, setToken } from "@/store/modules/user";

export default function Settings() {
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);
  const nameFromState = authorizedUser?.name;
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (typeof nameFromState === "string") setName(nameFromState);
  }, [nameFromState]);

  if (!nameFromState) return <CircularCenterProgress />;

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();
    api.patch(`/users/me`, {
      name: name.trim(),
      password: password.trim() || undefined,
      newPassword: newPassword.trim() || undefined,
    });
    dispatch(setAuthorizedUser({ ...authorizedUser!, name: name.trim() }));
  }

  function logout() {
    localStorage.removeItem("token");
    dispatch(setToken(null));
  }

  return (
    <Container>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Settings
      </Typography>
      <Box
        component="form"
        onSubmit={onFormSubmit}
        sx={{
          "& .MuiTextField-root:not(:last-child)": { mb: 1 },
          "& .MuiTextField-root": { width: "100%" },
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          onSubmit={onFormSubmit}
          {...textFieldBind(name, setName)}
        />
        <Box sx={{ padding: 2, border: "1px solid grey", borderRadius: 2 }}>
          <TextField
            label="Password"
            variant="outlined"
            onSubmit={onFormSubmit}
            {...textFieldBind(password, setPassword)}
          />
          <TextField
            label="New password"
            variant="outlined"
            onSubmit={onFormSubmit}
            {...textFieldBind(newPassword, setNewPassword)}
          />
        </Box>
        <SubmitButton />
      </Box>
      <Typography variant="h2" sx={{ mt: 5 }}>
        Dangerous
      </Typography>
      <Button sx={{ mt: 2 }} variant="outlined" color="error" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}
