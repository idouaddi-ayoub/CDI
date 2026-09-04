import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Color,
  Euler,
  Quaternion,
  Vector3,
  type Material,
  type Object3D,
} from "three";

type Vec3 = { x: number; y: number; z: number };

export type Pose = {
  rotation: Vec3;
  position: Vec3;
  scale: number;
  spread: number;
  color: string;
};

const BASE = "#191d1f";
const SUNK = "#0b0d0e";

const ENTRY: Pose = {
  rotation: { x: 2, y: 0, z: 0 },
  position: { x: 0, y: 0, z: -10 },
  scale: 0.6,
  spread: 2.8,
  color: SUNK,
};

export const POSES: Pose[] = [
  {
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    scale: 1,
    spread: 1,
    color: BASE,
  },
  {
    rotation: { x: -0.18, y: 0.5, z: 0.04 },
    position: { x: 1.1, y: 0.3, z: -6 },
    scale: 0.85,
    spread: 1,
    color: SUNK,
  },
  {
    rotation: { x: 0.06, y: -1.24, z: -0.08 },
    position: { x: -1.4, y: -0.2, z: -3.2 },
    scale: 1.05,
    spread: 1,
    color: SUNK,
  },
  {
    rotation: { x: 0, y: -0.12, z: 0 },
    position: { x: 0, y: 0.1, z: -1.5 },
    scale: 0.95,
    spread: 2.35,
    color: BASE,
  },
  {
    rotation: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: -0.5 },
    scale: 0.8,
    spread: 1,
    color: BASE,
  },
];

const ENTRY_LIFT = -0.45;
const ENTRY_DURATION = 2;
const ENTRY_DELAY = 0.08;
const LETTER_STAGGER = 0.07;
const LAMBDA = 6;
const EPSILON = 0.05;
const SPREAD_IN = 0.15;
const SPREAD_OUT = 0.85;

const bake = (p: Pose) => ({
  quat: new Quaternion().setFromEuler(
    new Euler(p.rotation.x, p.rotation.y, p.rotation.z, "YXZ"),
  ),
  pos: new Vector3(p.position.x, p.position.y, p.position.z),
  color: new Color(p.color),
  scale: p.scale,
  spread: p.spread,
});

const KEYS = POSES.map(bake);
const START = bake(ENTRY);

const _quat = new Quaternion();
const _pos = new Vector3();
const _color = new Color();

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

type Surface = Material & { color: Color };

export function useScenePose(sectionIds: string[]) {
  const { root, letters, material } = useSceneRefs();
  const introComplete = useIntroComplete();

  let marks: number[] = [];
  let rest: { x: number; y: number }[] = [];
  let smoothed = 0;
  let settled = false;
  let started = false;
  let span = 1;
  let update: ((time: number, delta: number) => void) | undefined;

  const entrance = { value: 0 };

  function measure() {
    marks = sectionIds.map((id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
    settled = false;
  }

  function apply(group: Object3D, letterGroups: Object3D[], surface: Surface) {
    if (marks.length < 2) return;

    let i = 0;
    while (i < marks.length - 2 && smoothed >= marks[i + 1]!) i++;

    const a = marks[i]!;
    const b = marks[i + 1]!;
    const from = KEYS[i]!;
    const to = KEYS[i + 1]!;
    const t = b === a ? 0 : clamp01((smoothed - a) / (b - a));

    _quat.slerpQuaternions(from.quat, to.quat, t);
    _pos.lerpVectors(from.pos, to.pos, t);
    _color.lerpColors(from.color, to.color, t);
    const scale = lerp(from.scale, to.scale, t);

    const spread = lerp(
      from.spread,
      to.spread,
      ease(clamp01((t - SPREAD_IN) / (SPREAD_OUT - SPREAD_IN))),
    );

    const e = entrance.value;
    group.quaternion.slerpQuaternions(START.quat, _quat, e);
    group.position.lerpVectors(START.pos, _pos, e);
    group.scale.setScalar(lerp(START.scale, scale, e));
    surface.color.lerpColors(START.color, _color, e);

    for (let k = 0; k < letterGroups.length; k++) {
      const le = ease(clamp01((e - k * LETTER_STAGGER) / span));
      const l = letterGroups[k]!;
      l.position.x = rest[k]!.x * lerp(START.spread, spread, le);
      l.position.y = rest[k]!.y + ENTRY_LIFT * (1 - le);
    }
  }

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    let stopIntro: (() => void) | undefined;

    const stop = watch(
      [root, letters, material],
      ([group, letterGroups, surface]) => {
        if (!group || !letterGroups?.length || !surface) return;

        rest = letterGroups.map((l) => {
          l.userData.rest ??= { x: l.position.x, y: l.position.y };
          return l.userData.rest as { x: number; y: number };
        });
        span = Math.max(0.2, 1 - (letterGroups.length - 1) * LETTER_STAGGER);

        measure();
        smoothed = window.scrollY;

        if (!started) {
          started = true;
          if (resolveMotionTier() === "static") {
            entrance.value = 1;
          } else {
            stopIntro = watch(
              introComplete,
              (done) => {
                if (!done) return;
                gsap.to(entrance, {
                  value: 1,
                  duration: ENTRY_DURATION,
                  delay: ENTRY_DELAY,
                  ease: "power3.out",
                  overwrite: true,
                });
              },
              { immediate: true },
            );
          }
        }

        apply(group, letterGroups, surface as Surface);

        update = (_time, delta) => {
          const diff = window.scrollY - smoothed;
          const moving = Math.abs(diff) >= EPSILON;

          smoothed = moving
            ? smoothed + diff * (1 - Math.exp((-LAMBDA * delta) / 1000))
            : window.scrollY;

          const busy = moving || entrance.value < 1;
          if (settled && !busy) return;
          settled = !busy;

          apply(group, letterGroups, surface as Surface);
        };

        gsap.ticker.add(update);
      },
      { immediate: true },
    );

    ScrollTrigger.addEventListener("refresh", measure);
    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});

    onUnmounted(() => {
      stop();
      stopIntro?.();
      gsap.killTweensOf(entrance);
      if (update) gsap.ticker.remove(update);
      ScrollTrigger.removeEventListener("refresh", measure);
    });
  });
}
