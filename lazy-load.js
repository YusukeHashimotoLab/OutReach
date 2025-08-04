// Lazy Loading Script for Images
(function() {
  'use strict';

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

  // Configure Intersection Observer
  const imageObserverOptions = {
    root: null,
    rootMargin: '50px 0px', // Start loading 50px before entering viewport
    threshold: 0.01
  };

  // Image loading function
  const loadImage = (img) => {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (!src) return;

    // Create temporary image to preload
    const tempImg = new Image();
    
    tempImg.onload = () => {
      // Add fade-in animation
      img.style.opacity = '0';
      img.src = src;
      
      if (srcset) {
        img.srcset = srcset;
      }
      
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
      
      // Trigger reflow and add transition
      img.offsetHeight;
      img.style.transition = 'opacity 0.3s ease-in-out';
      img.style.opacity = '1';
      
      // Add loaded class for CSS hooks
      img.classList.add('lazy-loaded');
    };

    tempImg.onerror = () => {
      // Handle error - could show placeholder
      img.classList.add('lazy-error');
    };

    // Start loading
    tempImg.src = src;
  };

  // Create observer
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        observer.unobserve(img);
      }
    });
  }, imageObserverOptions);

  // Observe all images with data-src
  const observeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      // Add loading class
      img.classList.add('lazy-loading');
      
      // Set dimensions to prevent layout shift
      if (!img.width && img.dataset.width) {
        img.width = img.dataset.width;
      }
      if (!img.height && img.dataset.height) {
        img.height = img.dataset.height;
      }
      
      imageObserver.observe(img);
    });
  };

  // Add CSS for lazy loading
  const addLazyLoadStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      img.lazy-loading {
        background: var(--color-background);
        background-image: linear-gradient(
          90deg,
          var(--color-border) 0px,
          var(--color-background) 40px,
          var(--color-border) 80px
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
      }

      @keyframes shimmer {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }

      img.lazy-loaded {
        animation: none;
        background: none;
      }

      img.lazy-error {
        background: var(--color-border);
        position: relative;
      }

      img.lazy-error::after {
        content: '⚠️';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        opacity: 0.5;
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addLazyLoadStyles();
      observeImages();
    });
  } else {
    addLazyLoadStyles();
    observeImages();
  }

  // Re-observe when new content is added dynamically
  window.lazyLoadImages = observeImages;

  // Handle print media
  window.addEventListener('beforeprint', () => {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => loadImage(img));
  });
})();