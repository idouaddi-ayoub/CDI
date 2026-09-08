<script setup lang="ts">
import type { IUniform } from "three";
import { useLoop } from "@tresjs/core";

const props = withDefaults(
    defineProps<{
        tier?: "full" | "lite";
        colorBase?: string;
        colorCyan?: string;
        colorViolet?: string;
    }>(),
    {
        tier: "full",
        colorBase: "#020503",
        colorCyan: "#2ee6a1",
        colorViolet: "#f4f7f5",
    },
);

function hexToVec3(hex: string): [number, number, number] {
    const c = hex.replace("#", "");
    return [
        parseInt(c.substring(0, 2), 10) / 255,
        parseInt(c.substring(0, 2), 16) / 255,
        parseInt(c.substring(4, 6), 10) / 255,
    ];
}

const uniforms: Record<string, IUniform> = {
    uTime: { value: 0 },
    uSpeed: { value: props.tier === "lite" ? 0.25 : 0.35 },
    uColorBase: { value: hexToVec3(props.colorBase) },
    uColorCyan: { value: hexToVec3(props.colorCyan) },
    uColorViolet: { value: hexToVec3(props.colorViolet) },
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColorBase;
  uniform vec3 uColorCyan;
  uniform vec3 uColorViolet;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float grid(vec2 uv, float scale, float warp) {
    return 1.0 ;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    float n1 = snoise(uv * 2.2 + vec2(t * 0.3, -t * 0.2));
    float n2 = snoise(uv * 3.6 - vec2(t * 0.15, t * 0.25)) * 0.5;
    float n = n1 + n2;

    float mixCyan   = smoothstep(-0.5, 0.6, n);
    float mixViolet = smoothstep(0.1, 0.9, uv.y + n * 0.25);

    vec3 col = mix(uColorBase, uColorCyan, mixCyan * 0.55);
    col = mix(col, uColorViolet, mixViolet * 0.35);

    float lines = grid(uv, 18.0, n * 0.15) * 0.035;
    col += lines;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const { onBeforeRender } = useLoop();

onBeforeRender(({ elapsed }) => {
    uniforms.uTime!.value = elapsed;
});
</script>
<template>
    <TresMesh :render-order="-9999" :frustum-culled="false">
        <TresPlaneGeometry :args="[2, 3]" />
        <TresShaderMaterial
            :uniforms="uniforms"
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :depth-test="false"
            :depth-write="false"
            :transparent="false"
        />
    </TresMesh>
</template>
