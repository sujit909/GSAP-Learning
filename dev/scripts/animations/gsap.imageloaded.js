import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ limitCallbacks: true });

export const mediaLazy = (selector) => {
  gsap.utils.toArray(selector).forEach((image) => {
    let newSRC = image.dataset.src,
      newImage = document.createElement('img');

    const loadImage = () => {
        newImage.onload = () => {
          newImage.onload = null; // avoid recursion
          newImage.src = image.src; // swap the src
          image.src = newSRC;

          image.parentNode.appendChild(newImage);
          gsap.to(newImage, {
            opacity: 0,
            onComplete: () => newImage.parentNode.removeChild(newImage),
          });
          st && st.kill();
        };
        newImage.src = newSRC;
      },
      st = ScrollTrigger.create({
        trigger: image,
        start: '-20% bottom',
        onEnter: loadImage,
        onEnterBack: loadImage, // make sure it works in either direction
      });
  });
};
