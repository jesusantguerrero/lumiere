<template>
  <div 
    class="px-5 py-3 cursor-pointer hover:bg-gray-50"
    :class="{'bg-gray-200': !notification.read_at}"
    @click="runNotificationAction(notification)"
>
    <span class="font-bold" v-if="notification.title">{{ notification.title }}:</span> {{ notification.message }}
</div>
</template>

<script setup>
import { inject } from "@vue/runtime-core";

const props = defineProps({
    notification: {
        type: Object,
        required: true
    }
});

const updateNotification = inject('updateNotification', {})
const runNotificationAction = async (notification) => {
    updateNotification(notification.id, notification);
}
</script>