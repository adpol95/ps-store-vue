import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "./types";
import { authApi } from "../api/authApi";

const TOKEN_KEY = "ps_token";
const USER_KEY = "ps_user";

export const useUserStore = defineStore("user", () => {
    // ── State ─────────────────────────────────────────────────────────────
    const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));
    const currentUser = ref<User | null>(
        (() => {
            try {
                const raw = localStorage.getItem(USER_KEY);
                return raw ? (JSON.parse(raw) as User) : null;
            } catch {
                return null;
            }
        })(),
    );
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // ── Getters ───────────────────────────────────────────────────────────
    const isAuthenticated = computed(() => !!token.value && !!currentUser.value);

    // ── Helpers ───────────────────────────────────────────────────────────
    function persist(jwtToken: string, user: User) {
        token.value = jwtToken;
        currentUser.value = user;
        localStorage.setItem(TOKEN_KEY, jwtToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    function clearSession() {
        token.value = null;
        currentUser.value = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    // ── Actions ───────────────────────────────────────────────────────────
    async function login(userName: string, password: string) {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await authApi.login({ userName, password });
            persist(res.token, res.profile);
            // Mark user as online
            await authApi.updateUser(res.profile._id, { isOnline: true });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Login failed";
            error.value = msg;
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function register(payload: {
        userName: string;
        password: string;
        country: string;
        avatar: string;
        birthDay: string;
    }) {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await authApi.register(payload);
            // Auto-login after registration
            await login(payload.userName, payload.password);
            return res.profile;
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Registration failed";
            error.value = msg;
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    async function signOut() {
        if (currentUser.value) {
            try {
                // Mark as offline on backend (mirrors legacy behavior)
                await authApi.updateUser(currentUser.value._id, { isOnline: false });
            } catch {
                // Ignore – we still sign out locally
            }
        }
        clearSession();
    }

    async function updateProfile(patch: Partial<User>) {
        if (!currentUser.value) return;
        isLoading.value = true;
        error.value = null;
        try {
            const updated = await authApi.updateUser(currentUser.value._id, patch);
            currentUser.value = updated;
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Update failed";
            error.value = msg;
            throw err;
        } finally {
            isLoading.value = false;
        }
    }

    /** Refresh user data from server (e.g. after cart/friends change) */
    async function refreshUser() {
        if (!currentUser.value) return;
        try {
            const users = await authApi.getAllUsers();
            const fresh = users.find((u) => u._id === currentUser.value!._id);
            if (fresh) {
                currentUser.value = fresh;
                localStorage.setItem(USER_KEY, JSON.stringify(fresh));
            }
        } catch {
            // Silently ignore
        }
    }

    return {
        token,
        currentUser,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        signOut,
        updateProfile,
        refreshUser,
    };
});
