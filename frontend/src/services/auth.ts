import api from "./api";

type AuthPayload = {
    email?: string;
    username?: string;
    password: string;
};

export const registerRequest = async (data: AuthPayload) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};

export const loginRequest = async (data: AuthPayload) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};