<template>
    <div class="p-4" :class="classes">
        <div class="flex">
            <div> </div>
            <h4 class="font-bold"> {{ title }}</h4>
        </div>
        <div class="mt-4 text-gray-500">
            {{ description }}
        </div>
        <div class="space-x-2 actions">   
            <AtButton :type="action.type || 'primary'" v-for="action in actions"> 
                {{ action.label }}
            </AtButton>
        </div>
    </div>
</template>

<script setup>
import { AtButton } from "atmosphere-ui"
defineProps({
    classes: {
        type: String,
        default: 'border rounded-md'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    actions: {
        type: Array,
        default() {
            return [];
        }
    }
})

</script>