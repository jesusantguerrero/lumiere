<template>
    <Default>
        <AtInput v-model="form.title"/>
        <AtInput v-model="form.subtitle"/>
        <Editor v-model="form.text" class="px-5 py-5 mt-5 border rounded-md" />
        <div class="flex justify-end mt-5 space-x-2">
            <AtButton type="danger">Cancel</AtButton>
            <AtButton type="primary">Save</AtButton>
        </div>
    </Default>
</template>

<script setup>
    import Default from '../layouts/default.vue';
    import Editor from '../components/Editor.vue';
    import { reactive } from 'vue';
    import { AtButton, AtInput } from "atmosphere-ui";

    const form = reactive({
        title: '',
        subtitle: '',
        category: {}
    });
</script>