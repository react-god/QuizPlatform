import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2f50ff",
    },
    secondary: {
      main: "#00c795",
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    // 스피드 다이얼 펴쳤을 때 라벨 한 줄로 보이게 설정
    MuiSpeedDialAction: {
      styleOverrides: {
        staticTooltipLabel: {
          width: "max-content",
        },
      },
    },
  },
});
