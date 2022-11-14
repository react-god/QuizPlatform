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
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../mockup_data/quiz";
import userStore from "../../store/UserStore";

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
  const navigate = useNavigate();
  const [openQuizStartDialog, setOpenQuizStartDialog] = React.useState(false);
  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | undefined>(
    undefined
  );

  const onCardClick = (quiz: Quiz) => {
    const currentUser = userStore.currentUser;
    if (currentUser === undefined) {
      throw Error("로그인 하지 않고 퀴즈를 클릭함");
    }
    const isQuizMine = currentUser.id === quiz.owner.id;
    if (isQuizMine) {
      navigate(`/statics/${quiz.id}`);
    } else {
      setSelectedQuiz(quiz);
      setOpenQuizStartDialog(true);
    }
  };

  const onCancelClick = () => {
    setOpenQuizStartDialog(false);
    setSelectedQuiz(undefined);
  };

  const onStartQuizClick = () => {
    if (selectedQuiz === undefined) {
      throw Error("선택된 퀴즈 없이 퀴즈를 시작하려 했습니다.");
    }
    navigate(`/take-quiz/${selectedQuiz.id}`);
  };

  return (
    <>
      <Dialog
        open={openQuizStartDialog}
        keepMounted
        onClose={onCancelClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${selectedQuiz?.name} 퀴즈를 시작할까요?`}</DialogTitle>
        <DialogActions>
          <Button onClick={onCancelClick}>취소</Button>
          <Button onClick={onStartQuizClick}>시작</Button>
        </DialogActions>
      </Dialog>

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
              onClick={() => onCardClick(quiz)}
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
    </>
  );
};

export default QuizRoomComponent;
//export default observer(ClassRoomPage);
