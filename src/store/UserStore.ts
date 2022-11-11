import { makeAutoObservable } from "mobx";
import { User } from "../mockup_data/user";
import {
  writeJsonToLocalStorage,
  readJsonFromLocalStorage,
} from "../util/JsonUtil";
import { classRoomStore } from "./ClassRoomStore";

const USER_KEY = "users";

class UserStore {
  private _currentUser?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get currentUser(): User | undefined {
    return this._currentUser;
  }

  /**
   * 회원가입을 한다.
   *
   * 이미 동일한 ID로 가입된 회원이 있는 경우 예외를 던진다.
   */
  signUp(id: String, password: String, name: String): User {
    const users = readJsonFromLocalStorage<Array<User>>(USER_KEY) ?? [];

    if (users.some((user) => user.id === id)) {
      throw Error("이미 존재하는 ID 입니다.");
    }
    this._currentUser = {
      id: id,
      password: password,
      name: name,
      invitedClassRooms: [],
    };
    const newUsers: User[] = [...users, this._currentUser];
    writeJsonToLocalStorage(USER_KEY, newUsers);
    return this._currentUser;
  }

  /**
   * 로그인을 시도한다.
   *
   * 로그인에 성공하면 currentUser에 유저 정보가 초기화된다.
   *
   * 존재하지 않는 ID를 입력하거나 비밀번호가 잘못된 경우 예외를 던진다.
   */
  signIn(id: String, password: String): User {
    const users: User[] = readJsonFromLocalStorage<User[]>(USER_KEY) ?? [];
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
      throw Error("존재하지 않는 ID 입니다.");
    }
    if (user.password !== password) {
      throw Error("비밀번호가 잘못되었습니다.");
    }
    return (this._currentUser = user);
  }

  /**
   * 퀴즈에 참여한다.
   *
   * 로그인되지 않은 상태로 시도하면 에러를 던진다.
   *
   * 해당 클래스가 존재하지 않는 경우 에러를 던진다.
   */
  joinClassRoom(classRoomId: String) {
    const currentUser = this.currentUser;
    if (currentUser === undefined) {
      throw Error("로그인하지 않은 상태로 퀴즈 참여함.");
    }

    const existsRoom = classRoomStore.allRooms.some(
      (room) => room.id === classRoomId
    );
    if (!existsRoom) {
      throw Error("해당 코드와 일치하는 클래스가 없습니다.");
    }

    const alreadyJoin = currentUser.invitedClassRooms.some(
      (id) => id === classRoomId
    );
    if (alreadyJoin) {
      throw Error("이미 참여중인 클래스입니다.");
    }

    const users: User[] = readJsonFromLocalStorage<User[]>(USER_KEY) ?? [];
    this._currentUser = {
      ...currentUser,
      invitedClassRooms: [...currentUser.invitedClassRooms, classRoomId],
    };
    const newUsers = [
      ...users.filter((user) => currentUser.id !== user.id),
      this._currentUser,
    ];
    writeJsonToLocalStorage(USER_KEY, newUsers);
  }

  getUserById(id: String): User | undefined {
    const users: User[] = readJsonFromLocalStorage<User[]>(USER_KEY) ?? [];
    return users.find((user) => user.id === id);
  }
}

const userStore = new UserStore();

export default userStore;
