<template>
<div>
    <FeatureCard
        classes="border-b"
        :icon="icon" 
        :title="title" 
        :description="description"
        :actions="actions" 
    />
</div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import FeatureCard from "./FeatureCard.vue";


const props = defineProps({
    icon: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    isEnabled: {
        type: Boolean
    },
    link: {
        type: String
    }
})

const actions = computed(() => {
    return [
        {
            label: !props.isEnabled ? 'Open' : 'Enabled',
            link: '/'
        }
    ]
})
</script>