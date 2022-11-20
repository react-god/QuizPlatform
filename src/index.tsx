import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ClassRoomPage from "./view/home/ClassRoomPage";
import LoginPage from "./view/login/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizCreatePage from "./view/quiz_create/QuizCreatePage";
import QuizStaticsPage from "./view/quiz_statics/QuizStaticsPage";
import SignUpPage from "./view/sign_up/SignUpPage";
import PrivateRoute from "./component/PrivateRoute";
import TakingQuizPage from "./view/taking_quiz/TakingQuiz";
import QuizReviewPage from "./view/quiz_review/QuizReviewPage";
import { ToggleColorMode } from "./component/ToggleColorMode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ToggleColorMode>
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
            <Route path="/take-quiz/:quizId" element={<TakingQuizPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/review/:quizId" element={<QuizReviewPage />} />
          </Route>
        </Routes>
      </ToggleColorMode>
    </React.StrictMode>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
