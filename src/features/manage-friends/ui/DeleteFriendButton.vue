<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { useSessionStore } from "entities/session";
import { deleteFriend, type User } from "entities/user";
import { Button } from "shared/ui";

interface Props {
    targetUser: User;
}

const props = defineProps<Props>();
const sessionStore = useSessionStore();
const router = useRouter();

const isFriend = computed(() => {
    return sessionStore.user?.friends.some((f: any) => f._id === props.targetUser._id);
});

const handleDeleteFriend = async () => {
    if (!sessionStore.user) return;

    if (
        !confirm(
            `Are you sure you want to remove ${props.targetUser.userName} from friends?`
        )
    ) {
        return;
    }

    try {
        const updatedFriends = sessionStore.user.friends.filter(
            (f: any) => f._id !== props.targetUser._id
        );

        // Delete for current user
        await deleteFriend(sessionStore.user._id, updatedFriends);

        // Delete for target user (legacy logic had this)
        const targetUpdatedFriends = props.targetUser.friends.filter(
            (f: any) => f._id !== sessionStore.user?._id
        );
        await deleteFriend(props.targetUser._id, targetUpdatedFriends);

        // Update local session
        sessionStore.setSession(
            { ...sessionStore.user, friends: updatedFriends },
            sessionStore.token!
        );

        alert("Friend removed");
        router.push("/psn");
    } catch (error) {
        console.error("Failed to delete friend:", error);
        alert("Failed to remove friend");
    }
};
</script>

<template>
    <div v-if="isFriend" class="manage-friends">
        <Button variant="danger" @click="handleDeleteFriend"> Remove Friend </Button>
    </div>
</template>

<style scoped lang="scss">
.manage-friends {
    display: flex;
    justify-content: center;
}
</style>
