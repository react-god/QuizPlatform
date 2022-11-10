import { makeAutoObservable } from "mobx";
import { User } from "../mockup_data/user";
import UserRepository from "../repository/UserRepository";

class UserStore {
  #currentUser?: User = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get currentUser(): User | undefined {
    return this.#currentUser;
  }

  signUp(id: String, password: String, name: String) {
    this.#currentUser = UserRepository.signUp(id, password, name);
  }

  signIn(id: String, password: String) {
    this.#currentUser = UserRepository.signIn(id, password);
  }
}

export default UserStore;
