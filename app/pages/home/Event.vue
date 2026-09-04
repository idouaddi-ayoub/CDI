<script setup lang="ts">
import gsap from "gsap";
import type { SplitText } from "gsap/SplitText";
import { LINKS } from "@/utils/links";

const root = useTemplateRef<HTMLElement>("root");
const panel = useTemplateRef<HTMLElement>("panel");
const title = useTemplateRef<HTMLHeadingElement>("title");
const edition = useTemplateRef<HTMLElement>("edition");

const highlights = ["talks", "workshops", "network"] as const;

let ctx: gsap.Context | undefined;
let split: SplitText | undefined;

onMounted(() => {
    const tier = resolveMotionTier();
    if (tier === "static" || !root.value) return;

    ctx = gsap.context((self) => {
        split = revealLines(title.value, root.value, { start: "top 70%" });

        gsap.fromTo(
            panel.value!,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: root.value!,
                    start: "top 70%",
                    once: true,
                },
            },
        );

        riseIn(self.selector?.("[data-highlight]") ?? [], root.value, {
            y: 32,
            delay: 0.25,
            stagger: 0.12,
        });

        if (tier === "full") {
            gsap.fromTo(
                edition.value!,
                { yPercent: 14 },
                {
                    yPercent: -14,
                    ease: "none",
                    scrollTrigger: {
                        trigger: root.value!,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.5,
                    },
                },
            );
        }
    }, root.value);
});

onBeforeUnmount(() => {
    split?.revert();
    ctx?.revert();
});
</script>

<template>
    <section
        id="event"
        ref="root"
        class="relative flex min-h-svh items-center overflow-hidden px-6 py-32 sm:px-10"
    >
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-2/5 items-center justify-center lg:flex"
        >
            <span
                ref="edition"
                class="display select-none text-[clamp(6rem,14vw,14rem)] leading-none text-brand-500/12"
            >
                {{ $t("home.events.edition") }}
            </span>
        </div>

        <div class="mx-auto w-full max-w-7xl">
            <div ref="panel" class="lg:ml-auto lg:w-[54%]">
                <p class="eyebrow text-brand-400">
                    {{ $t("home.events.eyebrow") }}
                </p>

                <h2
                    ref="title"
                    class="display mt-5 text-5xl sm:text-7xl lg:text-8xl"
                >
                    {{ $t("home.events.title") }}
                </h2>

                <p class="mt-8 max-w-lg text-base text-fg-muted sm:text-lg">
                    {{ $t("home.events.body") }}
                </p>

                <ul class="mt-12 max-w-lg">
                    <li
                        v-for="h in highlights"
                        :key="h"
                        data-highlight
                        class="border-t border-white/10 py-5 last:border-b"
                    >
                        <p class="text-sm font-medium">
                            {{ $t(`home.events.highlights.${h}.title`) }}
                        </p>
                        <p class="mt-2 text-sm text-fg-muted">
                            {{ $t(`home.events.highlights.${h}.body`) }}
                        </p>
                    </li>
                </ul>

                <div data-highlight class="mt-12 flex flex-wrap gap-4">
                    <UButton
                        :to="LINKS.eday"
                        size="xl"
                        color="primary"
                        class="px-8"
                    >
                        {{ $t("home.events.ctaSponsor") }}
                    </UButton>
                </div>
            </div>
        </div>
    </section>
</template>
