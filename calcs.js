// Cloud Base from temperature and dew point

const temp = document.getElementById("temp");
const dew = document.getElementById("dew");
const cloud = document.getElementById("cloud");

temp.addEventListener("input", function () {
    let t = parseInt(temp.value);
    let d = parseInt(dew.value || 0);
    cloud.value = parseFloat((t-d) * 220);
});

dew.addEventListener("input", function () {
    let t = parseInt(temp.value || 0);
    let d = parseInt(dew.value);
    cloud.value = parseFloat((t-d) * 220);
});

// Future Value

const prin = document.getElementById("prin");
const rate = document.getElementById("rate");
const time = document.getElementById("time");
const cont = document.getElementById("cont");
const resu = document.getElementById("resu");

prin.addEventListener("input", function () {
    let p = parseInt(prin.value);
    let r = parseInt(rate.value || 0)/100;
    let t = parseInt(time.value || 0);
    let c = parseInt(cont.value || 0);
    resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

});

rate.addEventListener("input", function () {
    let p = parseInt(prin.value || 0);
    let r = parseInt(rate.value)/100;
    let t = parseInt(time.value || 0 );
    let c = parseInt(cont.value || 0 );
    resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

});

time.addEventListener("input", function () {
    let p = parseInt(prin.value || 0);
    let r = parseInt(rate.value || 0 ) /100;
    let t = parseInt(time.value);
    let c = parseInt(cont.value || 0 );
    resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

});

cont.addEventListener("input", function () {
    let p = parseInt(prin.value || 0 );
    let r = parseInt(rate.value || 0 )/100;
    let t = parseInt(time.value || 0 );
    let c = parseInt(cont.value);
    resu.value = parseInt((p * Math.pow(1 + r, t)) + (c * ((Math.pow(1 + r, t) - 1) / r)));

});

// Compound Interest

// const cprin = document.getElementById("cprin");
// const crate = document.getElementById("crate");
// const ctime = document.getElementById("ctime");
// const cresu = document.getElementById("cresu");

// cprin.addEventListener("input", function () {
//     let p = parseInt(cprin.value);
//     let r = parseInt(crate.value || 0)/100;
//     let t = parseInt(ctime.value || 0);
//     cresu.value = parseInt(p * Math.pow(1 + r, t));

// });

// crate.addEventListener("input", function () {
//     let p = parseInt(cprin.value || 0);
//     let r = parseInt(crate.value)/100;
//     let t = parseInt(ctime.value || 0 );
//     cresu.value = parseInt(p * Math.pow(1 + r, t));

// });

// ctime.addEventListener("input", function () {
//     let p = parseInt(cprin.value || 0);
//     let r = parseInt(crate.value || 0 ) /100;
//     let t = parseInt(ctime.value);
//     cresu.value = parseInt(p * Math.pow(1 + r, t));

// });

// Temperature conversion

// let celsius = document.getElementById('celsius');
// let fahrenheit = document.getElementById('fahrenheit');
// let kelvin = document.getElementById('kelvin');

// celsius.addEventListener("input", function () {
//     let f = (parseFloat(celsius.value) * 9) / 5 + 32;
//     fahrenheit.value = parseFloat(f.toFixed(1));

//     let k = (parseFloat(celsius.value) + 273.15);
//     kelvin.value = parseFloat(k.toFixed(2));
// });


// fahrenheit.addEventListener("input", function () {
//     let c = ((parseFloat(
//         fahrenheit.value) - 32) * 5) / 9;
//     celsius.value = parseFloat(c.toFixed(1));
//     let k = (parseFloat(
//         fahrenheit.value) - 32) * 5 / 9 + 273.15;
//     kelvin.value = parseFloat(k.toFixed(2));
// });

// kelvin.addEventListener("input", function () {
//     let f = (parseFloat(
//         kelvin.value) - 273.15) * 9 / 5 + 32;
//     fahrenheit.value = parseFloat(f.toFixed(1));

//     let c = (parseFloat(kelvin.value) - 273.15);
//     celsius.value = parseFloat(c.toFixed(1));
// });

// Pressure conversion

// let mb = document.getElementById('mb');
// let hg = document.getElementById('hg');
// let psi = document.getElementById('psi');

// mb.addEventListener("input", function () {
//     let h = parseFloat(mb.value) * 0.03;
//     hg.value = parseFloat(h.toFixed(2));

//     let p = parseFloat(mb.value) * 0.0145;
//     psi.value = parseFloat(p.toFixed(2));
// });

// hg.addEventListener("input", function () {
//     let m = parseFloat(hg.value) * 33.86;
//     mb.value = parseFloat(m.toFixed(2));

//     let p = parseFloat(hg.value) * 0.49;
//     psi.value = parseFloat(p.toFixed(2));
// });

// psi.addEventListener("input", function () {
//     let m = parseFloat(psi.value) * 68.95;
//     mb.value = parseFloat(m.toFixed(2));

//     let h = parseFloat(psi.value) * 2.04;
//     hg.value = parseFloat(h.toFixed(2));
// });


