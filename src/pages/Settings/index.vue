<template>
<Default>
    <main class="flex">
        <div class="w-2/12">
            <ul class="w-32">
                <li v-for="(section, sectionName) in sections" :key="sectionName" class="px-5 py-1 cursor-pointer hover:bg-gray-100" @click="setSelectedSection(section)">
                    {{ section.label }}
                </li>
            </ul>
        </div>
        <div class="w-full">
            <div class="pb-5 border-b">
                <h1 class="text-xl font-bold"> {{ selectedSection.label }}</h1>
                <h2 class="text-sm font-bold text-gray-500"> {{ selectedSection.subtitle }}</h2>
            </div>
            <component :is="selectedSection.component"  v-bind="selectedSection.data" v-if="selectedSection.component" />
        </div>
    </main>
</Default>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Default from "../../layouts/default.vue";
import SettingsOverview from "./SettingsOverview.vue";

const sections = {
    overview: {
        label: "Overview",
        subtitle: "Manage your workspace settings",
        data: {
            features: [{
            icon: '',
            title: '',
            subtitle: '',
            link: '',
            actions: [
                {
                    label: 'migrate issues',
                    link: '/migrate-issues'
                },
                {
                    label: 'Learn more',
                    link: '/learn more'
                }
            ],
            }],
            integrations: [
                {
                    name: 'github'
                }
            ],
            docs: [
                {
                    label: 'Onboarding videos',
                    substitle: 'Get started quickly'
                },
                {
                    label: 'Onboarding videos',
                    substitle: 'Get started quickly'
                },
                {
                    label: 'Onboarding videos',
                    substitle: 'Get started quickly'
                }
            ] 
        },
        component: SettingsOverview
    }, 
    general: {
        label: 'General',
        subtitle: 'Manage your workspace settings'
    },
    roadmap: {
        label: 'Roadmap',
        subtitle: 'Manage your workspace settings'
    },
    members: {
        label: 'Members',
        subtitle: 'Manage your workspace settings'
    },
    plans: {
        label: 'Plans',
        subtitle: 'Manage your workspace settings'
    },
    billing: {
        label: 'Billing',
        subtitle: 'Manage your workspace settings' 
    },
    integrations: {
        label: 'Integrations',
        subtitle: 'Manage your workspace settings' 
    }
}

const selectedSection = ref(Object.values(sections)[0]);

const setSelectedSection = (section) => {
    selectedSection.value = section;
}
</script>