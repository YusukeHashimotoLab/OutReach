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
    // Create light theme SVG
    const lightSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lightSvg.setAttribute('class', 'theme-toggle__light');
    lightSvg.setAttribute('width', '24');
    lightSvg.setAttribute('height', '24');
    lightSvg.setAttribute('viewBox', '0 0 24 24');
    lightSvg.setAttribute('fill', 'none');
    lightSvg.setAttribute('stroke', 'currentColor');
    lightSvg.setAttribute('stroke-width', '2');
    
    // Create light SVG elements
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '12');
    circle.setAttribute('cy', '12');
    circle.setAttribute('r', '5');
    lightSvg.appendChild(circle);
    
    const lines = [
      {x1: '12', y1: '1', x2: '12', y2: '3'},
      {x1: '12', y1: '21', x2: '12', y2: '23'},
      {x1: '4.22', y1: '4.22', x2: '5.64', y2: '5.64'},
      {x1: '18.36', y1: '18.36', x2: '19.78', y2: '19.78'},
      {x1: '1', y1: '12', x2: '3', y2: '12'},
      {x1: '21', y1: '12', x2: '23', y2: '12'},
      {x1: '4.22', y1: '19.78', x2: '5.64', y2: '18.36'},
      {x1: '18.36', y1: '5.64', x2: '19.78', y2: '4.22'}
    ];
    
    lines.forEach(lineData => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', lineData.x1);
      line.setAttribute('y1', lineData.y1);
      line.setAttribute('x2', lineData.x2);
      line.setAttribute('y2', lineData.y2);
      lightSvg.appendChild(line);
    });
    
    // Create dark theme SVG
    const darkSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    darkSvg.setAttribute('class', 'theme-toggle__dark');
    darkSvg.setAttribute('width', '24');
    darkSvg.setAttribute('height', '24');
    darkSvg.setAttribute('viewBox', '0 0 24 24');
    darkSvg.setAttribute('fill', 'none');
    darkSvg.setAttribute('stroke', 'currentColor');
    darkSvg.setAttribute('stroke-width', '2');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
    darkSvg.appendChild(path);
    
    // Append SVGs to button
    button.appendChild(lightSvg);
    button.appendChild(darkSvg);

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