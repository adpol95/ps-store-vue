import { axiosInstance } from "shared/api";

import type { User } from "./types";

export async function getUserById(id: string): Promise<User> {
    // Legacy uses search with name, but it might also support GET /authorization/:id
    // Let's try to find if there is a specific endpoint.
    // ProfileMainPage uses /authorization/search with name.
    // AddNewFriend uses /authorization to get all.

    const response = await axiosInstance.get<User>(`/authorization/${id}`);
    return response.data;
}

export async function searchUsers(name: string): Promise<User[]> {
    const response = await axiosInstance.post<User[]>("/authorization/search", { name });
    return response.data;
}

export async function getAllUsers(): Promise<User[]> {
    const response = await axiosInstance.get<User[]>("/authorization");
    return response.data;
}

export async function sendFriendRequest(
    userId: string,
    currentUser: User
): Promise<void> {
    await axiosInstance.patch(`/authorization/${userId}`, {
        reqForFriends: currentUser
    });
}

export async function deleteFriend(
    currentUserId: string,
    updatedFriends: any[]
): Promise<void> {
    await axiosInstance.patch(`/authorization/${currentUserId}`, {
        friends: updatedFriends
    });
}
