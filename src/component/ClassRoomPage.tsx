import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { observer } from "mobx-react";
import { user1 } from "../mockup_data/user";
import { classRoomStore } from "../store/ClassRoomStore";
import { ClassRoom } from "../mockup_data/classroom";
import QuizRoomComponent from "../component/QuizRoomComponent";
import "../css/sidebar.css";
import React from "react";

interface NavRailItemProps {
  number: number;
  name: string;
  highlighted: boolean;
  isCurrentItem: boolean;
  onClick: () => void;
}

const NavRailItem = (props: NavRailItemProps) => {
  const theme = useTheme();

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
      color={props.highlighted ? "secondary" : "inherit"}
      onClick={() => props.onClick()}
    >
      <Typography
        variant="button"
        fontWeight={props.isCurrentItem ? "900" : "400"}
      >
        {props.name[0]}
      </Typography>
    </Button>
  );
};

interface NavRailProps {
  items: Array<ClassRoom>;
  currentItemIndex: number;
  onItemClick: (index: number) => void;
}

const NavRail = (props: NavRailProps) => {
  const theme = useTheme();

  return (
    <List
      style={{
        backgroundColor: theme.palette.grey[100],
        paddingTop: "8px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        {/* TODO(민성): 뒤로가기 버튼 만들기 */}
        <Stack
          id="noneScrollBar"
          direction="column"
          alignItems="center"
          style={{ overflowY: "scroll" }}
        >
          {props.items.map((item, index) => {
            return (
              <NavRailItem
                key={item.id as string}
                number={index + 1}
                name={item.name as string}
                highlighted={props.currentItemIndex === index}
                isCurrentItem={props.currentItemIndex === index}
                onClick={() => props.onItemClick(index)}
              />
            );
          })}
        </Stack>
      </Stack>
    </List>
  );
};

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
        items={classRoomStore.rooms}
        currentItemIndex={classRoomStore.currentItemIndex}
        onItemClick={(index) => (classRoomStore.currentItemIndex = index)}
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
          <Button onClick={handleClickOpen}>퀴즈 만들기</Button>
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
