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
                <h4>Mortgage Calculations</h4>
                <p><strong>Payment Formula:</strong> M = P × [ r(1+r)^n ] / [ (1+r)^n - 1 ]</p>
                <p><strong>Home Price Formula:</strong> P = M × [ (1+r)^n - 1 ] / [ r(1+r)^n ] + Down Payment</p>
                <p><small>Where <strong>P</strong> = Loan Principal, <strong>M</strong> = Payment, <strong>r</strong> = Monthly Rate, and <strong>n</strong> = Months.</small></p>
            </div>

            <!-- Interactive Primary Inputs -->
            <div>
                <label for="mort-home-price">Home Price ($)</label>
                <input type="number" id="mort-home-price" placeholder="e.g. 400000" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="mort-monthly-pmt">Monthly Payment (P&I) ($)</label>
                <input type="number" id="mort-monthly-pmt" placeholder="e.g. 2150" inputmode="decimal" step="any">
            </div>

            <!-- Common Inputs -->
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
        </div>
    `;

    main.classList.add('show');

    // DOM References
    const homePriceInput = document.getElementById('mort-home-price');
    const monthlyPmtInput = document.getElementById('mort-monthly-pmt');
    const downPmtInput = document.getElementById('mort-down-pmt');
    const rateInput = document.getElementById('mort-rate');
    const termSelect = document.getElementById('mort-term');

    // Tracks which field was last edited by the user ("price" or "payment")
    let activeDirection = 'price';

    function calculate() {
        const downPmt = parseFloat(downPmtInput.value) || 0;
        const annualRate = parseFloat(rateInput.value) / 100;
        const years = parseFloat(termSelect.value);

        if (isNaN(annualRate) || annualRate <= 0) return;

        const monthlyRate = annualRate / 12;
        const totalPayments = years * 12;

        if (activeDirection === 'price') {
            // Forward Calculation: Home Price -> Monthly Payment
            const homePrice = parseFloat(homePriceInput.value);
            if (isNaN(homePrice) || homePrice <= 0) {
                monthlyPmtInput.value = "";
                return;
            }

            const principal = homePrice - downPmt;
            if (principal <= 0) {
                monthlyPmtInput.value = "";
                return;
            }

            const monthlyPmt = principal * 
                (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                (Math.pow(1 + monthlyRate, totalPayments) - 1);

            monthlyPmtInput.value = monthlyPmt.toFixed(2);

        } else if (activeDirection === 'payment') {
            // Reverse Calculation: Monthly Payment -> Affordable Home Price
            const targetPmt = parseFloat(monthlyPmtInput.value);
            if (isNaN(targetPmt) || targetPmt <= 0) {
                homePriceInput.value = "";
                return;
            }

            const maxLoan = targetPmt * 
                (Math.pow(1 + monthlyRate, totalPayments) - 1) / 
                (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));

            const maxHomePrice = maxLoan + downPmt;

            homePriceInput.value = maxHomePrice.toFixed(2);
        }
    }

    // Set active calculation direction based on user input focus
    homePriceInput.addEventListener('input', () => {
        activeDirection = 'price';
        calculate();
    });

    monthlyPmtInput.addEventListener('input', () => {
        activeDirection = 'payment';
        calculate();
    });

    // Re-trigger calculation on changes to secondary controls
    [downPmtInput, rateInput, termSelect].forEach(element => {
        element.addEventListener('input', calculate);
        element.addEventListener('change', calculate);
    });

    // Auto-scroll on mobile focus
    [homePriceInput, monthlyPmtInput, downPmtInput, rateInput].forEach(element => {
        element.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}