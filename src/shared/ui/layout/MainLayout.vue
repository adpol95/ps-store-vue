<script setup lang="ts"></script>

<template>
    <div class="main-layout">
        <header class="main-layout__header">
            <slot name="header" />
        </header>
        <main class="main-layout__content">
            <slot />
        </main>
        <footer class="main-layout__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<style scoped lang="scss">
.main-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;

    &__content {
        flex: 1;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
        box-sizing: border-box;
    }

    &__header,
    &__footer {
        width: 100%;
    }
}
</style>
