<script setup lang="ts">
import { computed } from "vue";

// 1. Описываем пропсы
interface Props {
    as?: string | object; // Может быть строкой ('button', 'a') или компонентом
    variant?: "primary" | "danger" | "info";
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
    variant: "primary"
});

// 2. Вычисляем классы (аналог твоего cn из примера)
const buttonClasses = computed(() => ["btn", `btn__${props.variant}`]);
</script>

<template>
    <component :is="props.as" :class="buttonClasses">
        <slot />
    </component>
</template>

<style scoped>
.btn {
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.btn__primary {
    background-color: var(--color-accent);
    color: white;
}

.btn__danger {
    background-color: var(--color-danger);
    color: white;
}

.btn__info {
    background-color: var(--color-info);
    color: white;
}
</style>
