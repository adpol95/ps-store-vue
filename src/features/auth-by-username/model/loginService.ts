import type { User } from "entities/user";
import { axiosInstance } from "shared/api";

interface LoginResponse {
    token: string;
    profile: User;
}

export interface RegisterPayload {
    userName: string;
    password?: string;
    country: string;
    avatar: string;
    birthDay: string;
    cart: any[];
}

export async function loginByUsername(
    userName: string,
    password: string
): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>("/authorization/login", {
        userName,
        password
    });

    return response.data;
}

export async function register(payload: RegisterPayload): Promise<void> {
    await axiosInstance.post("/authorization", payload);
}

export async function setOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    await axiosInstance.patch(`/authorization/${userId}`, {
        isOnline
    });
}
