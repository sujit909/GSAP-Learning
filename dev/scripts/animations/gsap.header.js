import { gsap } from 'gsap';

import { addMediaListener } from '../utilities/mediaListeners.helper';

export const initHeaderAnimation = () => {
  addMediaListener('onDesktop', () => {
    const tlHeaderanimation = gsap.timeline();
    tlHeaderanimation.set('.js-header-nav', { pointerEvents: 'all' });
    tlHeaderanimation
      .to('.js-logo', {
        y: 0,
        duration: 1,
      })
      .to(
        '.js-header-nav',
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=.4'
      );
    const tlNavTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.js-header-nav',
        start: 'top top', // when the top of the trigger hits the top of the viewport
        end: 99999, // infinite scroll end so that it never ends
        onUpdate: (self) => {
          self.direction === -1 ? tlNavTimeline.reverse() : tlNavTimeline.play();
        },
      },
      ease: 'back.inOut(1.7)',
    });

    tlNavTimeline
      .to('.js-header-nav a:nth-child(2)', {
        x: 90,
      })
      .to(
        '.js-header-nav a:nth-child(1)',
        {
          x: 178,
        },
        '<'
      );
  });
};