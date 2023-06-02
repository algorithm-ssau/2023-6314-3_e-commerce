var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AppDataSource } from '../config/data-source.js';
import jwt from 'jsonwebtoken';
import { Token } from '../models/auth/Token.js';
import { User } from '../models/auth/User.js';
import ApiError from '../exceptions/ApiError.js';
class TokenService {
    constructor() {
        this.tokenRepository = AppDataSource.getRepository(Token);
        this.userRepository = AppDataSource.getRepository(User);
    }
    generateTokens(payload) {
        var _a, _b;
        const accessToken = jwt.sign(payload, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'secret', {
            expiresIn: '30m',
        });
        const refreshToken = jwt.sign(payload, (_b = process.env.REFRESH_TOKEN_SECRET) !== null && _b !== void 0 ? _b : 'secret', { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        };
    }
    saveRefreshToken(userId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneBy({ id: userId });
            if (!user)
                throw ApiError.NotFound(`User with id - ${userId} not found`);
            const prevToken = yield this.tokenRepository.findOneBy({ user });
            if (prevToken) {
                this.tokenRepository.remove(prevToken);
            }
            const refreshToken = new Token();
            refreshToken.value = token;
            refreshToken.user = user;
            this.tokenRepository.save(refreshToken);
        });
    }
    deleteToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenToRemove = yield this.findToken(token);
            if (!tokenToRemove)
                throw ApiError.NotFound("Token doesn't exist");
            return this.tokenRepository.remove(tokenToRemove);
        });
    }
    validateAccessToken(accessToken) {
        var _a;
        try {
            const userData = jwt.verify(accessToken, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'secret');
            return userData;
        }
        catch (err) {
            return null;
        }
    }
    validateRefreshToken(refreshToken) {
        var _a;
        try {
            const userData = jwt.verify(refreshToken, (_a = process.env.REFRESH_TOKEN_SECRET) !== null && _a !== void 0 ? _a : 'secret');
            return userData;
        }
        catch (err) {
            return null;
        }
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tokenRepository.findOneBy({ value: refreshToken });
        });
    }
}
export default new TokenService();
//# sourceMappingURL=token-service.js.map