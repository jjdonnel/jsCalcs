function displayTemperature() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;
    
    main.innerHTML = `
        <div id="temp" class="section">
            <h2 class="calc-title">Temperature Converter</h2>
            <div>
                <label>Fahrenheit (°F)</label>
                <input type="number" id="fahrenheit" placeholder="Fahrenheit" step="0.1">
            </div>
            <div>
                <label>Celsius (°C)</label>
                <input type="number" id="celsius" placeholder="Celsius" step="0.1">
            </div>
            <div>
                <label>Kelvin (K)</label>
                <input type="number" id="kelvin" placeholder="Kelvin" step="0.1">
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        fahrenheit: document.getElementById('fahrenheit'),
        celsius: document.getElementById('celsius'),
        kelvin: document.getElementById('kelvin')
    };

    function updateAmbientColor(fValue) {
        const body = document.body;
        if (fValue >= 85) {
            body.style.setProperty('--accent-color', 'rgba(230, 81, 0, 0.6)');  // Warm Amber
        } else if (fValue <= 32) {
            body.style.setProperty('--accent-color', 'rgba(0, 188, 212, 0.6)');  // Ice Blue
        } else {
            body.style.setProperty('--accent-color', 'rgba(20, 120, 200, 0.5)'); // Default Slate Blue
        }
    }

    function handleTemperatureConversion(e) {
        const activeInput = e.target;
        const currentVal = parseFloat(activeInput.value);

        if (isNaN(currentVal)) {
            Object.values(inputs).forEach(input => {
                if (input !== activeInput) input.value = "";
            });
            updateAmbientColor(60);
            return;
        }

        let f, c, k;

        if (activeInput.id === 'fahrenheit') {
            f = currentVal;
            c = ((f - 32) * 5) / 9;
            k = c + 273.15;
        } else if (activeInput.id === 'celsius') {
            c = currentVal;
            f = (c * 9) / 5 + 32;
            k = c + 273.15;
        } else if (activeInput.id === 'kelvin') {
            k = currentVal;
            c = k - 273.15;
            f = (c * 9) / 5 + 32;
        }

        if (activeInput.id !== 'fahrenheit') inputs.fahrenheit.value = Number(f.toFixed(1));
        if (activeInput.id !== 'celsius') inputs.celsius.value = Number(c.toFixed(1));
        if (activeInput.id !== 'kelvin') inputs.kelvin.value = Number(k.toFixed(2));

        updateAmbientColor(f);
    }

    ["fahrenheit", "celsius", "kelvin"].forEach(id => {
        inputs[id].addEventListener("input", handleTemperatureConversion);
    });
}