<script setup lang="ts">
import { ACESFilmicToneMapping } from "three";
import { TresCanvas } from "@tresjs/core";
import Navigation from "@/components/Navigation.vue";
import PreLoader from "@/components/PreLoader.vue";

const { rendersCanvas, isFull } = useMotionTier();
</script>

<template>
    <div>
        <PreLoader />
        <Navigation />

        <div
            v-if="rendersCanvas"
            class="pointer-events-none fixed inset-0 -z-10"
        >
            <TresCanvas
                window-size
                clear-color="#080b0a"
                :tone-mapping="ACESFilmicToneMapping"
                :dpr="isFull ? [1, 1.75] : [1, 1.5]"
            >
                <Scene />
            </TresCanvas>
        </div>

        <div
            v-else
            aria-hidden="true"
            class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_70%_55%_at_60%_40%,rgba(34,197,94,0.14),transparent_70%)]"
        />

        <main><slot /></main>
    </div>
</template>
