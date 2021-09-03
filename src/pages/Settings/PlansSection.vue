<template>
<div class="flex">
    <div class="w-32">
        <p class="px-2 font-bold text-gray-500">Billing cicle</p>
        <AtFieldCheck label="Yearly" v-model="state.isYearly" class="mt-2" />
    </div>
    <div class="grid w-full grid-cols-3 px-20 ">
        <AtPlanCardFlat v-for="plan in plans" v-bind="plan" :amount="!state.isYearly ? plan.amount : plan.yearly" />
    </div>
</div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { AtPlanCardFlat, AtFieldCheck } from "atmosphere-ui";

defineProps({
    plans: {
        type: Array,
    },
    hasYearPlan: {
        type: Boolean
    }
})

const state = reactive({
    isYearly: false
})
</script>