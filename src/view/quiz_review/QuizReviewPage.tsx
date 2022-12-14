import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { QuizItem, QuizOption, QuizType } from "../../model/quiz";
import { QuizRecordItem } from "../../model/quiz_record";
import { NavRail, NavRailItem } from "../../component/NavRail";
import { Check, Close } from "@mui/icons-material";
import Scaffold from "../../component/Scaffold";
import { classRoomStore } from "../../store/ClassRoomStore";
import { useNavigate, useParams } from "react-router-dom";
import quizRecordStore from "../../store/QuizRecordStore";
import userStore from "../../store/UserStore";
import { ExpandableImage } from "../../component/ExpandableImage";

export function isCorrect(
  recordItem: QuizRecordItem,
  quizItem: QuizItem
): boolean {
  let result = false;
  switch (quizItem.type) {
    case QuizType.choice:
      const answerIndexes = quizItem.options
        .map((option, index) => ({ ...option, index }))
        .filter((option) => option.isAnswer)
        .map((indexedOption) => indexedOption.index);
      result = recordItem.choice!.every((choiceIndex) =>
        answerIndexes.includes(choiceIndex)
      );
      break;
    case QuizType.essay:
      const answer = quizItem.essayAnswer!;
      result = recordItem.essay! === answer;
      break;
  }
  return result;
}

interface QuestionTitleProps {
  index: number;
  numberColor: "secondary" | "error";
  question: String;
}

const QuestionTitle = (props: QuestionTitleProps) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="h2" color={props.numberColor}>
        {props.index + 1}.
      </Typography>
      <Typography variant="h4" style={{ display: "flex", paddingLeft: "20px" }}>
        {props.question}
      </Typography>
    </Stack>
  );
};

interface AnswerAndReasonProps {
  quizItem: QuizItem;
}

const AnswerAndReason = (props: AnswerAndReasonProps) => {
  let answerText: String;
  switch (props.quizItem.type) {
    case QuizType.choice:
      answerText = props.quizItem.options
        .filter((option) => option.isAnswer)
        .map((option) => option.title)
        .reduce((prev, curr) => prev + ", " + curr);
      break;
    case QuizType.essay:
      answerText = props.quizItem.essayAnswer!;
      break;
  }
  return (
    <>
      <Typography style={{ margin: "16px" }}>
        {`??????:`} <b>{answerText}</b>
        <br></br>
        {props.quizItem.reason ? `??????: ${props.quizItem.reason}` : undefined}
      </Typography>
    </>
  );
};

interface OptionCardProps {
  title: String;
  isAnswer: boolean;
  imageUrl?: String;
  wasSelected: boolean;
}

const OptionCard = (props: OptionCardProps) => {
  const theme = useTheme();
  const [imageExpanded, setImageExpanded] = useState(false);
  let image: JSX.Element | undefined = undefined;

  if (props.imageUrl) {
    image = (
      <ExpandableImage
        style={{ margin: "8px" }}
        src={props.imageUrl as string}
        onClick={() => setImageExpanded(!imageExpanded)}
        expanded={imageExpanded}
      />
    );
  }

  return (
    <Stack
      direction={imageExpanded ? "column" : "row"}
      alignItems="center"
      style={{
        borderRadius: "20px",
        padding: image !== undefined ? "8px" : "20px",
        marginBottom: "16px",
        backgroundColor: theme.palette.card.light,
      }}
    >
      {image}
      <Stack direction="row">
        <Typography variant="subtitle1" marginRight="8px">
          {props.title}
        </Typography>
        {props.wasSelected ? (
          props.isAnswer ? (
            <Check color="secondary" />
          ) : (
            <Close color="error" />
          )
        ) : undefined}
      </Stack>
    </Stack>
  );
};

interface OptionCardListProps {
  quizOptions: QuizOption[];
  choiceIndexes: number[];
}

const OptionCardList = (props: OptionCardListProps) => {
  return (
    <>
      {props.quizOptions.map((option, optionIndex) => (
        <OptionCard
          key={option.uuid as string}
          title={option.title}
          imageUrl={option.imageUrl}
          isAnswer={option.isAnswer}
          wasSelected={props.choiceIndexes.includes(optionIndex)}
        />
      ))}
    </>
  );
};

