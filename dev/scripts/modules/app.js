import { gsap } from 'gsap';
import ScrollSmoother from 'gsap/dist/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomEase from 'gsap/CustomEase';
import Slider from './slider';
import { onDesktopEvent, onMobileEvent } from '../utilities/mediaListeners.helper';

import { initHeaderAnimation } from '../animations/gsap.header';
import { textwithImageAnimation } from '../animations/gsap.textwithimage';
import { leadspaceType } from '../animations/gsap.leadspacetype';
import { revealChildrenInView } from '../animations/gsap.reveal';
import { mediaZoom } from '../animations/gsap.media-zoom';
import { mediaLazy } from '../animations/gsap.imageloaded';
import { initMarquee } from '../animations/_gsap.marquee';
import { initSlider } from '../animations/gsap.slider-reveal';

gsap.registerPlugin(CustomEase, ScrollSmoother, ScrollTrigger);

window.customMediaMatch = {};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

document.addEventListener('DOMContentLoaded', function () {
  document.documentElement.classList.add('is-ready');
  let smoother;
  let mm = gsap.matchMedia(),
    breakPoint = 1200;

  gsap.defaults({
    ease: 'back.inOut(1.7)',
    duration: 0.6,
  });

  Slider();
  initHeaderAnimation();
  textwithImageAnimation();
  leadspaceType('.js-title', '.js-split-leadspace', '.js-leadspace--content');
  revealChildrenInView('.o-reveal');
  revealChildrenInView('.o-reveal-childs');
  mediaZoom('.js-figure-zoom');
  mediaLazy('.js-lazy');
  initMarquee();
  initSlider('.js-image-slider .swiper-slide');
  mm.add(
    {
      // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
      isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
      isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
      const { isDesktop, reduceMotion } = context.conditions;
      window.customMediaMatch = context.conditions;
      document.dispatchEvent(isDesktop ? onDesktopEvent : onMobileEvent);
      document.dispatchEvent(new CustomEvent(reduceMotion ? 'onReduceMotionFound' : 'onReduceMotionNotFound'));

      if (isDesktop) {
        smoother = ScrollSmoother.create({
          smooth: 1.3,
          effects: true,
          normalizeScroll: true,
          ignoreMobileResize: true,
        });
      }
    }
  );

  const conditions = mm.contexts[0].conditions;
  window.customMediaMatch = conditions;
});
