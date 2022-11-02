import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

interface NavRailItemProps {
  label: String;
  color:
    | "inherit"
    | "secondary"
    | "primary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  isSelected: boolean;
  onClick: () => void;
}

const NavRailItem = (props: NavRailItemProps) => {
  return (
    <Button
      variant="contained"
      style={{
        marginTop: "4px",
        marginBottom: "4px",
        marginLeft: "12px",
        marginRight: "12px",
      }}
      disableElevation={true}
      color={props.color}
      onClick={() => props.onClick()}
    >
      <Typography
        variant={props.isSelected ? "h6" : "button"}
        fontWeight={props.isSelected ? "900" : "400"}
      >
        <div style={{ height: "24px", alignItems: "center", display: "flex" }}>
          {props.label}
        </div>
      </Typography>
    </Button>
  );
};

interface NavRailProps {
  items: Array<JSX.Element>;
  trailingItem?: JSX.Element;
  /**
   * 콜백 함수를 전달하는 경우 뒤로 가기 버튼을 보인다.
   */
  onBackClick?: () => void;
}

const NavRail = (props: NavRailProps) => {
  const theme = useTheme();

  return (
    <Stack
      style={{
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        <Stack
          id="noneScrollBar"
          direction="column"
          alignItems="center"
          style={{ overflowY: "scroll", paddingTop: "8px" }}
        >
          <IconButton
            onClick={() => props.onBackClick?.()}
            style={{
              marginLeft: "12px",
              marginRight: "12px",
              marginTop: "8px",
              marginBottom: "12px",
            }}
          >
            <ArrowBack />
          </IconButton>
          {props.items.map((item) => {
            return <>{item}</>;
          })}
        </Stack>
        {props.trailingItem}
      </Stack>
    </Stack>
  );
};

export { NavRail, NavRailItem };
