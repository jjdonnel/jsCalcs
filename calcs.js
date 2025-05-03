function openMain() {
    let primary = document.getElementById('main');
    primary.classList.toggle('show');
};

function openConv() {
    let convSub = document.getElementById('convSub');
    convSub.classList.toggle('show');
};

function openFin() {
    let finSub = document.getElementById('finSub');
    finSub.classList.toggle('show');
};

function closeMenus() {
    let menus = document.getElementsByClassName('subMenu');
    let mainMenu = document.getElementById('primary');
    menus.classList.remove('show');
    mainMenu.classList.remove('show');
};

const menu = document.querySelectorAll('.menuInput'); // Select the main menu
const items = document.querySelectorAll('.items'); // Select all submenu items

items.forEach(item => {
  item.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Remove the 'open' class from the main menu
    // (Assuming 'open' class controls the menu's visibility)
  });
});

const menuBtn = document.getElementById('open');
const mainMenu = document.getElementById('mainMenu');

let dropdown = document.getElementById('nav');

dropdown.addEventListener('click', (e) => {
  if (mainMenu.display = 'none') {
    mainMenu.display = 'block';
  } else {
    mainMenu.display = 'none';  
  }
})
 
