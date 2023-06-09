import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

import { addMediaListener } from '../utilities/mediaListeners.helper';

gsap.registerPlugin(ScrollTrigger);
export const mediaZoom = (selector) => {
  gsap.utils.toArray(selector).forEach((item) => {
    let mediaTimeline;
    const mediaZoomImage = item.querySelector('img');
    mediaTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        anticipatePin: 1,
      },
    });

    // console.log(mediaZoomImage);

    // mediaTimeline.set(item, { scale: 0.6 });
    // mediaTimeline.set(mediaZoomImage, { scale: 1.8, opacity: 0 });

    mediaTimeline
      .to(item, {
        scale: 1,
        duration: 1,
      })
      .to(
        mediaZoomImage,
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
        },
        '<'
      );
    ScrollTrigger.refresh();
  });
};
