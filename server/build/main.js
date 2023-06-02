var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { config } from 'dotenv';
config();
import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { AppDataSource } from './config/data-source.js';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import userRouter from './routers/user-router.js';
import errorHandler from './middlewares/errorHandler.js';
import productRouter from './routers/product-router.js';
import path from 'path';
const app = express();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'dist', 'index.html')));
app.use(errorHandler);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield AppDataSource.initialize();
            app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));
        }
        catch (err) {
            console.log(err);
        }
    });
}
start();
//# sourceMappingURL=main.js.map