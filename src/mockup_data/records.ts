import {
  QuizRecord,
  quizRecord1_1,
  quizRecord1_2,
  quizRecord1_3,
} from "./quiz_record";

export interface Records {
  datas: Array<QuizRecord>;
}

const records: Records = {
  datas: [quizRecord1_1, quizRecord1_2, quizRecord1_3],
};

export { records };
