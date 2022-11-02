import { Stack, useMediaQuery } from "@mui/material";

interface ScaffoldProps {
  navRail: JSX.Element;
  children: React.ReactNode;
}

const Scaffold = (props: ScaffoldProps) => {
  let pageHorizontalPadding: string;

  const isMobile = useMediaQuery(`(max-width: 780px)`);
  const isTablet = useMediaQuery(`(max-width: 960px)`);

  if (isMobile) {
    pageHorizontalPadding = "40px";
  } else if (isTablet) {
    pageHorizontalPadding = "120px";
  } else {
    pageHorizontalPadding = "240px";
  }

  return (
    <Stack direction="row" style={{ height: "100%" }}>
      {props.navRail}
      <Stack
        direction="column"
        width="100%"
        style={{
          paddingLeft: pageHorizontalPadding,
          paddingRight: pageHorizontalPadding,
          paddingTop: "80px",
          paddingBottom: "80px",
          overflowY: "scroll",
        }}
      >
        {props.children}
      </Stack>
    </Stack>
  );
};

export default Scaffold;
