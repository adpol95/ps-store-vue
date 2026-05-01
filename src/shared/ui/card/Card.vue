<script setup lang="ts">
interface CardProps {
    padding?: string | number;
    shadow?: boolean;
    hoverable?: boolean;
}

defineOptions({ name: "BaseCard" });

const props = withDefaults(defineProps<CardProps>(), {
    padding: "1rem",
    shadow: true,
    hoverable: false
});

const styles = {
    padding: typeof props.padding === "number" ? `${props.padding}px` : props.padding
};
</script>

<template>
    <div
        class="base-card"
        :class="{ 'has-shadow': shadow, 'is-hoverable': hoverable }"
        :style="styles"
    >
        <slot />
    </div>
</template>

<style scoped lang="scss">
.base-card {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 12px;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &.has-shadow {
        box-shadow: var(--shadow-soft);
    }

    &.is-hoverable:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
}
</style>
