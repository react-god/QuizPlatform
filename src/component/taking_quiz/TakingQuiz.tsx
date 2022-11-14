import React, { useReducer, useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Container,
  Modal,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { QuizType, QuizItem, QuizOption } from "../../mockup_data/quiz";
import { makeStyles } from "@mui/styles";
import { NavRail, NavRailItem } from "../NavRail";
import Scaffold from "../Scaffold";
import TakingQuizStore from "../../store/TakingQuizStore";
import { observer } from "mobx-react";
import { Image } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "../../store/UserStore";
import { classRoomStore } from "../../store/ClassRoomStore";

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
    <Stack direction="row" spacing={2}>
      <Typography variant="h4">{index + 1}</Typography>
      <Typography>{item.question}</Typography>
    </Stack>
  );
};

const ImageModal: React.FC<{ source: String }> = ({ source }) => {
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={modalOpen}>
        <Image />
      </Button>
      <Modal open={open} onClose={modalClose}>
        <Box>
          <img src={`${source}`} alt="img" />
        </Box>
      </Modal>
    </div>
  );
};

const QuizChoice: React.FC<{
  option: QuizOption;
  chosen: boolean;
  onClicked: () => void;
}> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  const cardColor = props.chosen ? "primary" : "inherit";
  let quizImage: JSX.Element | undefined = undefined;

  if (props.option.imageUrl) {
    quizImage = <ImageModal source={props.option.imageUrl}></ImageModal>;
  }

  return (
    <Button
      variant="contained"
      className={classes.cardStyle}
      onClick={() => props.onClicked()}
      color={cardColor}
    >
      <Stack direction="row">
        {quizImage}
        <Typography variant="h6">{props.option.title}</Typography>
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
    <>
      {currentItem.options.map((option, i) => (
        <QuizChoice
          option={option}
          key={i}
          chosen={store.isOptionChosen(i)}
          onClicked={() => {
            store.updateChoiceRecordItem(i);
            forceUpdate();
          }}
        />
      ))}
    </>
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
      className={classes.cardAction}
      placeholder="정답을 입력하시오."
      onChange={(event) => onEssayChange(event.currentTarget.value)}
      value={essay}
    />
  );
};

const TakingQuiz = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const user = userStore.currentUser!;
  const quiz = classRoomStore.requireQuizById(quizId!);

  const [store] = useState(new TakingQuizStore(quiz, user.id));
  const currentQuizIndex = store.currentQuizItemIndex;
  const currentQuiz = quiz.items[currentQuizIndex];
  const [openSubmitAlertDialog, setOpenSubmitAlertDialog] = useState(false);

  let choiceOrEssay: JSX.Element;
  switch (currentQuiz.type) {
    case QuizType.choice:
      choiceOrEssay = (
        <Box sx={{ width: "100%" }}>
          <Stack spacing={1}>
            <QuizChoiceList currentItem={currentQuiz} store={store} />
          </Stack>
        </Box>
      );
      break;
    case QuizType.essay:
      choiceOrEssay = <QuizEssay store={store} />;
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
        {choiceOrEssay}
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
      </Container>
    </Scaffold>
  );
};

export default observer(TakingQuiz);