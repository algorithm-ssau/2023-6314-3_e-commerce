import { User } from '../models/auth/User.js';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  avatarURL: string;
  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatarURL = user.avatarURL;
  }
}
