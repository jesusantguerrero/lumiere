<template>
    <Header title="Lumiere"  :user="AuthState.user" @logout="logout" />
    <main class="px-10 mt-10">
        The dashboard
    </main>
</template>

<script setup>
    import { AuthState, useAuth } from '../utils/useAuth';
    import Header from '../components/Header.vue';
    const { logout } = useAuth();
</script>