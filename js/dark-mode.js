var body = document.body;
var root = document.getElementsByTagName('html')[0];
body.classList.remove('no-js');
window.addEventListener('load', function load() {
    window.removeEventListener('load', load, false);
    root.classList.remove('preload');
}, false);

const STORAGE_KEY = 'user-color-scheme';
const COLOR_MODE_KEY = '--color-mode';

const modeToggleButton = document.querySelector('.js-mode-toggle');
const modeToggleText = document.querySelector('.js-mode-toggle-text');

const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);
    if (response.length) {
        response = response.replace(/\'|"/g, '').trim();
    }
    return response;
};

const applySetting = passedSetting => {
    let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);
    
    if(currentSetting) {
        document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
        setButtonLabel(currentSetting);
    }
    else {
        setButtonLabel(getCSSCustomProp(COLOR_MODE_KEY));
    }
}

const toggleSetting = () => {
    let currentSetting = localStorage.getItem(STORAGE_KEY);
    
    switch(currentSetting) {
        case null:
            currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
            break;
        case 'light':
            currentSetting = 'dark';
            break;
        case 'dark':
            currentSetting = 'light';
            break;
    }
    localStorage.setItem(STORAGE_KEY, currentSetting);
    
    return currentSetting;
}

const setButtonLabel = currentSetting => { 
    modeToggleText.innerText = `Switch to ${currentSetting === 'dark' ? 'light' : 'dark'} theme`;
}

modeToggleButton.addEventListener('click', evt => {
    evt.preventDefault();
    applySetting(toggleSetting());
});

applySetting();

// Animations
document.addEventListener('DOMContentLoaded', (event) => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
    });
});

// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate cards when they come into view
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('in-view');
        }
    });
});
