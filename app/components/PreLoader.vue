<script setup lang="ts">
import { gsap } from "~/utils/gsap";

const introComplete = useIntroComplete();

const root = useTemplateRef<HTMLElement>("root");
const panels = useTemplateRef<HTMLElement[]>("panels");
const mark = useTemplateRef<HTMLElement>("mark");
const fill = useTemplateRef<HTMLElement>("fill");

const MAX_WAIT_MS = 2500;
const SETTLE_MS = 200;
const IDLE_CEILING = 88;
const PANEL_COUNT = 5;
const HANDOFF_S = 0.2;

const visible = ref(!introComplete.value);

const progress = { value: 0 };

let ctx: gsap.Context | undefined;
let timeout: number | undefined;
let scrollLocked = false;
let finished = false;

function panelStyle(index: number) {
    const step = 100 / PANEL_COUNT;
    return {
        left: `${index * step}%`,
        width: `calc(${step}% + 1px)`,
    };
}

function paintProgress() {
    if (!fill.value) return;
    gsap.set(fill.value, {
        clipPath: `inset(${100 - progress.value}% 0 0 0)`,
    });
}

function unlockScroll() {
    if (!scrollLocked) return;
    document.documentElement.style.overflow = "";
    scrollLocked = false;
}

function dismiss() {
    visible.value = false;
    introComplete.value = true;
    unlockScroll();
}

function finish() {
    if (finished) return;
    finished = true;
    window.clearTimeout(timeout);

    if (!root.value || !panels.value?.length) {
        dismiss();
        return;
    }

    ctx?.add(() => {
        gsap.killTweensOf(progress);

        gsap.timeline({ onComplete: dismiss })
            .to(progress, {
                value: 100,
                duration: 0.28,
                ease: "power2.out",
                onUpdate: paintProgress,
            })
            .to(
                mark.value,
                { autoAlpha: 0, y: -24, duration: 0.35, ease: "power2.in" },
                "+=0.12",
            )
            .to(
                panels.value,
                {
                    yPercent: -100,
                    duration: 0.7,
                    ease: "power4.inOut",
                    stagger: 0.07,
                },
                "-=0.2",
            )
            .add(() => (introComplete.value = true), `<${HANDOFF_S}`);
    });
}

onMounted(() => {
    if (!visible.value) return;

    if (resolveMotionTier() === "static") {
        dismiss();
        return;
    }

    document.documentElement.style.overflow = "hidden";
    scrollLocked = true;

    ctx = gsap.context(() => {
        gsap.to(progress, {
            value: IDLE_CEILING,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: paintProgress,
        });
    }, root.value ?? undefined);

    timeout = window.setTimeout(finish, MAX_WAIT_MS);

    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts
        .catch(() => undefined)
        .then(() => new Promise((r) => window.setTimeout(r, SETTLE_MS)))
        .then(finish);
});

onBeforeUnmount(() => {
    window.clearTimeout(timeout);
    unlockScroll();
    ctx?.revert();
});
</script>

<template>
    <div
        v-if="visible"
        ref="root"
        class="preloader fixed inset-0 z-100 overflow-hidden"
        role="status"
        :aria-label="$t('home.loader.label')"
    >
        <!-- Everything below is decoration; the label carries the announcement. -->
        <div aria-hidden="true" class="absolute inset-0">
            <div
                v-for="i in PANEL_COUNT"
                :key="i"
                ref="panels"
                class="absolute top-0 h-full bg-ink-800"
                :style="panelStyle(i - 1)"
            />
        </div>

        <div
            ref="mark"
            aria-hidden="true"
            class="relative flex h-full items-center justify-center"
        >
            <div class="relative w-40 sm:w-64">
                <img src="/CDI_logo.svg" alt="" class="w-full opacity-15" />
                <img
                    ref="fill"
                    src="/CDI_logo.svg"
                    alt=""
                    class="preloader-fill absolute inset-0 w-full"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.preloader-fill {
    clip-path: inset(100% 0 0 0);
    will-change: clip-path;
}

.preloader :deep(*) {
    will-change: transform;
}

@keyframes preloader-release {
    to {
        opacity: 0;
        visibility: hidden;
    }
}

.preloader {
    animation: preloader-release 200ms linear 6s forwards;
}

@media (prefers-reduced-motion: reduce) {
    .preloader {
        display: none;
    }
}
</style>
