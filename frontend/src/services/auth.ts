import api from "./api";

type LoginData = {
    email?: string;
    username?: string;
    password: string;
};

type RegisterData = {
    email: string;
    username: string;
    password: string;
};

export const loginRequest = async (data: LoginData) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const registerRequest = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};