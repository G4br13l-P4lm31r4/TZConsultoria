document.addEventListener('DOMContentLoaded', () => {
            const simulationForm = document.getElementById('simulationForm');
            const loanAmountSlider = document.getElementById('loanAmount');
            const loanAmountValue = document.getElementById('loanAmountValue');

            const formatCurrency = (value) => {
                return parseInt(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 0 });
            };

            const updateSliderProgress = (slider) => {
                const min = parseInt(slider.min);
                const max = parseInt(slider.max);
                const value = parseInt(slider.value);
                const percentage = ((value - min) / (max - min)) * 100;
                slider.style.setProperty('--progress-percent', `${percentage}%`);
            };

            const updateSimulation = () => {
                loanAmountValue.textContent = formatCurrency(loanAmountSlider.value);
                updateSliderProgress(loanAmountSlider);
            };

            // Inicializa o slider e o valor
            updateSimulation();

            loanAmountSlider.addEventListener('input', updateSimulation);

            simulationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const loanAmount = loanAmountSlider.value;
                window.location.href = `simulador-form-contato.html?valor=${loanAmount}`;
            });
        });