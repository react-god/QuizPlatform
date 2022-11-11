import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../logo.svg";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <header>
          <Box>
            <Typography variant="h6" sx={{ m: 2 }}>
              <img src={logo} alt="logo" width={34} height={34} />
              React-God
            </Typography>
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
                <Button
                  fullWidth
                  variant="contained"
                  style={{ marginTop: "24px" }}
                >
                  Create account
                </Button>
              </form>
              <hr />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="text">
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
