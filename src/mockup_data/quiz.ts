import { User, user1 } from "./user";

// --------------- INTERFACE ---------------

export enum QuizType {
  choice,
  essay,
}

export interface Quiz {
  id: String;
  owner: User;
  name: String;
  items: Array<QuizItem>;
}

export interface QuizItem {
  question: String;
  type: QuizType;
  options: Array<QuizOption>;
  essayAnswer?: String;
  imageUrl?: String;
}

export interface QuizOption {
  uuid: String;
  title: String;
  isAnswer: boolean;
  imageUrl?: String;
}

// --------------- INSTANCE ---------------

// 첫번째 퀴즈의 첫번째 질문
const quizItem1_1: QuizItem = {
  question: "세상에서 제일 잘생긴 사람은?",
  type: QuizType.essay,
  essayAnswer: "권대현",
  options: [],
};

// 첫번째 퀴즈의 두번째 질문의 첫번째 보기
const quizOption1_2_1: QuizOption = {
  uuid: "dijfw2310",
  isAnswer: false,
  title: "1",
};

const quizOption1_2_2: QuizOption = {
  uuid: "dijfw2311",
  isAnswer: true,
  title: "2",
};

const quizOption1_2_3: QuizOption = {
  uuid: "dijfw2312",
  isAnswer: false,
  title: "3",
};

const quizOption1_2_4: QuizOption = {
  uuid: "dijfw2313",
  isAnswer: false,
  title: "4",
};

// 첫번째 퀴즈의 두번째 질문
const quizItem1_2: QuizItem = {
  question: "1 + 1 = ?",
  type: QuizType.choice,
  options: [quizOption1_2_1, quizOption1_2_2, quizOption1_2_3, quizOption1_2_4],
};

// 세번 어저구 저저구 보기

const quizOption1_3_1: QuizOption = {
  uuid: "dijfw2314",
  isAnswer: true,
  title: "1",
};

const quizOption1_3_2: QuizOption = {
  uuid: "dijfw2315",
  isAnswer: false,
  title: "2",
};

const quizOption1_3_3: QuizOption = {
  uuid: "dijfw2317",
  isAnswer: true,
  title: "3",
};

const quizOption1_3_4: QuizOption = {
  uuid: "dijfw2319",
  isAnswer: false,
  title: "4",
};

// 첫번째 퀴즈의 세번째 질문
const quizItem1_3: QuizItem = {
  question: "다음 중 홀수인 것은?",
  type: QuizType.choice,
  options: [quizOption1_3_1, quizOption1_3_2, quizOption1_3_3, quizOption1_3_4],
};

// 첫번째 퀴즈
const quiz1: Quiz = {
  id: "b17c80f1",
  owner: user1,
  name: "네트워크 이론1",
  items: [quizItem1_1, quizItem1_2, quizItem1_3],
};

export { quiz1 };