interface SubmittedEssayProps {
  essay: String;
  correct: boolean;
}

const SubmittedEssay = (props: SubmittedEssayProps) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      style={{
        borderRadius: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginBottom: "16px",
        backgroundColor: theme.palette.grey[200],
      }}
    >
      <Typography variant="subtitle1" marginRight="8px">
        {props.essay}
      </Typography>
      {props.correct ? <Check color="secondary" /> : <Close color="error" />}
    </Stack>
  );
};

const QuizReviewPage = () => {
  const navigate = useNavigate();
  const [itemIndex, setItemIndex] = useState(0);
  const { quizId } = useParams();
  const currentUser = userStore.currentUser;
  if (quizId === undefined) {
    throw Error("?????? ID??? ?????? ????????? ??????????????????.");
  }
  if (currentUser === undefined) {
    throw Error("????????? ?????? ?????? ????????? ?????? ?????? ???????????? ?????????????????????.");
  }
  const quiz = useMemo(() => {
    return classRoomStore.requireQuizById(quizId);
  }, [quizId]);
  const quizRecord = useMemo(() => {
    return quizRecordStore.getRecordByUserAndQuizId(currentUser.id, quizId);
  }, [quizId, currentUser.id]);
  if (quizRecord === undefined) {
    throw Error(`?????? ????????? ${quizId} ????????? ??? ????????? ?????? ??? ????????????.`);
  }
  const currentQuizItem = quiz.items[itemIndex];
  const quizRecordItems = quizRecord.items;
  const currentRecordItem = quizRecord.items[itemIndex];
  const [imageExpandedList, setImageExpandedList] = useState<boolean[]>(
    [...Array(quiz.items.length)].map((_) => true)
  );

  let essayOrChoiceList: JSX.Element;
  switch (currentQuizItem.type) {
    case QuizType.choice:
      essayOrChoiceList = (
        <OptionCardList
          quizOptions={currentQuizItem.options}
          choiceIndexes={currentRecordItem.choice!}
        />
      );
      break;
    case QuizType.essay:
      const essay = currentRecordItem.essay!;
      const answer = currentQuizItem.essayAnswer;
      essayOrChoiceList = (
        <SubmittedEssay essay={essay} correct={essay === answer} />
      );
      break;
  }

  return (
    <Scaffold
      navRail={
        <NavRail
          onBackClick={() => navigate(-1)}
          items={quiz.items.map((quizItem, index) => (
            <NavRailItem
              key={quizItem.uuid as string}
              label={`${index + 1}`}
              color={
                isCorrect(quizRecordItems[index], quizItem)
                  ? "secondary"
                  : "error"
              }
              isSelected={itemIndex === index}
              onClick={() => {
                setItemIndex(index);
              }}
            />
          ))}
        />
      }
    >
      <QuestionTitle
        numberColor={
          isCorrect(currentRecordItem, currentQuizItem) ? "secondary" : "error"
        }
        index={itemIndex}
        question={currentQuizItem.question}
      />
      <Typography style={{ margin: "16px", opacity: 0.6 }}>
        {currentQuizItem.score}??? ???{" "}
        <b>
          {isCorrect(currentRecordItem, currentQuizItem)
            ? currentQuizItem.score
            : 0}
          ??? ??????
        </b>
      </Typography>
      <Divider />
      <AnswerAndReason quizItem={currentQuizItem} />
      {currentQuizItem.imageUrl !== undefined ? (
        <ExpandableImage
          src={currentQuizItem.imageUrl}
          expanded={imageExpandedList[itemIndex]}
          style={{ marginBottom: "16px" }}
          onClick={() => {
            const newList = [...imageExpandedList];
            newList[itemIndex] = !imageExpandedList[itemIndex];
            setImageExpandedList(newList);
          }}
        />
      ) : undefined}
      {essayOrChoiceList}
    </Scaffold>
  );
};

export default QuizReviewPage;
