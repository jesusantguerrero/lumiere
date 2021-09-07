<template>
    <AtAuthBox>
        <AtAuthForm
            :is-loading="isLoading"
            :mode="mode"
            @submit="onSubmit"
            @link-pressed="onLinkPressed"
            btn-class="mb-2 font-bold border-2 border-orange-400 rounded-md bg-gradient-to-br from-red-400 to-orange-500"
        >
          <template #brand>
            <router-link :to="{name: 'landing'}" class="w-full font-light font-brand">
                Lumiere UI
            </router-link>
          </template>
        </AtAuthForm>
      </AtAuthBox>
</template>

<script setup>
    import { nextTick, ref } from 'vue';
    import { AtAuthBox, AtAuthForm } from 'atmosphere-ui';
    import { useAuth } from 'lumiere-utils';
    import { useRouter } from 'vue-router';
    import config from '../../config';

    const { login, register } = useAuth();
    
    const props = defineProps({
        mode: {
            type: String,
            default: 'login',
        }
    })

    const isLoading = ref(false);

    const authMethods = {
        login,
        register
    };

    const { push } = useRouter();
    const onSubmit = async (formData) => {
        try {
            await authMethods[props.mode](formData.email, formData.password);
            nextTick(() => {
                push({ name: config.home });
            })
        } catch (error) {
            alert(error.message);
        } finally {
            isLoading.value = false;
        }
    }

    
    const onLinkPressed = () => {
        const route = props.mode == 'login' ? 'register' : 'login';
        push(route);
    }
</script>