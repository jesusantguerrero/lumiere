<template>
    <AtAuthBox>
        <AtAuthForm
            :form-data="formData"
            app-name="Supa Up"
            :is-loading="formData.isLoading"
            :mode="mode"
            @submit="onSubmit"
            @link-pressed="onLinkPressed"
            btn-class="mb-2 font-bold border-2 border-orange-400 rounded-md bg-gradient-to-br from-red-400 to-orange-500"
        >
          <template #brand>
            <div class="w-full transform">
                Lumiere UI
            </div>
          </template>
        </AtAuthForm>
      </AtAuthBox>
</template>

<script setup>
    import { nextTick, reactive } from 'vue';
    import { AtAuthBox, AtAuthForm } from 'atmosphere-ui';
    import { login, register } from '../../utils/useFirebase';
    import { useRouter } from 'vue-router';
    import config from '../../config';

    const props = defineProps({
        mode: {
            type: String,
            default: 'login',
        }
    })

    const formData = reactive({
        email: '',
        password: '',
        isLoading: false
    });

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
            formData.isLoading = false;
        }
    }

    
    const onLinkPressed = () => {
        const route = props.mode == 'login' ? 'register' : 'login';
        push(route);
    }
</script>