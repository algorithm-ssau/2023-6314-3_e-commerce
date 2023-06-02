var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
export function authGuard(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : req.headers.Authorization;
        if (!(typeof authHeader === 'string') || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
            return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, (_b = process.env.ACCESS_TOKEN_SECRET) !== null && _b !== void 0 ? _b : 'secret');
            req.userId = payload.id;
            req.roles = payload.roles;
            next();
        }
        catch (err) {
            return res.sendStatus(403);
        }
    });
}
//# sourceMappingURL=authGuard.js.map