import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import React from "react";

declare module "@mui/material/styles" {
  interface Palette {
    card: Palette["primary"];
  }
  interface PaletteOptions {
    card: PaletteOptions["primary"];
  }
}

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
          card: {
            main: "#efefef",
            light: "#dddddd",
          },
          error: {
            main: "#ff0000",
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
          card: {
            main: "#323232",
            light: "#484848",
          },
          error: {
            main: "#ff7777",
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
