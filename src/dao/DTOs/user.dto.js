export default class UserDTO {
  constructor(user) {
    this.id = user.id || user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
  }
}
