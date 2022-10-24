import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  List,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../css/QuizCreatePage.css";
import { Add, Delete, Image } from "@mui/icons-material";
import { observer } from "mobx-react";
import { ChangeEvent, useReducer, useRef, useState } from "react";
import { QuizItem, QuizOption, QuizType } from "../mockup_data/quiz";
import QuizCreateStore from "../store/QuizCreateStore";

const textFieldRightMargin = "80px";

interface SubmitButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      style={{ margin: "8px" }}
      disableElevation={true}
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
  isCurrentItem: boolean;
  onClick: () => void;
}

const NavRailItem = (props: NavRailItemProps) => {
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      style={{
        marginTop: "4px",
        marginBottom: "4px",
        marginLeft: "12px",
        marginRight: "12px",
      }}
      disableElevation={true}
      color={props.highlighted ? "secondary" : "inherit"}
      onClick={() => props.onClick()}
    >
      <Typography
        variant="button"
        fontWeight={props.isCurrentItem ? "900" : "400"}
      >
        {props.number}
      </Typography>
    </Button>
  );
};

interface NavRailProps {
  items: Array<QuizItem>;
  enableSubmitButton: boolean;
  currentItemIndex: number;
  isItemCompleted: (item: QuizItem) => boolean;
  onItemClick: (index: number) => void;
  onAddClick: () => void;
  onSubmitClick: () => void;
}

