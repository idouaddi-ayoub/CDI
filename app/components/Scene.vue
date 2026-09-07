<script setup lang="ts">
import { shallowRef, onMounted, onUnmounted, nextTick } from "vue";
import {
    Box3,
    BufferGeometry,
    ExtrudeGeometry,
    MeshStandardMaterial,
    Vector3,
} from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Camera, Group, PerspectiveCamera } from "three";

const isPerspective = (c: Camera | undefined): c is PerspectiveCamera =>
    (c as PerspectiveCamera | undefined)?.isPerspectiveCamera === true;

const { camera: activeCamera, renderer } = useTres();
const { camera, root, letters, material } = useSceneRefs();
const { tier, rendersCanvas } = useMotionTier();

const rootEl = shallowRef();
const letterEls = shallowRef<Group[]>([]);

const TARGET_WIDTH = 5;
const EXTRUDE_DEPTH = 40;

type Letter = { geometry: BufferGeometry; offset: number };
const built = shallowRef<Letter[]>([]);

const surface = new MeshStandardMaterial({
    color: "#ffffff",
    metalness: 0.0,
    roughness: 0.3,
});
material.value = surface;

const cameraPosition = new Vector3(0, 0, 7);
const rimLight = new Vector3(0, 0, 0.2);

function frameCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    cameraPosition.setZ(aspect < 1 ? 7 / aspect : 7);
    if (camera.value) {
        camera.value.position.copy(cameraPosition);
        camera.value.updateProjectionMatrix();
    }
}

function clusterByLetter(pieces: { geometry: BufferGeometry; box: Box3 }[]) {
    const sorted = [...pieces].sort((a, b) => a.box.min.x - b.box.min.x);
    const clusters: (typeof sorted)[] = [];

    for (const piece of sorted) {
        const current = clusters.at(-1);
        const rightEdge = current?.reduce(
            (max, p) => Math.max(max, p.box.max.x),
            -Infinity,
        );
        if (current && rightEdge !== undefined && piece.box.min.x < rightEdge) {
            current.push(piece);
        } else {
            clusters.push([piece]);
        }
    }
    return clusters;
}

onMounted(async () => {
    const svg = await (await fetch("/CDI_logo.svg")).text();
    const paths = new SVGLoader().parse(svg).paths;

    const pieces = paths.flatMap((path) =>
        path.toShapes().map((shape) => {
            const geometry = new ExtrudeGeometry(shape, {
                depth: EXTRUDE_DEPTH,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 5,
                bevelSize: 4,
                bevelSegments: 3,
            });
            geometry.rotateX(Math.PI);
            geometry.computeBoundingBox();
            return { geometry, box: geometry.boundingBox!.clone() };
        }),
    );

    const whole = new Box3();
    pieces.forEach((p) => whole.union(p.box));
    const size = new Vector3();
    whole.getSize(size);
    const scale = TARGET_WIDTH / size.x;
    const centre = new Vector3();
    whole.getCenter(centre);

    built.value = clusterByLetter(pieces).map((cluster) => {
        const merged = mergeGeometries(
            cluster.map((c) => c.geometry),
            false,
        )!;
        cluster.forEach((c) => c.geometry.dispose());

        merged.translate(-centre.x, -centre.y, -centre.z);
        merged.scale(scale, scale, scale);
        merged.computeBoundingBox();

        const own = new Vector3();
        merged.boundingBox!.getCenter(own);
        merged.translate(-own.x, 0, 0);
        merged.computeVertexNormals();

        return { geometry: merged, offset: own.x };
    });

    await nextTick();
    root.value = rootEl.value;
    letters.value = letterEls.value;
    ScrollTrigger.refresh();
});

onMounted(() => {
    if (isPerspective(activeCamera.value)) camera.value = activeCamera.value;
    frameCamera();
    window.addEventListener("resize", frameCamera, { passive: true });
});
const { downgrade } = useMotionTier();

onMounted(() => {
    const canvas = renderer.domElement;
    if (!canvas) {
        console.error(
            "Could not resolve canvas from useTres().renderer — check its shape:",
            renderer,
            renderer.debug,
        );
        return;
    }

    let restoreTimeout: ReturnType<typeof setTimeout> | undefined;

    const onLost = (e: Event) => {
        e.preventDefault();
        restoreTimeout = setTimeout(() => downgrade(), 3000);
    };
    const onRestored = () => clearTimeout(restoreTimeout);

    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    onUnmounted(() => {
        clearTimeout(restoreTimeout);
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
    });
});

onUnmounted(() => {
    window.removeEventListener("resize", frameCamera);
    built.value.forEach((l) => l.geometry.dispose());
    surface.dispose();
    camera.value = undefined;
    root.value = undefined;
    letters.value = [];
});
</script>

<template>
    <TresPerspectiveCamera
        :position="cameraPosition"
        :fov="45"
        :near="0.1"
        :far="200"
    />

    <TresAmbientLight :intensity="20" color="#ffffff" />
    <TresPointLight :position="rimLight" :intensity="100" color="#39A862" />
    <SceneBackgroundMesh
        v-if="rendersCanvas"
        :tier="tier === 'full' ? 'full' : 'lite'"
    />
    <TresGroup ref="rootEl">
        <TresGroup
            v-for="(letter, i) in built"
            :key="i"
            ref="letterEls"
            :position-x="letter.offset"
        >
            <TresMesh :geometry="letter.geometry" :material="surface" />
        </TresGroup>
    </TresGroup>
</template>
