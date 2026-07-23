function displayCloudBase() {
    const main = document.getElementById('main');
    if (!main) return;

    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;

    main.innerHTML = `
        <div id="cb" class="section">
            <h2 class="calc-title">Cloud Base Height</h2>
            <div>
                <label>Temperature (°F)</label>
                <input type="number" id="temp" placeholder="e.g. 72" step="0.1">
            </div>
            <div>
                <label>Dew Point (°F)</label>
                <input type="number" id="dp" placeholder="e.g. 55" step="0.1">
            </div>
            <div>
                <label>Estimated Cloud Base</label>
                <input type="text" id="cbres" placeholder="Calculated height" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const temp = document.getElementById("temp");
    const dp = document.getElementById("dp");
    const cbres = document.getElementById("cbres");

    function calculateCloudBase() {
        const t = parseFloat(temp.value);
        const d = parseFloat(dp.value);

        if (isNaN(t) || isNaN(d)) {
            cbres.value = "";
            return;
        }

        // Spread in Fahrenheit divided by 4.4°F lapse rate per 1,000 ft
        const spread = t - d;

        if (spread <= 0) {
            cbres.value = "Surface Fog / Mist";
        } else {
            const baseFt = Math.round((spread / 4.4) * 1000);
            cbres.value = `${baseFt.toLocaleString()} ft AGL`;
        }
    }

    temp.addEventListener("input", calculateCloudBase);
    dp.addEventListener("input", calculateCloudBase);
}