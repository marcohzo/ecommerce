export default class UsersMemory {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  // Obtener todos los usuarios
  async getUsers() {
    return this.users;
  }

  // Crear un nuevo usuario
  async createUser(userData) {
    const user = { id: this.nextId++, ...userData };
    this.users.push(user);
    return user;
  }

  // Obtener un usuario por su ID
  async getUserById(id) {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }

  // Actualizar un usuario existente
  async updateUser(id, userData) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      this.users[index] = { ...this.users[index], ...userData };
      return this.users[index];
    } else {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  }

  // Eliminar un usuario
  async deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index >= 0) {
      const deletedUser = this.users.splice(index, 1)[0];
      return deletedUser;
    } else {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }
  }

  // Obtener un usuario por su email
  async getUserByEmail(email) {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
