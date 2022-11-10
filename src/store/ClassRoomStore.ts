import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { ClassRoom } from "../mockup_data/classroom";
import {
  readJsonFromLocalStorage,
  writeJsonToLocalStorage,
} from "../util/JsonUtil";
import userStore from "./UserStore";

const CLASS_ROOM_KEY = "class_rooms";

class ClassRoomStore {
  private _rooms: ClassRoom[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get invitedRooms(): ClassRoom[] {
    const currentUser = userStore.currentUser;
    if (currentUser === undefined) {
      return [];
    }
    const invitedRoomIds = currentUser.invitedClassRooms;
    const rooms = this._rooms.filter((room) =>
      invitedRoomIds.some((id) => id === room.id)
    );
    return rooms;
  }

  get allRooms(): ClassRoom[] {
    return this._rooms;
  }

  fetchClassRooms() {
    this._rooms = readJsonFromLocalStorage<ClassRoom[]>(CLASS_ROOM_KEY) ?? [];
  }

  createClassRoom(name: String) {
    const currentUser = userStore.currentUser;
    if (currentUser === undefined) {
      throw Error("로그인 하지 않은 상태로 퀴즈 생성 시도함.");
    }
    const newClassRoom: ClassRoom = {
      id: uuidv4(),
      name: name,
      owner: currentUser.name,
      quizs: [],
    };
    this._rooms = [...this._rooms, newClassRoom];
    userStore.joinClassRoom(newClassRoom.id);
    writeJsonToLocalStorage(CLASS_ROOM_KEY, this._rooms);
  }

  removeClassRoom(classRoomId: String) {
    this._rooms = this._rooms.filter((room) => room.id !== classRoomId);
    writeJsonToLocalStorage(CLASS_ROOM_KEY, this._rooms);
  }
}
//TODO: classRoom interface에서 owener 저따구로 하면큰일남
export const classRoomStore = new ClassRoomStore();
