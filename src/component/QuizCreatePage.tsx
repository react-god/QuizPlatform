import {
  Button,
  Card,
  Checkbox,
  Chip,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { observer } from "mobx-react";
import { useReducer, useState } from "react";
import { QuizItem, QuizOption, QuizType } from "../mockup_data/quiz";
import QuizCreateStore from "../store/QuizCreateStore";

interface SubmitButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={() => props.onClick()}
      disabled={!props.enabled}
    >
      <Typography variant="button">제출</Typography>
    </Button>
  );
};

interface NavRailItemProps {
  number: number;
  highlighted: boolean;
  onClick: () => void;
}

const NavRailItem = (props: NavRailItemProps) => {
  return (
    <Button
      variant="contained"
      color={props.highlighted ? "secondary" : "inherit"}
      onClick={() => props.onClick()}
    >
      {props.number}
    </Button>
  );
};

interface NavRailProps {
  items: Array<QuizItem>;
  enableSubmitButton: boolean;
  isItemCompleted: (item: QuizItem) => boolean;
  onItemClick: (index: number) => void;
  onAddClick: () => void;
  onSubmitClick: () => void;
}

const NavRail = (props: NavRailProps) => {
  return (
    <Paper>
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        <Stack direction="column" alignItems="center">
          {props.items.map((item, index) => {
            return (
              <NavRailItem
                number={index + 1}
                highlighted={props.isItemCompleted(item)}
                onClick={() => props.onItemClick(index)}
              />
            );
          })}
          <IconButton onClick={() => props.onAddClick()}>
            <Add />
          </IconButton>
        </Stack>
        <SubmitButton
          enabled={props.enableSubmitButton}
          onClick={() => props.onSubmitClick()}
        />
      </Stack>
    </Paper>
  );
};

interface QuestionTitleProps {
  index: number;
  question: String;
  showRemoveButton: boolean;
  onQuestionChange: (question: String) => void;
  onRemoveClick: () => void;
}

const QuestionTitle = (props: QuestionTitleProps) => {
  return (
    <>
      <Typography variant="h2">
        {props.index + 1}
        <TextField
          placeholder="문제 질문 입력..."
          margin="normal"
          size="small"
          variant="standard"
          value={props.question}
          onChange={(e) => props.onQuestionChange(e.target.value)}
        />
        {props.showRemoveButton ? (
          <IconButton onClick={() => props.onRemoveClick()}>
            <Delete color="error" />
          </IconButton>
        ) : (
          <></>
        )}
      </Typography>
    </>
  );
};

interface OptionChipsProps {
  selectedType: QuizType;
  onChipClick: (type: QuizType) => void;
}

const OptionChips = (props: OptionChipsProps) => {
  return (
    <div>
      <Chip
        label="객관식"
        color={props.selectedType === QuizType.choice ? "primary" : "default"}
        onClick={() => props.onChipClick(QuizType.choice)}
      />
      <Chip
        label="단답식"
        color={props.selectedType === QuizType.essay ? "primary" : "default"}
        onClick={() => props.onChipClick(QuizType.essay)}
      />
    </div>
  );
};

interface OptionBarProps {
  title: String;
  isAnswer: boolean;
  showRemoveButton: boolean;
  onTitleChange: (title: String) => void;
  onRemoveClick: () => void;
  onAnswerClick: (isAnswer: boolean) => void;
  onImageClick: () => void;
}

const OptioinBar = (props: OptionBarProps) => {
  const theme = useTheme();
  const cardColor = props.isAnswer
    ? theme.palette.primary.light
    : theme.palette.background.default;

  return (
    <Card
      elevation={2}
      style={{
        padding: "20px",
        backgroundColor: cardColor,
      }}
    >
      <TextField
        variant="standard"
        value={props.title}
        placeholder="보기 입력..."
        onChange={(e) => props.onTitleChange(e.target.value)}
      ></TextField>
      <Checkbox
        checked={props.isAnswer}
        onClick={() => props.onAnswerClick(!props.isAnswer)}
      ></Checkbox>
      {props.showRemoveButton ? (
        <IconButton onClick={() => props.onRemoveClick()}>
          <Delete color="error" />
        </IconButton>
      ) : (
        <></>
      )}
    </Card>
  );
};