const NavRail = (props: NavRailProps) => {
  const theme = useTheme();

  return (
    <List
      style={{
        backgroundColor: theme.palette.grey[100],
        paddingTop: "8px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        {/* TODO(민성): 뒤로가기 버튼 만들기 */}
        <Stack
          id="noneScrollBar"
          direction="column"
          alignItems="center"
          style={{ overflowY: "scroll" }}
        >
          {props.items.map((item, index) => {
            return (
              <NavRailItem
                key={item.uuid as string}
                number={index + 1}
                highlighted={props.isItemCompleted(item)}
                isCurrentItem={props.currentItemIndex === index}
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
    </List>
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
  const fontSize = 24;

  return (
    <Typography variant="h2" style={{ display: "flex" }}>
      {props.index + 1}
      <TextField
        placeholder="문제 질문 입력…"
        margin="normal"
        size="small"
        variant="standard"
        value={props.question}
        inputProps={{ style: { fontSize: fontSize } }}
        InputLabelProps={{ style: { fontSize: fontSize } }}
        style={{
          marginLeft: "24px",
          marginRight: textFieldRightMargin,
          flexGrow: 1,
        }}
        onChange={(e) => props.onQuestionChange(e.target.value)}
      />
      {props.showRemoveButton ? (
        <IconButton
          onClick={() => props.onRemoveClick()}
          style={{ marginLeft: "12px", width: "64px" }}
        >
          <Delete color="error" />
        </IconButton>
      ) : (
        <></>
      )}
    </Typography>
  );
};

interface ImagePickerProps {
  imageUrl?: String;
  onImageChange: (url?: String) => void;
}

const ImagePicker = (props: ImagePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null) {
      const url = URL.createObjectURL(files[0]);
      props.onImageChange(url);
    }
  };

  const onImageClearClick = () => {
    inputRef.current!.value = "";
    props.onImageChange(undefined);
  };

  return (
    <>
      <label htmlFor="imageInput">
        {props.imageUrl !== undefined ? (
          <Avatar
            variant="rounded"
            src={props.imageUrl as string}
            sx={{
              marginLeft: "8px",
              marginRight: "8px",
              width: "40px",
              height: "40px",
              ":hover": { cursor: "pointer" },
            }}
          />
        ) : (
          <Image sx={{ margin: "8px", ":hover": { cursor: "pointer" } }} />
        )}
      </label>
      <input
        id="imageInput"
        ref={inputRef}
        type="file"
        key={"sdifjoj"}
        accept="image/jpg,impge/png,image/jpeg,image/gif"
        onChange={(e) => onImageChange(e)}
        style={{ display: "none" }}
      ></input>
      {props.imageUrl !== undefined ? (
        <IconButton onClick={() => onImageClearClick()}>
          <Typography variant="button" color="error">
            이미지 제거
          </Typography>
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
};

interface OptionChipsProps {
  selectedType: QuizType;
  imageUrl?: String;
  onChipClick: (type: QuizType) => void;
  onImageChange: (url?: String) => void;
}

const OptionChips = (props: OptionChipsProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      style={{ marginTop: "12px", marginBottom: "20px" }}
    >
      <Chip
        label="객관식"
        color={props.selectedType === QuizType.choice ? "primary" : "default"}
        onClick={() => props.onChipClick(QuizType.choice)}
      />
      <Chip
        label="단답식"
        style={{ margin: "8px" }}
        color={props.selectedType === QuizType.essay ? "primary" : "default"}
        onClick={() => props.onChipClick(QuizType.essay)}
      />
      <Divider
        orientation="vertical"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      ></Divider>
      <ImagePicker
        imageUrl={props.imageUrl}
        onImageChange={(url) => props.onImageChange(url)}
      />
    </Stack>
  );
};

interface AnswerReasonTextFieldProps {
  reason: String;
  onReasonChange: (reason: String) => void;
}

const AnswerReasonTextField = (props: AnswerReasonTextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      placeholder="정답 이유 입력…"
      multiline={true}
      label="정답 이유"
      style={{ marginTop: "16px" }}
      value={props.reason}
      onChange={(e) => props.onReasonChange(e.target.value)}
    ></TextField>
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
  const answerTextColor = props.isAnswer
    ? theme.palette.text.primary
    : theme.palette.grey[700];

  return (
    <Card
      elevation={0}
      style={{
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingLeft: "12px",
        paddingRight: "20px",
        marginBottom: "12px",
        backgroundColor: theme.palette.grey[200],
        display: "flex",
      }}
    >
      <Button
        variant="contained"
        color={props.isAnswer ? "secondary" : "inherit"}
        disableElevation={true}
        onClick={() => props.onAnswerClick(!props.isAnswer)}
      >
        <Typography variant="button" color={answerTextColor}>
          정답
        </Typography>
      </Button>
      <TextField
        variant="standard"
        value={props.title}
        placeholder="보기 입력…"
        multiline={true}
        style={{
          marginLeft: "12px",
          marginRight: textFieldRightMargin,
          flexGrow: 1,
        }}
        onChange={(e) => props.onTitleChange(e.target.value)}
      ></TextField>
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
  let pageMargin: string;
  let optionListOrEssay: JSX.Element;

  const isMobile = useMediaQuery(`(max-width: 780px)`);
  const isTablet = useMediaQuery(`(max-width: 960px)`);

  if (isMobile) {
    pageMargin = "40px";
  } else if (isTablet) {
    pageMargin = "120px";
  } else {
    pageMargin = "240px";
  }

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
          placeholder="답안 입력…"
          variant="filled"
          label="답안"
          multiline={true}
          value={currentQuizItem.essayAnswer ?? ""}
          onChange={(e) => store.updateEssayAnswer(e.target.value)}
        />
      );
      break;
  }

  return (
    <Stack direction="row" style={{ height: "100%" }}>
      <NavRail
        items={store.quizItems}
        enableSubmitButton={store.enabledSubmitButton}
        isItemCompleted={(item) => store.isItemCompleted(item)}
        currentItemIndex={store.currentItemIndex}
        onAddClick={() => store.addQuizItem()}
        onItemClick={(index) => (store.currentItemIndex = index)}
        onSubmitClick={() => store.submitQuiz()}
      />
      <Stack
        id="noneScrollBar"
        direction="column"
        width="100%"
        style={{
          marginLeft: pageMargin,
          marginRight: pageMargin,
          paddingTop: "80px",
          paddingBottom: "80px",
          overflowY: "scroll",
        }}
      >
        <QuestionTitle
          index={store.currentItemIndex}
          question={currentQuizItem.question}
          showRemoveButton={store.showRemoveQuizItemButton}
          onRemoveClick={() => store.removeCurrentQuizItem()}
          onQuestionChange={(q) => store.updateQuizItemQuestion(q)}
        />
        <OptionChips
          selectedType={currentQuizItem.type}
          imageUrl={currentQuizItem.imageUrl}
          onChipClick={(type) => store.updateQuizItemType(type)}
          onImageChange={(imageUrl) => store.updateQuizImageUrl(imageUrl)}
        />
        {optionListOrEssay}
        <AnswerReasonTextField
          reason={currentQuizItem.reason ?? ""}
          onReasonChange={(reason) => store.updateQuizItemReason(reason)}
        />
      </Stack>
    </Stack>
  );
};

export default observer(QuizCreatePage);
