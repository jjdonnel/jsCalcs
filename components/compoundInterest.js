function displayCompoundInterest() {
    const main = document.getElementById('main');
    main.classList.remove('show');
    main.innerHTML =
        `<div id="ci" class="section">
            <div>
                <label>Principle</label>
                <input type="number" id="cprin" placeholder="Principle">
            </div>
            <div>
                <label>Rate</label>
                <input type="number" id="crate" placeholder="Rate">
            </div>
            <div>
                <label>Time</label>
                <input type="number" id="ctime" placeholder="Time">
            </div>
            <div>
                <label>Result</label>
                <input type="number" id="cresu" placeholder="Future Value">
            </div>
        </div>`

    function show() {
        main.classList.add('show');
    }
    setTimeout(show, 200);

    const cprin = document.getElementById("cprin");
    const crate = document.getElementById("crate");
    const ctime = document.getElementById("ctime");
    const cresu = document.getElementById("cresu");

    cprin.addEventListener("input", function () {
        let p = parseInt(cprin.value);
        let r = parseInt(crate.value || 0) / 100;
        let t = parseInt(ctime.value || 0);
        cresu.value = parseInt(p * Math.pow(1 + r, t));

    });

    crate.addEventListener("input", function () {
        let p = parseInt(cprin.value || 0);
        let r = parseInt(crate.value) / 100;
        let t = parseInt(ctime.value || 0);
        cresu.value = parseInt(p * Math.pow(1 + r, t));

    });

    ctime.addEventListener("input", function () {
        let p = parseInt(cprin.value || 0);
        let r = parseInt(crate.value || 0) / 100;
        let t = parseInt(ctime.value);
        cresu.value = parseInt(p * Math.pow(1 + r, t));

    });

};