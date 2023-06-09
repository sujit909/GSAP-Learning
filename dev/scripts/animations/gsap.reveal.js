import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const revealChildrenInView = (item) => {
  gsap.utils.toArray(item).forEach((selector) => {
    ScrollTrigger.create({
      trigger: selector,
      start: 'top 95%',
      
      markers: {startColor: "red", endColor: "yellow"},
      onEnter: () => {
        selector.classList.add('is-inview');
      },
      // markers: true,
    });
  });
};
