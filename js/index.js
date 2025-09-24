// Seleciona os elementos do menu
            const menuBtn = document.getElementById("menu-btn");
            const mobileMenu = document.getElementById("mobile-menu");
            // Seleciona TODOS os links dentro do menu mobile
            const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

            // Função para abrir/fechar o menu ao clicar no botão hambúrguer
            menuBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });

            // --- NOVO TRECHO ADICIONADO ---
            // Adiciona um evento de clique para CADA link do menu
            mobileMenuLinks.forEach(link => {
                link.addEventListener("click", () => {
                    // Adiciona a classe 'hidden' para fechar o menu
                    mobileMenu.classList.add("hidden");
                });
            });