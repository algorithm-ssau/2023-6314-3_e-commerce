import { Role } from '../models/auth/Role.js';
import { AppDataSource } from '../config/data-source.js';
class RoleService {
    constructor() {
        this.roleRepository = AppDataSource.getRepository(Role);
    }
    getRoleByValue(value) {
        return this.roleRepository.findOneBy({ value });
    }
    createRole(value) {
        const role = new Role();
        role.value = value;
        return this.roleRepository.save(role);
    }
}
export default new RoleService();
//# sourceMappingURL=role-service.js.map