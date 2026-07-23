function displayMortgage() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;
    
    main.innerHTML = `
        <div id="mort" class="section">
            <h2 class="calc-title">Mortgage Calculator</h2>
            <div>
                <label>Principal ($)</label>
                <input type="number" id="mprin" placeholder="e.g. 300000">
            </div>
            <div>
                <label>Interest Rate (%)</label>
                <input type="number" id="mrate" placeholder="e.g. 6.5" step="0.01">
            </div>
            <div>
                <label>Term (Years)</label>
                <input type="number" id="mtime" placeholder="e.g. 30">
            </div>
            <div>
                <label>Monthly Payment ($)</label>
                <input type="text" id="mresu" placeholder="$0.00">
            </div>
        </div>
    `;

    main.classList.add('show');

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    
    const inputs = {
        mprin: document.getElementById("mprin"),
        mrate: document.getElementById("mrate"),
        mtime: document.getElementById("mtime"),
        mresu: document.getElementById("mresu")
    };

    function calculatePayment() {
        const p = Number(inputs.mprin.value || 0);
        const r = Number(inputs.mrate.value || 0) / 1200;
        const t = Number(inputs.mtime.value || 0) * 12;

        if (p === 0 || t === 0) {
            inputs.mresu.value = "";
            return;
        }

        if (r === 0) {
            inputs.mresu.value = formatter.format(p / t);
            return;
        }

        const payment = (p * r) / (1 - Math.pow(1 + r, -t));
        inputs.mresu.value = payment > 0 ? formatter.format(payment) : "";
    }

    function calculateAffordablePrincipal() {
        const rawPaymentString = inputs.mresu.value.replace(/[^0-9.]/g, '');
        const m = Number(rawPaymentString || 0);
        const r = Number(inputs.mrate.value || 0) / 1200;
        const t = Number(inputs.mtime.value || 0) * 12;

        if (m === 0 || t === 0) {
            inputs.mprin.value = "";
            return;
        }

        if (r === 0) {
            inputs.mprin.value = Math.round(m * t);
            return;
        }

        const principal = (m * (1 - Math.pow(1 + r, -t))) / r;
        inputs.mprin.value = principal > 0 ? Math.round(principal) : "";
    }

    ["mprin", "mrate", "mtime"].forEach(id => {
        inputs[id].addEventListener("input", calculatePayment);
    });

    inputs.mresu.addEventListener("input", calculateAffordablePrincipal);
    
    inputs.mresu.addEventListener("blur", () => {
        const rawVal = inputs.mresu.value.replace(/[^0-9.]/g, '');
        if (rawVal) inputs.mresu.value = formatter.format(Number(rawVal));
    });
}