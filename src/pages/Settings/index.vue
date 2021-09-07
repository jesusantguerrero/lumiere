<template>
  <Default>
    <main class="flex">
      <div class="w-2/12">
        <ul class="w-32">
          <li
            v-for="(section, sectionName) in sections"
            :key="sectionName"
            class="px-5 py-1 cursor-pointer hover:bg-gray-100"
            :class="{'bg-gray-50': sectionName == selectedSection, 'mt-5': section.divider}"
            @click="setSelectedSection(sectionName)"
          >
            {{ section.label }}
          </li>
        </ul>
      </div>
      <div class="w-full" v-if="sectionData">
        <div class="pb-5 border-b">
          <h1 class="text-xl font-bold">{{ sectionData.label }}</h1>
          <h2 class="text-sm font-bold text-gray-500">
            {{ sectionData.subtitle }}
          </h2>
        </div>
        <div class="mt-4">
          <component
            class="mt-4"
            :is="sectionData.component"
            v-bind="sectionData.data"
            v-if="sectionData.component"
          />
        </div>
      </div>
    </main>
  </Default>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import treasurer from "../../config/treasurer";
import Default from "../../layouts/default.vue";
import BillingSection from "./BillingSection.vue";
import PlansSection from "./PlansSection.vue";
import SettingsOverview from "./SettingsOverview.vue";
import TeamAccount from "./TeamAccount.vue";
import UserAccount from "./UserAccount.vue";

const plans = Object.entries(treasurer.plans).map(([name, props]) => ({
  name,
  ...props,
  currency: "USD"
}));

const sections = computed(() => ({
  overview: {
    label: "Overview",
    subtitle: "Manage your workspace settings",
    data: {
      features: [
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
        {
          icon: "",
          title: "Issue Migration Assistant",
          description: "lorem ipsum dolor",
          actions: [
            {
              label: "migrate issues",
              link: "/migrate-issues",
            },
            {
              label: "Learn more",
              link: "/learn more",
              type: "secondary",
            },
          ],
        },
      ],
      integrations: [
        {
          name: "github",
        },
      ],
      docs: [
        {
          label: "Onboarding videos",
          substitle: "Get started quickly",
        },
        {
          label: "Onboarding videos",
          substitle: "Get started quickly",
        },
        {
          label: "Onboarding videos",
          substitle: "Get started quickly",
        },
      ],
    },
    component: SettingsOverview,
  },
  general: {
    label: "General",
    subtitle: "Manage your workspace settings",
    component: TeamAccount
  },
  members: {
    label: "Members",
    subtitle: "Manage your workspace settings",
  },
  plans: {
    label: "Plans",
    subtitle: "Manage your workspace settings",
    data: {
        plans,
    },
    component: PlansSection
  },
  billing: {
    label: "Billing",
    subtitle: "Manage your workspace settings",
    component: BillingSection
  },
  integrations: {
    label: "Integrations",
    subtitle: "Manage your workspace settings",
  },
  profile: {
    divider: true,
    label: "Profile",
    subtitle: "Manage your profile",
    component: UserAccount
  },
  notifications: {
    label: "Notifications",
    subtitle: "Select where and when you'll be notified",
    component: UserAccount
  },
  api: {
    label: "API",
    subtitle: "Select where and when you'll be notified",
    component: UserAccount
  },
}));

const route = useRoute()

const getDefaultSection = () => {
  return Object.keys(sections.value)[0]
}

const selectedSection = ref(null);

const sectionData = computed(() => {
    return sections.value[selectedSection.value];
});

const setSelectedSection = (section) => {
  const hasSection = Object.keys(sections.value).includes(section)

  selectedSection.value = hasSection && section ? section : getDefaultSection();
};


watch(() => route.fullPath , ()=> {
    setSelectedSection(route.params.section);
}, { immediate: true})

</script>
