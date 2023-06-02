export interface IUser {
  id: number;
  name: string;
  email: string;
  avatarURL: string;
}

export interface ApiResponse {
  data: {
    accessToken: string;
    userInfo: IUser;
  };
}

export type AuthState = IUser & { accessToken: string; roles: string[] };

export type TokenPayload = {
  id: number;
  roles: string[];
};

export type UserResponse = {
  id: number;
  name: string;
  email: string;
};

export type ProductResponse = {
  name: string;
  price: number;
  material: string;
  fineness: number;
  discount: number;
  count: number;
  category: string;
  photoUrl: string;
  size?: number;
};
