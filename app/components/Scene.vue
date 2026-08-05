<script setup lang="ts">
import gsap from "gsap";
import { useLoop } from "@tresjs/core";
import { shallowRef, onMounted, onUnmounted } from "vue";
import { Vector3, ExtrudeGeometry, BufferGeometry } from "three";
import type { Group, PerspectiveCamera } from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useMotionTier } from "../composables/useMotionTier";

const { animates } = useMotionTier();
const intro = { t: 0 };

gsap.to(intro, {
    t: 1,
    duration: 1.8,
    ease: "power1.out",
});
const props = withDefaults(
    defineProps<{ scroll?: number; interactive?: boolean }>(),
    { scroll: 0, interactive: true },
);

const wordmark = shallowRef<Group>();
const camera = shallowRef<PerspectiveCamera>();
const logoGeometry = shallowRef<BufferGeometry>();

const TARGET_WIDTH = 5; // final width in world units
const EXTRUDE_DEPTH = 40; // in SVG units, scaled down later

onMounted(async () => {
    const svg = await (await fetch("/CDI_logo.svg")).text();
    const data = new SVGLoader().parse(svg);

    const parts: BufferGeometry[] = [];
    for (const path of data.paths) {
        for (const shape of path.toShapes()) {
            parts.push(
                new ExtrudeGeometry(shape, {
                    depth: EXTRUDE_DEPTH,
                    curveSegments: 8,
                    bevelEnabled: true,
                    bevelThickness: 5,
                    bevelSize: 4,
                    bevelSegments: 3,
                }),
            );
        }
    }

    const merged = mergeGeometries(parts, false);
    parts.forEach((g) => g.dispose());
    if (!merged) return;

    merged.rotateX(Math.PI); // SVG Y-down → three Y-up
    merged.computeBoundingBox();
    const size = new Vector3();
    merged.boundingBox!.getSize(size);
    const k = TARGET_WIDTH / size.x;
    merged.scale(k, k, k);
    merged.center();
    merged.computeVertexNormals();

    logoGeometry.value = merged;
    if (!animates.value) {
        intro.t = 1;
        return;
    }
    gsap.to(intro, { t: 1, duration: 1.8, ease: "power3.out" });
});

onUnmounted(() => {
    gsap.killTweensOf(intro);
    logoGeometry.value?.dispose();
});

/* --- camera / pointer / loop: unchanged from your version --- */
const pointer = { x: 0, y: 0 };
const damped = { x: 0, y: 0 };
function onPointerMove(e: PointerEvent) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
}
function computeCameraZ() {
    const aspect = window.innerWidth / window.innerHeight;
    return aspect < 1 ? 7 / aspect : 7;
}
const cameraPosition = new Vector3(0, 0, computeCameraZ());
const keyLight = new Vector3(4, 6, 8);
const rimLight = new Vector3(-6, -2, 4);
const fillLight = new Vector3(6, 3, -4);
function onResize() {
    cameraPosition.setZ(computeCameraZ());
    if (camera.value) {
        camera.value.position.copy(cameraPosition);
        camera.value.updateProjectionMatrix();
    }
}
window.addEventListener("pointermove", onPointerMove, { passive: true });
window.addEventListener("resize", onResize, { passive: true });
onUnmounted(() => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
});

const BASE_Y = 0.9;
const { onBeforeRender } = useLoop();
onBeforeRender(({ elapsed, delta }) => {
    const group = wordmark.value;
    if (!group) return;

    const k = 1 - Math.pow(0.0015, delta);
    const target = props.interactive ? pointer : { x: 0, y: 0 };
    damped.x += (target.x - damped.x) * k;
    damped.y += (target.y - damped.y) * k;

    const s = props.scroll;
    const t = intro.t;

    // ambient + pointer + scroll, faded in by t
    group.rotation.y =
        (Math.sin(elapsed * 0.35) * 0.08 + damped.x * 0.5) * t +
        s * 1.15 +
        (1 - t) * -Math.PI * 0.6; // spins in from -108°
    group.rotation.x = -damped.y * 0.3 * t + s * 0.45;

    group.position.z = -s * 6 + (1 - t) * -8; // flies in from far back
    group.position.y = BASE_Y + s * 1.2;

    const scale = 0.7 + 0.3 * t;
    group.scale.setScalar(scale);
});
</script>

<template>
    <TresPerspectiveCamera ref="camera" :position="cameraPosition" :fov="45" />
    <TresAmbientLight :intensity="0.6" />
    <TresDirectionalLight
        :position="keyLight"
        :intensity="3.4"
        color="#22c55e"
    />
    <TresPointLight :position="rimLight" :intensity="26" color="#ffffff" />
    <TresPointLight :position="fillLight" :intensity="12" color="#ffffff" />
    <TresGroup ref="wordmark">
        <TresMesh v-if="logoGeometry" :geometry="logoGeometry">
            <TresMeshStandardMaterial
                color="#243330"
                :roughness="0.3"
                :metalness="0.7"
            />
        </TresMesh>
    </TresGroup>
</template>
