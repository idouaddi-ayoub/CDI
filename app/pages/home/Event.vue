<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger);

const { isFull, animates } = useMotionTier();

const root = useTemplateRef<HTMLElement>("root");
const panel = useTemplateRef<HTMLElement>("panel");
const edition = useTemplateRef<HTMLElement>("edition");

let ctx: gsap.Context | undefined;

onMounted(() => {
    if (!animates.value || !root.value) return;

    ctx = gsap.context(() => {
        if (isFull.value) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: root.value!,
                    start: "top top",
                    end: "+=120%",
                    pin: true,
                    scrub: 0.5,
                    // Second of the page's two pins: measured after the hero
                    // has laid down its spacer, before anything that sits
                    // below this section. See the note on the hero's pin.
                    refreshPriority: 1,
                },
            });

            tl.fromTo(
                panel.value!,
                { clipPath: "inset(0% 0% 100% 0%)" },
                { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 },
                0,
            ).fromTo(
                edition.value!,
                { yPercent: 22 },
                { yPercent: -22, ease: "none", duration: 1 },
                0,
            );
        } else {
            gsap.fromTo(
                panel.value!,
                { clipPath: "inset(0% 0% 100% 0%)" },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: root.value!,
                        start: "top 75%",
                        once: true,
                    },
                },
            );
        }
    }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <section
        id="event"
        ref="root"
        class="relative flex min-h-svh items-center overflow-hidden"
    >
        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-y-0 right-0 -z-10 flex translate-x-[10%] items-center"
        >
            <div
                ref="edition"
                class="display select-none leading-none text-transparent opacity-40 [-webkit-text-stroke:1px_var(--color-brand-500)] text-[clamp(9rem,30vw,24rem)]"
            >
                {{ $t("home.events.edition") }}
            </div>
        </div>

        <div class="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10">
            <div ref="panel">
                <div>
                    <p class="eyebrow text-brand-400">
                        {{ $t("home.events.eyebrow") }}
                    </p>
                    <h2 class="display mt-5 text-5xl sm:text-7xl lg:text-8xl">
                        {{ $t("home.events.title") }}
                    </h2>
                    <p class="mt-8 max-w-lg text-base text-fg-muted sm:text-lg">
                        {{ $t("home.events.body") }}
                    </p>

                    <div class="mt-10 flex flex-wrap gap-4">
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
        </div>
    </section>
</template>
