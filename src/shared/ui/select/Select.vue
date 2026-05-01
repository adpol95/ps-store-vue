<script setup lang="ts">
import { computed, useId } from "vue";

defineOptions({
    name: "BaseSelect",
    inheritAttrs: false
});

const props = defineProps<SelectProps>();

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    options: Option[];
    label?: string;
    error?: string;
    disabled?: boolean;
    id?: string;
}

const model = defineModel<string | number>();

const generatedId = useId();
const selectId = computed(() => props.id ?? `select-${generatedId}`);
</script>

<template>
    <div
        class="base-select-root"
        :class="{ 'is-disabled': disabled, 'has-error': !!error }"
    >
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label v-if="label" :for="selectId" class="base-select-label">
            {{ label }}
        </label>

        <div class="base-select-container">
            <select
                :id="selectId"
                v-model="model"
                class="base-select"
                :disabled="disabled"
                v-bind="$attrs"
            >
                <option
                    v-for="option in options"
                    :key="option.value"
                    :value="option.value"
                >
                    {{ option.label }}
                </option>
            </select>
            <div class="select-arrow">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </div>
        </div>

        <span v-if="error" class="base-select-error">{{ error }}</span>
    </div>
</template>

<style scoped lang="scss">
.base-select-root {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;

    &.is-disabled {
        opacity: 0.6;
    }
}

.base-select-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
}

.base-select-container {
    position: relative;
    display: flex;
    align-items: center;
}

.base-select {
    width: 100%;
    padding: 10px 36px 10px 16px;
    font-size: 1rem;
    font-family: inherit;
    color: var(--color-text);
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    appearance: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px rgba(24, 183, 190, 0.2);
    }

    .has-error & {
        border-color: var(--color-danger);
    }

    &:disabled {
        cursor: not-allowed;
    }
}

.select-arrow {
    position: absolute;
    right: 12px;
    pointer-events: none;
    width: 16px;
    height: 16px;
    color: var(--color-text-muted);
}

.base-select-error {
    font-size: 0.875rem;
    color: var(--color-danger);
}

/* Стили для выпадающего списка в некоторых браузерах */
option {
    background-color: var(--color-bg);
    color: var(--color-text);
}
</style>
