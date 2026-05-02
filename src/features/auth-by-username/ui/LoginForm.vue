<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useSessionStore } from "@/entities/session";
import { Button, Input } from "@/shared/ui";

import { loginByUsername, setOnlineStatus } from "../model/loginService";

const userName = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const sessionStore = useSessionStore();
const router = useRouter();

const handleSubmit = async () => {
    if (!userName.value || !password.value) {
        error.value = "Please fill in all fields";
        return;
    }

    isLoading.value = true;
    error.value = "";

    try {
        const { token, profile } = await loginByUsername(userName.value, password.value);

        // Update online status
        await setOnlineStatus(profile._id, true);

        sessionStore.setSession({ ...profile, isOnline: true }, token);

        router.push("/psn");
    } catch (err: any) {
        error.value =
            err.response?.data?.message || "Something went wrong. Try again later.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <form class="login-form" @submit.prevent="handleSubmit">
        <div class="login-form__header">
            <h3>SIGN IN</h3>
        </div>

        <div class="login-form__fields">
            <div class="login-form__field">
                <label for="username" class="visually-hidden">User name</label>
                <Input
                    id="username"
                    v-model="userName"
                    placeholder="User name"
                    :disabled="isLoading"
                    autocomplete="username"
                    required
                />
            </div>
            <div class="login-form__field">
                <label for="password" class="visually-hidden">Password</label>
                <Input
                    id="password"
                    v-model="password"
                    type="password"
                    placeholder="Password"
                    :disabled="isLoading"
                    autocomplete="current-password"
                    required
                />
            </div>
        </div>

        <div v-if="error" class="login-form__error">
            {{ error }}
        </div>

        <Button type="submit" class="login-form__submit" :disabled="isLoading">
            {{ isLoading ? "Loading..." : "Submit" }}
        </Button>

        <div class="login-form__footer">
            <h3>
                Don't have an account?
                <router-link to="/registration" class="login-form__link">
                    Register!
                </router-link>
            </h3>
        </div>
    </form>
</template>

<style scoped lang="scss">
.login-form {
    display: flex;
    flex-direction: column;
    gap: 24px;
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 32px;
    background-color: var(--color-surface);
    border-radius: 12px;
    box-shadow: var(--shadow-smooth);

    &__header {
        text-align: center;
        h3 {
            font-size: 1.5rem;
            color: var(--color-text);
            letter-spacing: 2px;
        }
    }

    &__fields {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__error {
        color: var(--color-danger);
        font-size: 0.875rem;
        text-align: center;
    }

    &__submit {
        width: 100%;
        margin-top: 8px;
    }

    &__footer {
        text-align: center;
        h3 {
            font-size: 0.9rem;
            font-weight: 400;
            color: var(--color-text-muted);
        }
    }

    &__link {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
