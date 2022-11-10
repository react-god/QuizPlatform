import { makeAutoObservable } from "mobx";
import { User } from "../mockup_data/user";
import {
  writeJsonToLocalStorage,
  readJsonFromLocalStorage,
} from "../util/JsonUtil";

const USER_KEY = "users";

class UserStore {
  #currentUser?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get currentUser(): User | undefined {
    return this.#currentUser;
  }

  /**
   * 회원가입을 한다.
   *
   * 이미 동일한 ID로 가입된 회원이 있는 경우 예외를 던진다.
   */
  signUp(id: String, password: String, name: String) {
    const users = readJsonFromLocalStorage<Array<User>>(USER_KEY) ?? [];

    if (users.some((user) => user.id === id)) {
      throw Error("이미 존재하는 ID 입니다.");
    }
    this.#currentUser = {
      id: id,
      password: password,
      name: name,
      invitedClassRooms: [],
    };
    const newUsers: User[] = [...users, this.#currentUser];
    writeJsonToLocalStorage(USER_KEY, newUsers);
    return this.#currentUser;
  }

  /**
   * 로그인을 시도한다.
   *
   * 로그인에 성공하면 currentUser에 유저 정보가 초기화된다.
   *
   * 존재하지 않는 ID를 입력하거나 비밀번호가 잘못된 경우 예외를 던진다.
   */
  signIn(id: String, password: String) {
    const users: User[] = readJsonFromLocalStorage<User[]>(USER_KEY) ?? [];
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
      throw Error("존재하지 않는 ID 입니다.");
    }
    if (user.password !== password) {
      throw Error("비밀번호가 잘못되었습니다.");
    }
    return (this.#currentUser = user);
  }
}

const userStore = new UserStore();

export default userStore;
