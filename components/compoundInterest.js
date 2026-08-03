function displayCompoundInterest() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="compound-interest-calc" class="section">
            <!-- Header Row: Title & Help Button -->
            <div class="title-wrapper">
                <h2 class="calc-title">Compound Interest</h2>
                <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
            </div>

            <!-- Formula Bubble (Pop-over) -->
            <div class="formula-bubble">
                <h4>Compound Interest Calculation</h4>
                <p>Calculates interest earned on both principal and accumulated interest over time.</p>
                <strong>Key Formula:</strong>
                <code>A = P × (1 + r/n)^(n×t)</code>
                <p><small>Where <strong>P</strong> = Principal, <strong>r</strong> = Rate, <strong>n</strong> = Compounds per year, <strong>t</strong> = Years.</small></p>
            </div>

            <!-- Input Fields -->
            <div>
                <label for="ci-principal">Initial Principal ($)</label>
                <input type="number" id="ci-principal" placeholder="e.g. 5000" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ci-rate">Annual Interest Rate (%)</label>
                <input type="number" id="ci-rate" placeholder="e.g. 6.5" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ci-years">Time Period (Years)</label>
                <input type="number" id="ci-years" placeholder="e.g. 5" inputmode="numeric" step="any">
            </div>

            <div>
                <label for="ci-frequency">Compounding Frequency</label>
                <select id="ci-frequency">
                    <option value="12">Monthly (12/yr)</option>
                    <option value="4">Quarterly (4/yr)</option>
                    <option value="365">Daily (365/yr)</option>
                    <option value="1">Annually (1/yr)</option>
                </select>
            </div>

            <div>
                <label for="ci-total">Total Balance</label>
                <input type="text" id="ci-total" placeholder="$0.00" readonly>
            </div>

            <div>
                <label for="ci-interest">Total Interest Earned</label>
                <input type="text" id="ci-interest" placeholder="$0.00" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const principalInput = document.getElementById('ci-principal');
    const rateInput = document.getElementById('ci-rate');
    const yearsInput = document.getElementById('ci-years');
    const frequencySelect = document.getElementById('ci-frequency');
    const totalOutput = document.getElementById('ci-total');
    const interestOutput = document.getElementById('ci-interest');

    function calculate() {
        const p = parseFloat(principalInput.value);
        const r = parseFloat(rateInput.value) / 100;
        const t = parseFloat(yearsInput.value);
        const n = parseFloat(frequencySelect.value);

        if (isNaN(p) || p < 0 || isNaN(r) || r < 0 || isNaN(t) || t < 0) {
            totalOutput.value = "";
            interestOutput.value = "";
            return;
        }

        const total = p * Math.pow(1 + (r / n), n * t);
        const interest = total - p;

        const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        totalOutput.value = formatter.format(total);
        interestOutput.value = formatter.format(interest);
    }

    [principalInput, rateInput, yearsInput, frequencySelect].forEach(element => {
        element.addEventListener('input', calculate);
        element.addEventListener('change', calculate);

        if (element.tagName === 'INPUT') {
            element.addEventListener('focus', (e) => {
                setTimeout(() => {
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        }
    });
}