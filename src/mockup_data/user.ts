export interface User {
  id: String;
  password: String;
  name: String;
}

const user1: User = {
  id: "jja08111@email.com",
  password: "password",
  name: "김민성",
};

const user2: User = {
  id: "admin@email.com",
  password: "password",
  name: "정시현",
};

const user3: User = {
  id: "siroo@email.com",
  password: "password",
  name: "권대현",
};

const user4: User = {
  id: "eunseo@email.com",
  password: "password",
  name: "곽은서",
};

export { user1, user2, user3, user4 };
