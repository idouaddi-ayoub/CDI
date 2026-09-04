<script setup lang="ts">
import gsap from "gsap";
import type { SplitText } from "gsap/SplitText";

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const quote = useTemplateRef<HTMLParagraphElement>("quote");

const stats = [
    { key: "founded", from: 2010, to: 2018, suffix: "" },
    { key: "members", from: 0, to: 300, suffix: "+" },
    { key: "events", from: 0, to: 30, suffix: "+" },
    { key: "eday", from: 0, to: 3, suffix: "" },
];

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
            .flatMap((cell) => [...cell.querySelectorAll<HTMLElement>("[data-count]")])
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
        id="proof"
        ref="root"
        class="relative flex min-h-svh items-center px-6 py-32 sm:px-10"
    >
        <div class="mx-auto w-full max-w-7xl">
            <p class="eyebrow" data-reveal>{{ $t("home.proof.eyebrow") }}</p>

            <h2 class="display mt-5 max-w-2xl text-3xl sm:text-5xl">
                {{ $t("home.proof.title") }}
            </h2>

            <div
                data-rule
                class="mt-12 h-px w-full bg-linear-to-r from-white/20 to-transparent"
            />

            <dl class="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
                <div v-for="s in stats" :key="s.key" data-stat>
                    <dt class="sr-only">
                        {{ $t(`home.proof.stats.${s.key}`) }}
                    </dt>
                    <dd
                        class="display text-4xl tabular-nums text-brand-500 sm:text-5xl lg:text-6xl"
                        :data-count="s.to"
                        :data-count-from="s.from"
                        :data-count-suffix="s.suffix"
                    >
                        {{ s.to }}{{ s.suffix }}
                    </dd>
                    <p class="eyebrow mt-4">
                        {{ $t(`home.proof.stats.${s.key}`) }}
                    </p>
                </div>
            </dl>

            <blockquote class="mt-24 max-w-3xl">
                <p ref="quote" class="display text-xl sm:text-2xl lg:text-3xl">
                    “{{ $t("home.proof.quote") }}”
                </p>
                <footer class="eyebrow mt-8" data-reveal>
                    {{ $t("home.proof.quoteBy") }}
                </footer>
            </blockquote>
        </div>
    </section>
</template>
