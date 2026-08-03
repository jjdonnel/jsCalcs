function displayWindWeather() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="wind-calc" class="section">
            <h2 class="calc-title">Wind & Weather</h2>
            
            <div>
                <label>Air Temperature (°F)</label>
                <input type="number" id="tempF" placeholder="e.g. 35" inputmode="decimal">
            </div>

            <div>
                <label>Wind Speed (MPH)</label>
                <input type="number" id="windMph" placeholder="e.g. 15" inputmode="decimal">
            </div>

            <div>
                <label>Wind Chill ("Feels Like" °F)</label>
                <input type="text" id="windChill" placeholder="--°F" readonly>
            </div>

            <div>
                <label>Beaufort Scale Rating</label>
                <input type="text" id="beaufort" placeholder="-- (e.g. Force 4 - Moderate Breeze)" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        tempF: document.getElementById('tempF'),
        windMph: document.getElementById('windMph'),
        windChill: document.getElementById('windChill'),
        beaufort: document.getElementById('beaufort')
    };

    function calculateWeather() {
        const t = parseFloat(inputs.tempF.value);
        const v = parseFloat(inputs.windMph.value);

        // 1. Calculate Wind Chill (NWS Formula valid for Temp <= 50°F and Wind > 3 MPH)
        if (!isNaN(t) && !isNaN(v) && t <= 50 && v > 3) {
            const chill = 35.74 + (0.6215 * t) - (35.75 * Math.pow(v, 0.16)) + (0.4275 * t * Math.pow(v, 0.16));
            inputs.windChill.value = `${Math.round(chill)}°F`;
        } else if (!isNaN(t)) {
            inputs.windChill.value = `${Math.round(t)}°F (No Wind Chill Effect)`;
        } else {
            inputs.windChill.value = "";
        }

        // 2. Determine Beaufort Scale based on Wind Speed (MPH)
        if (isNaN(v) || v < 0) {
            inputs.beaufort.value = "";
            return;
        }

        let scaleText = "";
        if (v < 1) scaleText = "Force 0 - Calm";
        else if (v <= 3) scaleText = "Force 1 - Light Air";
        else if (v <= 7) scaleText = "Force 2 - Light Breeze";
        else if (v <= 12) scaleText = "Force 3 - Gentle Breeze";
        else if (v <= 18) scaleText = "Force 4 - Moderate Breeze";
        else if (v <= 24) scaleText = "Force 5 - Fresh Breeze";
        else if (v <= 31) scaleText = "Force 6 - Strong Breeze";
        else if (v <= 38) scaleText = "Force 7 - Near Gale";
        else if (v <= 46) scaleText = "Force 8 - Gale";
        else if (v <= 54) scaleText = "Force 9 - Strong Gale";
        else if (v <= 63) scaleText = "Force 10 - Storm";
        else if (v <= 72) scaleText = "Force 11 - Violent Storm";
        else scaleText = "Force 12 - Hurricane Force";

        inputs.beaufort.value = scaleText;
    }

    ["tempF", "windMph"].forEach(id => {
        const field = inputs[id];
        field.addEventListener('input', calculateWeather);

        // Mobile Safari focus & smooth scroll centering
        field.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}