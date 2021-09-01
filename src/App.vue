<template>
  <router-view />
</template>

<script setup>
import { nextTick, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import config from "./config";
import { avoidLoginRoutes } from  './router';
import { useSupabase } from "./utils/useSupabase";
import { AuthState, useAuth } from "./utils/useAuth";

const { initAuth } = useAuth(useSupabase(AuthState));
initAuth(avoidLoginRoutes.bind(null, useRoute()));
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
