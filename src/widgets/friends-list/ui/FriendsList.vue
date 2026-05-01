<script setup lang="ts">
import { computed } from "vue";

import { useSessionStore } from "entities/session";

const sessionStore = useSessionStore();

const friends = computed(() => sessionStore.user?.friends || []);
</script>

<template>
    <div class="friends-list">
        <div class="friends-list__header">
            <h3>Friends</h3>
            <router-link to="/psn/friends/add" class="friends-list__add-link">
                Add new friends
            </router-link>
        </div>

        <div v-if="friends.length > 0" class="friends-list__grid">
            <router-link
                v-for="friend in friends"
                :key="friend._id"
                :to="`/psn/friends/${friend._id}`"
                class="friend-card"
            >
                <div class="friend-card__avatar-wrapper">
                    <img
                        :src="friend.avatar"
                        :alt="friend.userName"
                        class="friend-card__avatar"
                    />
                </div>
                <span class="friend-card__name">{{ friend.userName }}</span>
            </router-link>
        </div>

        <div v-else class="friends-list__empty">
            <p>You don't have any friends yet.</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.friends-list {
    background-color: var(--color-surface);
    border-radius: 16px;
    padding: 32px;
    box-shadow: var(--shadow-smooth);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;

        h3 {
            font-size: 1.5rem;
            margin: 0;
            color: var(--color-text);
        }
    }

    &__add-link {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
        padding: 8px 16px;
        border-radius: 8px;
        background-color: rgba(24, 183, 190, 0.1);
        transition: all 0.2s;

        &:hover {
            background-color: rgba(24, 183, 190, 0.2);
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 20px;
    }

    &__empty {
        text-align: center;
        padding: 40px;
        color: var(--color-text-muted);
        font-style: italic;
    }
}

.friend-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: transform 0.2s;
    padding: 12px;
    border-radius: 12px;

    &:hover {
        transform: translateY(-4px);
        background-color: rgba(255, 255, 255, 0.05);
    }

    &__avatar-wrapper {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid var(--color-border);
        box-shadow: var(--shadow-soft);
    }

    &__avatar {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__name {
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--color-text);
        text-align: center;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
