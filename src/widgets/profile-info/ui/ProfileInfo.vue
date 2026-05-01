<script setup lang="ts">
import { computed } from "vue";

import { useSessionStore } from "entities/session";
import type { User } from "entities/user";

interface Props {
    user?: User | null;
}

const props = defineProps<Props>();
const sessionStore = useSessionStore();

const profileUser = computed(() => props.user || sessionStore.user);

const formattedBirthday = computed(() => {
    if (!profileUser.value?.birthDay) return "";
    return profileUser.value.birthDay.trimEnd().replace(/\s/gi, ".");
});
</script>

<template>
    <div v-if="profileUser" class="profile-info">
        <div class="profile-info__header">
            <div class="profile-info__avatar-wrapper">
                <img
                    :src="profileUser.avatar"
                    :alt="profileUser.userName"
                    class="profile-info__avatar"
                />
                <div
                    class="profile-info__status-dot"
                    :class="{ 'is-online': profileUser.isOnline }"
                    :title="profileUser.isOnline ? 'Online' : 'Offline'"
                ></div>
            </div>

            <div class="profile-info__main-details">
                <h2 class="profile-info__name">{{ profileUser.userName }}</h2>
                <div class="profile-info__meta">
                    <span class="profile-info__country">{{ profileUser.country }}</span>
                    <span class="profile-info__divider">•</span>
                    <span class="profile-info__birthday"
                        >Born: {{ formattedBirthday }}</span
                    >
                </div>
                <div class="profile-info__stats">
                    <div class="profile-info__stat">
                        <span class="profile-info__stat-value">{{
                            profileUser.friends.length
                        }}</span>
                        <span class="profile-info__stat-label">Friends</span>
                    </div>
                    <div class="profile-info__stat">
                        <span class="profile-info__stat-value"
                            >${{ profileUser.wallet }}</span
                        >
                        <span class="profile-info__stat-label">Wallet</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="profile-info__content">
            <div class="profile-info__section">
                <h3>Library</h3>
                <div class="profile-info__library-grid">
                    <div class="profile-info__library-category">
                        <h4>Games</h4>
                        <ul>
                            <li
                                v-for="game in profileUser.ownership.games"
                                :key="game._id"
                            >
                                {{ game.name }}
                            </li>
                            <li
                                v-if="profileUser.ownership.games.length === 0"
                                class="is-empty"
                            >
                                No games yet
                            </li>
                        </ul>
                    </div>
                    <div class="profile-info__library-category">
                        <h4>Consoles</h4>
                        <ul>
                            <li
                                v-for="console in profileUser.ownership.consoles"
                                :key="console._id"
                            >
                                {{ console.name }}
                            </li>
                            <li
                                v-if="profileUser.ownership.consoles.length === 0"
                                class="is-empty"
                            >
                                No consoles yet
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="profile-info__section">
                <h3>Favorites</h3>
                <div class="profile-info__favorites">
                    <div class="profile-info__fav-studios">
                        <h4>Favorite Studios</h4>
                        <div class="profile-info__tags">
                            <span
                                v-for="studio in profileUser.favorite.studios"
                                :key="studio"
                                class="profile-info__tag"
                            >
                                {{ studio }}
                            </span>
                            <span
                                v-if="profileUser.favorite.studios.length === 0"
                                class="is-empty"
                            >
                                No favorite studios
                            </span>
                        </div>
                    </div>

                    <div class="profile-info__fav-games">
                        <h4>Favorite Games</h4>
                        <div class="profile-info__game-thumbs">
                            <img
                                v-for="game in profileUser.favorite.games"
                                :key="game._id"
                                :src="game.img"
                                class="profile-info__game-thumb"
                                alt="Favorite game"
                            />
                            <span
                                v-if="profileUser.favorite.games.length === 0"
                                class="is-empty"
                            >
                                No favorite games
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.profile-info {
    background-color: var(--color-surface);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-smooth);
    color: var(--color-text);

    &__header {
        display: flex;
        gap: 32px;
        padding: 40px;
        background: linear-gradient(
            135deg,
            rgba(24, 183, 190, 0.1) 0%,
            rgba(0, 0, 0, 0) 100%
        );
        border-bottom: 1px solid var(--color-border);

        @media (max-width: 600px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
    }

    &__avatar-wrapper {
        position: relative;
        flex-shrink: 0;
    }

    &__avatar {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--color-surface);
        box-shadow: var(--shadow-smooth);
    }

    &__status-dot {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: var(--color-danger);
        border: 3px solid var(--color-surface);

        &.is-online {
            background-color: #4ade80; // Green
            box-shadow: 0 0 12px rgba(74, 222, 128, 0.5);
        }
    }

    &__main-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 12px;
    }

    &__name {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
    }

    &__meta {
        display: flex;
        gap: 12px;
        color: var(--color-text-muted);
        font-size: 0.95rem;
    }

    &__stats {
        display: flex;
        gap: 24px;
        margin-top: 8px;
    }

    &__stat {
        display: flex;
        flex-direction: column;
    }

    &__stat-value {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-accent);
    }

    &__stat-label {
        font-size: 0.8rem;
        color: var(--color-text-muted);
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    &__content {
        padding: 40px;
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    &__section {
        h3 {
            font-size: 1.25rem;
            margin-bottom: 20px;
            color: var(--color-text-muted);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
    }

    &__library-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 32px;
    }

    &__library-category {
        h4 {
            font-size: 1rem;
            margin-bottom: 12px;
            color: var(--color-text);
            font-weight: 600;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;

            li {
                font-size: 0.95rem;
                color: var(--color-text);
                padding-left: 16px;
                position: relative;

                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 6px;
                    height: 6px;
                    background-color: var(--color-accent);
                    border-radius: 50%;
                }
            }
        }
    }

    &__favorites {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    &__tag {
        background-color: rgba(24, 183, 190, 0.1);
        color: var(--color-accent);
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 500;
    }

    &__game-thumbs {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__game-thumb {
        width: 60px;
        height: 80px;
        object-fit: cover;
        border-radius: 8px;
        box-shadow: var(--shadow-smooth);
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.1);
        }
    }

    .is-empty {
        color: var(--color-text-muted);
        font-style: italic;
        font-size: 0.9rem;
    }
}
</style>
