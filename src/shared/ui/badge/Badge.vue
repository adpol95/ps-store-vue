<script setup lang="ts">
interface BadgeProps {
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "sm" | "md";
}

defineOptions({ name: "BaseBadge" });

withDefaults(defineProps<BadgeProps>(), {
    variant: "primary",
    size: "md"
});
</script>

<template>
    <span :class="['base-badge', `variant-${variant}`, `size-${size}`]">
        <slot />
    </span>
</template>

<style scoped lang="scss">
.base-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 9999px;
    white-space: nowrap;
}

.size-sm {
    padding: 2px 8px;
    font-size: 0.7rem;
}

.size-md {
    padding: 4px 12px;
    font-size: 0.8rem;
}

.variant-primary {
    background-color: var(--color-accent);
    color: white;
}

.variant-secondary {
    background-color: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);
}

.variant-danger {
    background-color: var(--color-danger);
    color: white;
}

.variant-success {
    background-color: var(--color-success);
    color: white;
}

.variant-warning {
    background-color: var(--color-warning);
    color: white;
}
</style>
