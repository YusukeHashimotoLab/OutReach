// Performance Optimizations for OutReach Website
(function() {
  'use strict';
  
  // Preload critical resources
  const preloadResources = [
    { href: 'all-styles.css', as: 'style' },
    { href: 'navigation.js', as: 'script' }
  ];
  
  preloadResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    document.head.appendChild(link);
  });
  
  // Optimize font loading
  if ('fonts' in document) {
    // Preload system fonts are already optimized
    document.fonts.ready.then(() => {
      document.body.classList.add('fonts-loaded');
    });
  }
  
  // Service Worker registration for caching (if available)
  if ('serviceWorker' in navigator && 'caches' in window) {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silent fail - service worker is optional
    });
  }
  
  // Critical CSS inlining detection
  const criticalCSS = document.querySelector('style[data-critical]');
  if (criticalCSS) {
    // Critical CSS is already inlined, defer non-critical CSS
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalCSS.forEach(link => {
      link.media = 'print';
      link.onload = function() { this.media = 'all'; };
    });
  }
  
})();