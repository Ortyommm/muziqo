import { Box, Container, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from "react";
import { textFieldBind } from "@/utils/input";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { isEmail } from "@/utils/validators";
import { api } from "@/utils/api";
import useRegisterOrLogin from "@/hooks/registerOrLogin";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [tempPasswordError, setTempPasswordError] = useState("");

  const [isPasswordSent, setIsPasswordSent] = useState(false);

  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const registerOrLogin = useRegisterOrLogin();
  function onEmailSubmit(event: FormEvent) {
    event.preventDefault();

    if (!isPasswordSent) {
      if (!isEmail(email)) {
        setEmailError("Email is not valid");
        return;
      }

      api.post("auth/request-reset-password", { email }).then((response) => {
        setIsPasswordSent(true);
      });
    } else {
      api
        .post("auth/try-reset-password", { email, tempPassword, newPassword })
        .then(() => {
          registerOrLogin(false, { email, password: newPassword });
        });
      // .then((response) => api.login);
    }
  }

  return (
    <Container>
      <Typography variant="h2">Reset password</Typography>
      <Box
        component="form"
        sx={{
          mt: 1,
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        autoComplete="off"
        onSubmit={onEmailSubmit}
      >
        <TextField
          error={!!emailError}
          helperText={emailError}
          id="email"
          label="Email"
          variant="outlined"
          {...textFieldBind(email, setEmail)}
          required
        />
        {isPasswordSent && (
          <>
            <TextField
              error={!!tempPasswordError}
              helperText={tempPasswordError}
              id="tempPassword"
              label="Temp password from email"
              variant="outlined"
              {...textFieldBind(tempPassword, setTempPassword)}
              required
            />
            <TextField
              id="newPassword"
              label="New password"
              variant="outlined"
              {...textFieldBind(newPassword, setNewPassword)}
              required
            />
          </>
        )}
        <Box sx={{ m: 1 }}>
          <SubmitButton />
        </Box>
      </Box>
    </Container>
  );
}
