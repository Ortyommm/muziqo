import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import cl from "./AuthPage.module.scss";
import { textFieldBind } from "../../utils/bind";
import { isEmail } from "../../utils/validators";
import { api } from "../../utils/api";
import { AxiosResponse } from "axios";
import { setToken } from "../../store/modules/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IAuthPayload, IAuthResponseData } from "../../types/AuthTypes";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) {
      setEmailError("Email is not valid");
      return;
    }
    setEmailError("");
    if (isRegister && password.trim() !== repeatPassword.trim()) {
      setRepeatPasswordError("Passwords are not the same");
      return;
    }
    setRepeatPasswordError("");
    const data: IAuthPayload = { email, password };
    if (isRegister) data.name = name;

    api
      .post(`auth/${isRegister ? "register" : "login"}`, data)
      .then((res: AxiosResponse<IAuthResponseData>) => {
        dispatch(setToken(res.data.token));
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message;
        if (errorMessage === "email_already_exists") {
          setEmailError("User with this email already exists");
        }
        //TODO login error incorrect
      });
  }

  return (
    <Container>
      <Typography variant="h3" gutterBottom className={cl.typography__wrapper}>
        <Box
          component="span"
          sx={
            !isRegister
              ? { color: (theme) => theme.palette.text.secondary }
              : {}
          }
          className={cl.typography__item}
          onClick={() => setIsRegister(true)}
        >
          Register
        </Box>{" "}
        /{" "}
        <Box
          component="span"
          sx={
            isRegister ? { color: (theme) => theme.palette.text.secondary } : {}
          }
          className={cl.typography__item}
          onClick={() => setIsRegister(false)}
        >
          Login
        </Box>
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        {isRegister && (
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            {...textFieldBind(name, setName)}
            required
          />
        )}
        <TextField
          error={!!emailError}
          helperText={emailError}
          id="email"
          label="Email"
          variant="outlined"
          {...textFieldBind(email, setEmail)}
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          {...textFieldBind(password, setPassword)}
          required
        />
        {isRegister && (
          <TextField
            error={!!repeatPasswordError}
            helperText={repeatPasswordError}
            id="password-repeat"
            label="Repeat Password"
            variant="outlined"
            type="password"
            {...textFieldBind(repeatPassword, setRepeatPassword)}
            required
          />
        )}
        <Button sx={{ m: 1 }} variant="outlined" type="submit">
          {isRegister ? "Register" : "Login"}
        </Button>
      </Box>
    </Container>
  );
}
