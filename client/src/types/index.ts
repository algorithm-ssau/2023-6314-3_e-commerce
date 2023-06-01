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
