export default class Users {
  constructor() {
    this.users = [];
  }
  get = () => {
    return this.users;
  };
  createUser = (user) => {
    this.users.push(user);
    return user;
  };
  getUser = (id) => {
    return this.users.find((user) => user.id === id);
  };
  updateUser = (id, user) => {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user;
  };
}
