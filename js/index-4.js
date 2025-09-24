document.addEventListener('DOMContentLoaded', function () {
            const partnersSwiper = new Swiper('.partnersSwiper', {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 30,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.partners-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 60,
                    },
                }
            });
        });