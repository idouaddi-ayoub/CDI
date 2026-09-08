import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.config({ nullTargetWarn: false });
}

export { gsap, ScrollTrigger, SplitText };
