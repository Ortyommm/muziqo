import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  Box,
  Button,
  Container,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import CircularCenterProgress from "@/components/Progress/CircularCenterProgress";
import { textFieldBind } from "@/utils/input";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { api } from "@/utils/api";
import { setAuthorizedUser, setToken } from "@/store/modules/user";
import TimeLimit from "@/pages/Settings/components/TimeLimit";

export default function Settings() {
  const authorizedUser = useAppSelector((state) => state.auth.authorizedUser);
  const nameFromState = authorizedUser?.name;
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const submitBtn = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof nameFromState === "string") setName(nameFromState);
  }, [nameFromState]);

  if (!nameFromState) return <CircularCenterProgress />;

  function onFormSubmit(event: FormEvent) {
    event.preventDefault();

    const newPasswordError =
      password.trim() && !newPassword.trim() ? "Enter new password" : "";
    const oldPasswordError =
      !password.trim() && newPassword.trim() ? "Enter old password" : "";

    setNewPasswordError(newPasswordError);
    setPasswordError(oldPasswordError);

    if (oldPasswordError || newPasswordError) return;

    api
      .patch(`/users/me`, {
        name: name.trim(),
        password: password.trim() || undefined,
        newPassword: newPassword.trim() || undefined,
      })
      .then(() => {
        setOpen(true);
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
            error={!!passwordError}
            helperText={passwordError}
            label="Password"
            variant="outlined"
            onSubmit={onFormSubmit}
            {...textFieldBind(password, setPassword)}
          />
          <TextField
            error={!!newPasswordError}
            helperText={newPasswordError}
            label="New password"
            variant="outlined"
            onSubmit={onFormSubmit}
            {...textFieldBind(newPassword, setNewPassword)}
          />
        </Box>
        <SubmitButton ref={submitBtn} />
        <Popover
          sx={{ mt: "2px" }}
          open={open}
          onClose={() => setOpen(!open)}
          anchorEl={submitBtn.current}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography
            sx={{ p: 2, color: (theme) => theme.palette.success.main }}
          >
            Success!
          </Typography>
        </Popover>
      </Box>
        <Box sx={{mt: 4}}><TimeLimit/></Box>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Want to logout?
      </Typography>
      <Button sx={{ mt: 2 }} variant="outlined" color="error" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
}
