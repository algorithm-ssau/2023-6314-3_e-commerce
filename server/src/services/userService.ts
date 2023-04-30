class UserService {
  register() {
    return 'register';
  }
  login() {
    return 'login';
  }
  loginAdmin() {
    return 'loginAdmin';
  }
  update() {
    return 'update';
  }
  delete() {
    return 'delete';
  }
}

export const userService = new UserService();
