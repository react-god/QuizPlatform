import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ClassRoomPage from "./component/class_create/ClassRoomPage";
import LoginPage from "./component/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizCreatePage from "./component/quiz_create/QuizCreatePage";
import QuizStaticsPage from "./component/quiz_statics/QuizStaticsPage";
import SignUpPage from "./component/SignUpPage";
import PrivateRoute from "./component/PrivateRoute";
import TakingQuiz from "./component/taking_quiz/TakingQuiz";
import QuizReviewPage from "./component/quiz_review/QuizReviewPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ClassRoomPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/create-quiz" element={<QuizCreatePage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/statics/:quizId" element={<QuizStaticsPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/take-quiz/:quizId" element={<TakingQuiz />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/review/:quizId" element={<QuizReviewPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();