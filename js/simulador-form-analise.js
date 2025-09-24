 document.addEventListener('DOMContentLoaded', () => {
            const urlParams = new URLSearchParams(window.location.search);
            
            // Pega todos os dados dos passos anteriores e preenche os campos ocultos
            document.getElementById('loanAmountHidden').value = parseInt(urlParams.get('valor') || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            document.getElementById('fullNameHidden').value = urlParams.get('nome');
            document.getElementById('emailHidden').value = urlParams.get('email');
            document.getElementById('phoneHidden').value = urlParams.get('telefone');
            document.getElementById('consentHidden').value = urlParams.get('consentimento');
            document.getElementById('companyNameHidden').value = urlParams.get('empresa');
            document.getElementById('cnpjHidden').value = urlParams.get('cnpj');
            document.getElementById('cepHidden').value = urlParams.get('cep');
            document.getElementById('ufHidden').value = urlParams.get('uf');
            document.getElementById('cityHidden').value = urlParams.get('cidade');
            document.getElementById('addressHidden').value = urlParams.get('endereco');
            document.getElementById('numberHidden').value = urlParams.get('numero');
            document.getElementById('complementHidden').value = urlParams.get('complemento');

            const analysisForm = document.getElementById('analysisForm');
            const formMessage = document.getElementById('formMessage');
            const cpfInput = document.getElementById('cpf');
            const monthlyRevenueInput = document.getElementById('monthlyRevenue');
            const loanPurposeInput = document.getElementById('loanPurpose');
            
            // --- Máscaras ---
            const cpfMask = IMask(cpfInput, { mask: '000.000.000-00' });
            const revenueMask = IMask(monthlyRevenueInput, {
                mask: 'R$ num',
                blocks: {
                    num: {
                        mask: Number,
                        scale: 2,
                        thousandsSeparator: '.',
                        padFractionalZeros: true,
                        radix: ',',
                        mapToRadix: ['.']
                    }
                }
            });

            analysisForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                // --- Validações ---
                if (cpfMask.unmaskedValue.length !== 11) {
                    alert('Por favor, preencha o CPF completo.');
                    return;
                }
                if (revenueMask.number < 400000) {
                    alert('O faturamento mensal deve ser de no mínimo R$ 400.000,00.');
                    return;
                }
                if (loanPurposeInput.value === "") {
                    alert('Por favor, selecione a finalidade do crédito.');
                    return;
                }
                
                // Exibe mensagem de envio
                formMessage.textContent = 'Enviando...';
                formMessage.className = 'mt-4 text-yellow-600 text-center';
                formMessage.classList.remove('hidden');
                
                try {
                    const response = await fetch(analysisForm.action, {
                        method: 'POST',
                        body: new FormData(analysisForm),
                        headers: { 'Accept': 'application/json' }
                    });
                    
                    if (response.ok) {
                        window.location.href = 'simulador-confirmacao.html';
                    } else {
                        // Trata erros do Formspree
                        formMessage.textContent = `Houve um erro no servidor. Por favor, tente novamente.`;
                        formMessage.className = 'mt-4 text-red-600 text-center';
                    }
                } catch (error) {
                    formMessage.textContent = 'Ocorreu um erro de conexão. Verifique sua internet e tente novamente.';
                    formMessage.className = 'mt-4 text-red-600 text-center';
                }
            });
        });