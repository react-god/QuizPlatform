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
} from "@mui/material";
import { useState } from "react";
import { observer } from "mobx-react";
import { classRoomStore } from "../../store/ClassRoomStore";
import QuizRoomComponent from "./QuizRoomComponent";
import "../../css/sidebar.css";
import React from "react";
import { NavRail, NavRailItem } from "../NavRail";

const ClassRoomPage = () => {
  const [newRoomName, setNewRoomName] = useState<String>("");
  const [newRoomOwner, setNewRoomOwner] = useState<String>("");
  const [openCreateClass, setOpenCreateClass] = React.useState(false);

  const [newQuizName, setNewQuizName] = useState<String>("");
  const [openCreateQuiz, setOpenCreateQuiz] = React.useState(false);

  // const onRemoveClick = (classRoom: ClassRoom) => {
  //   classRoomStore.removeClassRoom(classRoom.id);
  // };

  const CreateClassButtonClickOpen = () => {
    setOpenCreateClass(true);
  };

  const CreateClassButtonClickClose = () => {
    setOpenCreateClass(false);
  };

  const CreateQuizButtonClickOpen = () => {
    setOpenCreateQuiz(true);
  };

  const CreateQuizButtonClickClose = () => {
    setOpenCreateQuiz(false);
  };

  const addClassRoom = () => {
    setOpenCreateClass(false);
    classRoomStore.addClassRoom(newRoomName, newRoomOwner);
    setNewRoomName("");
    setNewRoomOwner("");
  };

  const addQuiz = () => {
    setOpenCreateQuiz(false);
    // classRoomStore.addClassRoom(newRoomName, newRoomOwner);
    setNewQuizName("");
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
            onClick={CreateClassButtonClickOpen}
          >
            <Typography variant="button">추가</Typography>
          </Button>
        }
      />
      <Dialog open={openCreateClass} onClose={CreateClassButtonClickClose}>
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
          <Button onClick={CreateClassButtonClickClose}>취소</Button>
          <Button onClick={addClassRoom}>저장</Button>
        </DialogActions>
      </Dialog>
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
            onClick={() => CreateQuizButtonClickOpen()}
          >
            <Typography variant="button">퀴즈 만들기</Typography>
          </Button>
          <Dialog open={openCreateQuiz} onClose={CreateQuizButtonClickClose}>
            <DialogTitle>퀴즈 생성</DialogTitle>
            <DialogContent>
              <DialogContentText>
                추가할 퀴즈 정보을 입력하세요.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="퀴즈 명"
                type="text"
                fullWidth
                variant="standard"
                value={newQuizName}
                onChange={(e) => setNewQuizName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={CreateQuizButtonClickClose}>취소</Button>
              <Button onClick={addQuiz}>저장</Button>
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
