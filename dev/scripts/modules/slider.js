// import Swiper JS
import Swiper, {Autoplay, Navigation, Pagination, EffectFade} from 'swiper';

Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);
// import Swiper styles
// import 'swiper/css';

const Slider = () => {
    new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        freeMode: true,
        centeredSlides: true,
        centerInsufficientSlides: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    })
};
export default Slider;