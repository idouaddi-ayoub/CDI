<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const flags: Record<string, string> = {
    en: "i-circle-flags-gb",
    fr: "i-circle-flags-fr",
};

const items = computed(() =>
    locales.value.map((l) => {
        const code = typeof l === "string" ? l : l.code;
        return {
            label: code.toUpperCase(),
            value: code,
            icon: flags[code],
        };
    }),
);

const selected = computed({
    get: () => locale.value,
    set: (code: string) => navigateTo(switchLocalePath(code as any)),
});
</script>

<template>
    <nav
        :aria-label="$t('home.nav.language')"
        class="flex items-center gap-2 text-xs uppercase tracking-wide"
    >
        <USelectMenu
            v-model="selected"
            :items="items"
            value-key="value"
            :search-input="false"
            :aria-label="$t('home.nav.language')"
            class="w-24"
        >
            <template #leading>
                <UIcon
                    v-if="flags[selected]"
                    :name="flags[selected]"
                    class="size-4"
                />
            </template>
        </USelectMenu>
    </nav>
</template>
