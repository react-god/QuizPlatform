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

  /** 클릭된 객관식인덱스 인자로 받아서, 객관식 답안 업데이트. 빈 배열에서 추가해주고, 없애주고.   */
  updateChoiceRecordItem(clickedChoiceIndex: number) {
    const recordItem = this.currentRecordItem;

    if (recordItem === undefined) {
      //기록이 안되어있으면
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: this.currentItemIndex, choice: [clickedChoiceIndex] }, //choice에 기록을 해준다.
      ];
      return;
    }
    const choices = recordItem.choice; //답안의 number[]
    if (choices === undefined) {
      //답안의 choices가 undefined다 -> essay라는 뜻이지.
      throw Error("객관식 문항이 아닌 다른 유형에서 호출했습니다.");
    }
    const alreadyChosen = choices.some(
      //true, false 리턴
      (choice) => choice === clickedChoiceIndex //choices 답안지의 choice가 클릭된 인덱스면 true.
    );
    if (alreadyChosen) {
      //이미 클릭된 index면
      recordItem.choice = choices.filter((choice) => {
        return choice !== clickedChoiceIndex; //false...?
      });
    } else {
      //이미 클릭된 index가 아니면
      recordItem.choice = [...choices, clickedChoiceIndex]; //추가 객관식 문항에 추가.
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
