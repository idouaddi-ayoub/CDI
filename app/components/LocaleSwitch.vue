<script setup lang="ts">
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// on = fr, off = en
const isFr = computed(() => locale.value === "fr");

function onToggle(v: boolean) {
    return navigateTo(switchLocalePath(v ? "fr" : "en"));
}
</script>

<template>
    <nav
        :aria-label="$t('home.nav.language')"
        class="flex items-center gap-2 text-xs uppercase tracking-wide"
    >
        <span :class="isFr ? 'text-fg-muted' : 'text-fg'">en</span>
        <USwitch
            :model-value="isFr"
            :aria-label="$t('home.nav.language')"
            @update:model-value="onToggle"
        />
        <span :class="isFr ? 'text-fg' : 'text-fg-muted'">fr</span>
    </nav>
</template>
