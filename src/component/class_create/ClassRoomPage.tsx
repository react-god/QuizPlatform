import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { observer } from "mobx-react";
import { user1 } from "../../mockup_data/user";
import { classRoomStore } from "../../store/ClassRoomStore";
import { ClassRoom } from "../../mockup_data/classroom";
import QuizRoomComponent from "./QuizRoomComponent";
import "../../css/sidebar.css";
import React from "react";
import { NavRail, NavRailItem } from "../NavRail";

const ClassRoomPage = () => {
  const [newRoomName, setNewRoomName] = useState<String>("");
  const [newRoomOwner, setNewRoomOwner] = useState<String>("");
  const [open, setOpen] = React.useState(false);

  const onAddClick = () => {
    classRoomStore.addClassRoom(newRoomName, user1.name);
    setNewRoomName("");
  };

  const onRemoveClick = (classRoom: ClassRoom) => {
    classRoomStore.removeClassRoom(classRoom.id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    classRoomStore.addClassRoom(newRoomName, newRoomOwner);
    setNewRoomName("");
    setNewRoomOwner("");
  };

  return (
    <Stack direction="row" height="100%">
      <NavRail
        items={[
          ...classRoomStore.rooms.map((item, index) => {
            return (
              <NavRailItem
                key={item.id as string}
                label={item.name[0]}
                color={
                  classRoomStore.currentItemIndex === index
                    ? "secondary"
                    : "inherit"
                }
                isSelected={classRoomStore.currentItemIndex === index}
                onClick={() => (classRoomStore.currentItemIndex = index)}
              />
            );
          }),
        ]}
        trailingItem={
          <Button
            variant="contained"
            style={{ margin: "8px" }}
            onClick={handleClickOpen}
          >
            <Typography variant="button">추가</Typography>
          </Button>
        }
      />
      <Stack
        direction="column"
        width="100%"
        height="100%"
        sx={{
          paddingLeft: "80px",
          paddingRight: "80px",
          marginLeft: "120px",
          marginRight: "120px",
        }}
      >
        <Typography variant="h2" sx={{ display: "flex" }}>
          <p style={{ flexGrow: 1 }}>
            {classRoomStore.rooms[classRoomStore.currentItemIndex].name}
          </p>
          <Button
            variant="contained"
            style={{ maxHeight: "36px", margin: "auto" }}
          >
            <Typography variant="button">퀴즈 만들기</Typography>
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>클래스 생성</DialogTitle>
            <DialogContent>
              <DialogContentText>
                추가할 클래스 정보을 입력하세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="클래스 명"
                type="email"
                fullWidth
                variant="standard"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="클래스 제작자"
                type="email"
                fullWidth
                variant="standard"
                value={newRoomOwner}
                onChange={(e) => setNewRoomOwner(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>취소</Button>
              <Button onClick={handleSave}>저장</Button>
            </DialogActions>
          </Dialog>
        </Typography>
        <br />
        <Grid container spacing={2}>
          <QuizRoomComponent
            room={classRoomStore.rooms[classRoomStore.currentItemIndex]}
          ></QuizRoomComponent>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default observer(ClassRoomPage);
