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
  index: number;
  question: String;
  type: QuizType;
  answer: QuizAnswer;
  options: Array<QuizOption>;
  imageUrl?: String;
}

export interface QuizAnswer {
  /** Assert not null if QuizItem type is choice */
  choice?: Array<number>;
  /** Assert not null if QuizItem type is essay */
  essay?: String;
}

export interface QuizOption {
  title: String;
  index: number;
  imageUrl?: String;
}

// --------------- INSTANCE ---------------

// 첫번째 퀴즈의 첫번째 질문의 답
const quizAnswer1_1: QuizAnswer = {
  essay: "권대현",
};

// 첫번째 퀴즈의 첫번째 질문
const quizItem1_1: QuizItem = {
  index: 0,
  question: "세상에서 제일 잘생긴 사람은?",
  type: QuizType.essay,
  answer: quizAnswer1_1,
  options: [],
};

// 첫번째 퀴즈의 두번째 질문의 첫번째 보기
const quizOption1_2_1: QuizOption = {
  title: "1",
  index: 0,
};

const quizOption1_2_2: QuizOption = {
  title: "2",
  index: 1,
};

const quizOption1_2_3: QuizOption = {
  title: "3",
  index: 2,
};

const quizOption1_2_4: QuizOption = {
  title: "4",
  index: 3,
};

// 첫번째 퀴즈의 두번째 질문의 답
const quizAnswer1_2: QuizAnswer = {
  choice: [1],
};

// 첫번째 퀴즈의 두번째 질문
const quizItem1_2: QuizItem = {
  index: 0,
  question: "1 + 1 = ?",
  type: QuizType.choice,
  answer: quizAnswer1_2,
  options: [quizOption1_2_1, quizOption1_2_2, quizOption1_2_3, quizOption1_2_4],
};

// 첫번째 퀴즈의 세번째 질문의 답
const quizAnswer1_3: QuizAnswer = {
  choice: [0, 2],
};

// 세번 어저구 저저구 보기

const quizOption1_3_1: QuizOption = {
  title: "1",
  index: 0,
};

const quizOption1_3_2: QuizOption = {
  title: "2",
  index: 1,
};

const quizOption1_3_3: QuizOption = {
  title: "3",
  index: 2,
};

const quizOption1_3_4: QuizOption = {
  title: "4",
  index: 3,
};

// 첫번째 퀴즈의 세번째 질문
const quizItem1_3: QuizItem = {
  index: 0,
  question: "다음 중 홀수인 것은?",
  type: QuizType.choice,
  answer: quizAnswer1_2,
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
