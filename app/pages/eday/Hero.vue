<script setup lang="ts">
import { useNow } from "@vueuse/core";
import gsap from "gsap";

const glowBtn = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!glowBtn.value) return;

  const tl = gsap.timeline({
    delay: 6,
    repeat: -1,
    yoyo: true,
  });

  tl.to(glowBtn.value, {
    boxShadow: `
      0 0 18px rgba(34,197,94,0.8),
      0 0 42px rgba(34,197,94,0.6),
      0 0 90px rgba(34,197,94,0.5)
    `,
    duration: 1.6,
    ease: "sine.inOut",
  })

    .to(
      glowBtn.value,
      {
        scale: 1.06,
        duration: 1.6,
        ease: "sine.inOut",
      },
      "<"
    )

    .to(
      glowBtn.value,
      {
        y: -4,
        duration: 1.6,
        ease: "sine.inOut",
      },
      "<"
    );
});

const eventDate = new Date("2026-02-14T09:00:00");

const now = useNow({ interval: 1000 });

const time = computed(() => {
  const diff = eventDate.getTime() - now.value.getTime();
  const s = Math.max(diff / 1000, 0);

  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: Math.floor(s % 60),
  };
});
</script>

<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white"
  >
    <div class="absolute inset-0 bg-grid opacity-80" />
    <div
      class="absolute inset-x-0 h-full bg-gradient-to-t from-black to-transparent"
    />
    <div
      class="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-8 items-center 2xl:scale-150"
    >
      <UBadge
        color="success"
        variant="outline"
        class="items-center gap-2 px-4 py-2 rounded-full bg-green-900/25 HeroHomeTitle"
      >
        <span class="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        <span class="text-xl font-light leading-none HeroHomeTitle">
          February 14, 2026 · Agadir
        </span>
      </UBadge>
      <div>
        <h1
          class="text-5xl sm:text-6xl font-extrabold tracking-tight HeroHomeTitle"
        >
          E-DAY EVENT
          <span class="text-green-500 HeroHomeTitle">2026</span>
        </h1>
      </div>

      <p class="text-lg text-gray-400">
        <span class="text-green-500 font-medium HeroHomeTitle">Learn.</span>
        <span class="HeroHomeTitle">Connect.</span>
        <span class="text-green-500 font-medium HeroHomeTitle">Build.</span>
      </p>

      <div class="flex flex-wrap justify-center gap-3 text-sm">
        <UBadge
          variant="outline"
          class="rounded-3xl bg-green-900/35 p-3 HeroHomeTitle"
          ><UIcon
            name="uil:calendar-alt"
            class="size-6 text-green-700 HeroHomeTitle"
          />
          February 14, 2026</UBadge
        >
        <UBadge
          variant="outline"
          class="rounded-3xl bg-green-900/35 p-3 HeroHomeTitle"
          ><UIcon
            name="uil:clock-nine"
            class="size-6 text-green-700 HeroHomeTitle"
          />
          14:00 – 18:30</UBadge
        >
        <UBadge
          variant="outline"
          class="rounded-3xl bg-green-900/35 p-3 HeroHomeTitle"
        >
          <UIcon
            name="solar:map-point-broken"
            class="size-6 text-green-700 HeroHomeTitle"
          />
          ENCG, Agadir</UBadge
        >
      </div>

      <div class="flex flex-col justify-center items-center gap-4">
        <NuxtLink
          to="https://www.eventbrite.com/e/e-day-40-tickets-1982686658167"
          target="_blank"
          class="w-fit"
        >
          <div ref="glowBtn" class="inline-block">
            <UButton
              variant="solid"
              size="xl"
              class="px-8 HeroHomeTitle scale-125"
            >
              Get Your Free Ticket
            </UButton>
          </div>
        </NuxtLink>
        <NuxtLink to="#agenda" class="w-fit">
          <UButton variant="outline" size="lg" class="px-8 w-fit HeroHomeTitle">
            View agenda
          </UButton>
        </NuxtLink>
      </div>

      <div class="pt-6">
        <p class="tracking-widest text-gray-400 mb-3 HeroHomeTitle">
          COUNTDOWN TO EVENT
        </p>

        <div
          class="flex justify-center gap-6 bg-green-500/10 border border-green-500/20 rounded-xl px-6 py-4 HeroHomeTitle"
        >
          <CountdownItem label="DAYS" :value="time.days" />
          <CountdownItem label="HOURS" :value="time.hours" />
          <CountdownItem label="MIN" :value="time.minutes" />
          <CountdownItem label="SEC" :value="time.seconds" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.bg-grid {
  background-image: linear-gradient(
      rgba(13, 255, 0, 0.025) 2px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(21, 255, 0, 0.025) 2px, transparent 1px);
  background-size: 40px 40px;
}

.HeroHomeTitle {
  will-change: transform, box-shadow;
}
</style>
