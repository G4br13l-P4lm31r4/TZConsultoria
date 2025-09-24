 document.addEventListener('DOMContentLoaded', function () {
            const swiper = new Swiper('.mySwiper', {

                // 1. AQUI ESTÁ A CORREÇÃO PRINCIPAL
                // Trocamos 'loop' por 'rewind' para o botão funcionar corretamente.
                rewind: true,

                // 2. centeredSlides agora é controlado por breakpoint para melhor alinhamento
                centeredSlides: true,
                grabCursor: true,
                slidesPerView: 1.2,
                spaceBetween: 20,

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                        centeredSlides: false, // Desativado para alinhar à esquerda
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                        centeredSlides: false, // Desativado para alinhar à esquerda
                    }
                }
            });
        });