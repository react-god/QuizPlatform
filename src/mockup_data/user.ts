export interface User {
  id: String;
  password: String;
  name: String;
  invitedClassRooms: String[];
}

const user1: User = {
  id: "jja08111",
  password: "password",
  name: "김민성",
  invitedClassRooms: [],
};

const user2: User = {
  id: "admin",
  password: "password",
  name: "정시현",
  invitedClassRooms: [],
};

const user3: User = {
  id: "siroo",
  password: "password",
  name: "권대현",
  invitedClassRooms: [],
};

const user4: User = {
  id: "eunseo",
  password: "password",
  name: "곽은서",
  invitedClassRooms: [],
};

export { user1, user2, user3, user4 };
