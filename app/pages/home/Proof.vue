<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const { isFull, animates } = useMotionTier();
const root = useTemplateRef<HTMLElement>("root");

const stats = [
    { key: "founded", from: 0, to: 2018, suffix: "" },
    { key: "members", from: 0, to: 300, suffix: "+" },
    { key: "events", from: 0, to: 30, suffix: "+" },
    { key: "eday", from: 0, to: 3, suffix: "" },
];

let ctx: gsap.Context | undefined;
let splits: SplitText[] = [];

onMounted(() => {
    if (!animates.value || !root.value) return;
    ctx = gsap.context((self) => {
        const numbers = (self.selector?.("[data-count]") ??
            []) as HTMLElement[];
        numbers.forEach((el) => {
            const target = Number(el.dataset.count);
            const start = Number(el.dataset.countFrom ?? 0);
            const suffix = el.dataset.countSuffix ?? "";
            const counter = { value: start };
            el.textContent = start + suffix;
            gsap.to(counter, {
                value: target,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
                onUpdate: () => {
                    el.textContent = Math.round(counter.value) + suffix;
                },
            });
        });

        // Per-character is ~150 masked spans for this quote, all tweening at
        // once — a desktop-only budget. Below `full` the quote reveals by line,
        // like every other heading on the page.
        const chars = isFull.value;

        const quotes = (self.selector?.(".split") ?? []) as HTMLElement[];
        splits = quotes.map((el) => {
            // autoSplit re-splits on resize and on font load, and each re-split
            // reverts the tween this returned. So it has to hand back a fresh
            // one every time until the reveal has actually finished — bailing
            // early would leave a quote that never animates on any phone slow
            // enough to swap the font in after mount. Once it has played, the
            // text is where it belongs and a re-split needs no tween at all.
            let played = false;
            return SplitText.create(el, {
                type: chars ? "chars" : "lines",
                mask: chars ? "words" : "lines",
                autoSplit: true,
                onSplit(s) {
                    if (played) return;
                    const onComplete = () => {
                        played = true;
                    };
                    const scrollTrigger = {
                        trigger: el,
                        start: "top 85%",
                        once: true,
                    };
                    return chars
                        ? gsap.from(s.chars, {
                              duration: 1,
                              y: 100,
                              autoAlpha: 0,
                              stagger: 0.0125,
                              scrollTrigger,
                              onComplete,
                          })
                        : gsap.from(s.lines, {
                              duration: 1.1,
                              yPercent: 110,
                              stagger: 0.1,
                              ease: "power4.out",
                              scrollTrigger,
                              onComplete,
                          });
                },
            });
        });
    }, root.value);
});

onBeforeUnmount(() => {
    splits.forEach((s) => s.revert());
    splits = [];
    ctx?.revert();
});
</script>

<template>
    <section
        id="proof"
        ref="root"
        class="overflow-hidden border-b border-white/5 bg-ink-900/40"
    >
        <div class="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
            <p class="eyebrow" data-reveal>{{ $t("home.proof.eyebrow") }}</p>

            <div
                class="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 border-t border-white/5 pt-12 md:grid-cols-4"
            >
                <div v-for="s in stats" :key="s.key">
                    <div
                        class="display text-4xl text-brand-500 tabular-nums sm:text-6xl lg:text-7xl"
                        :data-count="s.to"
                        :data-count-from="s.from"
                        :data-count-suffix="s.suffix"
                    >
                        {{ s.to }}{{ s.suffix }}
                    </div>
                    <div class="eyebrow mt-4">
                        {{ $t(`home.proof.stats.${s.key}`) }}
                    </div>
                </div>
            </div>

            <blockquote class="mt-24 max-w-4xl split">
                <p class="display text-2xl sm:text-4xl lg:text-5xl">
                    “{{ $t("home.proof.quote") }}”
                </p>
                <footer class="eyebrow mt-8">
                    {{ $t("home.proof.quoteBy") }}
                </footer>
            </blockquote>
        </div>
    </section>
</template>