interface OptionBarListProps {
  options: Array<QuizOption>;
  showAddButton: boolean;
  showRemoveButton: boolean;
  onTitleChange: (optionIndex: number, title: String) => void;
  onAnswerClick: (optionIndex: number, isAnswer: boolean) => void;
  onAddButtonClick: () => void;
  onRemoveClick: (optionIndex: number) => void;
}

const OptionBarList = (props: OptionBarListProps) => {
  return (
    <>
      {props.options.map((option, optionIndex) => {
        return (
          <OptioinBar
            key={option.uuid as string}
            title={option.title}
            isAnswer={option.isAnswer}
            showRemoveButton={props.showRemoveButton}
            onTitleChange={(title) => props.onTitleChange(optionIndex, title)}
            onRemoveClick={() => props.onRemoveClick(optionIndex)}
            onAnswerClick={(isAnswer) =>
              props.onAnswerClick(optionIndex, isAnswer)
            }
            onImageClick={() => {
              // TODO
            }}
          />
        );
      })}
      {props.showAddButton ? (
        <OptionAddButton onClick={() => props.onAddButtonClick()} />
      ) : (
        <></>
      )}
    </>
  );
};

interface OptionAddBarProps {
  onClick: () => void;
}

const OptionAddButton = (props: OptionAddBarProps) => {
  return (
    <IconButton onClick={() => props.onClick()}>
      <Add color="primary" />
    </IconButton>
  );
};

interface QuizCreatePageProps {
  quizName: String;
}

const QuizCreatePage = (props: QuizCreatePageProps) => {
  const [store] = useState(new QuizCreateStore(props.quizName));
  const currentQuizItem = store.currentQuizItem;
  // TODO(민성): OptionBar의 title, isAnswer를 변경했을 때 rerendering이 발생하지 않아
  // hack을 하고있다. 추후에 고칠 필요가 있다.
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  let optionListOrEssay: JSX.Element;
  switch (currentQuizItem.type) {
    case QuizType.choice:
      optionListOrEssay = (
        <OptionBarList
          options={store.currentQuizItem.options}
          showAddButton={store.showQuizOptionAddButton}
          showRemoveButton={store.showRemoveQuizOptionButton}
          onTitleChange={(optionIndex, title) => {
            store.updateQuizOption(optionIndex, title);
            // TODO(민성): OptionBar의 title, isAnswer를 변경했을 때 rerendering이 발생하지 않아
            // hack을 하고있다. 추후에 고칠 필요가 있다.
            forceUpdate();
          }}
          onAnswerClick={(optionIndex, isAnswer) => {
            store.updateQuizOption(optionIndex, undefined, isAnswer);
            // TODO(민성): OptionBar의 title, isAnswer를 변경했을 때 rerendering이 발생하지 않아
            // hack을 하고있다. 추후에 고칠 필요가 있다.
            forceUpdate();
          }}
          onAddButtonClick={() => store.addQuizOption()}
          onRemoveClick={(optionIndex) => store.removeQuizOption(optionIndex)}
        />
      );
      break;
    case QuizType.essay:
      optionListOrEssay = (
        <TextField
          placeholder="답안 입력..."
          value={currentQuizItem.essayAnswer ?? ""}
          onChange={(e) => store.updateEssayAnswer(e.target.value)}
        />
      );
      break;
  }

  return (
    <Stack direction="row">
      <NavRail
        items={store.quizItems}
        enableSubmitButton={store.enabledSubmitButton}
        isItemCompleted={(item) => store.isItemCompleted(item)}
        onAddClick={() => store.addQuizItem()}
        onItemClick={(index) => (store.currentItemIndex = index)}
        onSubmitClick={() => store.submitQuiz()}
      />
      <Stack direction="column" width="100%" style={{ margin: "60px" }}>
        <QuestionTitle
          index={store.currentItemIndex}
          question={currentQuizItem.question}
          showRemoveButton={store.showRemoveQuizItemButton}
          onRemoveClick={() => store.removeCurrentQuizItem()}
          onQuestionChange={(q) => store.updateQuizItemQuestion(q)}
        />
        <OptionChips
          selectedType={currentQuizItem.type}
          onChipClick={(type) => store.updateQuizItemType(type)}
        />
        {optionListOrEssay}
      </Stack>
    </Stack>
  );
};

export default observer(QuizCreatePage);
