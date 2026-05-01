<script setup lang="ts">
import { reactive, ref } from "vue";
import { Calendar, Check, Globe, Lock, User as UserIcon } from "lucide-vue-next";
import { useRouter } from "vue-router";

import { useCartStore } from "@/entities/cart";
import { COUNTRIES } from "@/entities/cart/model/calculateShipAndTax";
import { useSessionStore } from "@/entities/session";
import type { User } from "@/entities/user";
import {
    loginByUsername,
    register,
    setOnlineStatus
} from "@/features/auth-by-username/model/loginService";
import { MainLayout } from "@/shared/ui";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Header } from "@/widgets";

const router = useRouter();
const sessionStore = useSessionStore();
const cartStore = useCartStore();

const AVATARS = [
    "https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/XlkEcZSBzuJPIJo8BI7l0KuY0hBYrO8c.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/6eTP4WXtViqk8T0NIBjBrVwAxm3U2JQS.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP0151/CUSA09971_00/FEs8B2BDAudxV3js6SM2t4vZ88vnxSi0.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/EcOWnY3ulhHtxTOVRV14jbPjwflUQ4Mr.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/ST5jC9mZSY0yjVkc1mL8RcNRTPxSfA1H.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP2719/CUSA06152_00/0tf7muX8S4hgHD8l9GHE3NNmGvBpzRWU.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/vrBGaVVgpY2pFetQAjauhla5mchYNosT.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP0001/CUSA04459_00/axTqMXvInz119015LgZO4ciQnGGGkJnv.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/wQYnx73VVaaHKanoA4EI44j6KxwO4eAj.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP0001/CUSA04459_00/LzLAQ7BLLNXEBFFHYhGhnalUfJkdVooV.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/RRKe40N3KzlGpPaLK8zl6pl3QdK8Rwqw.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1018/CUSA00133_00/j6zdnNELgfKqeI2XhuKkRuMxGJPiBsmg.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP4497/CUSA00527_00/39sZiJDryiW9jCc6FrXvSM5Qb1utkr8C.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP9000/CUSA07820_00/NAoBeXb9Oidhc63TZlaLjatQ53XiJ0q0.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1477/CUSA07022_00/tymPJQOSSD50hoEvo5Jib3SxPMSgeTD9.png?w=440&thumb=false",
    "https://image.api.playstation.com/cdn/UP1477/CUSA07022_00/PkJtF0kuB89EXe1TbbfWSFHV1N3dQGoM.png?w=440&thumb=false"
];

const countryOptions = COUNTRIES.map((c) => ({ label: c, value: c }));
const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1)
}));
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: String(i + 1),
    value: String(i + 1)
}));
const yearOptions = Array.from({ length: 125 }, (_, i) => ({
    label: String(2024 - i),
    value: String(2024 - i)
}));

const form = reactive({
    userName: "",
    password: "",
    country: "Argentina",
    birthDay: {
        day: "",
        month: "",
        year: ""
    },
    avatar: AVATARS[0]
});

const isLoading = ref(false);
const error = ref<string | null>(null);

