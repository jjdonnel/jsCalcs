function displayCloudBase() {
    const main = document.getElementById('main');
    main.classList.remove('show');
    main.innerHTML =
        ` <div id="cloudBase" class="section">
            <div>
                <label>Temperature</label>
                <input type="number" id="temp" placeholder="Temperature">
            </div>
            <div>
                <label>Dew Point</label>
                <input type="number" id="dew" placeholder="Dew Point">
            </div>
            <div>
                <label>Cloud Base</label>
                <input type="number" id="cloud" placeholder="Cloud Base">
            </div>
            
        </div>`

    function show() {
        main.classList.add('show');
    }
    show();

    const temp = document.getElementById("temp");
    const dew = document.getElementById("dew");
    const cloud = document.getElementById("cloud");

    temp.addEventListener("input", function () {
        let t = parseInt(temp.value);
        let d = parseInt(dew.value || 0);
        cloud.value = parseFloat((t - d) * 220);
    });

    dew.addEventListener("input", function () {
        let t = parseInt(temp.value || 0);
        let d = parseInt(dew.value);
        cloud.value = parseFloat((t - d) * 220);
    });
};