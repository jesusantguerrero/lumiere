<template>
    The dashboard
    <AtButton type="primary" @click="logout()"> Logout </AtButton>
</template>

<script setup>
    import { logout } from '../utils/useFirebase';
    import { AtButton } from 'atmosphere-ui';
</script>