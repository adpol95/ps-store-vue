<script setup lang="ts">
import { computed } from "vue";

defineOptions({
    name: "BaseButton"
});

const props = withDefaults(defineProps<ButtonProps>(), {
    as: "button",
    variant: "primary",
    size: "md"
});

interface ButtonProps {
    as?: string | object;
    variant?: "primary" | "danger" | "info" | "outline";
    size?: "sm" | "md" | "lg";
}

const buttonClasses = computed(() => [
    "base-button",
    `variant-${props.variant}`,
    `size-${props.size}`
]);
</script>

<template>
    <component :is="as" :class="buttonClasses">
        <slot />
    </component>
</template>

<style scoped lang="scss">
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    font-family: inherit;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.size-sm {
    padding: 6px 12px;
    font-size: 0.875rem;
}

.size-md {
    padding: 10px 20px;
    font-size: 1rem;
}

.size-lg {
    padding: 14px 28px;
    font-size: 1.125rem;
}

.variant-primary {
    background-color: var(--color-accent);
    color: white;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }
}

.variant-danger {
    background-color: var(--color-danger);
    color: white;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }
}

.variant-info {
    background-color: var(--color-info);
    color: white;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }
}

.variant-outline {
    background-color: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);

    &:hover:not(:disabled) {
        background-color: rgba(255, 255, 255, 0.05);
        border-color: var(--color-text);
    }
}
</style>
