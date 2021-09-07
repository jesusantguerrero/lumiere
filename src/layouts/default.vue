<template>
    <Header title="Lumiere"  :user="AuthState.user" @logout="signOut" />
    <main class="px-10 mt-10">
        <slot />
    </main>
</template>

<script setup>
    import { AuthState, useAuth } from 'lumiere-utils';
    import Header from '../components/Header.vue';
    import { useRouter } from 'vue-router';

    const { push } = useRouter();
    const { logout } = useAuth();
    const goToHome = () => {
        push({ name: 'landing' })
    };
    
    const signOut = () => {
        logout(goToHome);
    }
</script>