function displayVolume() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="volume-calc" class="section">
            <h2 class="calc-title">Volume & Liquid Measure</h2>
            
            <div>
                <label>Gallons (US gal)</label>
                <input type="number" id="gallons" placeholder="e.g. 1" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Liters (L)</label>
                <input type="number" id="liters" placeholder="e.g. 3.785" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Fluid Ounces (fl oz)</label>
                <input type="number" id="floz" placeholder="e.g. 128" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Cups (US)</label>
                <input type="number" id="cups" placeholder="e.g. 16" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Milliliters (mL)</label>
                <input type="number" id="ml" placeholder="e.g. 3785" inputmode="decimal" step="any">
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        gallons: document.getElementById('gallons'),
        liters: document.getElementById('liters'),
        floz: document.getElementById('floz'),
        cups: document.getElementById('cups'),
        ml: document.getElementById('ml')
    };

    // Conversion factors relative to 1 US Gallon
    const GAL_TO_LITERS = 3.78541;
    const GAL_TO_FLOZ = 128;
    const GAL_TO_CUPS = 16;
    const GAL_TO_ML = 3785.41;

    function updateAllFromGallons(galVal, activeId) {
        if (isNaN(galVal) || galVal <= 0) {
            Object.keys(inputs).forEach(key => {
                if (key !== activeId) inputs[key].value = "";
            });
            return;
        }

        // Format dynamically to keep clean decimal points
        const formatNum = (val) => {
            return val >= 100 ? parseFloat(val.toFixed(1)) : parseFloat(val.toFixed(3));
        };

        if (activeId !== 'gallons') inputs.gallons.value = formatNum(galVal);
        if (activeId !== 'liters') inputs.liters.value = formatNum(galVal * GAL_TO_LITERS);
        if (activeId !== 'floz') inputs.floz.value = formatNum(galVal * GAL_TO_FLOZ);
        if (activeId !== 'cups') inputs.cups.value = formatNum(galVal * GAL_TO_CUPS);
        if (activeId !== 'ml') inputs.ml.value = parseFloat((galVal * GAL_TO_ML).toFixed(0));
    }

    const fields = ['gallons', 'liters', 'floz', 'cups', 'ml'];
    fields.forEach(id => {
        const field = inputs[id];

        field.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (isNaN(val)) {
                updateAllFromGallons(0, id);
                return;
            }

            let baseGallons = 0;
            if (id === 'gallons') baseGallons = val;
            if (id === 'liters') baseGallons = val / GAL_TO_LITERS;
            if (id === 'floz') baseGallons = val / GAL_TO_FLOZ;
            if (id === 'cups') baseGallons = val / GAL_TO_CUPS;
            if (id === 'ml') baseGallons = val / GAL_TO_ML;

            updateAllFromGallons(baseGallons, id);
        });

        // Mobile Safari focus & smooth scroll centering
        field.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}