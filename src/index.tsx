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
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./assets/css/bootstrap.min.css"
import "./assets/css/login-register.css"
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/bootstrap.min.css";
import "./assets/css/login-register.css";
import QuizCreatePage from "./component/quiz_create/QuizCreatePage";
>>>>>>> 0f6dd2c3d77c98ccc6e1f9340e2208274c3bdec9

>>>>>>> d75817ea3f4691c76762e809b6251c1623285ab3
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
<<<<<<< HEAD
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
      {/* TODO(민성): App으로 수정하기. CRUD 테스트를 위해 임시로 ClassRoomPage를 루트 페이지로 보이게 했습니다. */}
  </React.StrictMode>
=======
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/classroom" element={<ClassRoomPage />} />
          <Route path="/create-quiz" element={<QuizCreatePage />} />
          {/* <Redirect from="/" to="/index" /> */}
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
>>>>>>> d75817ea3f4691c76762e809b6251c1623285ab3
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
