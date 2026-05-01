<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({
    name: "BaseInput",
    inheritAttrs: false
});

const props = withDefaults(defineProps<InputProps>(), {
    type: "text",
    label: undefined,
    error: undefined,
    disabled: false,
    id: undefined
});

interface InputProps {
    type?: "text" | "password" | "email" | "number" | "tel" | "url";
    label?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
}

const model = defineModel<string | number>();

const generatedId = useId();
const inputId = computed(() => props.id ?? `input-${generatedId}`);
const errorId = computed(() => `error-${generatedId}`);
</script>

<template>
    <div
        class="base-input-root"
        :class="{ 'is-disabled': disabled, 'has-error': !!error }"
    >
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label v-if="label" :for="inputId" class="base-input-label">
            {{ label }}
        </label>

        <div class="base-input-container">
            <span v-if="$slots['left-icon']" class="base-input-icon left">
                <slot name="left-icon" />
            </span>

            <input
                :id="inputId"
                v-model="model"
                class="base-input"
                :type="type"
                :disabled="disabled"
                :aria-invalid="!!error"
                :aria-describedby="error ? errorId : undefined"
                v-bind="$attrs"
            />

            <span v-if="$slots['right-icon']" class="base-input-icon right">
                <slot name="right-icon" />
            </span>
        </div>

        <Transition name="fade">
            <span v-if="error" :id="errorId" class="base-input-error" role="alert">
                {{ error }}
            </span>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.base-input-root {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;

    &.is-disabled {
        opacity: 0.6;
    }
}

.base-input-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;

    .is-disabled & {
        cursor: not-allowed;
    }
}

.base-input-container {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px; // .5em from legacy
    box-shadow: var(--shadow-soft); // $smoothShadow from legacy
    transition: all 0.2s ease-in-out;

    &:focus-within {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px rgba(24, 183, 190, 0.2); // using --color-accent
    }

    .has-error & {
        border-color: var(--color-danger);
        box-shadow: 0 0 0 2px rgba(255, 94, 94, 0.2);
    }

    .is-disabled & {
        background-color: rgba(0, 0, 0, 0.1);
    }
}

.base-input-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    color: var(--color-text-muted);

    &.left {
        padding-right: 0;
    }

    &.right {
        padding-left: 0;
    }
}

.base-input {
    flex: 1;
    width: 100%;
    min-width: 0;
    padding: 10px 16px;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
        color: var(--color-text-muted);
    }

    &:disabled {
        cursor: not-allowed;
    }
}

.base-input-error {
    font-size: 0.875rem;
    color: var(--color-danger);
    margin-top: 2px;
}

// Transition for error message
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
