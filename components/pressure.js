function displayPressure() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;
    
    main.innerHTML = `
        <div id="pressure" class="section">
            <h2 class="calc-title">Barometric Pressure</h2>
            <div class="values">
                <label>Millibars (hPa)</label>
                <input type="number" id="mb" placeholder="e.g. 1013.25" step="0.1">
            </div>
            <div>
                <label>Inches Hg (inHg)</label>
                <input type="number" id="hg" placeholder="e.g. 29.92" step="0.01">
            </div>
            <div>
                <label>PSI</label>
                <input type="number" id="psi" placeholder="e.g. 14.7" step="0.01">
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        mb: document.getElementById('mb'),
        hg: document.getElementById('hg'),
        psi: document.getElementById('psi')
    };

    const conversionScales = {
        mb: 1,
        hg: 0.02953,
        psi: 0.0145038
    };

    function handlePressureConversion(e) {
        const activeInput = e.target;
        const currentVal = parseFloat(activeInput.value);

        if (isNaN(currentVal)) {
            Object.values(inputs).forEach(input => {
                if (input !== activeInput) input.value = "";
            });
            return;
        }

        const currentUnit = activeInput.id;
        const valueInMb = currentVal / conversionScales[currentUnit];

        Object.keys(inputs).forEach(unit => {
            if (unit !== currentUnit) {
                const targetValue = valueInMb * conversionScales[unit];
                inputs[unit].value = Number(targetValue.toFixed(2));
            }
        });
    }

    ["mb", "hg", "psi"].forEach(id => {
        inputs[id].addEventListener("input", handlePressureConversion);
    });
}