function displayHome() {
    const main = document.getElementById('main');
    // main.classList.remove('show');
    main.innerHTML =
        `<div id="home" class="home">
          <p class="title">Conversions, Etcetera...</p>
        </div>`

    function show() {
        main.classList.add('show');
    }
    show();
};