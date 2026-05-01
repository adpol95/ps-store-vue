<script setup lang="ts">
import { useId } from "vue";

defineOptions({
    name: "BaseCheckbox",
    inheritAttrs: false
});

const props = defineProps<CheckboxProps>();

interface CheckboxProps {
    label?: string;
    disabled?: boolean;
    id?: string;
}

const model = defineModel<boolean>();

const generatedId = useId();
const checkboxId = props.id ?? `checkbox-${generatedId}`;
</script>

<template>
    <label :for="checkboxId" class="base-checkbox" :class="{ 'is-disabled': disabled }">
        <div class="checkbox-container">
            <input
                :id="checkboxId"
                v-model="model"
                type="checkbox"
                class="checkbox-input"
                :disabled="disabled"
                v-bind="$attrs"
            />
            <div class="checkbox-box">
                <svg
                    class="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
        </div>
        <span v-if="label" class="checkbox-label">{{ label }}</span>
    </label>
</template>

<style scoped lang="scss">
.base-checkbox {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    user-select: none;

    &.is-disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
}

.checkbox-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.checkbox-input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    cursor: pointer;

    &:checked + .checkbox-box {
        background-color: var(--color-accent);
        border-color: var(--color-accent);

        .checkbox-icon {
            opacity: 1;
            transform: scale(1);
        }
    }

    &:focus-visible + .checkbox-box {
        box-shadow: 0 0 0 2px rgba(24, 183, 190, 0.4);
    }
}

.checkbox-box {
    width: 100%;
    height: 100%;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.checkbox-icon {
    width: 14px;
    height: 14px;
    color: white;
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.checkbox-label {
    font-size: 0.9rem;
    color: var(--color-text);
}
</style>
