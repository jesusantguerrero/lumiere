<template>
  <router-view />
</template>

<script setup>
import { nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import config from "./config";
import { useFirebase } from "./utils/useFirebase";
import { AuthState, useAuth } from "./utils/useAuth";

useAuth(useFirebase());

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
