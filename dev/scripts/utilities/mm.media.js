import { gsap } from 'gsap';

export const mmMdeia = ()=> {
    const breakPoint = 1200;
    const mm = gsap.matchMedia();
    mm.add(
        {
            isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
            isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`,
        },
        ({conditions}) => {
            window.customMediaMatch = conditions;
            document.dispatchEvent(new CustomEvent("mediaChanged", {
                detail: conditions,
                bubbles: false,
                cancelable: true,
                composed: false
            }));
            document.dispatchEvent(new CustomEvent(conditions.isDesktop ? "onDesktop" : "onMobile"));
        }
    );
    window.isDesktop = function () {
        return mm.contexts[0].conditions.isDesktop;
    }
    window.isMobile = function () {
        return mm.contexts[0].conditions.isMobile;
    }

}