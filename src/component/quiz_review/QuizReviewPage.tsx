import { Divider, Stack, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { QuizItem, QuizOption, QuizType } from "../../mockup_data/quiz";
import { QuizRecord, QuizRecordItem } from "../../mockup_data/quiz_record";
import { NavRail, NavRailItem } from "../NavRail";
import { Check, Close } from "@mui/icons-material";
import Scaffold from "../Scaffold";
import { classRoomStore } from "../../store/ClassRoomStore";
import { useParams } from "react-router-dom";
import quizRecordStore from "../../store/QuizRecordStore";
import userStore from "../../store/UserStore";

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
        {`정답:`} <b>{answerText}</b>
        <br></br>
        {props.quizItem.reason ? `이유: ${props.quizItem.reason}` : undefined}
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
  const [itemIndex, setItemIndex] = useState(0);
  const { quizId } = useParams();
  const currentUser = userStore.currentUser;
  if (quizId === undefined) {
    throw Error("퀴즈 ID가 없이 전환을 시도했습니다.");
  }
  if (currentUser === undefined) {
    throw Error("로그인 하지 않은 상태로 퀴즈 리뷰 페이지에 접근하였습니다.");
  }
  const quiz = useMemo(() => {
    return classRoomStore.requireQuizById(quizId);
  }, [quizId]);
  const quizRecord = useMemo(() => {
    return quizRecordStore.getRecordByUserAndQuizId(currentUser.id, quizId);
  }, [quizId]);
  if (quizRecord === undefined) {
    throw Error(`현재 유저가 ${quizId} 퀴즈를 푼 기록을 찾을 수 없습니다.`);
  }
  const currentQuizItem = quiz.items[itemIndex];
  const quizRecordItems = quizRecord.items;
  const currentRecordItem = quizRecord.items[itemIndex];

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
        {currentQuizItem.score}점 중{" "}
        <b>
          {isCorrect(currentRecordItem, currentQuizItem)
            ? currentQuizItem.score
            : 0}
          점 획득
        </b>
      </Typography>
      <Divider />
      <AnswerAndReason quizItem={currentQuizItem} />
      {essayOrChoiceList}
    </Scaffold>
  );
};

export default QuizReviewPage;
