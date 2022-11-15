import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

export interface Action {
  icon: JSX.Element;
  name: String;
  action: () => void;
}

export default function SpeedDialTooltipOpen(props: {
  menu: Array<Action>;
  main: JSX.Element;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (action: Action) => {
    console.log(action);
    action.action();
    handleClose();
  };

  return (
    <Box sx={{ height: "100%", transform: "translateZ(0px)", flexGrow: 1 }}>
      {props.main}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 16, right: 32 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {[
          ...props.menu.map((action: Action) => (
            <SpeedDialAction
              key={action.name as string}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleClick(action)}
            />
          )),
        ]}
      </SpeedDial>
    </Box>
  );
}
