import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { Quiz } from "../../mockup_data/quiz";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  flexGrow: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface QuizRoomComponentProps {
  quizs: Quiz[];
  ownerName: String;
}

const QuizRoomComponent = ({ quizs, ownerName }: QuizRoomComponentProps) => {
  const [open, setOpen] = React.useState(false);
  const [dialogTitle, setDialogTitle] = React.useState("");

  const handleClickOpen = () => {
    // console.log(quiz.name);
    setDialogTitle("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {quizs.map((quiz: Quiz) => {
        return (
          <Grid key={quiz.id as string} item xs={4}>
            <Card
              sx={{
                backgroundColor: "#E6E6E6",
                minWidth: "180px",
                maxWidth: "285px",
                maxHeight: "293px",
                borderRadius: "20",
                display: "block",
              }}
              onClick={() => handleClickOpen()}
            >
              <CardContent sx={{ margin: "0px", padding: "16px!important" }}>
                {/* important 말고 다른방법 찾기 */}
                <Item sx={{ padding: "20px" }}>
                  <Stack spacing={3}>
                    <Typography variant="h5">{quiz.name}</Typography>
                    <Typography
                      variant="caption"
                      display={"block"}
                      textAlign="center"
                    >
                      {quiz.items.length}문제
                    </Typography>
                    <Typography
                      variant="caption"
                      display={"block"}
                      textAlign="center"
                    >
                      {ownerName}
                    </Typography>
                  </Stack>
                </Item>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${dialogTitle} 퀴즈를 시작할까요?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>시작</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuizRoomComponent;
//export default observer(ClassRoomPage);
