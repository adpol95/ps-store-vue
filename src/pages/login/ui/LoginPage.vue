<script setup lang="ts">
import { LoginForm } from "@/features/auth-by-username";
import { MainLayout } from "@/shared/ui";
import { Header } from "@/widgets";
</script>

<template>
    <MainLayout>
        <template #header>
            <Header />
        </template>

        <div class="login-page">
            <LoginForm />
        </div>
    </MainLayout>
</template>

<style scoped lang="scss">
.login-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 20px;
}
</style>
