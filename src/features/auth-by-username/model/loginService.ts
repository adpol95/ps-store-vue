import type { User } from "entities/user";
import { axiosInstance } from "shared/api";

interface LoginResponse {
    token: string;
    profile: User;
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

export async function setOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    await axiosInstance.patch(`/authorization/${userId}`, {
        isOnline
    });
}
