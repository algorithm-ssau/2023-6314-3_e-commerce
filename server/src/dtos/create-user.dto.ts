export class CreateUserDto {
  constructor(public password: string, public name: string, public email: string, public avatarURL: string) {}
}
