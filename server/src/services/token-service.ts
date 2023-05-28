import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source.js';
import jwt from 'jsonwebtoken';
import { Token } from '../models/auth/Token.js';
import { User } from '../models/auth/User.js';
import ApiError from '../exceptions/ApiError.js';
import { TokenPayload } from '../types/index.js';

class TokenService {
  tokenRepository: Repository<Token>;
  userRepository: Repository<User>;
  constructor() {
    this.tokenRepository = AppDataSource.getRepository(Token);
    this.userRepository = AppDataSource.getRepository(User);
  }

  generateTokens(payload: TokenPayload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET ?? 'secret', {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET ?? 'secret', { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveRefreshToken(userId: number, token: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw ApiError.NotFound(`User with id - ${userId} not found`);

    const prevToken = await this.tokenRepository.findOneBy({ user });
    if (prevToken) {
      this.tokenRepository.remove(prevToken);
    }

    const refreshToken = new Token();
    refreshToken.value = token;
    refreshToken.user = user;
    this.tokenRepository.save(refreshToken);
  }

  async deleteToken(token: string) {
    const tokenToRemove = await this.findToken(token);
    if (!tokenToRemove) throw ApiError.NotFound("Token doesn't exist");

    return this.tokenRepository.remove(tokenToRemove);
  }

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET ?? 'secret');
      return userData as TokenPayload;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET ?? 'secret');
      return userData as TokenPayload;
    } catch (err) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    return this.tokenRepository.findOneBy({ value: refreshToken });
  }
}

export default new TokenService();
