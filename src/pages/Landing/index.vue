<template>
  <main class="w-full">
    <div class="w-full bg-warm-gray-800">
      <AtSiteHeader
        title="Lumiere"
        brand-class="font-brand"
        :links="state.links"
        link-class="text-white hover:text-amber-500"
        :actions="state.actions"
      />
    </div>
    <div class="py-20 mb-10 text-center bg-orange-500 text-gray-50">
        <h1 class="text-4xl font-brand"> Lumiere </h1>
        <div>
            <p class="pt-5 text-xl">
                A simple and powerful Vue 3 / Firebase 9 boilerplate based <span class="font-bold">Atmosphere UI</span>.
            </p>

            <div class="mt-5 space-x-3">
                <AtButton class="bg-white text-amber-500">Learn more</AtButton>
                <AtButton class="font-bold bg-warm-gray-700 text-amber-500">See github</AtButton>
            </div>
        </div>
    </div>
    <div class="py-20 mx-auto mt-10 text-center space-y-28 max-w-7xl">
        <div class="flex w-full" v-for="featureRow in state.features">
            <div class="w-4/12" v-for="feature in featureRow">
             <h4 class="font-bold"> {{ feature.emoji }} {{ feature.name }}</h4>
             <p class="mt-5 text-left"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolore soluta quod vitae reprehenderit quis odio quo cum minima error asperiores consequuntur, repudiandae consectetur explicabo. Totam est molestiae ducimus doloribus.</p>
            </div>
        </div>
    </div>
    <div class="relative text-gray-100 bg-warm-gray-800">
        <AtPreFooter :sections="state.sections" class="bg-warm-gray-800" />
        <AtSiteFooter
            title="Lumiere"
            year="2021"
            subtitle="Lumiere - The firebase template"
            :links="state.footerLinks"
        />
    </div>
  </main>
</template>

<script setup>
import { AtSiteHeader, AtPreFooter, AtSiteFooter, AtButton } from "atmosphere-ui";

const state = {
  title: "Lumiere",
  links: [
    {
      name: "Home",
      url: "#home",
    },
    {
      name: "About",
      url: "#about",
    },
    {
        name: "Features",
        url: "#features",
    },
    {
      name: "Contact",
      url: "#contact",
    },
  ],
  sections: {
    general: {
      label: "General Resources",
      links: {
        Docs: "",
        Blog: "",
        "Use Cases": "",
      },
    },
    more: {
      label: "More",
      links: {
        Zenboard: "",
        Atmosphere: "",
        Lumiere: "",
        "Insane Code": "",
      },
    },
    about: {
      label: "About Neatlancer",
      links: {
        "Open Source Software": "",
        Github: "",
        Twitter: "",
      },
    },
    legal: {
      label: "Legal",
      links: {
        "Privacy Policy": "/privacy-policy",
        "Terms of service": "/terms",
      },
    },
  },
  actions: [
    {
      name: "Login",
      url: "/login",
      class: 'bg-white text-amber-500 hover:bg-gray-100 transition'
    },
    {
      name: "Start for free",
      url: "/register",
      class: 'bg-amber-500 text-white hover:bg-amber-600 transition'
    },
  ],
  footerLinks: [
    {
      name: "facebook",
    },
    {
      name: "twitter",
    },
    {
      name: "github",
    },
    {
      name: "github",
    },
  ],
  features: {
      row1: [
          {
              emoji: "📦",
              name: "Firebase",
          },
          {
              emoji: "📦",
              name: "TailwindCSS",
          },
          {
              emoji: "📦",
              name: "Storybook",
          }
      ],
        row2: [
              {
                  emoji: "📦",
                  name: "Atmosphere UI",
              },
              {
                  emoji: "📦",
                  name: "Vue 3",
              },
              {
                emoji: "📦",
                name: "Vue Testing Library",
                 
      }],
        row3: [
              {
                  emoji: "📦",
                  name: "Full auth flow",
                  description: "Authentication, registration, password update, password confirmation, Social logins"
              },
              {
                  emoji: "📦",
                  name: "API, Teams, Payment",
              },
              {
                emoji: "📦",
                name: "Settings",
                 
      }],
  }
};
</script>
