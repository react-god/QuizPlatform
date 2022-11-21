import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../../model/quiz";
import quizRecordStore from "../../store/QuizRecordStore";
import userStore from "../../store/UserStore";
import { isCorrect } from "../quiz_review/QuizReviewPage";
import { getScore } from "../quiz_statics/QuizStaticsPage";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  flexGrow: 0,
  textAlign: "center",
  color: theme.palette.text.primary,
}));

interface QuizRoomComponentProps {
  quizs: Quiz[];
  ownerName: String;
}

// TODO: 퀴즈 개설자의 경우 몇 명이 풀었는지 보이기, 평균 점수 보이기
const QuizRoomComponent = ({ quizs, ownerName }: QuizRoomComponentProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [openQuizStartDialog, setOpenQuizStartDialog] = React.useState(false);
  const [openQuizReviewDialog, setOpenQuizReviewDialog] = React.useState(false);
  const [selectedQuiz, setSelectedQuiz] = React.useState<Quiz | undefined>(
    undefined
  );
  const currentUser = userStore.currentUser;

  if (currentUser === undefined) {
    throw Error("로그인 하지 않고 클래스 룸 페이지에 접근함.");
  }

  const recordOfSelectedQuiz = useMemo(() => {
    if (selectedQuiz === undefined) {
      return undefined;
    }
    return quizRecordStore.getRecordByUserAndQuizId(
      currentUser.id,
      selectedQuiz.id
    );
  }, [selectedQuiz, currentUser.id]);

  const scoreOfSelectedQuiz = useMemo(() => {
    if (recordOfSelectedQuiz === undefined || selectedQuiz === undefined) {
      return undefined;
    }
    return getScore(recordOfSelectedQuiz, selectedQuiz.items);
  }, [recordOfSelectedQuiz, selectedQuiz]);

  const onCardClick = (quiz: Quiz) => {
    const isQuizMine = currentUser.id === quiz.owner.id;
    if (isQuizMine) {
      navigate(`/statics/${quiz.id}`);
      return;
    }
    const didTakeQuiz = quizRecordStore.didTakeQuiz(currentUser.id, quiz.id);
    setSelectedQuiz(quiz);
    if (didTakeQuiz) {
      setOpenQuizReviewDialog(true);
      return;
    }
    setOpenQuizStartDialog(true);
  };

  const onQuizStartDialogCancelClick = () => {
    setOpenQuizStartDialog(false);
  };

  const onQuizReviewDialogCancelClick = () => {
    setOpenQuizReviewDialog(false);
  };

  const onReviewQuizClick = () => {
    if (selectedQuiz === undefined) {
      throw Error("선택된 퀴즈 없이 퀴즈를 시작하려 했습니다.");
    }
    navigate(`/review/${selectedQuiz.id}`);
  };

  const onStartQuizClick = () => {
    if (selectedQuiz === undefined) {
      throw Error("선택된 퀴즈 없이 퀴즈를 시작하려 했습니다.");
    }
    navigate(`/take-quiz/${selectedQuiz.id}`);
  };

  const CandidateCount = (props: { quiz: Quiz }) => {
    const records = useMemo(() => {
      return quizRecordStore.getRecordsByQuizId(props.quiz.id);
    }, [props.quiz.id]);

    const candidateIds = useMemo(
      () => [...new Set(records.map((record) => record.candidateId))],
      [records]
    );

    return (
      <Typography variant="caption" textAlign="center">
        ({candidateIds.length}명 응시함)
      </Typography>
    );
  };

  return (
    <>
      <Dialog
        open={openQuizStartDialog}
        keepMounted
        onClose={onQuizStartDialogCancelClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${selectedQuiz?.name} 퀴즈를 시작할까요?`}</DialogTitle>
        <DialogActions>
          <Button onClick={onQuizStartDialogCancelClick}>취소</Button>
          <Button onClick={onStartQuizClick}>시작</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openQuizReviewDialog}
        keepMounted
        onClose={onQuizReviewDialogCancelClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`${selectedQuiz?.name} 퀴즈 성적`}</DialogTitle>
        {selectedQuiz !== undefined && recordOfSelectedQuiz !== undefined ? (
          <DialogContent>
            <DialogContentText>
              <Typography
                variant="h3"
                color="secondary"
                align="center"
                fontWeight="bold"
                mb="8px"
              >
                {scoreOfSelectedQuiz}점
              </Typography>
            </DialogContentText>
            <DialogContentText align="center">
              {selectedQuiz.items.length}문제 중{" "}
              <Typography fontWeight="bold" display="inline">
                {
                  recordOfSelectedQuiz.items.filter((record, index) =>
                    isCorrect(record, selectedQuiz.items[index])
                  ).length
                }
                문제 정답
              </Typography>
            </DialogContentText>
          </DialogContent>
        ) : (
          <></>
        )}
        <DialogActions>
          <Button onClick={onQuizReviewDialogCancelClick}>취소</Button>
          <Button onClick={onReviewQuizClick}>답안 확인하기</Button>
        </DialogActions>
      </Dialog>

      {quizs.map((quiz: Quiz) => {
        const didTakeQuiz = quizRecordStore.didTakeQuiz(
          currentUser.id,
          quiz.id
        );
        return (
          <Grid key={quiz.id as string} item xs={4}>
            <Card
              sx={{
                backgroundColor: theme.palette.card.main,
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
                    <Typography variant="h5">
                      {quiz.name}
                      {quiz.owner.id === currentUser.id ? (
                        <CandidateCount quiz={quiz}></CandidateCount>
                      ) : undefined}
                      {didTakeQuiz ? (
                        <Typography variant="caption" textAlign="center">
                          (응시완료)
                        </Typography>
                      ) : undefined}
                    </Typography>
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
