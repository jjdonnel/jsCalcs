function displayMortgage() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth;

    main.innerHTML = `
        <div id="mortgage-calc" class="section">
            <!-- Header Row: Title & Help Button -->
            <div class="title-wrapper">
                <h2 class="calc-title">Mortgage Calculator</h2>
                <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
            </div>

            <!-- Formula Bubble (Pop-over) -->
            <div class="formula-bubble">
                <h4>Mortgage Payment Formula</h4>
                <p>Calculates fixed monthly principal and interest payments.</p>
                <strong>Key Formula:</strong>
                <code>M = P × [ r(1+r)^n ] / [ (1+r)^n - 1 ]</code>
                <p><small>Where <strong>P</strong> = Principal, <strong>r</strong> = Monthly rate, <strong>n</strong> = Total payments (months).</small></p>
            </div>

            <!-- Input Fields -->
            <div>
                <label for="mort-home-price">Home Price ($)</label>
                <input type="number" id="mort-home-price" placeholder="e.g. 400000" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="mort-down-pmt">Down Payment ($)</label>
                <input type="number" id="mort-down-pmt" placeholder="e.g. 80000" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="mort-rate">Interest Rate (%)</label>
                <input type="number" id="mort-rate" placeholder="e.g. 6.8" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="mort-term">Loan Term (Years)</label>
                <select id="mort-term">
                    <option value="30">30-Year Fixed</option>
                    <option value="15">15-Year Fixed</option>
                    <option value="20">20-Year Fixed</option>
                    <option value="10">10-Year Fixed</option>
                </select>
            </div>

            <div>
                <label for="mort-monthly">Monthly Payment (P&I)</label>
                <input type="text" id="mort-monthly" placeholder="$0.00 / mo" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const homePriceInput = document.getElementById('mort-home-price');
    const downPmtInput = document.getElementById('mort-down-pmt');
    const rateInput = document.getElementById('mort-rate');
    const termSelect = document.getElementById('mort-term');
    const monthlyOutput = document.getElementById('mort-monthly');

    function calculateMortgage() {
        const homePrice = parseFloat(homePriceInput.value) || 0;
        const downPmt = parseFloat(downPmtInput.value) || 0;
        const annualRate = parseFloat(rateInput.value) / 100;
        const years = parseFloat(termSelect.value);

        const principal = homePrice - downPmt;

        if (principal <= 0 || isNaN(annualRate) || annualRate <= 0) {
            monthlyOutput.value = "";
            return;
        }

        const monthlyRate = annualRate / 12;
        const totalPayments = years * 12;

        const monthlyPmt = principal * 
            (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
            (Math.pow(1 + monthlyRate, totalPayments) - 1);

        monthlyOutput.value = new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(monthlyPmt) + " / mo";
    }

    [homePriceInput, downPmtInput, rateInput, termSelect].forEach(element => {
        element.addEventListener('input', calculateMortgage);
        element.addEventListener('change', calculateMortgage);

        if (element.tagName === 'INPUT') {
            element.addEventListener('focus', (e) => {
                setTimeout(() => {
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        }
    });
}