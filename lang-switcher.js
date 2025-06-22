// Language Switcher Functionality
(function() {
    'use strict';
    
    // Detect current language from URL
    function getCurrentLanguage() {
        const path = window.location.pathname;
        return path.includes('/en/') ? 'en' : 'ja';
    }
    
    // Get corresponding language URL
    function getLanguageUrl(targetLang) {
        const currentPath = window.location.pathname;
        const currentLang = getCurrentLanguage();
        
        if (currentLang === targetLang) {
            return currentPath;
        }
        
        // Extract the base path (handles both local and GitHub Pages)
        const pathMatch = currentPath.match(/^(.*\/OutReach\/)(?:en\/)?(.*)$/);
        if (!pathMatch) {
            console.error('Unable to parse path:', currentPath);
            return currentPath;
        }
        
        const basePath = pathMatch[1];
        const fileName = pathMatch[2] || 'index.html';
        
        if (targetLang === 'en') {
            // Convert Japanese URL to English
            return `${basePath}en/${fileName}`;
        } else {
            // Convert English URL to Japanese
            return `${basePath}${fileName}`;
        }
    }
    
    // Create language switcher HTML
    function createLanguageSwitcher() {
        const currentLang = getCurrentLanguage();
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn ${currentLang === 'ja' ? 'active' : ''}" data-lang="ja">JP</button>
            <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        `;
        
        // Add click handlers
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetLang = this.getAttribute('data-lang');
                const targetUrl = getLanguageUrl(targetLang);
                
                // Save preference to localStorage
                localStorage.setItem('preferredLanguage', targetLang);
                
                // Navigate to the corresponding language version
                window.location.href = targetUrl;
            });
        });
        
        return switcher;
    }
    
    // Insert language switcher into the page
    function insertLanguageSwitcher() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', insertLanguageSwitcher);
            return;
        }
        
        // Find the header or navigation element
        const header = document.querySelector('header .header-content') || 
                       document.querySelector('header');
        
        if (header) {
            const switcher = createLanguageSwitcher();
            header.appendChild(switcher);
        }
    }
    
    // Check for language preference on page load
    function checkLanguagePreference() {
        const preferredLang = localStorage.getItem('preferredLanguage');
        const currentLang = getCurrentLanguage();
        
        // If user prefers a different language and hasn't manually navigated
        if (preferredLang && preferredLang !== currentLang && !sessionStorage.getItem('manualNavigation')) {
            const targetUrl = getLanguageUrl(preferredLang);
            window.location.href = targetUrl;
        }
        
        // Clear manual navigation flag
        sessionStorage.removeItem('manualNavigation');
    }
    
    // Initialize
    insertLanguageSwitcher();
    // checkLanguagePreference(); // Commented out to avoid automatic redirects for now
    
})();