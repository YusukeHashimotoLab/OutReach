// Dark Mode Toggle Script
(function() {
  'use strict';

  // Check for saved theme preference or system preference
  const getThemePreference = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initialize theme
  const initTheme = () => {
    const theme = getThemePreference();
    applyTheme(theme);
  };

  // Create theme toggle button
  const createThemeToggle = () => {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.innerHTML = `
      <svg class="theme-toggle__light" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      <svg class="theme-toggle__dark" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;

    // Toggle theme on click
    button.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    return button;
  };

  // Add CSS for theme toggle button
  const addThemeToggleStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      .theme-toggle {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--color-surface);
        border: 2px solid var(--color-border);
        color: var(--color-text-primary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-base);
        z-index: var(--z-index-fixed);
        box-shadow: var(--shadow-lg);
      }

      .theme-toggle:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-xl);
      }

      .theme-toggle svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .theme-toggle__light {
        display: none;
      }

      .theme-toggle__dark {
        display: block;
      }

      [data-theme="dark"] .theme-toggle__light {
        display: block;
      }

      [data-theme="dark"] .theme-toggle__dark {
        display: none;
      }

      @media (max-width: 768px) {
        .theme-toggle {
          bottom: 1rem;
          right: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      addThemeToggleStyles();
      document.body.appendChild(createThemeToggle());
    });
  } else {
    initTheme();
    addThemeToggleStyles();
    document.body.appendChild(createThemeToggle());
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();