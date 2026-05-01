<script setup lang="ts">
import { AppHeader } from "widgets/header";
import { AppFooter } from "widgets/footer";
</script>

<template>
    <div class="app-layout">
        <AppHeader />
        <main class="app-layout__main" id="main-content">
            <router-view v-slot="{ Component, route }">
                <Transition name="fade" mode="out-in">
                    <component :is="Component" :key="route.path" />
                </Transition>
            </router-view>
        </main>
        <AppFooter />
    </div>
</template>

<style scoped lang="scss">
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    &__main {
        flex: 1;
        padding-top: var(--header-height);
    }
}
</style>
