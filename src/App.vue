<template>
  <router-view />
</template>

<script setup>
import { nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import config from "./config";
import { firebaseState } from "./utils/useFirebase";

const { push } = useRouter();
watch(() => firebaseState.user, (user) => {
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
