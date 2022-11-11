import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ButtonBase,
  TextField,
  Box,
  Container,
  Checkbox,
  Modal,
  Stack,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
import { Quiz, QuizType, QuizItem, QuizOption } from "../../mockup_data/quiz";
import { User } from "../../mockup_data/user";
import { ImageNotSupported, Image } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { NavRail, NavRailItem } from "../NavRail";
import Scaffold from "../Scaffold";
import { QuizRecordItem } from "../../mockup_data/quiz_record";
import TakingQuizStore from "../../store/TakingQuizStore";
import { observer, Observer } from "mobx-react";

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
  const cardColor = props.chosen
    ? "primary"
    : "error";
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
  currentRecord: QuizRecordItem;
}> = ({ currentItem, store, currentRecord }) => {
  return (
    <>
      {currentItem.options.map((option, i) => (
        <QuizChoice
          option={option}
          key={i}
          chosen={store.isOptionChosen(i,currentRecord)}
          onClicked={() => store.updateChoiceRecordItem(i)}
        />
      ))}
    </>
  );
};

const QuizEssay = () => {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      className={classes.cardAction}
      placeholder="정답을 입력하시오."
    />
  );
};

const TakingQuiz: React.FC<{ quiz: Quiz; user: User }> = ({ quiz, user }) => {
  //const quiz = quiz1;
  //const user = user1;
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const currentItem = quiz.items[currentItemIndex];
  const [store] = useState(new TakingQuizStore(quiz.id, user.id));
  const currentRecord = store.currentRecordItem;

  let choiceOrEssay: JSX.Element;
  switch (currentItem.type) {
    case QuizType.choice:
      choiceOrEssay = (
        <Box sx={{ width: "100%" }}>
          <Stack spacing={1}>
            <QuizChoiceList currentItem={currentItem} store={store} currentRecord={currentRecord}/>
          </Stack>
        </Box>
      );
      break;
    case QuizType.essay:
      choiceOrEssay = <QuizEssay />;
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
    if (currentItemIndex + 1 !== quiz.items.length) {
      setcurrentItemIndex(currentItemIndex + 1);
    } else {
      isLast(currentItemIndex);
    }
  };

  const movePrevious = () => {
    if (currentItemIndex !== 0) {
      setcurrentItemIndex(currentItemIndex - 1);
    } else {
      isFirst(currentItemIndex);
    }
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
                  color={"inherit"}
                  isSelected={true}
                  onClick={() => console.log()}
                />
              );
            }),
          ]}
        />
      }
    >
      <Container>
        <Question item={currentItem} index={currentItemIndex} />
        {choiceOrEssay}
        <NavRailItem
          label="이전"
          color={isFirst(currentItemIndex) ? "inherit" : "secondary"}
          onClick={movePrevious}
          isSelected
        ></NavRailItem>
        <NavRailItem
          label="다음"
          color={isLast(currentItemIndex) ? "inherit" : "secondary"}
          onClick={moveNext}
          isSelected
        ></NavRailItem>
      </Container>
    </Scaffold>
  );
};

export default observer(TakingQuiz);
