import { computed, ref } from "vue";
import { defineStore } from "pinia";

import type { User } from "./types";

export const useSessionStore = defineStore("session", () => {
    const user = ref<User | null>(JSON.parse(localStorage.getItem("user") || "null"));
    const token = ref<string | null>(localStorage.getItem("token"));

    const isAuth = computed(() => !!token.value);

    function setSession(newUser: User, newToken: string) {
        user.value = newUser;
        token.value = newToken;
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", newToken);
    }

    function clearSession() {
        user.value = null;
        token.value = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return {
        user,
        token,
        isAuth,
        setSession,
        clearSession
    };
});
