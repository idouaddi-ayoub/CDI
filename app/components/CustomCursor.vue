<script setup lang="ts">
import gsap from "gsap";

/**
 * Pointer-only cursor follower. Mounts nothing at all on touch or under
 * reduced motion — the native cursor is only hidden (via .has-custom-cursor
 * in main.css) while this is actually rendering, so a tier change can never
 * leave a visitor with no cursor.
 */
const { isFull } = useMotionTier();

const dot = useTemplateRef<HTMLElement>("dot");
const ring = useTemplateRef<HTMLElement>("ring");

const hovering = ref(false);

let ctx: gsap.Context | undefined;

/** Elements that should make the ring expand. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

function start() {
    if (!dot.value || !ring.value) return;

    document.documentElement.classList.add("has-custom-cursor");

    ctx = gsap.context(() => {
        // quickTo keeps a single tween alive per axis instead of allocating a
        // new one on every pointermove — this fires at pointer sample rate.
        const dotX = gsap.quickTo(dot.value!, "x", { duration: 0.12, ease: "power3" });
        const dotY = gsap.quickTo(dot.value!, "y", { duration: 0.12, ease: "power3" });
        const ringX = gsap.quickTo(ring.value!, "x", { duration: 0.45, ease: "power3" });
        const ringY = gsap.quickTo(ring.value!, "y", { duration: 0.45, ease: "power3" });

        const onMove = (e: PointerEvent) => {
            dotX(e.clientX);
            dotY(e.clientY);
            ringX(e.clientX);
            ringY(e.clientY);
        };

        const onOver = (e: PointerEvent) => {
            const el = e.target as HTMLElement | null;
            hovering.value = Boolean(el?.closest?.(INTERACTIVE));
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerover", onOver, { passive: true });

        ctx?.add(() => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerover", onOver);
        });
    });
}

function stop() {
    document.documentElement.classList.remove("has-custom-cursor");
    ctx?.revert();
    ctx = undefined;
}

onMounted(() => {
    if (isFull.value) nextTick(start);
});

// The tier can change mid-session — a downgrade from the FPS watchdog, or a
// window resize across the desktop breakpoint.
watch(isFull, (on) => {
    if (on) nextTick(start);
    else stop();
});

onBeforeUnmount(stop);
</script>

<template>
    <div v-if="isFull" aria-hidden="true">
        <div
            ref="dot"
            class="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-brand-500"
        />
        <div
            ref="ring"
            class="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-fg/40 transition-[width,height,margin,border-color] duration-300"
            :class="
                hovering
                    ? 'size-14 -ml-7 -mt-7 border-brand-500'
                    : 'size-8 -ml-4 -mt-4'
            "
        />
    </div>
</template>
