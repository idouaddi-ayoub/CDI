import { shallowRef } from "vue";
import type { Group, MeshStandardMaterial, PerspectiveCamera } from "three";

const camera = shallowRef<PerspectiveCamera>();
const root = shallowRef<Group>();
const letters = shallowRef<Group[]>([]);
const material = shallowRef<MeshStandardMaterial>();

export const useSceneRefs = () => ({ camera, root, letters, material });
