 document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const loanAmount = urlParams.get('valor');
            const fullName = urlParams.get('nome');
            const email = urlParams.get('email');
            const phone = urlParams.get('telefone');
            const cnpjValue = urlParams.get('cnpj'); // Pega o CNPJ da URL
            const consent = urlParams.get('consentimento');

            // --- Seleção dos campos do formulário ---
            const companyForm = document.getElementById('companyForm');
            const cnpjInput = document.getElementById('cnpj');
            const cepInput = document.getElementById('cep');
            const ufInput = document.getElementById('uf');
            
            // --- Preenchimento automático do CNPJ ---
            const cnpjMaskDisplay = IMask(cnpjInput, { mask: '00.000.000/0000-00' });
            if (cnpjValue) {
                cnpjMaskDisplay.value = cnpjValue; // Aplica o valor com a máscara
            }

            // --- Máscaras para os outros campos ---
            const cepMask = IMask(cepInput, { mask: '00000-000' });
            const ufMask = IMask(ufInput, {
                mask: 'aa',
                prepare: str => str.toUpperCase() // Converte para maiúsculas automaticamente
            });

            companyForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // --- Validações ---
                if (cepMask.unmaskedValue.length !== 8) {
                    alert('Por favor, preencha o CEP completo.');
                    return;
                }
                if (ufMask.unmaskedValue.length !== 2) {
                    alert('Por favor, preencha a UF com 2 letras.');
                    return;
                }

                const companyName = document.getElementById('companyName').value;
                const city = document.getElementById('city').value;
                const address = document.getElementById('address').value;
                const number = document.getElementById('number').value;
                const complement = document.getElementById('complement').value;

                // Redireciona para o passo 3, passando todos os dados coletados
                const nextUrl = `simulador-form-analise.html?valor=${loanAmount}&nome=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&telefone=${phone}&consentimento=${consent}&empresa=${encodeURIComponent(companyName)}&cnpj=${cnpjValue}&cep=${encodeURIComponent(cepMask.unmaskedValue)}&uf=${encodeURIComponent(ufMask.unmaskedValue)}&cidade=${encodeURIComponent(city)}&endereco=${encodeURIComponent(address)}&numero=${encodeURIComponent(number)}&complemento=${encodeURIComponent(complement)}`;
                window.location.href = nextUrl;
            });
        });