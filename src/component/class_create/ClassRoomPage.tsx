import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { classRoomStore } from "../../store/ClassRoomStore";
import QuizRoomComponent from "./QuizRoomComponent";
import "../../css/sidebar.css";
import { NavRail, NavRailItem } from "../NavRail";
import Scaffold from "../Scaffold";
import { Stack } from "@mui/system";
import userStore from "../../store/UserStore";
import { ClassRoom } from "../../mockup_data/classroom";
import { useLocation, useNavigate } from "react-router-dom";
import useSnackBarMessage from "../../util/SnackBarMessage";

interface CreateClassRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onClickCreate: (roomName: String) => void;
}

const CreateClassRoomDialog = (props: CreateClassRoomDialogProps) => {
  const [newRoomName, setNewRoomName] = useState<String>("");

  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>클래스 생성</DialogTitle>
      <DialogContent>
        <DialogContentText>추가할 클래스 정보을 입력하세요.</DialogContentText>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>취소</Button>
        <Button
          onClick={() => {
            props.onClickCreate(newRoomName);
            setNewRoomName("");
          }}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface CreateQuizDialogProps {
  open: boolean;
  onClose: () => void;
  onClickCreate: (roomName: String) => void;
}

const CreateQuizDialog = (props: CreateQuizDialogProps) => {
  const [newQuizName, setNewQuizName] = useState<String>("");

  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>퀴즈 생성</DialogTitle>
      <DialogContent>
        <DialogContentText>추가할 퀴즈 정보을 입력하세요.</DialogContentText>
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
        <Button onClick={() => props.onClose()}>취소</Button>
        <Button
          onClick={() => {
            props.onClickCreate(newQuizName);
            setNewQuizName("");
          }}
        >
          만들기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface AddClassRoomCodeDialog {
  open: boolean;
  onClose: () => void;
  onClickAdd: (classRoomCode: String) => void;
}

const AddClassRoomByCodeDialog = (props: AddClassRoomCodeDialog) => {
  const [code, setCode] = useState<String>("");

  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>클래스룸 코드 입력</DialogTitle>
      <DialogContent>
        <DialogContentText>
          추가할 클래스룸의 코드를 입력하세요.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="코드 입력"
          type="text"
          fullWidth
          variant="standard"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>취소</Button>
        <Button
          onClick={() => {
            props.onClickAdd(code);
            setCode("");
          }}
        >
          추가
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ClassRoomPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const invitedRooms = classRoomStore.invitedRooms;
  const currentRoom: ClassRoom | undefined =
    invitedRooms.length === 0
      ? undefined
      : invitedRooms[classRoomStore.currentTabIndex];

  const [openCreateClassRoomDialog, setOpenCreateClassRoomDialog] =
    useState(false);
  const [openCreateQuizDialog, setOpenCreateQuizDialog] = useState(false);
  const [openRoomCodeDialog, setOpenRoomCodeDialog] = useState(false);

  const [snackBarMessage, showSnackBar] = useSnackBarMessage();

  useEffect(() => {
    classRoomStore.fetchClassRooms();
  }, []);

  useEffect(() => {
    if (state !== null && "snackBarMessage" in state) {
      showSnackBar(state.snackBarMessage);
      window.history.replaceState({}, document.title);
    }
  }, [showSnackBar, state]);

  const createClassRoom = (roomName: String) => {
    setOpenCreateClassRoomDialog(false);
    classRoomStore.createClassRoom(roomName);
  };

  const createQuiz = (quizName: String) => {
    setOpenCreateQuizDialog(false);
    navigate("/create-quiz", {
      state: { quizName: quizName, classRoomId: currentRoom!.id },
    });
  };

  const joinClassRoom = (code: String) => {
    setOpenRoomCodeDialog(false);
    try {
      userStore.joinClassRoom(code);
    } catch (e) {
      if (e instanceof Error) {
        showSnackBar(e.message);
      }
    }
  };

  return (
    <Scaffold
      navRail={
        <NavRail
          items={[
            ...invitedRooms.map((item, index) => {
              return (
                <NavRailItem
                  key={item.id as string}
                  label={item.name[0]}
                  color={
                    classRoomStore.currentTabIndex === index
                      ? "secondary"
                      : "inherit"
                  }
                  isSelected={classRoomStore.currentTabIndex === index}
                  onClick={() => (classRoomStore.currentTabIndex = index)}
                />
              );
            }),
          ]}
          trailingItem={
            <Stack>
              <Button
                variant="outlined"
                style={{ margin: "8px", minWidth: "80px" }}
                onClick={() => setOpenRoomCodeDialog(true)}
              >
                <Typography variant="button">
                  코드<br></br>입력
                </Typography>
              </Button>
              <Button
                variant="contained"
                style={{ margin: "8px", minWidth: "80px" }}
                onClick={() => setOpenCreateClassRoomDialog(true)}
              >
                <Typography variant="button">
                  클래스<br></br>생성
                </Typography>
              </Button>
            </Stack>
          }
        />
      }
    >
      <CreateClassRoomDialog
        open={openCreateClassRoomDialog}
        onClose={() => setOpenCreateClassRoomDialog(false)}
        onClickCreate={(roomName) => createClassRoom(roomName)}
      />
      <CreateQuizDialog
        open={openCreateQuizDialog}
        onClose={() => setOpenCreateQuizDialog(false)}
        onClickCreate={(quizName) => createQuiz(quizName)}
      />
      <AddClassRoomByCodeDialog
        open={openRoomCodeDialog}
        onClose={() => setOpenRoomCodeDialog(false)}
        onClickAdd={(classRoomCode) => joinClassRoom(classRoomCode)}
      />
      <Snackbar
        open={snackBarMessage.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        message={snackBarMessage.data}
      />

      {!currentRoom ? (
        <>
          <Typography variant="h4">아직 참여한 클래스가 없습니다.</Typography>
          <br></br>
          <Typography variant="body1">
            클래스 코드를 추가하거나 클래스를 생성해보세요.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h2" sx={{ display: "flex" }}>
            <p style={{ flexGrow: 1 }}>{currentRoom.name}</p>
            <Button
              variant="contained"
              style={{ maxHeight: "36px", margin: "auto" }}
              onClick={() => setOpenCreateQuizDialog(true)}
            >
              <Typography variant="button">퀴즈 만들기</Typography>
            </Button>
          </Typography>

          <br />
          <Grid container spacing={2}>
            {currentRoom === undefined ? (
              "텅"
            ) : (
              <QuizRoomComponent
                quizs={currentRoom.quizs}
                ownerName={userStore.getUserById(currentRoom.ownerId)!.name}
              ></QuizRoomComponent>
            )}
          </Grid>
        </>
      )}
    </Scaffold>
  );
};

export default observer(ClassRoomPage);
