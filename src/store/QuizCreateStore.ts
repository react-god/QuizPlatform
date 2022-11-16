import { Quiz, QuizItem, QuizType } from "../mockup_data/quiz";
import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { classRoomStore } from "./ClassRoomStore";
import userStore from "./UserStore";

const initQuizItem: QuizItem = {
  uuid: "dsi29gj3f",
  question: "",
  type: QuizType.choice,
  score: 10,
  multipleChoice: false,
  options: [
    {
      uuid: uuidv4(),
      title: "",
      isAnswer: true,
    },
    ...[...Array(3)].map(() => ({
      uuid: uuidv4(),
      title: "",
      isAnswer: false,
    })),
  ],
};

class QuizCreateStore {
  private quiz: Quiz;

  private classRoomId: String;

  currentItemIndex: number = 0;

  constructor(quizName: String, classRoomId: String) {
    const currentUser = userStore.currentUser;
    if (currentUser === undefined) {
      throw Error("로그인 하지 않은 상태로 퀴즈를 생성하려 했습니다.");
    }
    this.quiz = {
      id: uuidv4(),
      owner: currentUser,
      name: quizName as string,
      items: [initQuizItem],
    };
    this.classRoomId = classRoomId;
    makeAutoObservable(this);
  }

  // ------------- 퀴즈 관련 -----------------

  updateQuizName(name: string) {
    this.quiz.name = name;
  }

  get enabledSubmitButton() {
    return this.quiz.items.every(this.isItemCompleted);
  }

  submitQuiz() {
    this.quiz.items = this.quiz.items.map<QuizItem>((item) => {
      if (item.type === QuizType.essay) {
        item.options = [];
        item.multipleChoice = undefined;
      }
      return item;
    });
    classRoomStore.addQuiz(this.quiz, this.classRoomId);
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
      item.type === QuizType.choice
        ? item.options.some((option) => option.isAnswer)
        : item.essayAnswer !== undefined && item.essayAnswer!.length > 0;
    const hasTitleOfAllOptions =
      item.type === QuizType.choice
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
    this.quiz.items = [...this.quiz.items, { ...initQuizItem, uuid: uuidv4() }];
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

  updateQuizItemMultipleChoice(multipleChoice: boolean) {
    this.currentQuizItem.multipleChoice = multipleChoice;
  }

  updateQuizImageUrl(imageUrl?: String) {
    this.currentQuizItem.imageUrl = imageUrl;
  }

  updateQuizItemScore(score: number) {
    this.currentQuizItem.score = score;
  }

  updateQuizItemReason(reason: String) {
    this.currentQuizItem.reason = reason.length === 0 ? undefined : reason;
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

  updateQuizOptionTitle(optionIndex: number, title: String) {
    const option = this.currentQuizItem.options[optionIndex];
    option.title = title;
  }

  updateQuizOptionIsAnswer(optionIndex: number, isAnswer: boolean) {
    const option = this.currentQuizItem.options[optionIndex];
    option.isAnswer = isAnswer;
  }

  updateQuizOptionImageUrl(optionIndex: number, imageUrl?: String) {
    const option = this.currentQuizItem.options[optionIndex];
    option.imageUrl = imageUrl;
  }

  removeQuizOption(optionIndex: number) {
    this.currentQuizItem.options = this.currentQuizItem.options.filter(
      (_, index) => index !== optionIndex
    );
  }
}

export default QuizCreateStore;
