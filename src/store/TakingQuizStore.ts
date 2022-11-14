import { makeAutoObservable } from "mobx";
import { QuizRecord, QuizRecordItem } from "../mockup_data/quiz_record";

class TakingQuizStore {
  answerRecord: QuizRecord;
  currentQuizItemIndex: number = 0;

  constructor(quizId: String, candidateId: String) {
    this.answerRecord = {
      quizId: quizId,
      candidateId: candidateId,
      items: [],
    };
    makeAutoObservable(this);
  }

  private getRecordItemAt(quizItemIndex: number): QuizRecordItem | undefined {
    const index = this.answerRecord.items.findIndex(
      (recordItem) => recordItem.index === quizItemIndex
    );
    if (index === -1) {
      return undefined;
    }
    return this.answerRecord.items[index];
  }

  /**
   * 현재 문제 번호에 대응하는 답안 QuizRecordItem을 반환한다.
   *
   * 복사본이 아닌 참조를 반환한다.
   */
  getCurrentRecordItem(): QuizRecordItem | undefined {
    return this.getRecordItemAt(this.currentQuizItemIndex);
  }

  updateChoiceRecordItem(clickedChoiceIndex: number) {
    const recordItem = this.getCurrentRecordItem();

    if (recordItem === undefined) {
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: this.currentQuizItemIndex, choice: [clickedChoiceIndex] },
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
    const recordItem = this.getCurrentRecordItem();
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
    const recordItem = this.getCurrentRecordItem();
    if (recordItem === undefined) {
      this.answerRecord.items = [
        ...this.answerRecord.items,
        { index: this.currentQuizItemIndex, essay: inputEssay },
      ];
    } else {
      recordItem.essay = inputEssay;
    }
  }

  /**
   * 현재 퀴즈의 작성된 단답식 답안을 반환한다.
   */
  getCurrentQuizEssay(): String {
    const recordItem = this.getCurrentRecordItem();
    if (recordItem === undefined) {
      return "";
    }
    if (recordItem.essay === undefined) {
      throw Error("단답식이 아닌 문제에서 단답을 요구했습니다.");
    }
    return recordItem.essay;
  }

  moveToTheQuestion(clickedItemIndex: number) {
    this.currentQuizItemIndex = clickedItemIndex;
  }

  hasQuizRecordAt(quizItemIndex: number): boolean {
    const recordItem = this.getRecordItemAt(quizItemIndex);
    if (recordItem === undefined) {
      return false;
    }
    if (recordItem.essay !== undefined && recordItem.essay.length > 0) {
      return true;
    }
    if (recordItem.choice !== undefined && recordItem.choice.length > 0) {
      return true;
    }
    return false;
  }
}

export default TakingQuizStore;
