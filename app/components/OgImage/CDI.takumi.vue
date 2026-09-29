<script setup lang="ts">
const {
    title = "Become more with CDI",
    description = "A student-run digital club at ENCG Agadir. Build real things, with real people.",
    footer = "ENCG Agadir · Since 2018",
} = defineProps<{
    title?: string;
    description?: string;
    footer?: string;
}>();
</script>

<template>
    <div
        class="w-full h-full flex"
        style="
            position: relative;
            background-color: #080b0a;
            background-image:
                radial-gradient(
                    circle at 78% 45%,
                    rgba(34, 197, 94, 0.28),
                    transparent 45%
                ),
                radial-gradient(
                    circle at 0% 100%,
                    rgba(22, 101, 52, 0.45),
                    transparent 50%
                ),
                linear-gradient(rgba(74, 222, 128, 0.06) 1px, transparent 1px),
                linear-gradient(
                    90deg,
                    rgba(74, 222, 128, 0.06) 1px,
                    transparent 1px
                );
            background-size:
                100% 100%,
                100% 100%,
                48px 48px,
                48px 48px;
            color: #e8f0ec;
            font-family: anguita, sans-serif;
        "
    >
        <div
            class="flex flex-col justify-between"
            style="width: 760px; height: 100%; padding: 72px 0 64px 80px"
        >
            <div class="flex items-center">
                <span
                    style="
                        font-size: 18px;
                        text-transform: uppercase;
                        letter-spacing: 0.24em;
                        color: #9fb3aa;
                    "
                >
                    cdiencga.com
                </span>
            </div>

            <div class="flex flex-col" style="gap: 28px">
                <div
                    style="
                        font-size: 76px;
                        font-weight: 600;
                        font-style: italic;
                        line-height: 1;
                        color: #e8f0ec;
                    "
                >
                    {{ title }}
                </div>
                <div
                    style="
                        font-size: 28px;
                        line-height: 1.4;
                        color: #9fb3aa;
                        max-width: 620px;
                    "
                >
                    {{ description }}
                </div>
            </div>

            <div class="flex items-center">
                <span
                    style="
                        font-size: 20px;
                        letter-spacing: 0.12em;
                        color: #4ade80;
                    "
                >
                    {{ footer }}
                </span>
            </div>
        </div>

        <div
            class="flex items-center justify-center"
            style="flex: 1; height: 100%; padding-right: 64px"
        >
            <img
                src="/CDI_logo.svg"
                width="320"
                height="320"
                style="object-fit: contain"
            />
        </div>

        <div
            style="
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 3px;
                background-image: linear-gradient(
                    90deg,
                    transparent,
                    #22c55e 30%,
                    #4ade80 70%,
                    transparent
                );
            "
        />
    </div>
</template>
