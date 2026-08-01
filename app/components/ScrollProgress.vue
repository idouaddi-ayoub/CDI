<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Progress rail plus the name of the section currently in view. On a page this
 * long, with two pinned sections, it's the only cue that tells you how much is
 * left — pinning otherwise makes scroll distance meaningless.
 */
const { animates } = useMotionTier();

const SECTIONS = ["hero", "paths", "proof", "event", "contact"] as const;

const bar = useTemplateRef<HTMLElement>("bar");
const activeIndex = ref(0);
/** The SECTIONS that this page actually renders, in document order. */
const present = ref<string[]>([...SECTIONS]);

let ctx: gsap.Context | undefined;

/**
 * Read off live rects rather than a ScrollTrigger per section.
 *
 * A trigger measures its element's *natural* box, which for the two pinned
 * sections is only the first screenful of a range that lasts another 150% /
 * 120% — so "hero" would hand off to "paths" while the hero still fills the
 * screen. A pinned section is `position: fixed`, so its rect is where it
 * actually is on screen, which is exactly what this label claims to report.
 */
function syncActive(sections: HTMLElement[]) {
    const mid = window.innerHeight / 2;
    const i = sections.findIndex((el) => {
        const box = el.getBoundingClientRect();
        return box.top <= mid && box.bottom >= mid;
    });
    // No match means the footer holds the midpoint; keep the last section
    // rather than flicking back to "hero".
    if (i !== -1) activeIndex.value = i;
}

onMounted(async () => {
    // The tier resolves in useMotionTier's own onMounted, which runs just
    // before this one — so `animates` is correct here, but the `v-if` it
    // controls hasn't re-rendered yet and `bar` is still null. Wait a tick.
    await nextTick();
    if (!animates.value || !bar.value) return;

    type Section = { id: (typeof SECTIONS)[number]; el: HTMLElement };
    const found = SECTIONS.map((id) => ({
        id,
        el: document.getElementById(id),
    })).filter((s): s is Section => !!s.el);
    present.value = found.map((s) => s.id);
    const sections = found.map((s) => s.el);

    ctx = gsap.context(() => {
        gsap.to(bar.value!, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
                // Spans the whole document, so it updates through both pins.
                onUpdate: () => syncActive(sections),
                onRefresh: () => syncActive(sections),
            },
        });
    });

    syncActive(sections);
});

onBeforeUnmount(() => ctx?.revert());

const label = computed(() => present.value[activeIndex.value] ?? "hero");
const index = computed(() => String(activeIndex.value + 1).padStart(2, "0"));
</script>

<template>
    <div
        v-if="animates"
        aria-hidden="true"
        class="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
        <span class="eyebrow whitespace-nowrap">
            {{ index }} — {{ $t(`home.sections.${label}`) }}
        </span>
        <div class="h-32 w-px bg-white/10">
            <div ref="bar" class="h-full origin-top scale-y-0 bg-brand-500" />
        </div>
    </div>
</template>
