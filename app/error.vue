<script setup lang="ts">
import type { NuxtError } from "#app";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(SplitText);

// Nuxt renders this component *instead of* app.vue, so nothing above it exists
// here: no <UApp>, no layout, no <html lang>. Each of those is re-established
// below rather than inherited.
const props = defineProps<{ error: NuxtError }>();

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { animates } = useMotionTier();

const status = computed(() => props.error?.statusCode ?? 500);

// Two voices only. `error.statusMessage` is deliberately never rendered — on a
// 500 it carries server internals, and on a 404 it says nothing a visitor needs.
const variant = computed(() => (status.value === 404 ? "notFound" : "generic"));

useHead(() => ({
    htmlAttrs: { lang: locale.value },
}));

// app.vue sets this too, but error.vue renders in its place and inherits
// nothing from it. It is what lets main.css hold the intro's start state for
// scripted visitors only — inline and in <head>, so it lands before first paint.
useHead({
    script: [
        {
            innerHTML: "document.documentElement.classList.add('js')",
            tagPosition: "head",
        },
    ],
});

useSeoMeta({
    title: () => `${t(`error.${variant.value}.title`)} — CDI`,
    // Follow the links out, but keep the page itself out of the index: a 404
    // that ranks is worse than no result at all.
    robots: "noindex, follow",
});

const root = useTemplateRef<HTMLElement>("root");
const codeEl = useTemplateRef<HTMLParagraphElement>("codeEl");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const copy = useTemplateRef<HTMLParagraphElement>("copy");
const cta = useTemplateRef<HTMLDivElement>("cta");

let ctx: gsap.Context | undefined;

onMounted(async () => {
    await nextTick();

    // useMotionTier resolves in its own onMounted, which is registered during
    // setup and so has already run by the time this one does.
    if (!animates.value) return;

    ctx = gsap.context(() => {
        // These elements are already hidden by CSS — see [data-error-intro] in
        // main.css — which rules out a bare `from`: it reads the element's
        // current value as its destination, so every one of them would animate
        // from transparent to transparent. Both ends are stated explicitly.
        SplitText.create(codeEl.value, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
                gsap
                    .timeline()
                    // Safe to unhide before the digits move: each sits in its
                    // own mask, and yPercent 115 parks it below the clip.
                    .set(codeEl.value, { opacity: 1 })
                    .from(self.chars, {
                        yPercent: 115,
                        duration: 1,
                        stagger: 0.08,
                        ease: "power4.out",
                    }),
        });

        gsap.fromTo(
            [heading.value, copy.value, cta.value],
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.1,
                delay: 0.3,
                ease: "power3.out",
            },
        );
    }, root.value ?? undefined);
});

onBeforeUnmount(() => ctx?.revert());

// Clearing the error is what tears down this component and hands the router
// back; a plain <NuxtLink> would navigate underneath a still-mounted error.
function goHome() {
    return clearError({ redirect: localePath("/") });
}
</script>

<template>
    <UApp>
        <main
            ref="root"
            class="relative flex min-h-svh flex-col overflow-hidden"
        >
            <!-- The hero's no-canvas backdrop. An error page is the last place
                 to spin up WebGL, so this is the whole background. -->
            <div
                class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_45%,rgba(34,197,94,0.16),transparent_70%)]"
                aria-hidden="true"
            />

            <header
                class="flex items-center justify-between gap-6 px-6 py-5 sm:px-10"
            >
                <NuxtLink :to="localePath('/')" aria-label="CDI — home">
                    <img src="/CDI_logo.svg" alt="CDI" class="w-12" />
                </NuxtLink>

                <p class="eyebrow">{{ $t("error.eyebrow", { code: status }) }}</p>
            </header>

            <div class="flex flex-1 items-center px-6 py-16 sm:px-10">
                <div class="mx-auto w-full max-w-7xl">
                    <!-- The status code is the display type here, and it is
                         decoration: the <h1> below carries the actual message. -->
                    <p
                        ref="codeEl"
                        data-error-intro
                        aria-hidden="true"
                        class="display display-code text-fg/90"
                    >
                        {{ status }}
                    </p>

                    <h1
                        ref="heading"
                        data-error-intro
                        class="display mt-6 text-3xl sm:text-4xl lg:text-5xl"
                    >
                        {{ $t(`error.${variant}.title`) }}
                    </h1>

                    <p
                        ref="copy"
                        data-error-intro
                        class="mt-6 max-w-md text-lg text-fg-muted sm:text-xl"
                    >
                        {{ $t(`error.${variant}.body`) }}
                    </p>

                    <div
                        ref="cta"
                        data-error-intro
                        class="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <UButton
                            size="xl"
                            color="primary"
                            class="px-8"
                            @click="goHome"
                        >
                            {{ $t("error.home") }}
                        </UButton>
                        <UButton
                            :to="LINKS.join"
                            v-bind="EXTERNAL_ATTRS"
                            size="xl"
                            variant="outline"
                            class="px-8"
                        >
                            {{ $t("error.join") }}
                        </UButton>
                    </div>
                </div>
            </div>

            <footer
                class="flex items-end justify-between gap-6 px-6 pb-8 text-xs uppercase tracking-[0.24em] text-fg-muted/70 sm:px-10"
            >
                <span>CDI — ENCG Agadir</span>
                <span>{{ $t("home.hero.since") }}</span>
            </footer>
        </main>
    </UApp>
</template>
