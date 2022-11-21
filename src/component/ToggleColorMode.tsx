import {
  createTheme,
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

const getDesignTokens = (mode: PaletteMode) => ({
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
        }
      : {
          primary: {
            main: "#2f50ff",
          },
          secondary: {
            main: "#00c795",
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
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
