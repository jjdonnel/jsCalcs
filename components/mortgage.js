
function displayMortgage() {
    const main = document.getElementById('main');
    main.classList.remove('show');
    main.innerHTML =
        `<div id="mort" class="section">
            <div>
                <label>Principle $</label>
                <input type="number" id="mprin" placeholder="Principle">
            </div>
            <div>
                <label>Rate %</label>
                <input type="number" id="mrate" placeholder="Rate">
            </div>
            <div>
                <label>Time Yrs</label>
                <input type="number" id="mtime" placeholder="Time">
            </div>
            <div>
                <label>Result $</label>
                <input type="number" id="mresu" placeholder="Payment">
            </div>
        </div>`

    function show() {
        main.classList.add('show');
    }
    setTimeout(show, 200);


    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    
    const mprin = document.getElementById("mprin");
    const mrate = document.getElementById("mrate");
    const mtime = document.getElementById("mtime");
    const mresu = document.getElementById("mresu");

    mprin.addEventListener("input", function () {
        let p = Number(mprin.value);
        let r = Number(mrate.value || 1) / 1200;
        let t = Number(mtime.value || 1) * 12;
        mresu.value = parseFloat((p * r) / (1 - Math.pow(1 + r, -t))).toFixed(0);
        // mresu.value = (p * r * t);
        // / (1 - Math.pow(1 + r, -t));
         console.log(p, r, t, mresu.value);

    });

    mrate.addEventListener("input", function () {
        let p = Number(mprin.value || 0);
        let r = Number(mrate.value) / 1200;
        let t = Number(mtime.value || 1) * 12;
        // mresu.value = (p * r * t);
        mresu.value = parseFloat((p * r) / (1 - Math.pow(1 + r, -t))).toFixed(0);

    });

    mtime.addEventListener("input", function () {
        let p = Number(mprin.value || 0);
        let r = Number(mrate.value || 1) / 1200;
        let t = Number(mtime.value) * 12;
        // mresu.value = (p * r * t); 
        mresu.value = parseFloat((p * r) / (1 - Math.pow(1 + r, -t))).toFixed(0);

    });

    mresu.addEventListener("input", function () {
        let m = Number(mresu.value);
        let r = Number(mrate.value || 1) / 1200;
        let t = Number(mtime.value) * 12;
        mprin.value = parseInt(
            m * (1 - Math.pow(1 + r, -t)) / r
        );
    })
};










// let p = Number(this.state.principal);
//   let r = Number(this.state.rate / 1200);
//   let t = Number(this.state.time);
//   console.log(this.state.result);

// //   let tot = Number((p * r * Math.pow(1 + r,(t* 12)))/(Math.pow(1 + r,(t*12)) - 1)).toLocaleString();

//   let tot = Number((p * r * ((1 + r) ** (t*12))) / (((1 + r) ** (t*12)) - 1)).toLocaleString();