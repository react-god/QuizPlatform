import { QuizRecord } from "../mockup_data/quiz_record";
import {
  readJsonFromLocalStorage,
  writeJsonToLocalStorage,
} from "../util/JsonUtil";

const KEY = "records";

class RecordStore {
  private getRecords(): QuizRecord[] | undefined {
    return readJsonFromLocalStorage<QuizRecord[]>(KEY);
  }

  addRecord(record: QuizRecord) {
    const recordList = this.getRecords() ?? [];
    const newRecordList = [...recordList, record];
    writeJsonToLocalStorage(KEY, newRecordList);
  }
}

const recordStore = new RecordStore();

export default recordStore;
