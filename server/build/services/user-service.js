var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/auth/User.js';
import { AppDataSource } from '../config/data-source.js';
import ApiError from '../exceptions/ApiError.js';
import bcrypt from 'bcrypt';
import tokenService from './token-service.js';
import roleService from './role-service.js';
import { ResponseUserDto } from '../dtos/response-user.dto.js';
class UserService {
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return users.map((user) => new ResponseUserDto(user));
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id });
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${id} `);
            return new ResponseUserDto(user);
        });
    }
    updateOne(id, userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id });
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${id} `);
            const userToUpdate = Object.assign(Object.assign({}, user), userDto);
            yield this.userRepository.save(userToUpdate);
            const updatedUser = yield this.userRepository.findOneBy({ id });
            if (!updatedUser)
                throw ApiError.InternalError('Updated user not found');
            return new ResponseUserDto(updatedUser);
        });
    }
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id });
            if (!user)
                throw ApiError.NotFound(`Not found user with id ${id} `);
            return this.userRepository.remove(user);
        });
    }
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('before this.userRepository.findOne');
            const exists = yield this.userRepository.findOneBy({ email: userDto.email });
            if (exists)
                throw ApiError.BadRequest(`User with email - ${userDto.email} already exists`);
            const user = new User();
            user.name = userDto.name;
            user.email = userDto.email;
            user.avatarURL = userDto.avatarURL;
            const hashedPassword = yield bcrypt.hash(userDto.password, 3);
            user.password = hashedPassword;
            const userRole = yield roleService.getRoleByValue('USER');
            if (!userRole)
                throw ApiError.InternalError('Role not found');
            user.roles = [userRole];
            console.log('before');
            const savedUser = yield this.userRepository.save(user);
            console.log('after');
            const tokens = tokenService.generateTokens({ id: savedUser.id, roles: savedUser.roles.map((r) => r.value) });
            tokenService.saveRefreshToken(savedUser.id, tokens.refreshToken);
            const userInfo = new ResponseUserDto(savedUser);
            return { tokens, userInfo };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email }, relations: { roles: true } });
            if (!user)
                throw ApiError.BadRequest(`Email or password is invalid.`);
            const passwordsEqual = yield bcrypt.compare(password, user.password);
            if (!passwordsEqual)
                throw ApiError.BadRequest(`Email or password is invalid.`);
            const tokens = tokenService.generateTokens({ id: user.id, roles: user.roles.map((r) => r.value) });
            tokenService.saveRefreshToken(user.id, tokens.refreshToken);
            const userInfo = new ResponseUserDto(user);
            return { tokens, userInfo };
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                throw ApiError.UnauthorizedError();
            }
            const userData = tokenService.validateRefreshToken(token);
            const tokenFromDB = tokenService.findToken(token);
            if (!userData || !tokenFromDB) {
                throw ApiError.UnauthorizedError();
            }
            const user = yield this.userRepository.findOne({
                where: { id: userData.id },
                relations: {
                    roles: true,
                },
            });
            if (!user)
                throw ApiError.UnauthorizedError();
            const tokens = tokenService.generateTokens({ id: user.id, roles: user.roles.map((r) => r.value) });
            yield tokenService.saveRefreshToken(user.id, tokens.refreshToken);
            const userInfo = new ResponseUserDto(user);
            return { tokens, userInfo };
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('refreshToken');
            console.log(refreshToken);
            const tokenData = yield tokenService.deleteToken(refreshToken);
            return tokenData;
        });
    }
}
export default new UserService();
//# sourceMappingURL=user-service.js.map