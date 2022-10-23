import { RadioGroup } from "@mui/material";
import "../css/sidebar.css";
import SidebarLink from "./SidebarLink";

const btnChange = (event: any) => {
  event.target.backgroundColor = "#0DFFC5";
  console.log("change");
  console.log((event.target.parentNode.parentNode.backgroundColor = "#0DFFC5"));
};

const ClassRoomSideBar = ({ data }: any) => {
  return (
    <div className="sidebar">
      {/* <RadioGroup
        defaultValue={data.rooms[0].name}
        name="radio-buttons-group"
        aria-labelledby="demo-radio-buttons-group-label"
        onChange={btnChange}
      > */}
      {data.rooms.map((room: any) => {
        return <SidebarLink key={room.id} text={room.name}></SidebarLink>;
      })}
      {/* </RadioGroup> */}
    </div>
  );
};

export default ClassRoomSideBar;
