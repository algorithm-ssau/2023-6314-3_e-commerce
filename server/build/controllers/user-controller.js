var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userService from '../services/user-service.js';
import { CreateUserDto } from '../dtos/create-user.dto.js';
import { UpdateUserDto } from '../dtos/update-user.dto.js';
import { ResponseUserDto } from '../dtos/response-user.dto.js';
class UserController {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getAll();
                res.json(users);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userService.getOne(+id);
                res.json(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, name, email, avatarURL } = req.body;
                const userDto = new CreateUserDto(password, name, email, avatarURL);
                const userData = yield userService.register(userDto);
                res.cookie('refreshToken', userData.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userData = yield userService.login(email, password);
                res.cookie('refreshToken', userData.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
            }
            catch (err) {
                next(err);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                console.log('refreshToken');
                console.log(refreshToken);
                const userData = yield userService.refreshToken(refreshToken);
                res.cookie('refreshToken', userData.tokens.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                });
                res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
            }
            catch (err) {
                next(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                console.log('refreshToken in controller');
                console.log(refreshToken);
                const tokenData = yield userService.logout(refreshToken);
                res.clearCookie('refreshToken');
                res.json(tokenData);
            }
            catch (err) {
                next(err);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService.deleteOne(+req.params.id);
                res.json(new ResponseUserDto(user));
            }
            catch (err) {
                next(err);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, avatarURL } = req.body;
                const userDto = new UpdateUserDto(name, email, avatarURL);
                const updatedUser = yield userService.updateOne(+req.params.id, userDto);
                res.json(updatedUser);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
export default new UserController();
//# sourceMappingURL=user-controller.js.map