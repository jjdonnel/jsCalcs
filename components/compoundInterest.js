function displayCompoundInterest() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;

    main.innerHTML = `
        <div id="ci" class="section">
            <h2 class="calc-title">Compound Interest</h2>
            <div>
                <label>Principal ($)</label>
                <input type="number" id="cprin" placeholder="e.g. 10000">
            </div>
            <div>
                <label>Annual Rate (%)</label>
                <input type="number" id="crate" placeholder="e.g. 5" step="0.1">
            </div>
            <div>
                <label>Time (Years)</label>
                <input type="number" id="ctime" placeholder="e.g. 5">
            </div>
            <div>
                <label>Total Value</label>
                <input type="text" id="cresu" placeholder="$0.00" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        cprin: document.getElementById("cprin"),
        crate: document.getElementById("crate"),
        ctime: document.getElementById("ctime"),
        cresu: document.getElementById("cresu")
    };

    function calculateCompoundInterest() {
        const p = parseFloat(inputs.cprin.value);
        const r = parseFloat(inputs.crate.value || 0) / 100;
        const t = parseFloat(inputs.ctime.value || 0);

        if (isNaN(p)) {
            inputs.cresu.value = "";
            return;
        }

        const compoundValue = p * Math.pow(1 + r, t);

        if (compoundValue > 0) {
            inputs.cresu.value = `$${compoundValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        } else {
            inputs.cresu.value = "";
        }
    }

    ["cprin", "crate", "ctime"].forEach(id => {
        inputs[id].addEventListener("input", calculateCompoundInterest);
    });
}