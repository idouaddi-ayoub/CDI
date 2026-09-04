<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LINKS, CLUB_SOCIALS, EXTERNAL_ATTRS, NAV_ITEMS } from "@/utils/links";

gsap.registerPlugin(ScrollTrigger);

const { $lenis } = useNuxtApp();
const route = useRoute();
const DESKTOP = "(min-width: 768px)";
const active = ref<string>("hero");
const scrolled = ref(false);
const open = ref(false);
const header = useTemplateRef<HTMLElement>("header");
const toggle = useTemplateRef<HTMLButtonElement>("toggle");
const panel = useTemplateRef<HTMLElement>("panel");
const sheet = useTemplateRef<HTMLElement>("sheet");
const barTop = useTemplateRef<HTMLElement>("barTop");
const barBottom = useTemplateRef<HTMLElement>("barBottom");

function jumpTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const pin = ScrollTrigger.getAll().find((t) => t.pin && t.trigger === el);

    if ($lenis) $lenis.scrollTo(pin ? pin.end : el, { offset: 0 });
    else if (pin) window.scrollTo(0, pin.end);
    else el.scrollIntoView({ behavior: "auto", block: "start" });
}

let menuTl: gsap.core.Timeline | undefined;

function lockScroll(locked: boolean) {
    document.documentElement.style.overflow = locked ? "hidden" : "";
    if (locked) $lenis?.stop();
    else $lenis?.start();
}

function setMenu(next: boolean) {
    if (open.value === next) return;
    open.value = next;
    lockScroll(next);

    const animates = resolveMotionTier() !== "static";
    const bars = [barTop.value, barBottom.value].filter(Boolean);

    menuTl?.kill();

    if (!animates) {
        gsap.set(panel.value!, { autoAlpha: next ? 1 : 0 });
        gsap.set(sheet.value!, { yPercent: 0, autoAlpha: 1 });
        gsap.set(barTop.value!, { y: next ? 2 : 0, rotate: next ? 45 : 0 });
        gsap.set(barBottom.value!, {
            y: next ? -2 : 0,
            rotate: next ? -45 : 0,
        });
        if (next) panel.value?.querySelector<HTMLElement>("a, button")?.focus();
        else toggle.value?.focus();
        return;
    }

    const items =
        panel.value?.querySelectorAll<HTMLElement>("[data-menu-item]");

    menuTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
            if (next) {
                panel.value?.querySelector<HTMLElement>("a, button")?.focus();
            }
        },
    });

    if (next) {
        menuTl
            .set(panel.value!, { autoAlpha: 1 })
            .fromTo(
                sheet.value!,
                { yPercent: -100 },
                { yPercent: 0, duration: 0.55, ease: "power4.out" },
            )
            .from(
                items ?? [],
                { y: 28, opacity: 0, duration: 0.5, stagger: 0.06 },
                "-=0.3",
            )
            .to(barTop.value!, { y: 2, rotate: 45, duration: 0.3 }, 0)
            .to(barBottom.value!, { y: -2, rotate: -45, duration: 0.3 }, 0);
    } else {
        menuTl
            .to(sheet.value!, {
                yPercent: -100,
                duration: 0.4,
                ease: "power3.in",
            })
            .set(panel.value!, { autoAlpha: 0 })
            .to(bars, { y: 0, rotate: 0, duration: 0.3 }, 0)
            .add(() => toggle.value?.focus());
    }
}

function select(id: string) {
    setMenu(false);
    jumpTo(id);
}

function onKeydown(e: KeyboardEvent) {
    if (!open.value) return;

    const inHeader = header.value?.contains(document.activeElement) ?? false;

    if (e.key === "Escape") {
        if (!inHeader) return;
        e.preventDefault();
        setMenu(false);
        return;
    }
    if (e.key !== "Tab" || !header.value) return;

    const focusable = [
        ...header.value.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
    ].filter((el) => el.offsetParent !== null);

    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;

    const current = document.activeElement;
    if (e.shiftKey && (current === first || !inHeader)) {
        e.preventDefault();
        last.focus();
    } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
    }
}

let triggers: ScrollTrigger[] = [];
let desktop: MediaQueryList | undefined;

function closeOnDesktop(e: MediaQueryListEvent | MediaQueryList) {
    if (e.matches) setMenu(false);
}

onMounted(async () => {
    await nextTick();

    triggers = ["hero", ...NAV_ITEMS.map((i) => i.id)].flatMap((id) => {
        const el = document.getElementById(id);
        if (!el) return [];
        return ScrollTrigger.create({
            trigger: el,
            start: "top 30%",
            end: "bottom 30%",
            onToggle: (self) => {
                if (self.isActive) active.value = id;
            },
        });
    });

    triggers.push(
        ScrollTrigger.create({
            start: 40,
            end: "max",
            onToggle: (self) => {
                scrolled.value = self.isActive;
            },
        }),
    );

    desktop = window.matchMedia(DESKTOP);
    desktop.addEventListener("change", closeOnDesktop);

    window.addEventListener("keydown", onKeydown);
});

watch(
    () => route.fullPath,
    () => setMenu(false),
);

onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
    triggers = [];
    desktop?.removeEventListener("change", closeOnDesktop);
    window.removeEventListener("keydown", onKeydown);
    menuTl?.kill();
    if (open.value) lockScroll(false);
});
</script>

<template>
    <header ref="header" class="fixed inset-x-0 top-0 z-50">
        <div
            class="relative z-10 flex items-center justify-between gap-6 px-6 py-5 transition-[background-color,border-color,backdrop-filter] duration-500 sm:px-10"
            :class="
                scrolled && !open
                    ? 'border-b border-white/10 bg-ink-950/60 backdrop-blur-md'
                    : 'border-b border-transparent'
            "
        >
            <NuxtLink
                to="/"
                class="display text-xl tracking-tight"
                aria-label="CDI — home"
            >
                <img src="/CDI_logo.svg" alt="CDI" class="w-12" />
            </NuxtLink>

            <nav class="hidden items-center gap-8 md:flex">
                <button
                    v-for="item in NAV_ITEMS"
                    :key="item.id"
                    type="button"
                    class="relative text-sm transition-colors"
                    :class="
                        active === item.id
                            ? 'text-fg'
                            : 'text-fg-muted hover:text-fg'
                    "
                    @click="jumpTo(item.id)"
                >
                    {{ $t(`home.nav.${item.key}`) }}
                    <span
                        aria-hidden="true"
                        class="absolute -bottom-1.5 left-0 h-px w-full origin-left bg-brand-500 transition-transform duration-300"
                        :class="
                            active === item.id ? 'scale-x-100' : 'scale-x-0'
                        "
                    />
                </button>
            </nav>

            <div class="hidden items-center gap-4 md:flex">
                <LocaleSwitch />

                <UButton
                    :to="LINKS.join"
                    v-bind="EXTERNAL_ATTRS"
                    size="sm"
                    color="primary"
                    class="px-5"
                >
                    {{ $t("home.nav.cta") }}
                </UButton>
            </div>

            <button
                ref="toggle"
                type="button"
                class="relative -mr-2 size-10 md:hidden"
                aria-controls="mobile-menu"
                :aria-expanded="open"
                :aria-label="open ? $t('home.nav.close') : $t('home.nav.menu')"
                @click="setMenu(!open)"
            >
                <span
                    ref="barTop"
                    aria-hidden="true"
                    class="absolute top-4.5 left-1/2 -ml-3 block h-px w-6 bg-fg"
                />
                <span
                    ref="barBottom"
                    aria-hidden="true"
                    class="absolute top-5.5 left-1/2 -ml-3 block h-px w-6 bg-fg"
                />
            </button>
        </div>

        <div
            id="mobile-menu"
            ref="panel"
            class="mobile-menu fixed inset-0 md:hidden"
            role="dialog"
            aria-modal="true"
            :aria-label="$t('home.nav.menu')"
            :inert="!open ? true : undefined"
        >
            <div aria-hidden="true" class="absolute inset-0 bg-ink-950/95" />

            <div
                ref="sheet"
                class="relative flex h-full flex-col justify-between overflow-y-auto px-6 pt-28 pb-10"
            >
                <nav :aria-label="$t('home.nav.menu')">
                    <ul>
                        <li v-for="(item, i) in NAV_ITEMS" :key="item.id">
                            <a
                                :href="`#${item.id}`"
                                data-menu-item
                                class="flex items-baseline gap-5 border-b border-white/10 py-5 transition-colors"
                                :class="
                                    active === item.id
                                        ? 'text-fg'
                                        : 'text-fg-muted'
                                "
                                @click.prevent="select(item.id)"
                            >
                                <span class="eyebrow">
                                    {{ String(i + 1).padStart(2, "0") }}
                                </span>
                                <span class="display text-3xl">
                                    {{ $t(`home.nav.${item.key}`) }}
                                </span>
                                <span
                                    aria-hidden="true"
                                    class="ml-auto h-px flex-1 self-center transition-colors"
                                    :class="
                                        active === item.id
                                            ? 'bg-brand-500'
                                            : 'bg-transparent'
                                    "
                                />
                            </a>
                        </li>
                    </ul>
                </nav>

                <div class="mt-12 space-y-8">
                    <UButton
                        data-menu-item
                        :to="LINKS.join"
                        v-bind="EXTERNAL_ATTRS"
                        size="xl"
                        color="primary"
                        block
                    >
                        {{ $t("home.nav.cta") }}
                    </UButton>

                    <div
                        data-menu-item
                        class="flex items-center justify-between border-t border-white/10 pt-8"
                    >
                        <LocaleSwitch />

                        <div class="flex items-center gap-5">
                            <a
                                v-for="social in CLUB_SOCIALS"
                                :key="social.href"
                                :href="social.href"
                                v-bind="EXTERNAL_ATTRS"
                                class="text-fg-muted/70 transition-colors hover:text-fg"
                            >
                                <UIcon :name="social.icon" class="size-5" />
                                <span class="sr-only">{{ social.label }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.mobile-menu {
    visibility: hidden;
    opacity: 0;
}
</style>
