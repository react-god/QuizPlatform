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

  get currentRecordItem(): QuizRecordItem | undefined {
    return this.answerRecord.items.find(
      (recordItem) => recordItem.index === this.currentItemIndex
    );
  }

  get currentRecordItemIndex(): number {
    return this.answerRecord.items.findIndex(
      (recordItem) => recordItem.index === this.currentItemIndex
    );
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
    const recordItemIndex = this.currentRecordItemIndex;
    if (alreadyChosen) {
      this.answerRecord.items[recordItemIndex].choice = choices.filter(
        (choice) => {
          return choice !== clickedChoiceIndex;
        }
      );
    } else {
      recordItem.choice = [...choices, clickedChoiceIndex];
    }
  }

  updateEssayRecordItem() {}

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

  moveToTheQuestion(clickedItemIndex: number) {
    this.currentItemIndex = clickedItemIndex;
  }
}

export default TakingQuizStore;
