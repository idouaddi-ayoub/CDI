<script setup lang="ts">
import Scene from "@/components/Scene.vue";

/**
 * The WebGL half of the hero, split out so it can be reached through
 * `<LazyHeroCanvas>`.
 *
 * Everything three.js touches — the renderer, the extruded wordmark, the bloom
 * pass — lives behind this boundary. Inlined in the hero it was a static import
 * of ~900KB that every visitor preloaded before first paint, including the
 * phones and reduced-motion sessions that never render a canvas at all. As its
 * own component it becomes a chunk that is fetched only once `rendersCanvas`
 * turns true, which happens on the client after the tier resolves.
 */
defineProps<{ scroll: number; full: boolean }>();

const gl = { clearColor: "#000000", alpha: true, antialias: true };
</script>

<template>
    <!-- Phones carry a 3x device ratio on a GPU that can't spend it. Capping
         lower there costs a little edge crispness and roughly halves the
         fragments the wordmark has to shade. -->
    <TresCanvas v-bind="gl" :dpr="full ? [1, 1.75] : [1, 1.5]">
        <Suspense>
            <Scene :scroll="scroll" />
        </Suspense>

        <!-- Desktop only. A full-screen mipmap-blur bloom is the single most
             expensive thing in this scene, and on a phone it would spend the
             frame budget that keeps the wordmark itself on screen. -->
        <Suspense v-if="full">
            <EffectComposerPmndrs>
                <BloomPmndrs
                    :intensity="0.45"
                    :luminance-threshold="0.55"
                    :luminance-smoothing="0.5"
                    :radius="0.7"
                    :mipmap-blur="true"
                />
            </EffectComposerPmndrs>
        </Suspense>
    </TresCanvas>
</template>
