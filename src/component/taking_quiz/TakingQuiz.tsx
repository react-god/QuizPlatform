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
} from "@mui/material";
import { Quiz, QuizType, QuizItem, QuizOption } from "../../mockup_data/quiz";
import { User } from "../../mockup_data/user";
import { ImageNotSupported, Image } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { NavRail, NavRailItem } from "../NavRail";
import Scaffold from "../Scaffold";

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

const QuizChoice: React.FC<{ option: QuizOption }> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const modalOpen = () => setOpen(true);
  const modalClose = () => setOpen(false);
  let quizImage: JSX.Element | undefined = undefined;

  if (props.option.imageUrl) {
    quizImage = <ImageModal source={props.option.imageUrl}></ImageModal>;
  }

  return (
    <Card variant="outlined" className={classes.cardStyle}>
      <Stack direction="row">
        {quizImage}
        <ButtonBase
          className={classes.cardAction}
          onClick={(event) => {
            console.log(event.currentTarget.value);
          }}
        >
          <CardContent>
            <Typography variant="h6">{props.option.title}</Typography>
          </CardContent>
        </ButtonBase>
      </Stack>
    </Card>
  );
};

const QuizChoiceList: React.FC<{ currentItem: QuizItem }> = ({
  currentItem,
}) => {
  return (
    <>
      {currentItem.options.map((option, i) => (
        <QuizChoice option={option} key={i} />
      ))}
    </>
  );
};

const QuizEssay = () => {
  const classes = useStyles();
  const onChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <TextField
      variant="outlined"
      onChange={onChangeAnswer}
      className={classes.cardAction}
      placeholder="정답을 입력하세요."
    />
  );
};

const TakingQuiz: React.FC<{ quiz: Quiz; user: User }> = ({ quiz, user }) => {
  //const quiz = quiz1;
  //const user = user1;
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const currentItem = quiz.items[currentItemIndex];
  let choiceOrEssay: JSX.Element;
  switch (currentItem.type) {
    case QuizType.choice:
      choiceOrEssay = (
        <Box sx={{ width: "100%" }}>
          <Stack spacing={1}>
            <QuizChoiceList currentItem={currentItem} />
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

export default TakingQuiz;
