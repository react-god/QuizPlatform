import { Box, Button, Grid, TextField } from "@mui/material";
import { Key, useState } from "react";
import { observer } from "mobx-react";
import { user1 } from "../mockup_data/user";
import { classRoomStore } from "../store/ClassRoomStore";
import { ClassRoom, room1 } from "../mockup_data/classroom";
import QuizRoomComponent from "../component/QuizRoomComponent";
import SidebarLink from "./SidebarLink";
import ClassRoomSideBar from "./ClassRoomSideBar";
import { maxWidth } from "@mui/system";
import MiniDrawer from "./drawerTemplate";

const ClassRoomPage = () => {
  const [newRoomName, setNewRoomName] = useState<String>("");

  const onAddClick = () => {
    classRoomStore.addClassRoom(newRoomName, user1.name);
    setNewRoomName("");
  };

  const onRemoveClick = (classRoom: ClassRoom) => {
    classRoomStore.removeClassRoom(classRoom.id);
  };

  return (
    <div className="App">
      <MiniDrawer></MiniDrawer>
      {/* <div>
        <ClassRoomSideBar data={classRoomStore}></ClassRoomSideBar>
      </div>
      <div style={{ display: "block", maxWidth: window.innerWidth - 130 }}>
        <Grid container spacing={2}>
          <QuizRoomComponent room={classRoomStore.rooms[0]}></QuizRoomComponent>
        </Grid>
      </div> */}
    </div>
  );
};

export default observer(ClassRoomPage);
