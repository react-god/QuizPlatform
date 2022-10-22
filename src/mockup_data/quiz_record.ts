import { Quiz, quiz1, QuizType } from "./quiz";
import { User, user2, user3, user4 } from "./user";

export interface QuizRecord {
  quiz: Quiz;
  candidate: User;
  items: Array<QuizRecordItem>;
}

export interface QuizRecordItem {
  index: number;
  essay?: String; //단답식일 때
  choice?: Array<number>;
}

// ------------- ITEMS  --------------
const item1_1: QuizRecordItem = {
  index: 0,
  essay: "권대현",
};

const item1_2: QuizRecordItem = {
  index: 1,
  choice: [1],
};

const item1_3: QuizRecordItem = {
  index: 2,
  choice: [2, 3],
};

const item2_1: QuizRecordItem = {
  index: 0,
  essay: "곽은서",
};

const item2_2: QuizRecordItem = {
  index: 1,
  choice: [2],
};

const item2_3: QuizRecordItem = {
  index: 2,
  choice: [0, 1],
};

const item3_1: QuizRecordItem = {
  index: 0,
  essay: "정시현",
};

const item3_2: QuizRecordItem = {
  index: 1,
  choice: [1],
};

const item3_3: QuizRecordItem = {
  index: 2,
  choice: [1, 3],
};

// ----------- RECORDS ----------------

const quizRecord1_1: QuizRecord = {
  quiz: quiz1,
  candidate: user2,
  items: [item1_1, item1_2, item1_3],
};

const quizRecord1_2: QuizRecord = {
  quiz: quiz1,
  candidate: user3,
  items: [item2_1, item2_2, item2_3],
};

const quizRecord1_3: QuizRecord = {
  quiz: quiz1,
  candidate: user3,
  items: [item3_1, item3_2, item3_3],
};

export { quizRecord1_1, quizRecord1_2, quizRecord1_3 };
