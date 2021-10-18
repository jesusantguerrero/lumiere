<template>
<div class="flex">
    <div class="w-32">
        <p class="px-2 font-bold text-gray-500">Billing cicle</p>
        <AtFieldCheck label="Yearly" v-model="state.isYearly" class="mt-2" />
    </div>
    <div class="grid w-full grid-cols-3 gap-10 px-20">
        <AtPlanCardFlat 
            v-for="plan in plans" 
            v-bind="plan" :amount="!state.isYearly ? plan.amount : plan.yearly" 
        >   
        <div class="mb-10" v-if="plan.id">
            <div class="paypal_btn_containers" :data-plan-id="plan.id"></div>
        </div >
        </AtPlanCardFlat>
    </div>
</div>
</template>

<script setup>
import { reactive } from "@vue/reactivity";
import { nextTick, onMounted } from "@vue/runtime-core";
import { AtPlanCardFlat, AtFieldCheck } from "atmosphere-ui";
import { useLumiere } from "lumiere-utils/useLumiere";

const { subscriptionProvider } = useLumiere()
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

onMounted(() => {
    const planContainers = document.querySelectorAll('.paypal_btn_containers');
    nextTick(() => {
        planContainers.forEach((element) => {
            paypal
              .Buttons({
                style: {
                  shape: "rect",
                  color: "black",
                  layout: "horizontal",
                  label: "subscribe",
                },
    
                createSubscription(data, actions) {
                  return actions.subscription.create({
                    plan_id: element.getAttribute('data-plan-id'),
                  });
                },
    
                onApprove(data) {
                  data.plan_id = state.selectedPlan;
                  subscriptionProvider.validatePlan(data);
                },
              })
              .render(element);
        })
    })
})
</script>