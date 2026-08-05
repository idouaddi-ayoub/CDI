<script setup lang="ts">
import {
    LINKS,
    CLUB_SOCIALS,
    AGENCY_SOCIALS,
    EXTERNAL_ATTRS,
} from "@/utils/links";

const year = new Date().getFullYear();
</script>

<template>
    <footer class="border-t border-white/5 bg-ink-950">
        <div class="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-20">
            <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <img
                        src="/CDI_logo.svg"
                        alt="cdi-encgagadir"
                        class="w-12"
                    />
                    <p class="mt-3 text-sm text-fg-muted">
                        {{ $t("home.footer.location") }}
                    </p>
                    <p class="mt-1 text-sm text-fg-muted">
                        {{ $t("home.hero.since") }}
                    </p>
                </div>

                <!-- Two brands, two sets of accounts. Keeping them separate
                     here matches how they're actually run. -->
                <div>
                    <p class="eyebrow">{{ $t("home.footer.club") }}</p>
                    <ul class="mt-5 space-y-3">
                        <li v-for="s in CLUB_SOCIALS" :key="s.href">
                            <a
                                :href="s.href"
                                v-bind="EXTERNAL_ATTRS"
                                class="inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
                            >
                                <UIcon :name="s.icon" class="size-4" />
                                {{ s.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="eyebrow">{{ $t("home.footer.agency") }}</p>
                    <ul class="mt-5 space-y-3">
                        <li v-for="s in AGENCY_SOCIALS" :key="s.href">
                            <a
                                :href="s.href"
                                v-bind="EXTERNAL_ATTRS"
                                class="inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
                            >
                                <UIcon :name="s.icon" class="size-4" />
                                {{ s.label }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p class="eyebrow">{{ $t("home.footer.contact") }}</p>
                    <ul class="mt-5 space-y-3 text-sm">
                        <li>
                            <a
                                :href="LINKS.business"
                                class="inline-flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                            >
                                <UIcon name="i-lucide-mail" class="size-4" />
                                {{ LINKS.email }}
                            </a>
                        </li>
                        <li>
                            <a
                                :href="LINKS.whatsapp"
                                v-bind="EXTERNAL_ATTRS"
                                class="inline-flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                            >
                                <UIcon
                                    name="i-simple-icons-whatsapp"
                                    class="size-4"
                                />
                                WhatsApp
                            </a>
                        </li>
                        <li>
                            <a
                                :href="LINKS.location"
                                v-bind="EXTERNAL_ATTRS"
                                class="inline-flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                            >
                                <UIcon name="i-lucide-map-pin" class="size-4" />
                                ENCG Agadir
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                class="mt-16 flex flex-col gap-2 border-t border-white/5 pt-8 text-xs text-fg-muted/70 sm:flex-row sm:items-center sm:justify-between"
            >
                <span
                    >© {{ year }} CDI — ENCG Agadir.
                    {{ $t("home.footer.rights") }}</span
                >
                <span>Club Digital &amp; Innovation</span>
            </div>
        </div>
    </footer>
</template>