const handleRegister = async () => {
    isLoading.value = true;
    error.value = null;

    try {
        const birthDayStr = `${form.birthDay.day} ${form.birthDay.month} ${form.birthDay.year} `;

        const payload = {
            userName: form.userName,
            password: form.password,
            country: form.country,
            avatar: form.avatar,
            birthDay: birthDayStr,
            cart: cartStore.items.map((i) => {
                const item = i.item as any;
                return {
                    title: item.title || item.name,
                    img: item.img || item.image,
                    amount: i.quantity,
                    _id: item._id,
                    type: item.type,
                    Age: item.Age,
                    Price: item.Price || item.price
                };
            })
        };

        await register(payload);

        // Auto login
        const loginResponse = await loginByUsername(form.userName, form.password);
        const userProfile = loginResponse.profile as any;
        sessionStore.setSession(loginResponse.token, {
            ...(userProfile as User),
            isOnline: true
        });
        await setOnlineStatus(userProfile._id, true);

        alert("Congratulations! Account created.");
        router.push("/psn");
    } catch (e: any) {
        error.value = e.response?.data || "Registration failed. Try again.";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="registration-page">
            <div class="container narrow">
                <header class="registration-page__header">
                    <h1>REGISTRATION</h1>
                    <p>Create your PlayStation Network account</p>
                </header>

                <form class="registration-form" @submit.prevent="handleRegister">
                    <section class="registration-form__section">
                        <h2 class="section-title">Type about yourself</h2>

                        <div class="form-group">
                            <label for="country-select">
                                <Globe :size="18" /> Country/Region
                            </label>
                            <Select
                                id="country-select"
                                v-model="form.country"
                                :options="countryOptions"
                                aria-label="Select country"
                            />
                        </div>

                        <div class="form-group">
                            <div class="field-label">
                                <Calendar :size="18" /> Date of Birth
                            </div>
                            <div class="birthdate-grid">
                                <Select
                                    v-model="form.birthDay.day"
                                    :options="dayOptions"
                                    placeholder="Day"
                                    aria-label="Birth day"
                                />
                                <Select
                                    v-model="form.birthDay.month"
                                    :options="monthOptions"
                                    placeholder="Month"
                                    aria-label="Birth month"
                                />
                                <Select
                                    v-model="form.birthDay.year"
                                    :options="yearOptions"
                                    placeholder="Year"
                                    aria-label="Birth year"
                                />
                            </div>
                            <p class="field-hint">
                                Make sure you enter your date of birth correctly. It may
                                be necessary later for security purposes.
                            </p>
                        </div>

                        <div class="form-group">
                            <label for="nickname-input"
                                ><UserIcon :size="18" /> Your nickname</label
                            >
                            <Input
                                id="nickname-input"
                                v-model="form.userName"
                                placeholder="Enter nickname"
                                required
                            />
                        </div>

                        <div class="form-group">
                            <label for="password-input"
                                ><Lock :size="18" /> Create your password</label
                            >
                            <Input
                                id="password-input"
                                v-model="form.password"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </section>

                    <section class="registration-form__section">
                        <h2 class="section-title">Choose your avatar</h2>
                        <div class="avatar-grid">
                            <button
                                v-for="url in AVATARS"
                                :key="url"
                                type="button"
                                class="avatar-item"
                                :class="{ active: form.avatar === url }"
                                @click="form.avatar = url"
                            >
                                <img :src="url" alt="Avatar option" />
                                <div v-if="form.avatar === url" class="active-badge">
                                    <Check :size="14" />
                                </div>
                            </button>
                        </div>
                    </section>

                    <div v-if="error" class="registration-error">
                        {{ error }}
                    </div>

                    <Button type="submit" class="register-submit" :disabled="isLoading">
                        {{ isLoading ? "Creating profile..." : "Create profile" }}
                    </Button>
                </form>
            </div>
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.registration-page {
    padding: 3rem 0 6rem;
    color: white;

    &__header {
        text-align: center;
        margin-bottom: 4rem;
        h1 {
            font-size: 3rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            margin-bottom: 0.5rem;
        }
        p {
            color: var(--color-text-muted);
            font-size: 1.1rem;
        }
    }
}

.narrow {
    max-width: 700px;
}

.registration-form {
    background: var(--color-surface);
    padding: 3rem;
    border-radius: 2.5em;
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: 4rem;

    &__section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-accent);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field-label,
.form-group label {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.65rem;
    color: var(--color-text-muted);
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.birthdate-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr;
    gap: 1.25rem;
}

.field-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    line-height: 1.4;
}

.avatar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 1.25rem;
}

.avatar-item {
    aspect-ratio: 1;
    border-radius: 1.25rem;
    overflow: hidden;
    background: var(--color-bg);
    border: 2px solid transparent;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:hover {
        transform: scale(1.05);
        border-color: rgba(var(--color-accent-rgb), 0.3);
    }

    &.active {
        border-color: var(--color-accent);
        box-shadow: 0 0 20px rgba(24, 183, 190, 0.4);
    }
}

.active-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    background: var(--color-accent);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.registration-error {
    background: rgba(255, 94, 94, 0.1);
    color: var(--color-danger);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 94, 94, 0.2);
    text-align: center;
}

.register-submit {
    width: 100%;
    padding: 1.5rem;
    font-size: 1.25rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}
</style>
