function displayWorkout() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="workout-calc" class="section">
            <!-- Header Row: Title & Help Button -->
            <div class="title-wrapper">
                <h2 class="calc-title">Workout Calories</h2>
                <button type="button" class="help-btn" onclick="toggleFormula(this)">?</button>
            </div>

            <!-- Formula Bubble (Pop-over) -->
            <div class="formula-bubble">
                <h4>Workout Calorie Calculation</h4>
                <p>Estimates energy expenditure based on Body Weight, Duration, and Activity Intensity (METs).</p>
                <strong>Key Formula:</strong>
                <code>Calories = (MET × 3.5 × Weight_kg / 200) × Duration_min</code>
            </div>

            <!-- Input Fields -->
            <div>
                <label for="workout-type">Activity Type</label>
                <select id="workout-type">
                    <option value="8.0">Running (8 mph / 7.5 min/mi)</option>
                    <option value="6.0">Cycling (Moderate, 12-14 mph)</option>
                    <option value="3.8">Walking (Brisk, 3.5 mph)</option>
                    <option value="8.0">Calisthenics (Vigorous)</option>
                    <option value="5.0">Weight Lifting (Vigorous)</option>
                    <option value="10.0">Swimming (Laps, Vigorous)</option>
                </select>
            </div>

            <div>
                <label for="weight-lbs">Body Weight (lbs)</label>
                <input type="number" id="weight-lbs" placeholder="e.g. 168" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="duration-min">Duration (Minutes)</label>
                <input type="number" id="duration-min" placeholder="e.g. 30" inputmode="decimal" step="any">
            </div>

            <div>
                <label for="calories-burned">Estimated Calories Burned</label>
                <input type="text" id="calories-burned" placeholder="0 kcal" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    // Element references
    const workoutType = document.getElementById('workout-type');
    const weightInput = document.getElementById('weight-lbs');
    const durationInput = document.getElementById('duration-min');
    const caloriesOutput = document.getElementById('calories-burned');

    function calculateCalories() {
        const met = parseFloat(workoutType.value);
        const weightLbs = parseFloat(weightInput.value);
        const duration = parseFloat(durationInput.value);

        if (isNaN(weightLbs) || weightLbs <= 0 || isNaN(duration) || duration <= 0) {
            caloriesOutput.value = "";
            return;
        }

        // Convert weight to kg (1 lb ≈ 0.453592 kg)
        const weightKg = weightLbs * 0.453592;

        // Calories burned formula: (MET * 3.5 * weightKg / 200) * duration
        const totalCalories = (met * 3.5 * weightKg / 200) * duration;

        caloriesOutput.value = `${Math.round(totalCalories)} kcal`;
    }

    // Attach calculation listeners
    [workoutType, weightInput, durationInput].forEach(element => {
        element.addEventListener('input', calculateCalories);
        element.addEventListener('change', calculateCalories);

        if (element.tagName === 'INPUT') {
            element.addEventListener('focus', (e) => {
                setTimeout(() => {
                    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        }
    });
}