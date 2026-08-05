<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger);

const { animates } = useMotionTier();
const { $lenis } = useNuxtApp();

const SECTIONS = ["paths", "proof", "event", "contact"] as const;

const root = useTemplateRef<HTMLElement>("root");
let ctx: gsap.Context | undefined;

function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if ($lenis) $lenis.scrollTo(el, { offset: 0 });
    else el.scrollIntoView({ behavior: "auto", block: "start" });
}

onMounted(() => {
    if (!animates.value || !root.value) return;

    ctx = gsap.context(() => {
        const show = gsap.quickTo(root.value!, "yPercent", {
            duration: 0.4,
            ease: "power3.out",
        });

        ScrollTrigger.create({
            start: "top -120",
            end: "max",
            onUpdate: (self) => show(self.direction === 1 ? -130 : 0),
            onLeaveBack: () => show(0),
        });
    }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <header
        ref="root"
        class="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-6 py-5 sm:px-10"
    >
        <NuxtLink
            to="/"
            class="display text-xl tracking-tight"
            aria-label="CDI — home"
        >
            <img src="/CDI_logo.svg" alt="CDI" class="w-12" />
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
            <button
                v-for="id in SECTIONS"
                :key="id"
                type="button"
                class="text-sm text-fg-muted transition-colors hover:text-fg"
                @click="jumpTo(id)"
            >
                {{ $t(`home.nav.${id}`) }}
            </button>
        </nav>

        <div class="flex items-center gap-4">
            <LocaleSwitch />

            <UButton
                :to="LINKS.join"
                v-bind="EXTERNAL_ATTRS"
                size="sm"
                color="primary"
                class="px-5"
            >
                {{ $t("home.nav.cta") }}
            </UButton>
        </div>
    </header>
</template>
