import { Repository } from 'typeorm';
import { Role } from '../models/auth/Role.js';
import { AppDataSource } from '../config/data-source.js';

class RoleService {
  roleRepository: Repository<Role>;
  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  getRoleByValue(value: string) {
    return this.roleRepository.findOneBy({ value });
  }

  createRole(value: string) {
    const role = new Role();
    role.value = value;
    return this.roleRepository.save(role);
  }
}

export default new RoleService();
