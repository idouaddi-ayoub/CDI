<script setup lang="ts">
import { gsap, SplitText } from "~/utils/gsap";
import { LINKS, CLUB_SOCIALS, EXTERNAL_ATTRS } from "@/utils/links";

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");

const year = new Date().getFullYear();

let ctx: gsap.Context | undefined;
let split: SplitText | undefined;

onMounted(() => {
    const tier = resolveMotionTier();
    if (tier === "static" || !root.value) return;

    ctx = gsap.context((self) => {
        split = revealLines(heading.value, root.value, { start: "top 70%" });
        riseIn(self.selector?.("[data-reveal]") ?? [], root.value, {
            y: 28,
            delay: 0.2,
        });
    }, root.value);
});

onBeforeUnmount(() => {
    split?.revert();
    ctx?.revert();
});
</script>

<template>
    <section
        id="contact"
        ref="root"
        class="relative flex min-h-svh flex-col justify-between px-6 pt-32 pb-8 sm:px-10"
    >
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-ink-950 via-ink-950/70 to-transparent"
        />

        <div class="mx-auto w-full max-w-7xl">
            <p class="eyebrow" data-reveal>{{ $t("home.finalCta.eyebrow") }}</p>

            <h2 ref="heading" class="display display-xl mt-6 max-w-4xl">
                {{ $t("home.finalCta.title") }}
            </h2>

            <p
                class="mt-10 max-w-md text-base text-fg-muted sm:text-lg"
                data-reveal
            >
                {{ $t("home.finalCta.sub") }}
            </p>

            <div
                class="mt-12 flex max-w-fit flex-wrap items-center gap-8"
                data-reveal
            >
                <a
                    :href="LINKS.club.instagram"
                    v-bind="EXTERNAL_ATTRS"
                    class="inline-flex items-center gap-3 rounded-full bg-brand-500 px-10 py-5 text-base font-medium text-ink-950 transition-colors hover:bg-brand-400"
                >
                    {{ $t("home.finalCta.ctaStudent") }}
                    <UIcon name="i-lucide-arrow-up-right" class="size-5" />
                </a>
            </div>
        </div>

        <footer
            class="mx-auto mt-24 w-full max-w-7xl border-t border-white/10 pt-8"
            data-reveal
        >
            <div
                class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
            >
                <div class="flex flex-wrap items-center gap-x-8 gap-y-2">
                    <a
                        :href="LINKS.location"
                        v-bind="EXTERNAL_ATTRS"
                        class="eyebrow transition-colors hover:text-fg"
                    >
                        {{ $t("home.footer.location") }}
                    </a>
                </div>

                <div class="flex items-center gap-6">
                    <a
                        v-for="social in CLUB_SOCIALS"
                        :key="social.href"
                        :href="social.href"
                        v-bind="EXTERNAL_ATTRS"
                        class="text-fg-muted/60 transition-colors hover:text-fg"
                    >
                        <UIcon :name="social.icon" class="size-4" />
                        <span class="sr-only">{{ social.label }}</span>
                    </a>
                </div>
            </div>

            <p class="eyebrow mt-8 text-fg-muted/60">
                © {{ year }} CDI — {{ $t("home.footer.rights") }}
            </p>
        </footer>
    </section>
</template>
