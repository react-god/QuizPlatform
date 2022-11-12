import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo } from "react";

function LoginPage() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const isMobile = useMediaQuery(`(max-width: 780px)`);
  const isTablet = useMediaQuery(`(max-width: 960px)`);

  const isEmailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  const showEmailError = useMemo(
    () => email.length > 0 && !isEmailValid,
    [email]
  );

  const enableLoginButton = useMemo(
    () => isEmailValid && password.length > 0,
    [email, password]
  );

  let horizontalPadding: string;
  if (isMobile) {
    horizontalPadding = "40px";
  } else if (isTablet) {
    horizontalPadding = "220px";
  } else {
    horizontalPadding = "340px";
  }

  const onEmailChange = (email: string) => {
    setEmail(email);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  const onSignInButtonClick = () => {};

  const onSignUpButtonClick = () => {};

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{ height: "80%" }}
    >
      <Typography
        align="center"
        variant="h1"
        color="secondary"
        style={{ fontFamily: "LuckiestGuy" }}
      >
        QUIZ<br></br>PLATFORM
      </Typography>
      <Stack
        style={{
          minWidth: "440px",
          marginLeft: horizontalPadding,
          marginRight: horizontalPadding,
        }}
      >
        <TextField
          placeholder="abc@gmail.com"
          label="이메일"
          type="email"
          error={showEmailError}
          helperText={showEmailError ? "이메일 형식이 아니에요." : undefined}
          onChange={(e) => onEmailChange(e.target.value)}
          value={email}
          style={{
            marginTop: "24px",
          }}
        ></TextField>
        <TextField
          label="비밀번호"
          type="password"
          onChange={(e) => onPasswordChange(e.target.value)}
          style={{
            marginTop: "24px",
            marginBottom: "24px",
          }}
          value={password}
        ></TextField>
        <Button
          variant="contained"
          disabled={!enableLoginButton}
          onClick={() => onSignInButtonClick()}
          style={{
            marginBottom: "12px",
            minHeight: "48px",
          }}
        >
          로그인
        </Button>
        <Button onClick={() => onSignUpButtonClick()}>
          회원이 아니신가요? 계정 생성
        </Button>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
