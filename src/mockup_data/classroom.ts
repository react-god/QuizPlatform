import { Quiz, quiz1 } from "./quiz";

export interface ClassRoom {
  id: String;
  name: String;
  owner: String;
  quizs: Array<Quiz>;
}

const room1: ClassRoom = {
  id: "516dd7ca",
  name: "네트워크 프로그래밍",
  owner: "정인환 교수님",
  quizs: [quiz1],
};

const room2: ClassRoom = {
  id: "becaedb2",
  name: "웹프레임워크1",
  owner: "박승현 교수님",
  quizs: [],
};

const room3: ClassRoom = {
  id: "e2bce93c",
  name: "UC Berkeley Mathematic 101",
  owner: "Andrew Ng",
  quizs: [],
};

export { room1, room2, room3 };
