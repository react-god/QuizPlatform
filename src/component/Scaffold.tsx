import { Stack, useMediaQuery } from "@mui/material";
import React from "react";

interface ScaffoldProps {
  navRail?: JSX.Element;
  appBar?: JSX.Element;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Scaffold = (props: ScaffoldProps) => {
  let pageHorizontalPadding: string;

  const isMobile = useMediaQuery(`(max-width: 780px)`);
  const isTablet = useMediaQuery(`(max-width: 960px)`);
  const isTablet2 = useMediaQuery(`(max-width: 1200px)`);

  if (isMobile) {
    pageHorizontalPadding = "40px";
  } else if (isTablet) {
    pageHorizontalPadding = "120px";
  } else if (isTablet2) {
    pageHorizontalPadding = "180px";
  } else {
    pageHorizontalPadding = "240px";
  }

  return (
    <Stack direction="row" style={{ height: "100%" }}>
      {props.navRail}
      <Stack direction="column" width="100%">
        {props.appBar}
        <Stack
          direction="column"
          style={{
            paddingLeft: pageHorizontalPadding,
            paddingRight: pageHorizontalPadding,
            paddingTop: "80px",
            paddingBottom: "80px",
            overflowY: "scroll",
            ...props.style,
          }}
        >
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Scaffold;
