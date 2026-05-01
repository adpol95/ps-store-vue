import { z } from "zod";

// ── Zod schemas ───────────────────────────────────────────────────────────────

export const FriendRequestSchema = z.object({
    from: z.string(),
    status: z.enum(["pending", "accepted", "rejected"]).default("pending"),
});

export const UserSchema = z.object({
    _id: z.string(),
    userName: z.string(),
    country: z.string(),
    avatar: z.string(),
    birthDay: z.string(),
    friends: z.array(z.string()),
    reqForFriends: z.record(z.string(), FriendRequestSchema),
    isOnline: z.boolean(),
    favorite: z.record(z.string(), z.unknown()),
    cart: z.array(z.string()),
    ownership: z.record(z.string(), z.unknown()),
    wallet: z.number(),
    solved: z.record(z.string(), z.unknown()),
});

export const LoginResponseSchema = z.object({
    token: z.string(),
    user: UserSchema,
});

// ── TypeScript types ──────────────────────────────────────────────────────────

export type User = z.infer<typeof UserSchema>;
export type FriendRequest = z.infer<typeof FriendRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
