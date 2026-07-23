function displayFutureValue() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;

    main.innerHTML = `
        <div id="fv" class="section">
            <h2 class="calc-title">Future Value Savings</h2>
            <div>
                <label>Starting Principal ($)</label>
                <input type="number" id="principal" placeholder="e.g. 5000">
            </div>
            <div>
                <label>Monthly Addition ($)</label>
                <input type="number" id="addition" placeholder="e.g. 200">
            </div>
            <div>
                <label>Annual Rate (%)</label>
                <input type="number" id="rate" placeholder="e.g. 7" step="0.1">
            </div>
            <div>
                <label>Time (Years)</label>
                <input type="number" id="time" placeholder="e.g. 10">
            </div>
            <div>
                <label>Future Value</label>
                <input type="text" id="result" placeholder="$0.00" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        principal: document.getElementById('principal'),
        addition: document.getElementById('addition'),
        rate: document.getElementById('rate'),
        time: document.getElementById('time'),
        result: document.getElementById('result')
    };

    function calculateFutureValue() {
        const p = parseFloat(inputs.principal.value || 0);
        const pmt = parseFloat(inputs.addition.value || 0);
        const annualRate = parseFloat(inputs.rate.value || 0);
        const years = parseFloat(inputs.time.value || 0);

        if (p === 0 && pmt === 0) {
            inputs.result.value = "";
            return;
        }

        const r = (annualRate / 100) / 12;
        const n = years * 12;

        let fv = 0;
        if (r === 0) {
            fv = p + (pmt * n);
        } else {
            const compoundPrincipal = p * Math.pow(1 + r, n);
            const compoundSeries = pmt * ((Math.pow(1 + r, n) - 1) / r);
            fv = compoundPrincipal + compoundSeries;
        }

        inputs.result.value = `$${fv.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }

    ["principal", "addition", "rate", "time"].forEach(id => {
        inputs[id].addEventListener("input", calculateFutureValue);
    });
}