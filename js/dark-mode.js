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
    const links = document.querySelectorAll('.links > a');
    links.forEach((link, index) => {
        setTimeout(() => {
            link.classList.add('animate-in');
        }, index * 100);
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

// Animate links when they come into view
window.addEventListener('scroll', () => {
    const links = document.querySelectorAll('.links > a');
    links.forEach(link => {
        if (isInViewport(link) && !link.classList.contains('animate-in')) {
            link.classList.add('animate-in');
        }
    });
});

// Easter Egg Functionality
const easterEggButton = document.querySelector('.easter-egg-button');
let psychedelicMode = false;

easterEggButton.addEventListener('click', () => {
    psychedelicMode = !psychedelicMode;
    if (psychedelicMode) {
        body.classList.add('psychedelic-mode');
        startPsychedelicEffects();
    } else {
        body.classList.remove('psychedelic-mode');
        stopPsychedelicEffects();
    }
});

function startPsychedelicEffects() {
    // Add any additional psychedelic effects here
    document.querySelectorAll('.links > a').forEach(link => {
        link.style.transition = 'all 0.5s ease';
    });
}

function stopPsychedelicEffects() {
    // Remove any additional psychedelic effects here
    document.querySelectorAll('.links > a').forEach(link => {
        link.style.transition = '';
    });
}

// Easter Egg Key Combination
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiCodePosition = 0;

document.addEventListener('keydown', function(e) {
    if (e.key === konamiCode[konamiCodePosition]) {
        konamiCodePosition++;
        if (konamiCodePosition === konamiCode.length) {
            activatePsychedelicMode();
            konamiCodePosition = 0;
        }
    } else {
        konamiCodePosition = 0;
    }
});

function activatePsychedelicMode() {
    psychedelicMode = !psychedelicMode;
    if (psychedelicMode) {
        body.classList.add('psychedelic-mode');
        startPsychedelicEffects();
    } else {
        body.classList.remove('psychedelic-mode');
        stopPsychedelicEffects();
    }
}
