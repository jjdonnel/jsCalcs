function displaySpeed() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="speed-calc" class="section">
        <!-- Header row: only title and button -->
        <div class="title-wrapper">
            <h2 class="calc-title">Speed & Pace Converter</h2>
            <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
        </div>

        <!-- Formula Bubble sits outside the flex header -->
        <div class="formula-bubble">
            <h4>About Speed Calculations</h4>
            <p>Speed conversions are performed using constant conversion factors relative to Miles Per Hour (MPH).</p>
            <strong>Key Formula:</strong>
            <code>1 Knot ≈ 1.15078 MPH</code>
            <p>Pace (min/mi) is calculated: <code>60 / Speed_MPH</code>.</p>
        </div>
            <!-- END Help Block -->
            
            
            <div>
                <label>Miles Per Hour (MPH)</label>
                <input type="number" id="mph" placeholder="e.g. 60" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Knots (kt)</label>
                <input type="number" id="knots" placeholder="e.g. 52" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Kilometers Per Hour (KPH)</label>
                <input type="number" id="kph" placeholder="e.g. 96" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Meters Per Second (m/s)</label>
                <input type="number" id="mps" placeholder="e.g. 26.8" inputmode="decimal" step="any">
            </div>

            <div>
                <label>Running Pace (Min / Mile)</label>
                <input type="text" id="pace" placeholder="e.g. 10:00" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        mph: document.getElementById('mph'),
        knots: document.getElementById('knots'),
        kph: document.getElementById('kph'),
        mps: document.getElementById('mps'),
        pace: document.getElementById('pace')
    };

    // Conversion factor constants (based on 1 MPH)
    const MPH_TO_KNOTS = 0.868976;
    const MPH_TO_KPH = 1.60934;
    const MPH_TO_MPS = 0.44704;

    function formatPace(mphVal) {
        if (mphVal <= 0) return "--:--";
        const totalMinutes = 60 / mphVal;
        const mins = Math.floor(totalMinutes);
        const secs = Math.round((totalMinutes - mins) * 60);

        // Handle edge case where seconds round up to 60
        if (secs === 60) {
            return `${mins + 1}:00`;
        }
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function updateAllFromMPH(mphVal, activeId) {
        if (isNaN(mphVal) || mphVal <= 0) {
            Object.keys(inputs).forEach(key => {
                if (key !== activeId) inputs[key].value = "";
            });
            return;
        }

        if (activeId !== 'mph') inputs.mph.value = parseFloat(mphVal.toFixed(2));
        if (activeId !== 'knots') inputs.knots.value = parseFloat((mphVal * MPH_TO_KNOTS).toFixed(2));
        if (activeId !== 'kph') inputs.kph.value = parseFloat((mphVal * MPH_TO_KPH).toFixed(2));
        if (activeId !== 'mps') inputs.mps.value = parseFloat((mphVal * MPH_TO_MPS).toFixed(2));

        inputs.pace.value = `${formatPace(mphVal)} /mi`;
    }

    // Attach real-time calculation and smooth-scroll on focus
    const fields = ['mph', 'knots', 'kph', 'mps'];
    fields.forEach(id => {
        const field = inputs[id];

        field.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            if (isNaN(val)) {
                updateAllFromMPH(0, id);
                return;
            }

            let baseMPH = 0;
            if (id === 'mph') baseMPH = val;
            if (id === 'knots') baseMPH = val / MPH_TO_KNOTS;
            if (id === 'kph') baseMPH = val / MPH_TO_KPH;
            if (id === 'mps') baseMPH = val / MPH_TO_MPS;

            updateAllFromMPH(baseMPH, id);
        });

        // Smooth scroll centering for mobile Safari / iPhone keyboard
        field.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}