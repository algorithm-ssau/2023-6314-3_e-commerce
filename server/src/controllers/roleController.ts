import { roleService } from '../services/roleService.js';

class RoleController {
  create() {
    return roleService.create();
  }
  getRoleByValue() {
    return roleService.getRoleByValue();
  }
  delete() {
    return roleService.delete();
  }
}

export const roleController = new RoleController();
