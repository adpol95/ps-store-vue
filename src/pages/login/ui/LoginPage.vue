<script setup lang="ts">
import { LoginForm } from "features/auth-by-username";
</script>

<template>
    <div class="login-page">
        <LoginForm />
    </div>
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
