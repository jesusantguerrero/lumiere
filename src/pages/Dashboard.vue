<template>
    <Header title="Lumiere"  user="firebaseState.user" @logout="logout" />
    <main class="px-10 mt-10">
        The dashboard
    </main>
</template>

<script setup>
    import { logout, firebaseState } from '../utils/useFirebase';
    import { AtButton } from 'atmosphere-ui';
    import Header from '../components/Header.vue';
</script>