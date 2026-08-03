function openMain() {
    let primary = document.getElementById('main');
    if (primary) primary.classList.toggle('show');
}

function open() {
    let top = document.getElementById('top');
    if (top) {
        top.checked = !top.checked;
    }
}

function openConv() {
    let convSub = document.getElementById('convSub');
    if (convSub) convSub.classList.toggle('show');
}

function openFin() {
    let finSub = document.getElementById('finSub');
    if (finSub) finSub.classList.toggle('show');
}

function closeMenus() {
    // Loop safely over all submenus
    let menus = document.querySelectorAll('.subMenu');
    menus.forEach(menu => menu.classList.remove('show'));
    
    let mainMenu = document.getElementById('primary');
    if (mainMenu) mainMenu.classList.remove('show');
}

// Automatically close mobile menu checkboxes when an item is selected
const items = document.querySelectorAll('.items');
items.forEach(item => {
    item.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
});

// Dropdown listener with safety checks
const dropdown = document.getElementById('nav');
const mainMenu = document.getElementById('mainMenu');

if (dropdown && mainMenu) {
    dropdown.addEventListener('click', () => {
        if (mainMenu.style.display === 'none' || mainMenu.style.display === '') {
            mainMenu.style.display = 'block';
        } else {
            mainMenu.style.display = 'none';  
        }
    });
}

// Prevent mobile keyboard from scrolling the container up
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        // Keeps the page pinned at the absolute top when keyboard triggers
        window.scrollTo(0, 0); 
    });
}

/**
 * Toggles the visibility of the formula bubble within a component.
 * @param {HTMLElement} button - The help button element that was clicked.
 */
function toggleFormula(button) {
    // 1. Find the parent component card
    const card = button.closest('.section');
    if (!card) return;
    
    // 2. Find the formula bubble inside this card
    const bubble = card.querySelector('.formula-bubble');
    if (!bubble) return;

    // 3. Close any other open formula bubbles across the app
    document.querySelectorAll('.formula-bubble.show').forEach(openBubble => {
        if (openBubble !== bubble) {
            openBubble.classList.remove('show');
        }
    });

    // 4. Toggle visibility on the clicked bubble
    bubble.classList.toggle('show');
}