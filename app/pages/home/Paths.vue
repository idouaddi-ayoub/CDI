<script setup lang="ts">
import gsap from "gsap";
import type { SplitText } from "gsap/SplitText";
import {
    LINKS,
    CLUB_SOCIALS,
    AGENCY_SOCIALS,
    EXTERNAL_ATTRS,
} from "@/utils/links";

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");

const active = ref<"student" | "business" | null>(null);

const panels = [
    {
        id: "student" as const,
        href: LINKS.join,
        external: true,
        icon: "i-lucide-users",
        accent: "brand",
        socials: CLUB_SOCIALS,
        label: "club",
    },
    {
        id: "business" as const,
        href: LINKS.business,
        external: false,
        icon: "i-lucide-briefcase",
        accent: "accent",
        socials: AGENCY_SOCIALS,
        label: "agency",
    },
];

let ctx: gsap.Context | undefined;
let split: SplitText | undefined;

function levelOff(halves: HTMLElement[]) {
    gsap.to(halves, {
        skewY: 0,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
    });
}

onMounted(() => {
    const tier = resolveMotionTier();
    if (tier === "static" || !root.value) return;

    ctx = gsap.context((self) => {
        split = revealLines(heading.value, root.value);
        riseIn(self.selector?.("[data-reveal]") ?? [], root.value, { y: 24 });

        const halves = (self.selector?.(".path-panel") ?? []) as HTMLElement[];
        if (!halves.length) return;

        gsap.from(halves, {
            yPercent: (i) => (i === 0 ? 14 : -14),
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: root.value!,
                start: "top 85%",
                end: "top 30%",
                scrub: 0.5,
            },
        });

        if (tier !== "full") return;

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
    }, root.value);
});

onBeforeUnmount(() => {
    split?.revert();
    ctx?.revert();
});
</script>

<template>
    <section
        id="paths"
        ref="root"
        class="relative flex min-h-svh flex-col justify-center px-6 py-32 sm:px-10"
        @pointerleave="active = null"
    >
        <div class="mx-auto w-full max-w-7xl">
            <p class="eyebrow" data-reveal>{{ $t("home.paths.eyebrow") }}</p>
            <h2 ref="heading" class="display mt-4 text-4xl sm:text-6xl">
                {{ $t("home.paths.title") }}
            </h2>
            <div
                class="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-x-28 xl:gap-x-40"
            >
                <div
                    v-for="panel in panels"
                    :key="panel.id"
                    class="path-panel panel group relative flex min-h-96 flex-col justify-between rounded-2xl border border-white/10 p-8 transition-[background-color,border-color,opacity] duration-500 sm:p-10"
                    :class="[
                        active && active !== panel.id
                            ? 'opacity-45'
                            : 'opacity-100',
                        panel.accent === 'brand'
                            ? 'hover:border-brand-500/40'
                            : 'hover:border-accent-400/40',
                    ]"
                    @pointerenter="active = panel.id"
                    @focusin="active = panel.id"
                >
                    <a
                        :href="panel.href"
                        v-bind="panel.external ? EXTERNAL_ATTRS : {}"
                        class="absolute inset-0 z-0 rounded-2xl"
                        :aria-label="$t(`home.paths.${panel.id}.title`)"
                    />

                    <div class="pointer-events-none relative z-10">
                        <div class="flex items-center justify-between">
                            <UIcon
                                :name="panel.icon"
                                class="size-6"
                                :class="
                                    panel.accent === 'brand'
                                        ? 'text-brand-500'
                                        : 'text-accent-400'
                                "
                            ></UIcon>
                            <span class="eyebrow">{{
                                $t(`home.footer.${panel.label}`)
                            }}</span>
                        </div>
                        <h3 class="display mt-10 text-2xl sm:text-4xl">
                            {{ $t(`home.paths.${panel.id}.title`) }}
                        </h3>
                        <p
                            class="mt-6 max-w-sm text-sm text-fg-muted sm:text-base"
                        >
                            {{ $t(`home.paths.${panel.id}.body`) }}
                        </p>
                    </div>

                    <div class="pointer-events-none relative z-10 mt-12">
                        <span
                            class="inline-flex items-center gap-3 text-base font-medium"
                            :class="
                                panel.accent === 'brand'
                                    ? 'text-brand-400'
                                    : 'text-accent-400'
                            "
                        >
                            {{ $t(`home.paths.${panel.id}.cta`) }}
                            <UIcon
                                name="i-lucide-arrow-up-right"
                                class="size-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                            ></UIcon>
                        </span>
                        <div
                            class="pointer-events-auto mt-8 flex items-center gap-5 border-t border-white/10 pt-8 w-36 h-20 justify-center"
                        >
                            <a
                                v-for="social in panel.socials"
                                :key="social.href"
                                :href="social.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="relative z-20 text-fg-muted/50 transition-colors hover:text-fg-muted"
                            >
                                <UIcon
                                    :name="social.icon"
                                    class="size-4"
                                ></UIcon>
                                <span class="sr-only">{{ social.label }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
