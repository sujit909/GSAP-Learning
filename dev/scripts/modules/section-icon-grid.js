import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import {addMediaListener, addReduceMediaListener} from '../utilities/mediaListeners.helper';
gsap.registerPlugin(ScrollTrigger, SplitText);

addMediaListener('onDesktop', () => {
    alert('I am on desktop from icongrid');
}, () => {
    alert('should reverse now')
});


addReduceMediaListener(false, () => {
    alert('Reduced motion media was not found')
})
