function displayFutureValue() {
    const main = document.getElementById('main');
    main.classList.remove('show');
    main.innerHTML =
        `<div id="fv" class="section">
            <div>
                <label>Principle</label>
                <input type="number" id="prin" placeholder="Principle">
            </div>
            <div>
                <label>Rate</label>
                <input type="number" id="rate" placeholder="Rate">
            </div>
            <div>
                <label>Time</label>
                <input type="number" id="time" placeholder="Time">
            </div>
            <div>
                <label>Contributions</label>
                <input type="number" id="cont" placeholder="Contributions">
            </div>
            <div>
                <label>Result</label>
                <input type="number" id="resu" placeholder="Future Value">
            </div>
        </div>`

    function show() {
        main.classList.add('show');
    }
    show();
    
    const prin = document.getElementById("prin");
    const rate = document.getElementById("rate");
    const time = document.getElementById("time");
    const cont = document.getElementById("cont");
    const resu = document.getElementById("resu");

    prin.addEventListener("input", function () {
        let p = parseInt(prin.value);
        let r = parseInt(rate.value || 0) / 100;
        let t = parseInt(time.value || 0);
        let c = parseInt(cont.value || 0);
        resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

    });

    rate.addEventListener("input", function () {
        let p = parseInt(prin.value || 0);
        let r = parseInt(rate.value) / 100;
        let t = parseInt(time.value || 0);
        let c = parseInt(cont.value || 0);
        resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

    });

    time.addEventListener("input", function () {
        let p = parseInt(prin.value || 0);
        let r = parseInt(rate.value || 0) / 100;
        let t = parseInt(time.value);
        let c = parseInt(cont.value || 0);
        resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

    });

    cont.addEventListener("input", function () {
        let p = parseInt(prin.value || 0);
        let r = parseInt(rate.value || 0) / 100;
        let t = parseInt(time.value || 0);
        let c = parseInt(cont.value);
        resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

    });
};