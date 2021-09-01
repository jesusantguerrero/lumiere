<template>
  <router-view />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { avoidLoginRoutes } from  './router';
import { useFirebase, AuthState, useAuth } from "./utils/lumiere-utils";
import config from "./config";
import { nextTick, watch } from "@vue/runtime-core";

const { initAuth } = useAuth(useFirebase(AuthState));
initAuth(avoidLoginRoutes.bind(null, useRoute()));

const { push } = useRouter();
watch(() => AuthState.user, (user) => {
  nextTick(() => {
    push({ name: user ? config.home : 'landing' });
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
