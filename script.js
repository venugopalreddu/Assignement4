document.addEventListener('DOMContentLoaded', () => {
    const vatInput = document.getElementById('vatInput');
    const validateBtn = document.getElementById('validateBtn');
    const validationResult = document.getElementById('validationResult');
    const exchangeRatesDiv = document.getElementById('exchangeRates');
    const timerDiv = document.getElementById('timer');
    let timerInterval;
    validateBtn.addEventListener('click', () => {
        const vatNumber = vatInput.value;
        if (validateVAT(vatNumber)) {
            validationResult.innerHTML = '<p style="color: green;">Valid VAT number</p>';
            fetchExchangeRates();
            startTimer();
        } else {
            validationResult.innerHTML = '<p style="color: red;">Invalid VAT number</p>';
            exchangeRatesDiv.innerHTML = '';
            clearInterval(timerInterval);
            timerDiv.innerHTML = '';
        }
    });
    function validateVAT(vatNumber) {
        const vatRegex = /^[A-Z]{2}[0-9A-Z]{8,12}$/;
        return vatRegex.test(vatNumber);
    }
    async function fetchExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            const data = await response.json();
            displayExchangeRates(data.rates);
        } catch (error) {https://api.exchangerate-api.com/v4/latest/USDx
            console.error('Error fetching exchange rates:', error);
            exchangeRatesDiv.innerHTML = `<p>Error fetching exchange rates. Please try again.</p>`;
        }
    }

    function displayExchangeRates(rates) 
    {
        exchangeRatesDiv.innerHTML = '<h3>Exchange Rates (USD)</h3>';
        for (const [currency, rate] of Object.entries(rates)) {
            exchangeRatesDiv.innerHTML += `<p>${currency}: ${rate}</p>`;    
        }
    }
    function startTimer() {
        let timeRemaining = 2; 
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                fetchExchangeRates();
                timeRemaining = 2; 
            }
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            timerDiv.innerHTML = `Next update in: ${minutes}m ${seconds}s`;
            timeRemaining--;
        }, 1000);
    }
});