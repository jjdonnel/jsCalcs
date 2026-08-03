function displayWorkout() {
    const main = document.getElementById('main');
    if (!main) return;

    main.classList.remove('show');
    void main.offsetWidth; // Force reflow for fade-in animation

    main.innerHTML = `
        <div id="workout-calc" class="section">
            <h2 class="calc-title">Workout Calorie Burn</h2>
            
            <div>
                <label>Body Weight (lbs)</label>
                <input type="number" id="weight" placeholder="e.g. 168" inputmode="decimal">
            </div>

            <div>
                <label>Activity Type</label>
                <select id="activity" style="font-family: 'Inter', sans-serif; font-size: 16px; width: 100%; padding: 0.6rem; border: 1px solid #ccc; border-radius: 6px; background: rgba(255, 255, 255, 0.85); color: #0f172a;">
                    <option value="9.8">Running (Moderate Pace - ~10 min/mi)</option>
                    <option value="11.5">Running (Vigorous Pace - ~8 min/mi)</option>
                    <option value="8.0">Cycling (Moderate - 12-14 mph)</option>
                    <option value="10.0">Cycling (Vigorous - 14-16 mph)</option>
                    <option value="3.8">Calisthenics (Light/Moderate Effort)</option>
                    <option value="8.0">Calisthenics (Vigorous - Push-ups, Pull-ups, Burpees)</option>
                </select>
            </div>

            <div>
                <label>Duration (Minutes)</label>
                <input type="number" id="duration" placeholder="e.g. 30" inputmode="numeric">
            </div>

            <div>
                <label>Estimated Calories Burned</label>
                <input type="text" id="calories" placeholder="0 kcal" readonly>
            </div>
        </div>
    `;

    main.classList.add('show');

    const inputs = {
        weight: document.getElementById('weight'),
        activity: document.getElementById('activity'),
        duration: document.getElementById('duration'),
        calories: document.getElementById('calories')
    };

    function calculateCalories() {
        const weightLbs = parseFloat(inputs.weight.value);
        const met = parseFloat(inputs.activity.value);
        const mins = parseFloat(inputs.duration.value);

        if (isNaN(weightLbs) || isNaN(mins) || weightLbs <= 0 || mins <= 0) {
            inputs.calories.value = "";
            return;
        }

        // MET Formula: Calories = Duration (mins) * (MET * 3.5 * weight in kg) / 200
        const weightKg = weightLbs * 0.45359237;
        const totalCalories = mins * ((met * 3.5 * weightKg) / 200);

        inputs.calories.value = `${Math.round(totalCalories)} kcal`;
    }

    ["weight", "duration"].forEach(id => {
        const field = inputs[id];
        field.addEventListener('input', calculateCalories);

        field.addEventListener('focus', (e) => {
            setTimeout(() => {
                e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });

    inputs.activity.addEventListener('change', calculateCalories);
}