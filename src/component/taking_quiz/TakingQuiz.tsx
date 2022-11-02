import React, { useState } from "react";
import {
  Button,
  Typography,
  Card,
  TextField,
  Box,
  Container,
} from "@mui/material";
import {Quiz, QuizType, QuizItem, QuizOption } from "../../mockup_data/quiz";

const Question: React.FC<{ item: QuizItem, index: number }> = ({ item,index }) => {
  return (
    <Box>
      <Typography variant="h4">{index+1}</Typography>
      <Typography>{item.question}</Typography>
    </Box>
  );
};

const QuizChoice: React.FC<{ option: QuizOption }> = ({ option }) => {
  //퀴즈가 객관식일 때만, 하나의 옵션(보기)
  //checkbox로 바꾸기?
  return (
    <Card>
      <Typography>{option.title}</Typography>
      {/*해당 Choice에 onClick 이벤트가 일어나면*/}
    </Card>
  );
};

const QuizChoiceList: React.FC<{ currentItem: QuizItem }> = ({
  currentItem
}) => {
  return (
    <>
      {currentItem.options.map((option, i) => (
        <QuizChoice option={option} key={i}/>
      ))}
    </>
  );
};

const QuizEssay = () => {
  return <TextField variant="filled" />; //onChange가 일어났을 때 값을 records에 저장 되어야한다.
};

const TakingQuiz : React.FC<{quiz: Quiz}> = ({quiz}) => {
  //const quiz = quiz; //mockupdata //나중에 quiz1, quiz2, quiz3...각각 들어가도록 해야되겠지.
  const [currentItemIndex, setcurrentItemIndex] = useState(0);
  const currentItem = quiz.items[currentItemIndex];
  let choiceOrEssay: JSX.Element;
  switch (currentItem.type) {
    case QuizType.choice:
      choiceOrEssay = <QuizChoiceList currentItem={currentItem} />;
      break;
    case QuizType.essay:
      choiceOrEssay = <QuizEssay />;
  }

  const isFirst : boolean =  currentItemIndex === 0;
  const isLast : boolean = currentItemIndex === ((quiz.items.length)-1);

  const moveNext = () => {
    if (currentItemIndex + 1 !== quiz.items.length) {
      setcurrentItemIndex(currentItemIndex + 1);
    } else {
      isLast();
    }
  };

  const movePrevious = () => {
    if (currentItemIndex !== 0) {
      setcurrentItemIndex(currentItemIndex - 1);
    } else {
      isFirst();
    }
  };

  return (
    <>
      <Question item={currentItem} index={currentItemIndex} />
      {choiceOrEssay}
      <Button variant="contained" onClick={movePrevious} disabled={isFirst}>
        이전
      </Button>
      <Button variant="contained" onClick={moveNext} disabled={isLast}>
        다음
      </Button>
    </>
  );
};

export default TakingQuiz;
