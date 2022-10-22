import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { ClassRoom, room1, room2, room3 } from "../mockup_data/classroom";

class ClassRoomStore {
  rooms: ClassRoom[] = [room1, room2, room3];

  constructor() {
    makeAutoObservable(this);
  }

  addClassRoom(name: String, owner: String) {
    this.rooms = [
      ...this.rooms,
      { id: uuidv4(), name: name, owner: owner, quizs: [] },
    ];
  }

  removeClassRoom(classRoomId: String) {
    this.rooms = this.rooms.filter((room) => room.id !== classRoomId);
  }
}

export const classRoomStore = new ClassRoomStore();
