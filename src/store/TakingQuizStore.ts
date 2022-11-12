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
  /**현재 문제 번호에 대응하는 답안 QuizRecordItem index, choice나 essay 리턴 */
  get currentRecordItem(): QuizRecordItem | undefined {
    return this.answerRecord.items.find(
      (recordItem) => recordItem.index === this.currentItemIndex
    );
  }
  /**현재 문제 번호에 대응하는 답안 인덱스 리턴 */
  get currentRecordItemIndex(): number {
    return this.answerRecord.items.findIndex(
      (recordItem) => recordItem.index === this.currentItemIndex
    );
  }
  /**클릭된 객관식인덱스 인자로 받아서, 객관식 답안 업데이트. 빈 배열에서 추가해주고, 없애주고.   */
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
    const recordItemIndex = this.currentRecordItemIndex;
    if (alreadyChosen) {
      //이미 클릭된 index면
      this.answerRecord.items[recordItemIndex].choice = choices.filter(
        (choice) => {
          return choice !== clickedChoiceIndex; //false...?
        }
      );
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
    //currentTarget.value 받음.
    const recordItem = this.currentRecordItem; //지금 현재 레코드, 아무것도 안들어가있음
    const recordItemIndex = this.currentRecordItemIndex; //현재 레코드 인덱스
    console.log(inputEssay);
    //undefined이든 뭐가 들어가있든 간에 값은 계속 바뀌니까.
    if (recordItem === undefined) {
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: recordItemIndex, essay: inputEssay },
      ];
      console.log(this.answerRecord.items[this.currentItemIndex]);
    } else {
      //뭐라도 들어가있을 때
      recordItem.essay = inputEssay; //현재 essay 새로 갱신
      console.log(this.answerRecord.items[this.currentItemIndex]);
    }

    if (inputEssay === undefined) {
      throw Error("단답식 문항이 아닌 다른 유형에서 호출했습니다.");
    }
  }
  /** 현재 레코드아이템에 답안이 작성되어있는거 보여준다.*/
  showUpdatedEssay(currentItemIndex: number) {}

  moveToTheQuestion(clickedItemIndex: number) {
    this.currentItemIndex = clickedItemIndex;
  }
}

export default TakingQuizStore;
