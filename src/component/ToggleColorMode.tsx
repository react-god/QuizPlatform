import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import React from "react";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

interface Prop {
  children: React.ReactElement;
}

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#2f50ff",
          },
          secondary: {
            main: "#00c795",
          },
          background: {
            default: "#ffffff",
          },
        }
      : {
          primary: {
            main: "#6fa0ff",
          },
          secondary: {
            main: "#30d795",
          },
          background: {
            default: "#242424",
          },
        }),
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

export const ToggleColorMode = (props: Prop) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline>{props.children}</CssBaseline>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
