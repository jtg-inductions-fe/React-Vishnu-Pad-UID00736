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
    balance: number;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthResponse extends User {
    token: string;
}

export type LoginFormData = LoginRequest;
export type RegisterFormData = RegisterRequest;
