function displayHome() {
    const main = document.getElementById('main');
    // main.classList.remove('show');
    // 1. Reset class to allow animation re-triggering
    main.classList.remove('show');
    
    // Force a minor reflow so the browser registers the removal
    void main.offsetWidth;
    
    main.innerHTML =
        `<div id="home" class="home">
          <p class="title">Conversions</p>
        </div>`

    function show() {
        main.classList.add('show');
    }
    show();
};