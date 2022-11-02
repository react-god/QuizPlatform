import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import ClassRoomPage from "./component/ClassRoomPage";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import App from "./App";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLFormElement
);
root.render(
  <React.StrictMode>
      {/* TODO(민성): App으로 수정하기. CRUD 테스트를 위해 임시로 ClassRoomPage를 루트 페이지로 보이게 했습니다. */}
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
