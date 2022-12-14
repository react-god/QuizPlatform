import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { classRoomStore } from "../../store/ClassRoomStore";
import QuizRoomComponent from "./QuizRoomComponent";
import "../../css/sidebar.css";
import { NavRail, NavRailItem } from "../../component/NavRail";
import Scaffold from "../../component/Scaffold";
import userStore from "../../store/UserStore";
import { ClassRoom } from "../../model/classroom";
import { useLocation, useNavigate } from "react-router-dom";
import useSnackBarMessage from "../../util/SnackBarMessage";
import SpeedDialTooltipOpen, { Action } from "../../component/SpeedDial";
import AddIcon from "@mui/icons-material/Add";
import InputIcon from "@mui/icons-material/Input";
import useCopyToClipboard from "../../util/CopyToClipboard";
import { Stack } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../../component/ToggleColorMode";

interface QuizPlatformAppBarProps {
  onLogoutClick: () => void;
}

const QuizPlatformAppBar = ({ onLogoutClick }: QuizPlatformAppBarProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const colorMode = React.useContext(ColorModeContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Toolbar>
        <div style={{ flexGrow: 1 }} />
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                onLogoutClick();
              }}
            >
              ????????????
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

interface CreateClassRoomDialogProps {
  open: boolean;
  onClose: () => void;
  onClickCreate: (roomName: String) => void;
}

const CreateClassRoomDialog = (props: CreateClassRoomDialogProps) => {
  const [newRoomName, setNewRoomName] = useState<String>("");

  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>????????? ??????</DialogTitle>
      <DialogContent>
        <DialogContentText>????????? ????????? ????????? ???????????????.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="????????? ???"
          type="email"
          fullWidth
          variant="standard"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>??????</Button>
        <Button
          onClick={() => {
            props.onClickCreate(newRoomName);
            setNewRoomName("");
          }}
        >
          ??????
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
      <DialogTitle>?????? ??????</DialogTitle>
      <DialogContent>
        <DialogContentText>????????? ?????? ????????? ???????????????.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="?????? ???"
          type="text"
          fullWidth
          variant="standard"
          value={newQuizName}
          onChange={(e) => setNewQuizName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>??????</Button>
        <Button
          onClick={() => {
            props.onClickCreate(newQuizName);
            setNewQuizName("");
          }}
        >
          ?????????
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
      <DialogTitle>???????????? ?????? ??????</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ????????? ??????????????? ????????? ???????????????.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="?????? ??????"
          type="text"
          fullWidth
          variant="standard"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>??????</Button>
        <Button
          onClick={() => {
            props.onClickAdd(code);
            setCode("");
          }}
        >
          ??????
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LogoutDialog = (props: any) => {
  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"???????????? ???????????????????"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => props.onClose()}>??????</Button>
        <Button onClick={() => props.onLogout()} color="error">
          ????????????
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CopyClassCode = (props: { roomId: string; onClick: () => void }) => {
  const code = props.roomId;

  return (
    <Stack alignContent="start" direction="row">
      <Button onClick={() => props.onClick()} style={{ marginBottom: "40px" }}>
        <Typography variant="caption">{code}</Typography>
      </Button>
    </Stack>
  );
};

const ClassRoomPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [, copyToClipboard] = useCopyToClipboard();
  const invitedRooms = classRoomStore.invitedRooms;
  const currentRoom: ClassRoom | undefined =
    invitedRooms.length === 0
      ? undefined
      : invitedRooms[classRoomStore.currentTabIndex];

  const isMine = currentRoom?.ownerId === userStore.currentUser?.id;
  const [openCreateClassRoomDialog, setOpenCreateClassRoomDialog] =
    useState(false);
  const [openCreateQuizDialog, setOpenCreateQuizDialog] = useState(false);
  const [openRoomCodeDialog, setOpenRoomCodeDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const [snackBarMessage, showSnackBar] = useSnackBarMessage();

  const actions: Array<Action> = [
    {
      icon: <AddIcon />,
      name: "????????? ??????",
      action: () => setOpenCreateClassRoomDialog(true),
    },
    {
      icon: <InputIcon />,
      name: "????????? ??? ?????? ??????",
      action: () => setOpenRoomCodeDialog(true),
    },
  ];

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

  const logout = () => {
    setOpenLogoutDialog(false);
    try {
      userStore.signOut();
      navigate("/login", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        showSnackBar(e.message);
      }
    }
  };

  const ClassroomPage = () => {
    return (
      <Scaffold
        style={{ paddingTop: "16px" }}
        appBar={
          <QuizPlatformAppBar onLogoutClick={() => setOpenLogoutDialog(true)} />
        }
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
        <LogoutDialog
          open={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
          onLogout={() => logout()}
        />
        <Snackbar
          open={snackBarMessage.open}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          message={snackBarMessage.data}
        />

        {!currentRoom ? (
          <>
            <Typography variant="h4">?????? ????????? ???????????? ????????????.</Typography>
            <br></br>
            <Typography variant="body1">
              ????????? ????????? ??????????????? ???????????? ??????????????????.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h2" sx={{ display: "flex" }}>
              <span style={{ flexGrow: 1 }}>{currentRoom.name}</span>
              {isMine ? (
                <Button
                  variant="text"
                  style={{ maxHeight: "36px", margin: "auto" }}
                  onClick={() => setOpenCreateQuizDialog(true)}
                >
                  <Typography variant="button">?????? ?????????</Typography>
                </Button>
              ) : undefined}
            </Typography>

            <CopyClassCode
              roomId={currentRoom.id as string}
              onClick={() => {
                showSnackBar("??????????????? ????????? ?????????");
                copyToClipboard(currentRoom.id as string);
              }}
            />

            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {currentRoom === undefined ? (
                "???"
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

  return (
    <>
      <SpeedDialTooltipOpen
        menu={actions}
        main={<ClassroomPage />}
      ></SpeedDialTooltipOpen>
    </>
  );
};

export default observer(ClassRoomPage);
