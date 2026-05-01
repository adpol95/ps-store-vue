<script setup lang="ts">
interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    color?: string;
}

defineOptions({ name: "BaseSpinner" });

withDefaults(defineProps<SpinnerProps>(), {
    size: "md",
    color: "currentColor"
});
</script>

<template>
    <div :class="['base-spinner', `size-${size}`]" :style="{ color }">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    </div>
</template>

<style scoped lang="scss">
.base-spinner {
    display: inline-flex;
    animation: rotate 1s linear infinite;

    &.size-sm {
        width: 16px;
        height: 16px;
    }

    &.size-md {
        width: 24px;
        height: 24px;
    }

    &.size-lg {
        width: 32px;
        height: 32px;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
