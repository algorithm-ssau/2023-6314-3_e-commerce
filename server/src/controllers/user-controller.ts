import { NextFunction, Request, Response } from 'express';
import userService from '../services/user-service.js';
import { CreateUserDto } from '../dtos/create-user.dto.js';
import { UpdateUserDto } from '../dtos/update-user.dto.js';
import { ResponseUserDto } from '../dtos/response-user.dto.js';

class UserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getOne(+id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { password, name, email, avatarURL } = req.body;
      const userDto = new CreateUserDto(password, name, email, avatarURL);

      const userData = await userService.register(userDto);

      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
    } catch (err) {
      next(err);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log('refreshToken');
      console.log(refreshToken);
      const userData = await userService.refreshToken(refreshToken);

      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.json({ accessToken: userData.tokens.accessToken, userInfo: userData.userInfo });
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      console.log('refreshToken in controller');
      console.log(refreshToken);
      const tokenData = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      res.json(tokenData);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.deleteOne(+req.params.id);
      res.json(new ResponseUserDto(user));
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, avatarURL } = req.body;
      const userDto = new UpdateUserDto(name, email, avatarURL);

      const updatedUser = await userService.updateOne(+req.params.id, userDto);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
