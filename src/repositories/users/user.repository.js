import UserDTO from "../../dao/DTOs/user.dto.js";
export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUsers() {
    return await this.dao.getUsers();
  }

  async getUserById(id) {
    return await this.dao.getUserById(id);
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async createUser(user) {
    let userData = new UserDTO(user);
    return await this.dao.createUser(userData);
  }

  async updateUser(id, userData) {
    return await this.dao.updateUser(id, userData);
  }

  async deleteUser(id) {
    return await this.dao.deleteUser(id);
  }
}
