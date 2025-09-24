 document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const loanAmount = urlParams.get('valor');
            const loanAmountDisplay = document.getElementById('loanAmountDisplay');

            const formatCurrency = (value) => {
                if (!value) return "R$ 0";
                return parseInt(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            };

            loanAmountDisplay.textContent = formatCurrency(loanAmount);

            // Seleção de elementos do formulário
            const contactForm = document.getElementById('contactForm');
            const phoneInput = document.getElementById('phone');
            const cnpjInput = document.getElementById('cnpj');

            // Aplicação de máscaras
            const phoneMask = IMask(phoneInput, { mask: '(00) 00000-0000' });
            const cnpjMask = IMask(cnpjInput, { mask: '00.000.000/0000-00' });

            // Evento de submit do formulário
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Validações
                const emailInput = document.getElementById('email');
                const emailPattern = /^\S+@\S+\.\S+$/;
                if (!contactForm.checkValidity()) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                if (!emailPattern.test(emailInput.value)) {
                    alert('Por favor, digite um endereço de e-mail válido.');
                    return;
                }
                if (phoneMask.unmaskedValue.length !== 11) {
                    alert('Por favor, preencha o número de celular completo.');
                    return;
                }
                if (cnpjMask.unmaskedValue.length !== 14) {
                    alert('Por favor, preencha o CNPJ completo.');
                    return;
                }

                // Coleta de dados
                const fullName = document.getElementById('fullName').value;
                const consent = document.getElementById('consent').checked;

                // Navegação para a próxima página
                const nextUrl = `simulador-form-empresa.html?valor=${loanAmount}&nome=${encodeURIComponent(fullName)}&email=${encodeURIComponent(emailInput.value)}&telefone=${encodeURIComponent(phoneMask.unmaskedValue)}&cnpj=${encodeURIComponent(cnpjMask.unmaskedValue)}&consentimento=${consent}`;
                window.location.href = nextUrl;
            });
        });