<template>
  <header>
    <div class="flex justify-between px-10 py-3 border-b shadow-md">
      <router-link to="/dashboard" class="flex items-center">
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
              fill="#FFF"
            />
            <path
              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
              fill="#555AB9"
            />
            <path
              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
              fill="#91BAF8"
            />
          </g>
        </svg>
        <h1 class="text-xl font-bold">{{ title }}</h1>
      </router-link>
      <div class="flex">
        <AtFeedbackButton @submit="onFeedback" />
        <AppNotification :notifications="unReadNotifications" />
        <AppUserButton :notifications="unReadNotifications" @logout="$emit('logout')" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, inject } from "@vue/runtime-core";
import AppNotification from "./AppNotification.vue";
import AppUserButton from "./AppUserButton.vue";
import { AtFeedbackButton } from "atmosphere-ui";
import { useLumiere } from "lumiere-utils/useLumiere";

defineProps({
    title: {
      type: String,
    },
    user: {
      type: Object,
    },
});

defineEmits(['login', 'logout', 'createAccount']);

const { notifications, FeedbackProvider } = useLumiere();

const unReadNotifications = computed(() => {
  return notifications.value && notifications.value.filter((notification) => !notification.read_at)
})


const onFeedback = (feedback) => {
  FeedbackProvider.add(feedback)
}
</script>
