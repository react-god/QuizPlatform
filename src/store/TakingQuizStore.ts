import { TurnedIn } from "@mui/icons-material";
import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Quiz, QuizItem } from "../mockup_data/quiz";
import { QuizRecord, QuizRecordItem } from "../mockup_data/quiz_record";
import { User } from "../mockup_data/user";

class TakingQuizStore {
  answerRecord: QuizRecord;
  currentItemIndex: number = 0;

  items: Array<QuizRecordItem> = [];

  constructor(quizId: String, candidateId: String) {
    this.answerRecord = {
      quizId: quizId,
      candidateId: candidateId,
      items: [],
    };
    makeAutoObservable(this);
  }
  /**
   * 현재 문제 번호에 대응하는 답안 QuizRecordItem을 반환한다.
   *
   * 복사본이 아닌 참조를 반환한다.
   */
  get currentRecordItem(): QuizRecordItem | undefined {
    const index = this.answerRecord.items.findIndex(
      (recordItem) => recordItem.index === this.currentItemIndex
    );
    if (index === -1) {
      return undefined;
    }
    return this.answerRecord.items[index];
  }

  updateChoiceRecordItem(clickedChoiceIndex: number) {
    const recordItem = this.currentRecordItem;

    if (recordItem === undefined) {
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: this.currentItemIndex, choice: [clickedChoiceIndex] },
      ];
      return;
    }
    const choices = recordItem.choice;
    if (choices === undefined) {
      throw Error("객관식 문항이 아닌 다른 유형에서 호출했습니다.");
    }
    const alreadyChosen = choices.some(
      (choice) => choice === clickedChoiceIndex
    );
    if (alreadyChosen) {
      recordItem.choice = choices.filter((choice) => {
        return choice !== clickedChoiceIndex;
      });
    } else {
      recordItem.choice = [...choices, clickedChoiceIndex];
    }
  }

  isOptionChosen(choiceIndex: number): boolean {
    const recordItem = this.currentRecordItem;
    if (recordItem === undefined) {
      return false;
    }
    const choices = recordItem.choice;
    if (choices === undefined) {
      throw Error("객관식 문항이 아닌 다른 유형에서 호출했습니다.");
    }
    return choices.some((choice) => choice === choiceIndex);
  }

  updateEssayRecordItem(inputEssay: String) {
    const recordItem = this.currentRecordItem;
    if (recordItem === undefined) {
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: this.currentItemIndex, essay: inputEssay },
      ];
    } else {
      recordItem.essay = inputEssay;
    }
  }

  /**
   * 현재 퀴즈의 작성된 단답식 답안을 반환한다.
   */
  getCurrentQuizEssay(): String {
    const recordItem = this.currentRecordItem;
    if (recordItem === undefined) {
      return "";
    }
    if (recordItem.essay === undefined) {
      throw Error("단답식이 아닌 문제에서 단답을 요구했습니다.");
    }
    return recordItem.essay;
  }

  moveToTheQuestion(clickedItemIndex: number) {
    this.currentItemIndex = clickedItemIndex;
  }
}

export default TakingQuizStore;
