<script setup lang="ts">
import AbadouAzelarab from "../../assets/webp/AbadouAzelarab.webp";
import ZakariaEnfili from "../../assets/webp/ZakariaEnfili .webp";
import MedRedaIdrissi from "../../assets/webp/MedRedaIdrissi.webp";

type Speaker = {
  name: string;
  role: string;
  bio?: string;
  img: string;
  gradient: string;
  accent: string;
};

const speakers: Speaker[] = [
  {
    name: "Abadou Azelarab",
    role: "Superhost and Ex Airbnb agent",
    bio: "Abadou Azelarab is a real estate and Airbnb specialist who supports property owners and investors in maximizing the performance of their short-term rentals. He focuses on strategic optimization, professional management, and digital solutions to increase occupancy, visibility, and overall rental profitability.",
    img: AbadouAzelarab,
    gradient: "from-green-400/25 via-emerald-400/15 to-teal-400/20",
    accent: "from-green-400 to-emerald-300",
  },
  {
    name: "Zakaria Enfili",
    role: "Property advisor",
    bio: "Zakaria Enfili is a real estate expert in Morocco, specializing in property investment, short-term rentals such as Airbnb, and the digital transformation of the real estate sector. He supports investors and project owners with a modern, strategic, and digitally driven approach.",
    img: ZakariaEnfili,
    gradient: "from-emerald-400/25 via-teal-400/15 to-cyan-400/20",
    accent: "from-emerald-300 to-teal-200",
  },
  {
    name: "MedReda Idrissi",
    role: "Founder of Maximmo Immobilier & MonRiad",
    bio: "Med Reda Idrissi is a real estate professional and the founder of Maximmo Immobilier and MonRiad. He supports buyers, sellers, and investors in navigating the Moroccan property market, with a strong focus on strategic real estate solutions and digital visibility to maximize property value and performance.",
    img: MedRedaIdrissi,
    gradient: "from-lime-400/25 via-green-400/15 to-emerald-400/20",
    accent: "from-lime-300 to-green-200",
  },
];
</script>
<template>
  <section
    id="speakers"
    aria-labelledby="speakers-heading"
    class="relative py-24 sm:py-32 bg-black overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-black via-green-950 to-black"
    />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mx-auto mb-16 max-w-2xl text-center">
        <UBadge
          color="success"
          variant="soft"
          class="mb-6 rounded-full px-4 py-1.5 text-sm font-semibold"
        >
          Speakers
        </UBadge>

        <h2
          id="speakers-heading"
          class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
        >
          Learn from
          <span class="text-green-500">the best</span>
        </h2>

        <p class="mt-6 text-lg text-gray-400 leading-relaxed">
          Practical insights, real stories, and actionable takeaways from people
          building and shipping real products.
        </p>
      </div>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="s in speakers"
          :key="s.name"
          class="group relative flex h-full flex-col p-0 text-left"
        >
          <div
            class="absolute inset-0 rounded-3xl opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-90"
            :class="`bg-gradient-to-br ${s.gradient}`"
          />

          <UCard
            class="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#06130b]/80 backdrop-blur transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-500/30 group-hover:bg-[#081b10]/80"
          >
            <div class="flex flex-1 items-start justify-between gap-4">
              <div>
                <span
                  class="inline-flex items-center rounded-full border border-emerald-500/15 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-200"
                >
                  Speaker
                </span>

                <h3 class="mt-4 text-lg font-semibold text-white">
                  {{ s.name }}
                </h3>

                <p class="mt-1 text-sm text-white/55">
                  {{ s.role }}
                </p>
              </div>

              <div
                class="relative shrink-0 rounded-2xl p-[2px]"
                :class="`bg-gradient-to-br ${s.accent}`"
              >
                <div class="rounded-2xl bg-black/60 p-1.5">
                  <img
                    :src="s.img"
                    :alt="s.name"
                    class="h-30 w-30 rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div class="mt-6 flex-1">
              <p
                v-if="s.bio"
                class="mt-3 text-sm leading-relaxed text-white/55"
              >
                {{ s.bio }}
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </section>
</template>
