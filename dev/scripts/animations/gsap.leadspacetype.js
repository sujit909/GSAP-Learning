import gsap from 'gsap';
// import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { addMediaListener } from '../utilities/mediaListeners.helper';

gsap.registerPlugin(SplitText);
export const leadspaceType = (leadspaceTitle, leadspacePargraph, leadSpaceContent) => {
  const leadSpaceContentLines = new SplitText(leadSpaceContent, { type: 'lines', linesClass: 'line line++' });
  const leadspaceTitleLines = new SplitText(leadspaceTitle, { type: 'lines', linesClass: 'line line++' });
  gsap.utils.toArray(leadspacePargraph).forEach((item) => {
    const typeOuterContent = new SplitText(item, { type: 'lines', linesClass: 'line line++' });
    let lineTimeLine;
    lineTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        end: 'bottom bottom',
      },
    });

    const evens = typeOuterContent.lines.filter((lines, index) => {
      return index % 2 === 0;
    });
    const odds = typeOuterContent.lines.filter((lines, index) => {
      return index % 2 !== 0;
    });

    lineTimeLine.set(evens, { x: -35, autoAlpha: 0 });
    lineTimeLine.set(leadspaceTitleLines.lines, { x: 35, autoAlpha: 0 });
    lineTimeLine.set(odds, { x: 35, autoAlpha: 0 });
    lineTimeLine.set(leadSpaceContentLines.lines, { y: 35, autoAlpha: 0 });

    lineTimeLine.to(
      evens,
      {
        duration: 1.2,
        x: 0,
        autoAlpha: 1,
        stagger: { amount: 0.2 },
        ease: 'back.inOut(.7)',
      },
      '<'
    );
    lineTimeLine.to(
      odds,
      {
        duration: 1.2,
        x: 0,
        autoAlpha: 1,
        stagger: { amount: 0.2 },
        ease: 'back.inOut(.7)',
      },
      '<'
    );
    lineTimeLine.to(
      leadSpaceContentLines.lines,
      {
        duration: 1.2,
        y: 0,
        autoAlpha: 1,
        stagger: { amount: 0.2 },
        ease: 'back.inOut(.7)',
        delay: 0.4,
      },
      '<'
    );
    lineTimeLine.to(
      leadspaceTitleLines.lines,
      {
        duration: 1.2,
        x: 0,
        autoAlpha: 1,
        stagger: { amount: 0.4 },
        ease: 'back.inOut(.7)',
      },
      '<'
    );

    // console.log(evens, odds);
  });
};