import { Button, TextField } from "@mui/material";
import { Key, useState } from "react";
import { observer } from "mobx-react";
import { user1 } from "../mockup_data/user";
import { classRoomStore } from "../store/ClassRoomStore";
import { ClassRoom } from "../mockup_data/classroom";

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
      <TextField
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
      ></TextField>
      <Button onClick={onAddClick}>추가</Button>
      {classRoomStore.rooms.map((room) => {
        return (
          <div key={room.id as Key}>
            {room.name}
            <Button onClick={() => onRemoveClick(room)}>삭제</Button>
          </div>
        );
      })}
    </div>
  );
};

export default observer(ClassRoomPage);
