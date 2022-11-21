import React, { useReducer, useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonGroup,
  useTheme,
} from "@mui/material";
import { QuizType, QuizItem, QuizOption } from "../../model/quiz";
import { makeStyles } from "@mui/styles";
import { NavRail, NavRailItem } from "../../component/NavRail";
import Scaffold from "../../component/Scaffold";
import TakingQuizStore from "../../store/TakingQuizStore";
import { observer } from "mobx-react";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../store/UserStore";
import { classRoomStore } from "../../store/ClassRoomStore";
import { ExpandableImage } from "../../component/ExpandableImage";

/*style*/
const useStyles = makeStyles({
  cardAction: {
    display: "block",
    width: "100%",
  },
  cardStyle: {
    backgroundColor: "lightgray",
  },
});

const Question: React.FC<{ item: QuizItem; index: number }> = ({
  item,
  index,
}) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h2" marginRight="16px" fontWeight="bold">
        {index + 1}.
      </Typography>
      <Typography variant="h3">{item.question}</Typography>
    </Stack>
  );
};

const QuizChoice: React.FC<{
  option: QuizOption;
  chosen: boolean;
  onClick: () => void;
}> = (props) => {
  const theme = useTheme();
  const [imageExpanded, setImageExpanded] = useState(false);
  const cardColor = props.chosen ? "primary" : "inherit";
  let image: JSX.Element | undefined = undefined;

  if (props.option.imageUrl) {
    image = (
      <ExpandableImage
        src={props.option.imageUrl as string}
        onClick={() => setImageExpanded(!imageExpanded)}
        expanded={imageExpanded}
      />
    );
  }

  return (
    <Button
      variant="contained"
      onClick={() => props.onClick()}
      style={{
        backgroundColor:
          cardColor === "inherit" ? theme.palette.card.light : undefined,
      }}
      color={cardColor}
      disableElevation
    >
      <Stack
        direction={imageExpanded ? "column" : "row"}
        alignItems="center"
        justifyContent={imageExpanded ? "center" : "flex-start"}
        style={{ width: "100%" }}
      >
        {image}
        <Typography variant="subtitle1" padding="12px">
          {props.option.title}
        </Typography>
      </Stack>
    </Button>
  );
};

const QuizChoiceList: React.FC<{
  currentItem: QuizItem;
  store: TakingQuizStore;
}> = ({ currentItem, store }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return (
    <Stack spacing={2}>
      {currentItem.options.map((option, i) => (
        <QuizChoice
          option={option}
          key={option.uuid as string}
          chosen={store.isOptionChosen(i)}
          onClick={() => {
            currentItem.multipleChoice
              ? store.updateChoiceRecordItemWhenMultipleChoice(i)
              : store.updateChoiceRecordItemWhenSingleChoice(i);
            forceUpdate();
          }}
        />
      ))}
    </Stack>
  );
};

const QuizEssay: React.FC<{ store: TakingQuizStore }> = ({ store }) => {
  const classes = useStyles();
  const [essay, setEssay] = useState(store.getCurrentQuizEssay());

  const onEssayChange = (value: String) => {
    store.updateEssayRecordItem(value);
    setEssay(value as string);
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      className={classes.cardAction}
      placeholder="여기에 정답 입력..."
      onChange={(event) => onEssayChange(event.currentTarget.value)}
      value={essay}
    />
  );
};

const TakingQuizPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const user = userStore.currentUser!;
  const quiz = classRoomStore.requireQuizById(quizId!);

  const [store] = useState(new TakingQuizStore(quiz, user.id));
  const currentQuizIndex = store.currentQuizItemIndex;
  const currentQuiz = quiz.items[currentQuizIndex];
  const [imageExpandedList, setImageExpandedList] = useState<boolean[]>(
    [...Array(quiz.items.length)].map((_) => true)
  );
  const [openSubmitAlertDialog, setOpenSubmitAlertDialog] = useState(false);

  let choiceOrEssay: JSX.Element;
  switch (currentQuiz.type) {
    case QuizType.choice:
      choiceOrEssay = (
        <QuizChoiceList currentItem={currentQuiz} store={store} />
      );
      break;
    case QuizType.essay:
      choiceOrEssay = <QuizEssay store={store} />;
      break;
    default:
      throw Error("존재하지 않는 퀴즈 타입입니다.");
  }

  const isFirst = (currentItemIndex: number) => {
    if (currentItemIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLast = (currentItemIndex: number) => {
    if (currentItemIndex === quiz.items.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const moveNext = () => {
    if (currentQuizIndex + 1 !== quiz.items.length) {
      store.currentQuizItemIndex = currentQuizIndex + 1;
    } else {
      isLast(currentQuizIndex);
    }
  };

  const movePrevious = () => {
    if (currentQuizIndex !== 0) {
      store.currentQuizItemIndex = currentQuizIndex - 1;
    } else {
      isFirst(currentQuizIndex);
    }
  };

  const submit = () => {
    store.submit();
    navigate("/", { replace: true });
  };

  return (
    <Scaffold
      navRail={
        <NavRail
          items={[
            ...quiz.items.map((item, index) => {
              return (
                <NavRailItem
                  key={item.uuid as string}
                  label={`${index + 1}`}
                  color={store.hasQuizRecordAt(index) ? "secondary" : "inherit"}
                  isSelected={index === currentQuizIndex}
                  onClick={() => {
                    store.moveToTheQuestion(index);
                  }}
                />
              );
            }),
          ]}
          trailingItem={
            <Button
              disabled={!store.enableSendButton}
              variant="contained"
              style={{ margin: "8px" }}
              onClick={() => setOpenSubmitAlertDialog(true)}
            >
              제출
            </Button>
          }
        />
      }
    >
      <Dialog
        open={openSubmitAlertDialog}
        onClose={() => setOpenSubmitAlertDialog(false)}
      >
        <DialogTitle>답안 제출</DialogTitle>
        <DialogContent>
          <DialogContentText>
            답안을 제출하고 퀴즈를 종료합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSubmitAlertDialog(false)}>취소</Button>
          <Button onClick={() => submit()}>제출</Button>
        </DialogActions>
      </Dialog>

      <Container>
        <Question item={currentQuiz} index={currentQuizIndex} />
        <Typography
          variant="subtitle1"
          color="primary"
          fontWeight="bold"
          marginBottom="24px"
        >
          {currentQuiz.score}점
          {currentQuiz.multipleChoice === true ? ", 복수정답" : undefined}
        </Typography>
        {currentQuiz.imageUrl !== undefined ? (
          <ExpandableImage
            expanded={imageExpandedList[currentQuizIndex]}
            onClick={() => {
              const newList = [...imageExpandedList];
              newList[currentQuizIndex] = !imageExpandedList[currentQuizIndex];
              setImageExpandedList(newList);
            }}
            src={currentQuiz.imageUrl}
          />
        ) : undefined}
        {choiceOrEssay}
        <Stack alignItems="flex-end">
          <ButtonGroup style={{ marginTop: "54px" }}>
            <Button
              disabled={currentQuizIndex === 0}
              variant="contained"
              color="secondary"
              onClick={movePrevious}
            >
              이전
            </Button>
            <Button
              disabled={quiz.items.length - 1 === currentQuizIndex}
              variant="contained"
              color="secondary"
              onClick={moveNext}
            >
              다음
            </Button>
          </ButtonGroup>
        </Stack>
      </Container>
    </Scaffold>
  );
};

export default observer(TakingQuizPage);
