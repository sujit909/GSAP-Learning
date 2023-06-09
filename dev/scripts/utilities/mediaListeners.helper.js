export const onDesktopEvent = new CustomEvent('onDesktop');
export const onMobileEvent = new CustomEvent('onMobile');


/**
 * @param {'onMobile' | 'onDesktop'} type - event type
 * @param {CallableFunction} fn - event listener
 * @param {CallableFunction} fn - event listener
 * @returns {EventListener} cleanup function that remove event listener when called
 **/
export function addMediaListener(type, fn, onReverse) {
    const customMediaMatch = window.customMediaMatch || {};
    let triggered = false;
    const listener = (e) => {
        triggered = true;
        fn(e);
    };
    document.addEventListener(type, listener);

    let reverseListener = (e) => {
        if (!triggered) {
            return;
        }
        onReverse && onReverse(e);
    };

    if (onReverse) {
        document.addEventListener(type === 'onDesktop' ? 'onMobile' : 'onDesktop', reverseListener);
    }

    if (customMediaMatch[type.replace(/^on/, 'is')]) {
        listener();
    }

    return () => {
        document.removeEventListener(type, listener);
        onReverse && document.removeEventListener(type === 'onDesktop' ? 'onMobile' : 'onDesktop', reverseListener);
    };
}

export function addReduceMediaListener(runOnAvailable, fn) {
    const customMediaMatch = window.customMediaMatch || {};
    document.addEventListener(runOnAvailable ? 'onReduceMotionFound' : 'onReduceMotionNotFound', fn);

    if (customMediaMatch.reduceMotion === runOnAvailable) {
        fn();
    }

    return () => {
        document.removeEventListener(runOnAvailable ? 'onReduceMotionFound' : 'onReduceMotionNotFound', fn);
    };
}

// /**
//  * @param {({detail}) => void} fn - event listener
//  * @returns {CallableFunction} cleanup function that remove event listener when called
//  **/
// export function addMediaChangeEvent(fn) {
//   const customMatchMedia = window.customMatchMedia;
//   document.addEventListener('mediaChanged', fn);
//
//   if (customMatchMedia[type.replace(/^on/, 'is')]) {
//     fn();
//   }
//
//   return () => {
//     document.removeEventListener('mediaChanged', fn);
//   };
// }
