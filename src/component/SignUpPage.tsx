import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../logo.svg";
import userStore from "../store/UserStore";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [signUpButton, setSignUpButton] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  function checkValidEmail(email: string) {
    if (/\S+@\S+\.\S+/.test(email)) {
      setError(undefined);
      setEmail(email);
      setSignUpButton("");
      return true;
    } else {
      setError("이메일 형식이 틀렸습니다.");
      setEmail(email);
      setSignUpButton(undefined);
      return false;
    }
  }

  const signUp = (email: string, password: string, name: string) => {
    if (!checkValidEmail(email)) return;

    try {
      var user = userStore.signUp(email, password, name);
      if (user !== null) {
        alert("회원가입이 완료되었습니다.");
        navigate(`/`);
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <>
      <div>
        <header>
          <Box>
            <Typography variant="h6" sx={{ m: 2 }}>
              <img src={logo} alt="logo" width={34} height={34} />
              React-God
            </Typography>
            <Divider />
          </Box>
        </header>
        <main>
          <Container maxWidth="sm" style={{ paddingTop: "80px" }}>
            <h4>계정을 생성하세요.</h4>
            <Paper variant="outlined" style={{ padding: "12px" }}>
              <form>
                <TextField
                  error={error !== undefined}
                  required
                  fullWidth
                  id="standard-email-input"
                  label="이메일"
                  type="email"
                  variant="standard"
                  margin="dense"
                  value={email}
                  onChange={(e) => checkValidEmail(e.target.value)}
                  helperText={error}
                />
                <br />
                <TextField
                  required
                  fullWidth
                  id="standard-password-input"
                  label="비밀번호"
                  type="password"
                  autoComplete="current-password"
                  variant="standard"
                  margin="dense"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <TextField
                  required
                  fullWidth
                  id="standard-name-input"
                  label="이름"
                  type="text"
                  variant="standard"
                  margin="dense"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Button
                  fullWidth
                  disabled={signUpButton === undefined}
                  variant="contained"
                  style={{ marginTop: "24px" }}
                  onClick={() => signUp(email, password, name)}
                >
                  계정 생성 하기
                </Button>
              </form>
              <hr />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text" onClick={() => navigate(`/`)}>
                  이미 계정이 있으신가요? 로그인 하기
                </Button>
              </div>
            </Paper>
          </Container>
        </main>
      </div>
    </>
  );
};
export default SignUpPage;
