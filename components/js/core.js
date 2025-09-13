/**
 * Core utilities and configuration
 */
'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
    LOADING_DURATION: 800,
    ANIMATION_DURATION: 200,
    IMAGE_ROTATION_INTERVAL: 4000,
    PERFORMANCE_MODE: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// ===== UTILITIES =====
const DOM = {
    query: (selector) => document.querySelector(selector),
    queryAll: (selector) => document.querySelectorAll(selector),
    createElement: (tag, className = '', content = '') => {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content) el.innerHTML = content;
        return el;
    }
};

const Utils = {
    detectLanguage: () => {
        const saved = localStorage.getItem('preferred-language');
        if (saved) return saved;
        const browserLang = navigator.language.slice(0, 2);
        return ['fr', 'en'].includes(browserLang) ? browserLang : 'fr';
    },
    
    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
};

