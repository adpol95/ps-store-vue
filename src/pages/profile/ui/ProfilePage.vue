<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useSessionStore } from "entities/session";
import { getUserById, type User } from "entities/user";
import { DeleteFriendButton } from "features/manage-friends";
import { FriendsList } from "widgets/friends-list";
import { ProfileInfo } from "widgets/profile-info";

const route = useRoute();
const sessionStore = useSessionStore();
const visitedUser = ref<User | null>(null);
const isLoading = ref(false);

const fetchUser = async (id: string) => {
    if (id === sessionStore.user?._id) {
        visitedUser.value = null;
        return;
    }

    isLoading.value = true;
    try {
        visitedUser.value = await getUserById(id);
    } catch (error) {
        console.error("Failed to fetch user:", error);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    if (route.params.id) {
        fetchUser(route.params.id as string);
    }
});

watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            fetchUser(newId as string);
        } else {
            visitedUser.value = null;
        }
    }
);
</script>

<template>
    <div class="profile-page">
        <div class="profile-page__container">
            <div v-if="isLoading" class="profile-page__loader">
                <!-- Add a spinner here later -->
                Loading profile...
            </div>

            <template v-else>
                <ProfileInfo :user="visitedUser" />

                <!-- Only show friends list on own profile for now, 
             or maybe show visited user's friends? Legacy ProfileMainPage didn't show friends of others. -->
                <FriendsList v-if="!visitedUser" />

                <div v-if="visitedUser" class="profile-page__actions">
                    <DeleteFriendButton :target-user="visitedUser" />
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.profile-page {
    padding: 40px 20px;
    min-height: 100vh;

    &__container {
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 40px;
    }

    &__loader {
        text-align: center;
        padding: 100px;
        font-size: 1.25rem;
        color: var(--color-text-muted);
    }
}
</style>
