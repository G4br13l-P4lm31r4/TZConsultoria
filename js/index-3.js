const steps = [
            document.getElementById("step1"),
            document.getElementById("step2"),
            document.getElementById("step3")
        ];
        const radios = [
            document.getElementById("item-1"),
            document.getElementById("item-2"),
            document.getElementById("item-3")
        ];

        function getCurrentIndex() {
            return radios.findIndex(r => r.checked);
        }

        function updateCarousel(index) {
            if (radios[index]) {
                radios[index].checked = true;
                titleEl.textContent = titles[index];

                steps.forEach((el, i) => {
                    el.classList.toggle("active", i === index);
                });
            }
        }

        // Inicialização - Começa no slide do meio (índice 1)
        updateCarousel(1);

        radios.forEach((radio, index) => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    updateCarousel(index);
                }
            });
        });

        steps.forEach((step, index) => {
            step.addEventListener("click", () => {
                updateCarousel(index);
            });
        });

        // Lógica de arrastar (drag and drop)
        const carousel = document.getElementById("carousel");
        let dragStartX = 0;
        let isDragging = false;
        let currentIndex = 0;

        function handleDragStart(clientX) {
            dragStartX = clientX;
            isDragging = true;
            currentIndex = getCurrentIndex();
            carousel.style.cursor = 'grabbing';
        }

        function handleDragMove(clientX) {
            if (!isDragging) return;

            const deltaX = clientX - dragStartX;
            // Aumentei a sensibilidade para 50px
            if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) { // Arrastou para a direita
                    updateCarousel((currentIndex - 1 + 3) % 3);
                } else { // Arrastou para a esquerda
                    updateCarousel((currentIndex + 1) % 3);
                }
                isDragging = false; // Para a ação após um swipe
            }
        }

        function handleDragEnd() {
            isDragging = false;
            carousel.style.cursor = 'grab';
        }

        // Eventos de Mouse
        carousel.addEventListener('mousedown', (e) => handleDragStart(e.clientX));
        carousel.addEventListener('mousemove', (e) => handleDragMove(e.clientX));
        carousel.addEventListener('mouseup', handleDragEnd);
        carousel.addEventListener('mouseleave', handleDragEnd);

        // Eventos de Toque (Mobile)
        carousel.addEventListener('touchstart', (e) => handleDragStart(e.touches[0].clientX));
        carousel.addEventListener('touchmove', (e) => handleDragMove(e.touches[0].clientX));
        carousel.addEventListener('touchend', handleDragEnd);