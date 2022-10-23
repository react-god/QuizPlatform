import {
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import "../css/sidebarLink.css";

const SidebarLink = ({ text }: any) => {
  return (
    <div className="link">
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        {text[0]}
      </Typography>
      {/* <FormControlLabel
        value={text}
        control={
          <Radio
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 0,
              },
            }}
          />
        }
        label={text[0]}
        sx={{
          width: 48,
          height: 48,
          borderColor: "#C0C0C0",
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 5,
          margin: 1,
          backgroundColor: "#C0C0C0",
        }}
      ></FormControlLabel> */}
    </div>
  );
};

export default SidebarLink;
