import { axiosInstance } from "shared/api/axios";
import type { User } from "../model/types";

export interface LoginPayload {
    userName: string;
    password: string;
}

export interface RegisterPayload {
    userName: string;
    password: string;
    country: string;
    avatar: string;
    birthDay: string;
}

export interface LoginApiResponse {
    message: string;
    token: string;
    refToken: string;
    profile: User;
}

export const authApi = {
    /** POST /authorization/login */
    login: async (payload: LoginPayload): Promise<LoginApiResponse> => {
        const { data } = await axiosInstance.post<LoginApiResponse>(
            "/authorization/login",
            payload,
        );
        return data;
    },

    /** POST /authorization — create new user */
    register: async (payload: RegisterPayload): Promise<{ message: string; profile: User }> => {
        const { data } = await axiosInstance.post<{ message: string; profile: User }>(
            "/authorization",
            payload,
        );
        return data;
    },

    /** PATCH /authorization/:id — update user fields */
    updateUser: async (id: string, patch: Partial<User>): Promise<User> => {
        const { data } = await axiosInstance.patch<User>(`/authorization/${id}`, patch);
        return data;
    },

    /** GET /authorization — get all users (for friend search) */
    getAllUsers: async (): Promise<User[]> => {
        const { data } = await axiosInstance.get<User[]>("/authorization");
        return data;
    },

    /** POST /authorization/search */
    searchFriend: async (query: string): Promise<User[]> => {
        const { data } = await axiosInstance.post<User[]>("/authorization/search", { query });
        return data;
    },

    /** DELETE /authorization/:id */
    deleteUser: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/authorization/${id}`);
    },
};
