import {
  Quiz,
  quiz1,
  quiz2,
  quiz3,
  quiz4,
  quiz5,
  quiz6,
  quiz7,
  quiz8,
  quiz9,
} from "./quiz";
import { user1 } from "./user";

export interface ClassRoom {
  id: String;
  name: String;
  ownerId: String;
  quizs: Array<Quiz>;
}

const room1: ClassRoom = {
  id: "516dd7ca",
  name: "네트워크 프로그래밍",
  ownerId: user1.id,
  quizs: [quiz1, quiz2, quiz3],
};

const room2: ClassRoom = {
  id: "becaedb2",
  name: "웹프레임워크1",
  ownerId: user1.id,
  quizs: [quiz4, quiz5, quiz6],
};

const room3: ClassRoom = {
  id: "e2bce93c",
  name: "UC Berkeley Mathematic 101",
  ownerId: user1.id,
  quizs: [quiz7, quiz8, quiz9],
};

export { room1, room2, room3 };
