export interface BaseUser {
    name: string;
    email: string;
    city: string;
    state: string;
    zipcode: string;
}

export interface User extends BaseUser {
    id: number;
    balance: string;
    role: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest extends BaseUser {
    password: string;
}

export interface AuthResponse extends User {
    token: string;
}
