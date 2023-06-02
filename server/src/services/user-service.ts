import { Repository } from 'typeorm';
import { User } from '../models/auth/User.js';
import { AppDataSource } from '../config/data-source.js';
import { UpdateUserDto } from '../dtos/update-user.dto.js';
import { CreateUserDto } from '../dtos/create-user.dto.js';
import ApiError from '../exceptions/ApiError.js';
import bcrypt from 'bcrypt';
import tokenService from './token-service.js';
import roleService from './role-service.js';
import { ResponseUserDto } from '../dtos/response-user.dto.js';

class UserService {
  userRepository: Repository<User>;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAll() {
    const users = await this.userRepository.find();

    return users.map((user) => new ResponseUserDto(user));
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw ApiError.NotFound(`Not found user with id ${id} `);

    return new ResponseUserDto(user);
  }

  async updateOne(id: number, userDto: Partial<UpdateUserDto>) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw ApiError.NotFound(`Not found user with id ${id} `);

    const userToUpdate: User = { ...user, ...userDto };

    await this.userRepository.save(userToUpdate);

    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) throw ApiError.InternalError('Updated user not found');

    return new ResponseUserDto(updatedUser);
  }

  async deleteOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw ApiError.NotFound(`Not found user with id ${id} `);

    return this.userRepository.remove(user);
  }

  async register(userDto: CreateUserDto) {
    console.log('before this.userRepository.findOne');
    const exists = await this.userRepository.findOneBy({ email: userDto.email });
    // const exists = await this.userRepository.findOneBy({ email: userDto.email });
    if (exists) throw ApiError.BadRequest(`User with email - ${userDto.email} already exists`);

    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.avatarURL = userDto.avatarURL;

    const hashedPassword = await bcrypt.hash(userDto.password, 3);
    user.password = hashedPassword;

    const userRole = await roleService.getRoleByValue('USER');
    if (!userRole) throw ApiError.InternalError('Role not found');
    user.roles = [userRole];
    console.log('before');
    const savedUser = await this.userRepository.save(user);
    console.log('after');

    // probably will be error because roles = undefined
    const tokens = tokenService.generateTokens({ id: savedUser.id, roles: savedUser.roles.map((r) => r.value) });

    tokenService.saveRefreshToken(savedUser.id, tokens.refreshToken);
    // TODO: make sure that token can be accessed through user entity
    // I'm not sure about this because relation created via tokenRepository
    const userInfo = new ResponseUserDto(savedUser);
    return { tokens, userInfo };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email }, relations: { roles: true } });
    if (!user) throw ApiError.BadRequest(`Email or password is invalid.`);

    const passwordsEqual = await bcrypt.compare(password, user.password);
    if (!passwordsEqual) throw ApiError.BadRequest(`Email or password is invalid.`);

    const tokens = tokenService.generateTokens({ id: user.id, roles: user.roles.map((r) => r.value) });

    tokenService.saveRefreshToken(user.id, tokens.refreshToken);
    // TODO: make sure that token can be accessed through user entity
    // I'm not sure about this because relation created via tokenRepository
    const userInfo = new ResponseUserDto(user);
    return { tokens, userInfo };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(token);
    const tokenFromDB = tokenService.findToken(token);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.id },
      relations: {
        roles: true,
      },
    });

    if (!user) throw ApiError.UnauthorizedError();

    const tokens = tokenService.generateTokens({ id: user.id, roles: user.roles.map((r) => r.value) });
    await tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    const userInfo = new ResponseUserDto(user);
    return { tokens, userInfo };
  }

  async logout(refreshToken: string) {
    console.log('refreshToken');
    console.log(refreshToken);
    const tokenData = await tokenService.deleteToken(refreshToken);
    return tokenData;
  }
}

export default new UserService();
