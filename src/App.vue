<template>
  <lumiere-provider :provider="useFirebase" :config="config">
    <router-view />
  </lumiere-provider>
</template>

<script setup>
  import config from "./config";
  import { LumiereProvider } from 'lumiere-utils'
  import { useFirebase } from 'lumiere-utils/useFirebase'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
