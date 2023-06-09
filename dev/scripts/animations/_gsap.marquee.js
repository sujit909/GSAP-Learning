import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

export function initMarquee() {
  const marquee = document.querySelectorAll('.js-marquee-ticker');
  // console.clear();
  const speed = 200;

  let target = document.querySelector('.js-marquee-ticker');
  let original_html = target.innerHTML;
  let new_html = "<div class='ticker-items'>" + original_html + '</div>';
  target.innerHTML = new_html;
  target.innerHTML += new_html;

  let tickerWidth = document.querySelector('.ticker-items').offsetWidth;
  let initDuration = tickerWidth / speed;

  gsap.to('.ticker-items', {
    duration: initDuration,
    xPercent: -100,
    ease: 'none',
    repeat: -1,
  });
}
