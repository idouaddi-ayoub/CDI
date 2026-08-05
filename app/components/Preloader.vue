<script setup lang="ts">
import gsap from "gsap";

/**
 * Covers the gap between first paint and the hero being ready — the webfont
 * swap and the WebGL canvas compiling shaders.
 *
 * Two rules it must never break:
 *  1. `/` is prerendered. The overlay is layered *over* real HTML rather than
 *     gating it, so the page is complete even if this component never runs.
 *  2. It always leaves. A hard timeout fires regardless of what's still
 *     loading, so a stalled font request can't trap the visitor behind it.
 */
const { animates } = useMotionTier();
const introComplete = useIntroComplete();

const root = useTemplateRef<HTMLElement>("root");
const bar = useTemplateRef<HTMLElement>("bar");
const counter = useTemplateRef<HTMLElement>("counter");

/** Never hold the page longer than this, whatever hasn't finished. */
const MAX_WAIT_MS = 2500;

const visible = ref(true);
let ctx: gsap.Context | undefined;

function finish() {
    if (introComplete.value) return;

    if (!animates.value || !root.value) {
        visible.value = false;
        introComplete.value = true;
        return;
    }

    // Hand off *during* the wipe, not after it. Queuing preloader → wipe →
    // entrance end to end put roughly 4.5s between arriving and being able to
    // read the hero; overlapping them also makes the two moves read as one.
    gsap.timeline({ onComplete: () => (visible.value = false) })
        .to(root.value, {
            yPercent: -100,
            duration: 0.75,
            ease: "power4.inOut",
        })
        .add(() => (introComplete.value = true), 0.2);
}

onMounted(() => {
    // Reduced motion: no overlay at all. There is nothing to reveal when the
    // hero doesn't animate in.
    if (!animates.value) {
        visible.value = false;
        introComplete.value = true;
        return;
    }

    document.documentElement.style.overflow = "hidden";

    ctx = gsap.context(() => {
        const progress = { value: 0 };
        gsap.to(progress, {
            value: 100,
            duration: 1,
            ease: "power2.inOut",
            onUpdate: () => {
                const pct = Math.round(progress.value);
                if (counter.value) counter.value.textContent = String(pct);
                if (bar.value) gsap.set(bar.value, { scaleX: pct / 100 });
            },
        });
    }, root.value ?? undefined);

    const timeout = window.setTimeout(finish, MAX_WAIT_MS);

    // Fonts are the thing actually worth waiting for: the hero headline is the
    // largest element on the page and it reflows when Space Grotesk lands.
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
        // Let the counter reach a plausible number rather than snapping away
        // the instant a cached font resolves.
        window.setTimeout(() => {
            window.clearTimeout(timeout);
            finish();
        }, 300);
    });

    onBeforeUnmount(() => window.clearTimeout(timeout));
});

watch(visible, (v) => {
    if (!v) document.documentElement.style.overflow = "";
});

onBeforeUnmount(() => {
    document.documentElement.style.overflow = "";
    ctx?.revert();
});
</script>

<template>
    <div
        v-if="visible"
        ref="root"
        class="preloader fixed inset-0 z-100 flex-col justify-end bg-ink-950 px-6 pb-10 sm:px-10"
        role="status"
        :aria-label="$t('home.loader.label')"
    >
        <div class="flex items-end justify-between">
            <img
                src="/CDI_logo.svg"
                alt="CDI logo"
                class="sm:h-64 h-32 w-auto"
            />
            <span
                class="display text-4xl tabular-nums text-brand-500 sm:text-6xl"
            >
                <span ref="counter">0</span>
            </span>
        </div>
        <div class="mt-8 h-px w-full bg-white/10">
            <div ref="bar" class="h-full origin-left scale-x-0 bg-brand-500" />
        </div>
    </div>
</template>
