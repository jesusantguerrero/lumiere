<template>
<h1 class="text-lg font-bold text-gray-600"> Explore features</h1>
<div class="grid grid-cols-3 gap-4 mt-4">
    <FeatureCard v-for="feature in features" v-bind="feature" />
</div>

<h1 class="mt-6 text-lg font-bold text-gray-600"> Integrations </h1>
<div class="grid grid-cols-3 gap-4 mt-4">
    <IntegrationCard 
        v-for="integration in integrations" 
        :title="integration.name"
        :description="integration.description"
        :icon="integration.logo"
        :is-enabled="integration.isEnabled"
        :link="integration.data.internalLink"
    />
</div>


<h1 class="mt-6 text-lg font-bold text-gray-600"> Docs </h1>

</template>

<script setup>
import FeatureCard from "./FeatureCard.vue";
import IntegrationCard from "./IntegrationCard.vue";

    defineProps({
        features: {
            type: Array
        },
        integrations: {
            type: Array,
        },
        docs: {
            type: Array
        }
    })

    const integrations = [
        {
            name: 'Github',
            description: 'description',
            logo: 'github',
            service_url: 'https://github.com',
            token_url: 'https://github.com',
            data: {

            }
        },
        {
            name: 'Slack',
            logo: 'slack',
            description: 'description',
            service_url: 'https://slack.com',
            token_url: 'https://slack.com',
            data: {
                
            }
        }
    ]
</script>
