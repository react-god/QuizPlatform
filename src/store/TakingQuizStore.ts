import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Quiz, QuizItem } from "../mockup_data/quiz";
import { QuizRecord, QuizRecordItem } from "../mockup_data/quiz_record";
import { User } from "../mockup_data/user";

class TakingQuizStore {
  answerRecord: QuizRecord;

  /**
   * 현재 퀴즈의 인덱스이다.
   */
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

  //퀴즈 답안 저장. QuizRecordItem 으로
  updateChoiceRecordItem(clickedChoiceIndex: number) {
    const recordItem = this.currentRecordItem;

    if (recordItem === undefined) {
      //새로 레코드 추가해줘야하는 상태
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
  //퀴즈 답안 제출 quizID, candidateID, items 다 저장해서

  //옵션 선택되었을 때 true 반환
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
}

export default TakingQuizStore;
