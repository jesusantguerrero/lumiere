<template>
    <div>
        <div class="py-10 max-w-7xl">
            <!-- Plan Statistics -->
            <div class="flex mb-10 plans__info">
                <AtDataCard
                    v-for="info in state.cards"
                    :key="info.title"
                    v-bind="info"
                    detail-text-class="text-blue-500"
                >
                </AtDataCard>
            </div>
            <!-- /plan Statistics -->

            <!-- Current Plan -->
            <div class="mb-10 subscriptions__container">
                <h4 class="mx-2 mb-2 text-lg font-bold text-gray-400">Current Plan</h4>
                <AtBillingCard
                    v-if="currentPlan"
                    :key="currentPlan.id"
                    :plan="currentPlan"
                    @suspend="sendSubscriptionAction(currentPlan, 'suspend')"
                    @reactivate="sendSubscriptionAction(currentPlan, 'reactivate')"
                    @cancel="sendSubscriptionAction(currentPlan, 'cancel')"
                />

                <div v-else class="px-5 py-5 mx-2 bg-white border rounded-md">
                    You are currently within your free trial period. Your trial will expire on {{ trialEndsAt }}
                </div>
            </div>
            <!-- /Current Plan -->
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { AtDataCard, AtBillingCard } from "atmosphere-ui";

const props = defineProps({
    subscriptions: {
        type: Array,
        default() {
            return []
        }  
    }
});

const state = reactive({
    visibleSubscriptions: computed(() => {
        return props.subscriptions.filter(
            subs => subs.status.toLowerCase() != "cancelled"
        );
    }),
    currentPlan: computed(() => {
        return state.visibleSubscriptions.length ? state.visibleSubscriptions[0] : null
    }),
    cards: computed(() => {
        return [
            {
                title: "Current Monthly Bill",
                value: state.pendingBalance.value,
                links: [
                    {
                        label: "Payment Details",
                        type: "inertia",
                        ref: "/user/billing/current"
                    }
                ]
            },
            {
                title: "Next Payment Due",
                value: state.nextPaymentDate.value,
                links: [
                    {
                        label: "View payment history",
                        type: "inertia",
                        ref: "/user/billing/current"
                    }
                ]
            },
            {
                title: "Last Payment",
                value: state.lastPayment.value,
                links: []
            },
            {
                title: "Payment Information",
                value: state.lastPaymentDate.value,
                links: [
                    {
                        label: "Redeem coupon",
                        type: "inertia",
                        ref: "/user/billing/current"
                    }
                ]
            }
        ];
    }),

    details: computed(() => {
        const subscription = state.visibleSubscriptions
        return subscription && subscription.length && subscription[0]
    }),

    pendingBalance: computed(() => {
        if (state.details) {
            const nextPayment = JSON.parse(state.details.next_payment)
            return nextPayment.currency_code + " " + nextPayment.value;
        }
        return 0;
    }),

    lastPayment: computed(() => {
        if (state.details) {
            const lastPayment = JSON.parse(state.details.last_payment)
            return lastPayment.amount.currency_code + " " + lastPayment.amount.value;
        }
        return "-";
    }),

    nextPaymentDate: computed(() => {
        if (state.details) {
            return format(new Date(state.details.next_billing_date), "MMM dd, yyyy");
        }
        return 0;
    }),

    lastPaymentDate: computed(() => {
        if (state.details) {
            return format(new Date(state.details.last_payment_date), "MMM dd, yyyy");
        }
        return "-";
    })
});

const sendSubscriptionAction = (subscription, actionName) => {
    const url = `/v2/subscriptions/${subscription.id}/agreement/${subscription.agreement_id}/${actionName}`;
    axios.post(url).then(() => {
        this.$inertia.reload();
    });
}

const isCurrentPlan = (plan) => {
    return state.visibleSubscriptions.value.length && this.visibleSubscriptions[0].paypal_plan_id == plan.paypal_plan_id;
}

const getLabelSubscribe = (plan) => {
    return this.isBigger(plan) ? "Upgrade" : "Downgrade";
}

const isBigger = (plan) => {
    return (
        state.visibleSubscriptions.value.length &&
        this.visibleSubscriptions.value[0].quantity < plan.quantity
    );
}
</script>
