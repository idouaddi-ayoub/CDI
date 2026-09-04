<script setup lang="ts">
import type { NuxtError } from "#app";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(SplitText);

const props = defineProps<{ error: NuxtError }>();

const { t, locale } = useI18n();
const localePath = useLocalePath();

const status = computed(() => props.error?.status ?? 500);

const variant = computed(() => (status.value === 404 ? "notFound" : "generic"));

useHead(() => ({
    htmlAttrs: { lang: locale.value },
}));

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

    ctx = gsap.context(() => {
        SplitText.create(codeEl.value, {
            type: "chars",
            mask: "chars",
            onSplit: (self) =>
                gsap
                    .timeline()

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

function goHome() {
    return clearError({ redirect: localePath("/") });
}
</script>

<template>
    <UApp>
        <main ref="root" class="relative flex min-h-svh flex-col">
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

                <p class="eyebrow">
                    {{ $t("error.eyebrow", { code: status }) }}
                </p>
            </header>

            <div class="flex flex-1 items-center px-6 py-16 sm:px-10">
                <div class="mx-auto w-full max-w-7xl">
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
