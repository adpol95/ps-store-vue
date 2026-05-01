import type { User } from "entities/user";

export type { User };

export interface SessionState {
    user: User | null;
    token: string | null;
    isAuth: boolean;
}
