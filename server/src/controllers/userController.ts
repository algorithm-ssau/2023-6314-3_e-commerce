import { userService } from '../services/userService.js';

class UserController {
  register() {
    return userService.register();
  }
  login() {
    return userService.login();
  }
  loginAdmin() {
    return userService.loginAdmin();
  }
  update() {
    return userService.update();
  }
  delete() {
    return userService.delete();
  }
}

export const userController = new UserController()