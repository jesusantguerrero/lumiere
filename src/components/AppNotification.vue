<template>
  <at-dropdown placement="bottom-end" :width="300" trigger="click">
    <template #trigger>
      <div
        class="relative flex p-2 text-sm font-bold text-gray-400 rounded-full cursor-pointer lg:text-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      > 
      <div class="w-5 h-5">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 448 512"><path d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29c0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29c-6 6.45-8.66 14.16-8.61 21.71c.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32c.05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42c0-.2-.06-.38-.06-.58c0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58c.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z" fill="currentColor"></path></svg>
      </div>
      <div
          class="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-400 rounded-full -bottom-2 -right-1"
          v-if="notifications.length"
        >
          {{ notifications.length }}
        </div>
      </div>
    </template>

    <template #content>
      <div class="p-3 text-sm notification-body w-80">
        <div
          class="flex items-center justify-between pb-2 font-bold text-center border-b"
        >
          <div>Notifications</div>
          <div>
            <router-link 
              v-if="false"
              :to="{name: 'settings'}"  
              class="px-2 py-1 transition rounded-sm hover:bg-gray-100 focus:outline-none">
              <i class="fas fa-sliders-h"></i> Manage preferences
            </router-link>
          </div>
        </div>
        <div class="divide-y">
          <notification-item
            v-for="notification in state.visibleNotifications"
            :key="notification.id"
            :notification="notification"
          />
          <router-link 
            v-if="state.seeMoreLength" 
            :to="{name: 'notifications'}"
            class="w-full py-2 font-bold text-center underline"
          >
            And {{ seeMoreLength }} more
          </router-link>
          <div class="flex items-center justify-center h-20" v-if="!notifications.length">
              You are up to date
          </div>
          <div class="w-full py-1">
            <router-link 
              :to="{name: 'notifications'}"
              class="block w-full py-2 text-center transition rounded-sm hover:bg-gray-100 focus:outline-none">
              See all notifications
            </router-link>  
          </div>
        </div>
      </div>
    </template>
  </at-dropdown>
</template>

<script setup>
import { computed, reactive } from 'vue'
import NotificationItem from './AppNotificationItem.vue'
import { AtDropdown } from "atmosphere-ui";

const props = defineProps({
      notifications: {
          type: Array,
          default() {
              return []
          }
      }
})

const notificationsToShow = 5;
    
const state = reactive({
  visibleNotifications: computed(() => {
    return props.notifications.slice(0, notificationsToShow);
  }),
  seeMoreLength: computed(() => {
    return props.notifications.slice(notificationsToShow).length;
  })
});
</script>
