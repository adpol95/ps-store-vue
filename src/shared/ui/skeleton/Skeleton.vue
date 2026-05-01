<script setup lang="ts">
interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    circle?: boolean;
}

defineOptions({ name: "BaseSkeleton" });

const props = withDefaults(defineProps<SkeletonProps>(), {
    width: "100%",
    height: "1rem",
    borderRadius: "4px",
    circle: false
});

const styles = {
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
    height: typeof props.height === "number" ? `${props.height}px` : props.height,
    borderRadius: props.circle
        ? "50%"
        : typeof props.borderRadius === "number"
          ? `${props.borderRadius}px`
          : props.borderRadius
};
</script>

<template>
    <div class="base-skeleton" :style="styles" />
</template>

<style scoped lang="scss">
.base-skeleton {
    display: block;
    background-color: var(--color-surface);
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.05) 20%,
            rgba(255, 255, 255, 0.1) 60%,
            rgba(255, 255, 255, 0)
        );
        animation: shimmer 2s infinite;
    }
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>
