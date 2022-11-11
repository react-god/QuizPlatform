import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import { Quiz, QuizItem } from "../mockup_data/quiz";
import { QuizRecord, QuizRecordItem } from "../mockup_data/quiz_record";
import { User } from "../mockup_data/user";

const answerRecordItem: QuizRecordItem = {
  index: 0,
  essay: "",
  choice: [],
};

class TakingQuizStore {
  answerRecord: QuizRecord;
  currentItemIndex: number = 0; //문제번호 인덱스

  items: Array<QuizRecordItem> = [];

  constructor(quizId: String, candidateId: String) {
    this.answerRecord = {
      quizId: quizId,
      candidateId: candidateId,
      items: [answerRecordItem],
    };
    makeAutoObservable(this);
  }

  get currentRecordItem() {
    return this.answerRecord.items[this.currentItemIndex];
  }

  //퀴즈 답안 저장. QuizRecordItem 으로
  updateChoiceRecordItem(clickedChoiceIndex: number) {
    const recordItemList = this.answerRecord.items;
    const recordItem = recordItemList[this.currentItemIndex];

    if (recordItem === undefined) {
      //새로 레코드 추가해줘야하는 상태
      this.answerRecord.items = [
        ...recordItemList,
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
      recordItem.choice = choices.filter(
        (choice) => choice === clickedChoiceIndex
      );
    } else {
      recordItem.choice = [...choices, clickedChoiceIndex];
    }
  }

  updateEssayRecordItem() {}
  //퀴즈 답안 제출 quizID, candidateID, items 다 저장해서
  
  //옵션 선택되었을 때 true 반환
  isOptionChosen(choiceIndex:number, recordItem:QuizRecordItem):boolean {
    const choices = recordItem.choice;
    if (choices === undefined) {
        throw Error("객관식 문항이 아닌 다른 유형에서 호출했습니다.");
      }
    return choices.some(choice => choice === choiceIndex);
  }

}

export default TakingQuizStore;
