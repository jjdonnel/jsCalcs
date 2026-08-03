function displayWindWeather() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="wind-weather-calc" class="section">
            <!-- Header Row: Title & Help Button -->
            <div class="title-wrapper">
                <h2 class="calc-title">Wind & Weather</h2>
                <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
            </div>

            <!-- Formula Bubble (Pop-over) -->
            <div class="formula-bubble">
                <h4>Weather Calculations</h4>
                <p><strong>Feels Like:</strong> Uses NWS Wind Chill (≤50°F & wind >3mph) or Heat Index (≥80°F & RH ≥40%).</p>
                <p><strong>Cloud Base:</strong> Cloud Base (ft) ≈ ((Temp °F - Dew Point °F) / 4.4) × 1000.</p>
            </div>

            <!-- Input Fields -->
            <div>
                <label for="ww-temp">Air Temperature (°F)</label>
                <input type="number" id="ww-temp" placeholder="e.g. 72" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ww-wind">Wind Speed (mph)</label>
                <input type="number" id="ww-wind" placeholder="e.g. 12" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ww-humidity">Relative Humidity (%)</label>
                <input type="number" id="ww-humidity" placeholder="e.g. 55" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ww-dewpoint">Dew Point (°F) - Optional</label>
                <input type="number" id="ww-dewpoint" placeholder="e.g. 50" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="ww-feels-like">Perceived "Feels Like" Temp</label>
                <input type="text" id="ww-feels-like" placeholder="-- °F" readonly>
            </div>

            <div>
                <label for="ww-cloud-base">Est. Cumulus Cloud Base (AGL)</label>
                <input type="text" id="ww-cloud-base" placeholder="-- ft" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    // Element references
    const tempInput = document.getElementById('ww-temp');
    const windInput = document.getElementById('ww-wind');
    const humidityInput = document.getElementById('ww-humidity');
    const dewPointInput = document.getElementById('ww-dewpoint');
    const feelsLikeOutput = document.getElementById('ww-feels-like');
    const cloudBaseOutput = document.getElementById('ww-cloud-base');

    function calculateWeather() {
        const T = parseFloat(tempInput.value);
        const V = parseFloat(windInput.value) || 0;
        const RH = parseFloat(humidityInput.value);
        const DP = parseFloat(dewPointInput.value);

        // --- 1. Calculate Feels Like Temperature ---
        if (!isNaN(T)) {
            let feelsLike = T;

            // NWS Wind Chill: T <= 50°F and V > 3 mph
            if (T <= 50 && V > 3) {
                feelsLike = 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + (0.4275 * T * Math.pow(V, 0.16));
            } 
            // NWS Heat Index: T >= 80°F and RH present
            else if (T >= 80 && !isNaN(RH) && RH >= 40) {
                feelsLike = -42.379 + (2.04901523 * T) + (10.14333127 * RH) 
                    - (0.22475541 * T * RH) - (0.00683783 * T * T) 
                    - (0.05481717 * RH * RH) + (0.00122874 * T * T * RH) 
                    + (0.00085282 * T * RH * RH) - (0.00000199 * T * T * RH * RH);
            }

            feelsLikeOutput.value = Math.round(feelsLike) + " °F";
        } else {
            feelsLikeOutput.value = "";
        }

        // --- 2. Calculate Cloud Base Height (AGL) ---
        if (!isNaN(T) && !isNaN(DP)) {
            if (DP > T) {
                cloudBaseOutput.value = "Dew point exceeds temp";
            } else {
                const cloudBaseFt = ((T - DP) / 4.4) * 1000;
                cloudBaseOutput.value = Math.round(cloudBaseFt).toLocaleString() + " ft AGL";
            }
        } else {
            cloudBaseOutput.value = "";
        }
    }

    // Attach listeners
    [tempInput, windInput, humidityInput, dewPointInput].forEach(element => {
        element.addEventListener('input', calculateWeather);

        element.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}