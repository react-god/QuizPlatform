import { User } from "../mockup_data/user";
import {
  writeJsonToLocalStorage,
  readJsonFromLocalStorage,
} from "../util/JsonUtil";

const USER_KEY = "./data/users.json";

/**
 * 회원가입을 한다.
 *
 * 이미 동일한 ID로 가입된 회원이 있는 경우 예외를 던진다.
 */
const signUp = (id: String, password: String, name: String): User => {
  const users = readJsonFromLocalStorage<Array<User>>(USER_KEY) ?? [];

  if (users.some((user) => user.id === id)) {
    throw Error("이미 존재하는 ID 입니다.");
  }
  const user: User = {
    id: id,
    password: password,
    name: name,
    invitedClassRooms: [],
  };
  const newUsers: User[] = [...users, user];
  writeJsonToLocalStorage(USER_KEY, newUsers);
  return user;
};

/**
 * 로그인을 시도한다.
 *
 * 로그인에 성공하면 currentUser에 유저 정보가 초기화된다.
 *
 * 존재하지 않는 ID를 입력하거나 비밀번호가 잘못된 경우 예외를 던진다.
 */
const signIn = (id: String, password: String): User => {
  const users: User[] = readJsonFromLocalStorage<User[]>(USER_KEY) ?? [];
  const user = users.find((user) => user.id === id);
  if (user === undefined) {
    throw Error("존재하지 않는 ID 입니다.");
  }
  if (user.password !== password) {
    throw Error("비밀번호가 잘못되었습니다.");
  }
  return user;
};

export default { signUp, signIn };
