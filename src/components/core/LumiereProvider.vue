<template>
<main>
    <slot />
</main>
</template>

<script setup>
import { provide, ref, watchEffect } from "vue";
import { AuthState } from "lumiere-utils";

const props = defineProps({
    provider: {
        type: Object,
        required: true
    }
});

const notifications = ref([])
const { Notifications } = props.provider

const fetchNotifications = async () => {
    notifications.value = await Notifications.getAll();
}

const updateNotification = (notificationId, notification) => {
    Notifications.update(notificationId, {
        user_uid: notification.user_uid,
        read_at: Notifications.getServerTime()
    })

    fetchNotifications();
}

watchEffect(async () => {
    if (Notifications && AuthState.user.id) {
        fetchNotifications();
    }
})

provide('notifications', notifications);
provide('updateNotification', updateNotification);
</script>
