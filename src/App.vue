<template>
  <lumiere-provider :provider="provider">
    <router-view />
  </lumiere-provider>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { avoidLoginRoutes } from  './router';
import { useSupabase } from "lumiere-utils/useSupabase"
import { AuthState, useAuth } from "lumiere-utils/useAuth";
import config from "./config";
import { nextTick, watch } from "@vue/runtime-core";
import LumiereProvider from "./components/core/LumiereProvider.vue";

const provider = useSupabase(AuthState, config)

const { initAuth } = useAuth(provider);
initAuth(avoidLoginRoutes.bind(null, useRoute()));

const { push } = useRouter();
watch(() => AuthState.user, (user, oldUser) => {
  nextTick(() => {
    if (oldUser) {
      const route = useRoute();
      avoidLoginRoutes(route, user)
    }
  })
}, { deep: true });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
