// Site Configuration
const SITE_CONFIG = {
    // Base URL for the site - change this if deploying to a different domain
    baseUrl: 'https://yusukehashimotolab.github.io/OutReach',
    
    // Language configuration
    languages: {
        default: 'ja',
        available: ['ja', 'en']
    },
    
    // Development mode flag - set to true for local development
    development: false
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}