<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    LINKS,
    CLUB_SOCIALS,
    AGENCY_SOCIALS,
    EXTERNAL_ATTRS,
} from "@/utils/links";

gsap.registerPlugin(ScrollTrigger);

const { isFull, animates } = useMotionTier();

const root = useTemplateRef<HTMLElement>("root");

const active = ref<"student" | "business" | null>(null);

const panels = [
    {
        id: "student" as const,
        key: "student",
        href: LINKS.join,
        external: true,
        icon: "i-lucide-users",
        accent: "brand",
        socials: CLUB_SOCIALS,
        label: "The club",
    },
    {
        id: "business" as const,
        key: "business",
        href: LINKS.business,
        external: false,
        icon: "i-lucide-briefcase",
        accent: "accent",
        socials: AGENCY_SOCIALS,
        label: "The agency",
    },
];

let ctx: gsap.Context | undefined;

function levelOff(halves: HTMLElement[]) {
    gsap.to(halves, {
        skewY: 0,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
    });
}

onMounted(() => {
    if (!animates.value || !root.value) return;

    ctx = gsap.context((self) => {
        const halves = self.selector?.(".path-panel") as HTMLElement[];
        if (!halves?.length) return;

        gsap.from(halves, {
            yPercent: (i) => (i === 0 ? 12 : -12),
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: root.value!,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.5,
            },
        });

        if (isFull.value) {
            gsap.to(halves, {
                skewY: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: root.value!,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (st) => {
                        const skew = gsap.utils.clamp(
                            -4,
                            4,
                            st.getVelocity() / -420,
                        );
                        gsap.to(halves, {
                            skewY: skew,
                            duration: 0.5,
                            ease: "power3.out",
                            overwrite: "auto",
                        });
                    },
                    onLeave: () => levelOff(halves),
                    onLeaveBack: () => levelOff(halves),
                },
            });
        }
    }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <section
        id="paths"
        ref="root"
        class="relative overflow-hidden border-y border-white/5"
        @pointerleave="active = null"
    >
        <div class="mx-auto max-w-7xl px-6 pt-24 sm:px-10 sm:pt-32">
            <p class="eyebrow" data-reveal>{{ $t("home.paths.eyebrow") }}</p>
            <h2
                class="display mt-4 text-4xl sm:text-6xl lg:text-7xl"
                data-reveal
            >
                {{ $t("home.paths.title") }}
            </h2>
        </div>

        <div
            class="mt-14 grid gap-px bg-white/5 sm:mt-20 lg:-mx-12 lg:grid-cols-2 lg:-skew-x-6"
        >
            <a
                v-for="panel in panels"
                :key="panel.id"
                :href="panel.href"
                v-bind="panel.external ? EXTERNAL_ATTRS : {}"
                class="path-panel group relative flex min-h-104 flex-col bg-ink-950 p-8 transition-[background-color,opacity] duration-500 sm:p-12 lg:min-h-136 lg:px-20"
                :class="[
                    active && active !== panel.id
                        ? 'opacity-40 lg:opacity-30'
                        : 'opacity-100',
                    panel.accent === 'brand'
                        ? 'hover:bg-brand-950/40'
                        : 'hover:bg-accent-950/30',
                ]"
                @pointerenter="active = panel.id"
                @focusin="active = panel.id"
            >
                <!--
                    One wrapper, not a class on each block: a counter-skew is
                    taken about its own element's centre, so two of them sitting
                    at different heights in the panel would land at different
                    horizontal offsets and no longer line up with each other.
                    It carries the flex layout the anchor used to own.
                -->
                <div class="flex flex-1 flex-col justify-between lg:skew-x-6">
                    <div>
                        <div class="flex items-center justify-between">
                            <UIcon
                                :name="panel.icon"
                                class="size-7"
                                :class="
                                    panel.accent === 'brand'
                                        ? 'text-brand-500'
                                        : 'text-accent-400'
                                "
                            />
                            <span class="eyebrow">{{ panel.label }}</span>
                        </div>

                        <h3
                            class="display mt-10 text-3xl leading-[0.95] sm:text-5xl lg:text-6xl"
                        >
                            {{ $t(`home.paths.${panel.key}.title`) }}
                        </h3>
                        <p class="mt-6 max-w-sm text-base text-fg-muted">
                            {{ $t(`home.paths.${panel.key}.body`) }}
                        </p>
                    </div>

                    <div class="mt-12">
                        <span
                            class="inline-flex items-center gap-3 text-lg font-medium"
                            :class="
                                panel.accent === 'brand'
                                    ? 'text-brand-400'
                                    : 'text-accent-400'
                            "
                        >
                            {{ $t(`home.paths.${panel.key}.cta`) }}
                            <UIcon
                                name="i-lucide-arrow-up-right"
                                class="size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </span>

                        <div
                            class="mt-8 flex items-center gap-5 border-t border-white/5 pt-6"
                        >
                            <span
                                v-for="social in panel.socials"
                                :key="social.href"
                                class="text-fg-muted/50 transition-colors group-hover:text-fg-muted"
                            >
                                <UIcon :name="social.icon" class="size-4" />
                                <span class="sr-only">{{ social.label }}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </section>
</template>
