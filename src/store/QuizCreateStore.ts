import { Quiz, QuizItem, QuizType } from "../mockup_data/quiz";
import { v4 as uuidv4 } from "uuid";
import { user1 } from "../mockup_data/user";
import { makeAutoObservable } from "mobx";

const initQuizItem: QuizItem = {
  question: "",
  type: QuizType.choice,
  options: [
    {
      uuid: uuidv4(),
      title: "",
      isAnswer: true,
    },
    {
      uuid: uuidv4(),
      title: "",
      isAnswer: false,
    },
  ],
};

class QuizCreateStore {
  quiz: Quiz;

  currentItemIndex: number = 0;

  constructor(quizName: String) {
    this.quiz = {
      id: uuidv4(),
      owner: user1,
      name: quizName,
      items: [initQuizItem],
    };
    makeAutoObservable(this);
  }

  // ------------- 퀴즈 관련 -----------------

  updateQuizName(name: String) {
    this.quiz.name = name;
  }

  get enabledSubmitButton() {
    return this.quiz.items.every(this.isItemCompleted);
  }

  submitQuiz() {
    // TODO(민성): ClassRoomStore에 저장하고 홈화면으로 전환하기
  }

  // ----------- 퀴즈의 항목 관련 --------------

  get showQuizOptionAddButton() {
    return this.currentQuizItem.options.length < 5;
  }

  get showRemoveQuizItemButton() {
    return this.quiz.items.length > 1;
  }

  get showRemoveQuizOptionButton() {
    return this.currentQuizItem.options.length > 2;
  }

  isItemCompleted(item: QuizItem) {
    const hasQuestion = item.question.length > 0;
    const hasAnswer =
      item.type == QuizType.choice
        ? item.options.some((option) => option.isAnswer)
        : item.essayAnswer != undefined && item.essayAnswer!.length > 0;
    const hasTitleOfAllOptions =
      item.type == QuizType.choice
        ? item.options.every((option) => option.title.length > 0)
        : true;
    return hasQuestion && hasAnswer && hasTitleOfAllOptions;
  }

  updateCurrentItemIndex(index: number) {
    this.currentItemIndex = index;
  }

  get quizItems() {
    return this.quiz.items;
  }

  get currentQuizItem() {
    return this.quiz.items[this.currentItemIndex];
  }

  addQuizItem() {
    this.quiz.items = [...this.quiz.items, initQuizItem];
    this.currentItemIndex = this.quiz.items.length - 1;
  }

  updateQuizItemQuestion(question: String) {
    this.currentQuizItem.question = question;
  }

  updateQuizItemType(newType: QuizType) {
    let item = this.currentQuizItem;
    if (item.type === newType) {
      return;
    }
    item.type = newType;
  }

  updateEssayAnswer(answer: String) {
    this.currentQuizItem.essayAnswer = answer;
  }

  removeCurrentQuizItem() {
    this.quiz.items = this.quiz.items.filter(
      (_, index) => index !== this.currentItemIndex
    );

    this.currentItemIndex = Math.min(
      this.currentItemIndex,
      this.quiz.items.length - 1
    );
  }

  // -------- 퀴즈의 항목의 보기 관련 -------------

  addQuizOption() {
    let item = this.currentQuizItem;
    item.options = [
      ...item.options,
      { uuid: uuidv4(), title: "", isAnswer: false },
    ];
  }

  updateQuizOption(optionIndex: number, title?: String, isAnswer?: boolean) {
    const option = this.currentQuizItem.options[optionIndex];
    if (title !== undefined) {
      option.title = title;
    }
    if (isAnswer !== undefined) {
      option.isAnswer = isAnswer;
    }
  }

  removeQuizOption(optionIndex: number) {
    this.currentQuizItem.options = this.currentQuizItem.options.filter(
      (_, index) => index !== optionIndex
    );
  }
}

export default QuizCreateStore;
