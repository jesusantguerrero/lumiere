<template>
    <Header title="Lumiere"  :user="user" @logout="signOut" />
    <main class="px-10 mt-10">
        <slot />
    </main>
</template>

<script setup>
    import { useAuthState } from 'lumiere-utils/useAuth';
    import Header from '../components/Header.vue';
    import { useRouter } from 'vue-router';

    const { push } = useRouter();
    const goToHome = () => {
        push({ name: 'landing' })
    };
    const { provider: { logout }, user } = useAuthState()
    const signOut = () => {
        logout(goToHome);
    }
</script>