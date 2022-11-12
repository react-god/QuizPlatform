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

const SignUp = (email: string, password: string, name: string) => {
  try {
    var user = userStore.signUp(email, password, name);
    if (user !== null) {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/";
    }
  } catch (e: any) {
    alert(e.message);
  }
};

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
                  required
                  fullWidth
                  id="standard-email-input"
                  label="Email"
                  type="email"
                  variant="standard"
                  margin="dense"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <TextField
                  required
                  fullWidth
                  id="standard-password-input"
                  label="Password"
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
                  label="Name"
                  type="text"
                  variant="standard"
                  margin="dense"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  style={{ marginTop: "24px" }}
                  onClick={() => SignUp(email, password, name)}
                >
                  Create account
                </Button>
              </form>
              <hr />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="text"
                  onClick={() => (window.location.href = "/")}
                >
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
