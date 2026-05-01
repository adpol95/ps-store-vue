<script setup lang="ts">
import { onMounted, onUnmounted, watch } from "vue";

interface ModalProps {
    title?: string;
    size?: "sm" | "md" | "lg" | "xl";
    closeOnOverlay?: boolean;
}

defineOptions({ name: "BaseModal" });

const props = withDefaults(defineProps<ModalProps>(), {
    title: "",
    closeOnOverlay: true,
    size: "md"
});

const emit = defineEmits<{
    close: [];
}>();

const model = defineModel<boolean>();

const close = () => {
    model.value = false;
    emit("close");
};

const onOverlayClick = (e: MouseEvent) => {
    if (props.closeOnOverlay && e.target === e.currentTarget) {
        close();
    }
};

const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape" && model.value) {
        close();
    }
};

watch(
    model,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    },
    { immediate: true }
);

onMounted(() => {
    window.addEventListener("keydown", handleEsc);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleEsc);
    document.body.style.overflow = "";
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
            <div v-if="model" class="modal-overlay" @click="onOverlayClick">
                <div
                    :class="['modal-content', `size-${size}`]"
                    role="dialog"
                    aria-modal="true"
                >
                    <header v-if="title || $slots.header" class="modal-header">
                        <slot name="header">
                            <h3 class="modal-title">{{ title }}</h3>
                        </slot>
                        <button
                            class="modal-close"
                            aria-label="Close modal"
                            @click="close"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </header>

                    <div class="modal-body">
                        <slot />
                    </div>

                    <footer v-if="$slots.footer" class="modal-footer">
                        <slot name="footer" />
                    </footer>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
}

.modal-content {
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    max-height: 90vh;
    width: 100%;
    position: relative;

    &.size-sm {
        max-width: 400px;
    }
    &.size-md {
        max-width: 600px;
    }
    &.size-lg {
        max-width: 800px;
    }
    &.size-xl {
        max-width: 1140px;
    }
}

.modal-header {
    padding: 1.25rem;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
}

.modal-close {
    background: transparent;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--color-text-muted);
    transition: color 0.2s;

    &:hover {
        color: var(--color-text);
    }

    svg {
        width: 24px;
        height: 24px;
    }
}

.modal-body {
    padding: 1.25rem;
    overflow-y: auto;
}

.modal-footer {
    padding: 1.25rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;

    .modal-content {
        transition: transform 0.3s ease;
    }
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;

    .modal-content {
        transform: translateY(-20px) scale(0.95);
    }
}
</style>
