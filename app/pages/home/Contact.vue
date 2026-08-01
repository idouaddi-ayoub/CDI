<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { LINKS, EXTERNAL_ATTRS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger, SplitText);

const { isFull, animates } = useMotionTier();

const root = useTemplateRef<HTMLElement>("root");
const heading = useTemplateRef<HTMLHeadingElement>("heading");
const magnet = useTemplateRef<HTMLAnchorElement>("magnet");

let ctx: gsap.Context | undefined;

onMounted(() => {
    if (!animates.value || !root.value) return;

    ctx = gsap.context(() => {
        if (heading.value) {
            let done = false;
            SplitText.create(heading.value, {
                type: "lines",
                mask: "lines",
                autoSplit: true,
                onSplit(self) {
                    if (done) return;
                    done = true;
                    return gsap.from(self.lines, {
                        yPercent: 110,
                        duration: 1.1,
                        stagger: 0.1,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: root.value!,
                            start: "top 70%",
                            once: true,
                        },
                    });
                },
            });
        }

        if (isFull.value && magnet.value) {
            const el = magnet.value;
            const strength = 0.35;
            const radius = 30;

            const onMove = (e: PointerEvent) => {
                const box = el.getBoundingClientRect();
                const dx = e.clientX - (box.left + box.width / 2);
                const dy = e.clientY - (box.top + box.height / 2);
                if (Math.hypot(dx, dy) > radius + box.width / 2) return;
                gsap.to(el, {
                    x: dx * strength,
                    y: dy * strength,
                    ease: "power3.out",
                });
            };
            const onLeave = () =>
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.4)",
                });

            window.addEventListener("pointermove", onMove, { passive: true });
            el.addEventListener("pointerleave", onLeave);
            ctx?.add(() => {
                window.removeEventListener("pointermove", onMove);
                el.removeEventListener("pointerleave", onLeave);
            });
        }
    }, root.value);
});

onBeforeUnmount(() => ctx?.revert());
</script>

<template>
    <section
        id="contact"
        ref="root"
        class="relative flex min-h-svh items-center overflow-hidden"
    >
        <div class="mx-auto w-full max-w-7xl px-6 py-32 sm:px-10">
            <h2 ref="heading" class="display display-xl max-w-5xl">
                {{ $t("home.finalCta.title") }}
            </h2>

            <p class="mt-10 max-w-md text-lg text-fg-muted" data-reveal>
                {{ $t("home.finalCta.sub") }}
            </p>

            <div class="mt-14 flex flex-wrap items-center gap-8 max-w-fit">
                <a
                    ref="magnet"
                    :href="LINKS.join"
                    v-bind="EXTERNAL_ATTRS"
                    class="inline-flex items-center gap-3 rounded-full bg-brand-500 px-10 py-5 text-lg font-medium text-ink-950 transition-colors hover:bg-brand-400"
                >
                    {{ $t("home.finalCta.ctaStudent") }}
                    <UIcon name="i-lucide-arrow-up-right" class="size-5" />
                </a>

                <a
                    :href="LINKS.business"
                    class="inline-flex items-center gap-2 text-lg text-fg-muted underline-offset-8 transition-colors hover:text-fg hover:underline"
                >
                    {{ $t("home.finalCta.ctaBusiness") }}
                </a>
            </div>
        </div>

        <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-96 bg-linear-to-t from-brand-600/10 to-transparent"
        />
    </section>
</template>
