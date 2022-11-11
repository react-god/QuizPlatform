import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2f50ff",
    },
    secondary: {
      main: "#00c795",
    },
    success: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 20,
  },
});
