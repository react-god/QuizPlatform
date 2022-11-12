import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ClassRoomPage from "./component/class_create/ClassRoomPage";
import LoginPage from "./component/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./fonts.css";
import QuizCreatePage from "./component/quiz_create/QuizCreatePage";
import QuizStaticsPage from "./component/quiz_statics/QuizStaticsPage";
import SignUpPage from "./component/SignUpPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/classroom" element={<ClassRoomPage />} />
          <Route path="/create-quiz" element={<QuizCreatePage />} />
          <Route path="/statics/:quizId" element={<QuizStaticsPage />} />
          {/* <Redirect from="/" to="/index" /> */}
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
