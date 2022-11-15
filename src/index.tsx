import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ClassRoomPage from "./component/class_create/ClassRoomPage";
import LoginPage from "./component/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
<<<<<<< HEAD
<<<<<<< HEAD
import App from "./App";
=======
=======
>>>>>>> 038e5d17b2526acca42ed3a48095663b4b6662a1
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuizCreatePage from "./component/quiz_create/QuizCreatePage";
import QuizStaticsPage from "./component/quiz_statics/QuizStaticsPage";
import SignUpPage from "./component/SignUpPage";
import PrivateRoute from "./component/PrivateRoute";
import TakingQuiz from "./component/taking_quiz/TakingQuiz";
import QuizReviewPage from "./component/quiz_review/QuizReviewPage";

<<<<<<< HEAD
>>>>>>> 0f6dd2c3d77c98ccc6e1f9340e2208274c3bdec9
=======
>>>>>>> 038e5d17b2526acca42ed3a48095663b4b6662a1
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
<<<<<<< HEAD
<<<<<<< HEAD
  <React.StrictMode>
      {/* TODO(민성): App으로 수정하기. CRUD 테스트를 위해 임시로 ClassRoomPage를 루트 페이지로 보이게 했습니다. */}
      <App />
  </React.StrictMode>
=======
=======
>>>>>>> 038e5d17b2526acca42ed3a48095663b4b6662a1
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
<<<<<<< HEAD
>>>>>>> 0f6dd2c3d77c98ccc6e1f9340e2208274c3bdec9
=======
>>>>>>> 038e5d17b2526acca42ed3a48095663b4b6662a1
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
