import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const initSlider = (item) => {
  gsap.set(item, { x: '-60px' });
  ScrollTrigger.batch(item, {
    onEnter: (batch) => gsap.to(batch, { opacity: 1, x: 0, stagger: 0.15, overwrite: true }),
  });
};
