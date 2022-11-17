import { QuizRecord } from "../model/quiz_record";
import {
  readJsonFromLocalStorage,
  writeJsonToLocalStorage,
} from "../util/JsonUtil";

const RECORD_KEY = "quiz_records";

class QuizRecordStore {
  addRecord(record: QuizRecord) {
    const records = readJsonFromLocalStorage<QuizRecord[]>(RECORD_KEY) ?? [];
    const newRecords = [...records, record];
    writeJsonToLocalStorage(RECORD_KEY, newRecords);
  }

  getRecordsByQuizId(quizId: String): QuizRecord[] {
    const records = readJsonFromLocalStorage<QuizRecord[]>(RECORD_KEY) ?? [];
    return records.filter((record) => record.quizId === quizId);
  }

  getRecordByUserAndQuizId(
    userId: String,
    quizId: String
  ): QuizRecord | undefined {
    const records = readJsonFromLocalStorage<QuizRecord[]>(RECORD_KEY) ?? [];
    return records.find(
      (record) => record.candidateId === userId && record.quizId === quizId
    );
  }

  didTakeQuiz(userId: String, quizId: String): boolean {
    const records = readJsonFromLocalStorage<QuizRecord[]>(RECORD_KEY) ?? [];
    return records.some(
      (record) => record.candidateId === userId && record.quizId === quizId
    );
  }
}

const quizRecordStore = new QuizRecordStore();

export default quizRecordStore;
