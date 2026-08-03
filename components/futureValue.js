function displayFutureValue() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="future-value-calc" class="section">
            <!-- Header Row: Title & Help Button -->
            <div class="title-wrapper">
                <h2 class="calc-title">Future Value Calculator</h2>
                <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
            </div>

            <!-- Formula Bubble (Pop-over) -->
            <div class="formula-bubble">
                <h4>Future Value with Monthly Deposits</h4>
                <p>Calculates compound growth of starting principal plus recurring monthly additions.</p>
                <strong>Key Formula:</strong>
                <code>FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)]</code>
                <p><small>Where <strong>P</strong> = Principal, <strong>PMT</strong> = Monthly Deposit, <strong>r</strong> = Annual Rate, and <strong>t</strong> = Years.</small></p>
            </div>

            <!-- Input Fields -->
            <div>
                <label for="fv-principal">Starting Principal ($)</label>
                <input type="number" id="fv-principal" placeholder="e.g. 10000" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="fv-monthly">Monthly Contribution ($)</label>
                <input type="number" id="fv-monthly" placeholder="e.g. 500" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="fv-rate">Annual Interest Rate (%)</label>
                <input type="number" id="fv-rate" placeholder="e.g. 7.5" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="fv-years">Time Period (Years)</label>
                <input type="number" id="fv-years" placeholder="e.g. 10" inputmode="numeric" step="any">
            </div>

            <div>
                <label for="fv-result">Estimated Future Value</label>
                <input type="text" id="fv-result" placeholder="$0.00" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    // Element references
    const principalInput = document.getElementById('fv-principal');
    const monthlyInput = document.getElementById('fv-monthly');
    const rateInput = document.getElementById('fv-rate');
    const yearsInput = document.getElementById('fv-years');
    const resultOutput = document.getElementById('fv-result');

    function calculateFutureValue() {
        const principal = parseFloat(principalInput.value) || 0;
        const monthlyPmt = parseFloat(monthlyInput.value) || 0;
        const annualRate = parseFloat(rateInput.value) / 100;
        const years = parseFloat(yearsInput.value);

        if (isNaN(years) || years < 0 || isNaN(annualRate) || annualRate < 0) {
            resultOutput.value = "";
            return;
        }

        // Need at least principal or monthly payment
        if (principal <= 0 && monthlyPmt <= 0) {
            resultOutput.value = "";
            return;
        }

        const months = years * 12;
        const monthlyRate = annualRate / 12;

        let futureValue = 0;

        if (monthlyRate === 0) {
            // Edge case: 0% interest rate
            futureValue = principal + (monthlyPmt * months);
        } else {
            // Compound Principal: P * (1 + r/12)^(12t)
            const compoundPrincipal = principal * Math.pow(1 + monthlyRate, months);

            // Compound Monthly Contributions: PMT * [((1 + r/12)^(12t) - 1) / (r/12)]
            const compoundAnnuity = monthlyPmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

            futureValue = compoundPrincipal + compoundAnnuity;
        }

        resultOutput.value = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(futureValue);
    }

    // Attach calculation listeners and mobile scroll positioning
    [principalInput, monthlyInput, rateInput, yearsInput].forEach(element => {
        element.addEventListener('input', calculateFutureValue);

        element.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}