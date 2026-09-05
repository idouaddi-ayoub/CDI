<script setup lang="ts">
import gsap from "gsap";
import type { SplitText } from "gsap/SplitText";

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const quote = useTemplateRef<HTMLParagraphElement>("quote");

let ctx: gsap.Context | undefined;
let splits: (SplitText | undefined)[] = [];

onMounted(() => {
    if (resolveMotionTier() === "static" || !root.value) return;

    ctx = gsap.context((self) => {
        splits = [
            revealLines(heading.value, root.value),
            revealLines(quote.value, quote.value, { start: "top 85%" }),
        ];

        const cells = (self.selector?.("[data-stat]") ?? []) as HTMLElement[];
        riseIn(cells, root.value, { y: 60, stagger: 0.09 });
        cells
            .flatMap((cell) => [
                ...cell.querySelectorAll<HTMLElement>("[data-count]"),
            ])
            .forEach(countUp);

        drawRule(self.selector?.("[data-rule]") ?? [], root.value);

        riseIn(self.selector?.("[data-reveal]") ?? [], root.value, {
            y: 24,
            delay: 0.15,
        });
    }, root.value);
});

onBeforeUnmount(() => {
    splits.forEach((s) => s?.revert());
    splits = [];
    ctx?.revert();
});
</script>

<template>
    <section
        id="about"
        ref="root"
        class="relative flex min-h-svh items-center px-6 py-32 sm:px-10"
    >
        <div class="mx-auto w-full max-w-7xl">
            <p class="eyebrow" data-reveal>{{ $t("home.about.eyebrow") }}</p>

            <h2 class="display mt-5 max-w-2xl text-3xl sm:text-5xl">
                {{ $t("home.about.title") }}
            </h2>

            <div
                data-rule
                class="mt-12 h-px w-full bg-linear-to-r from-white/20 to-transparent"
            />

            <blockquote class="mt-24 max-w-3xl">
                <p ref="quote" class="display text-xl sm:text-2xl lg:text-3xl">
                    {{ $t("home.about.body") }}
                </p>
            </blockquote>
        </div>
    </section>
</template>
