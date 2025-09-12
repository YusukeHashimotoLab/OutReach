// Enhanced Navigation Component
(function() {
  'use strict';

  // Navigation configuration
  const navConfig = {
    jp: {
      items: [
        { href: 'index.html', text: 'ホーム' },
        { href: 'news.html', text: 'ニュース' },
        { href: 'research.html', text: '研究' },
        { href: 'research-dx.html', text: '研究DX' },
        { href: 'publications.html', text: '論文' },
        { href: 'talks.html', text: '発表' },
        { href: 'links.html', text: 'リンク' },
        { href: 'contact.html', text: '連絡先' }
      ],
      langSwitch: { href: '../en/', text: 'EN' }
    },
    en: {
      items: [
        { href: 'index.html', text: 'Home' },
        { href: 'news.html', text: 'News' },
        { href: 'research.html', text: 'Research' },
        { href: 'research-dx.html', text: 'Research DX' },
        { href: 'publications.html', text: 'Publications' },
        { href: 'talks.html', text: 'Talks' },
        { href: 'contact.html', text: 'Contact' }
      ],
      langSwitch: { href: '../jp/', text: 'JP' }
    },
    nanomaterial_jp: {
      langSwitch: { href: '../../nanomaterial/en/', text: 'EN' }
    },
    nanomaterial_en: {
      langSwitch: { href: '../../nanomaterial/jp/', text: 'JP' }
    }
  };

  // Detect current language
  const getCurrentLang = () => {
    const path = window.location.pathname;
    if (path.includes('/nanomaterial/en/')) return 'nanomaterial_en';
    if (path.includes('/nanomaterial/jp/')) return 'nanomaterial_jp';
    return path.includes('/en/') ? 'en' : 'jp';
  };

  // Get current page
  const getCurrentPage = () => {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return filename;
  };

  // Create mobile menu button
  const createMobileMenuButton = () => {
    const button = document.createElement('button');
    button.className = 'nav-toggle';
    button.setAttribute('aria-label', 'Toggle navigation menu');
    button.setAttribute('aria-expanded', 'false');
    // Create hamburger menu bars using createElement for security
    for (let i = 0; i < 3; i++) {
      const bar = document.createElement('span');
      bar.className = 'nav-toggle__bar';
      button.appendChild(bar);
    }
    return button;
  };

  // Enhance existing navigation
  const enhanceNavigation = () => {
    const header = document.querySelector('header');
    let nav = document.querySelector('nav[role="navigation"]') || document.querySelector('nav');
    
    // For nanomaterial pages, check for special nav structure
    if (!nav && window.location.pathname.includes('/nanomaterial/')) {
      nav = document.querySelector('.endowed-nav ul');
    }
    
    if (!header && !nav) {
      console.warn('Navigation enhancement: Header and nav not found');
      return;
    }
    
    // Utility: robust mobile link handlers (incl. iOS Safari)
    const attachMobileLinkHandlers = (navEl) => {
      if (!navEl) return;
      navEl.querySelectorAll('a').forEach(link => {
        // Close slide-out menu on click if present
        link.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
          document.body.classList.remove('nav-open-scroll-lock');
          const navWithRole = document.querySelector('nav[role="navigation"]');
          if (navWithRole) navWithRole.classList.remove('nav--open');
        });

        // iOS Safari sometimes drops click inside transformed/fixed panels.
        // Ensure navigation on touchend (tap) without interfering with scrolling.
        let startX = 0, startY = 0, moved = false, touchStartTime = 0;
        link.addEventListener('touchstart', (e) => {
          const t = e.touches && e.touches[0];
          startX = t ? t.clientX : 0;
          startY = t ? t.clientY : 0;
          moved = false;
          touchStartTime = Date.now();
        }, { passive: true });
        link.addEventListener('touchmove', (e) => {
          const t = e.touches && e.touches[0];
          if (!t) return;
          const deltaX = Math.abs(t.clientX - startX);
          const deltaY = Math.abs(t.clientY - startY);
          const touchDuration = Date.now() - touchStartTime;
          // Increased threshold to 20px and add time limit for better touch detection
          if (touchDuration > 500 || deltaX > 20 || deltaY > 20) {
            moved = true;
          }
        }, { passive: true });
        link.addEventListener('touchend', (e) => {
          // Only treat as a tap if the finger didn't move significantly
          if (moved) return;
          // Guard: ignore modified taps
          if (e.defaultPrevented) return;
          
          // Close any open menu immediately on tap
          const navWithRole = document.querySelector('nav[role="navigation"]');
          if (navWithRole && navWithRole.classList.contains('nav--open')) {
            document.body.classList.remove('nav-open');
            document.body.classList.remove('nav-open-scroll-lock');
            navWithRole.classList.remove('nav--open');
            // Let the default link behavior work after closing menu
            // Don't prevent default - allow normal navigation
          }

          // iOS Safari fallback: explicitly navigate after closing menus
          const href = link.getAttribute('href');
          const target = link.getAttribute('target');
          if (href && href !== '#' && !href.startsWith('javascript:')) {
            setTimeout(() => {
              if (target === '_blank') {
                window.open(href, '_blank');
              } else {
                window.location.assign(href);
              }
            }, 0);
          }
        }, { passive: true });
      });
    };

    // If we only have nav (nanomaterial pages), add language switcher and mobile toggle
    if (!header && nav) {
      // Enable layout grid on nanomaterial pages for vertical sidebar
      document.body.classList.add('endowed-layout');
      const lang = getCurrentLang();
      const langConfig = navConfig[lang];
      if (langConfig && langConfig.langSwitch && !nav.querySelector('.nav-lang-switch')) {
        const langSwitch = document.createElement('li');
        // Create language switch link using createElement for security
        const langLink = document.createElement('a');
        langLink.href = langConfig.langSwitch.href + getCurrentPage();
        langLink.className = 'nav-lang-switch';
        langLink.textContent = langConfig.langSwitch.text;
        langSwitch.appendChild(langLink);
        nav.appendChild(langSwitch);
      }

      // Add a mobile menu toggle button for endowed-nav sidebar/header pattern
      const endowedContainer = document.querySelector('.endowed-nav');
      if (endowedContainer && !endowedContainer.querySelector('.nav-toggle')) {
        const toggle = createMobileMenuButton();
        // Accessibility wiring
        let listId = nav.getAttribute('id');
        if (!listId) {
          listId = 'endowed-nav-list';
          nav.setAttribute('id', listId);
        }
        toggle.setAttribute('aria-controls', listId);
        // Insert toggle into container
        endowedContainer.appendChild(toggle);

        toggle.addEventListener('click', () => {
          const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', String(!isExpanded));
          nav.classList.toggle('nav--open');
          // Prevent background scroll only if panel overlays content (mobile)
          if (window.innerWidth <= 968) {
            // Use scroll-lock class without overlay to avoid blocking taps
            document.body.classList.toggle('nav-open-scroll-lock', !isExpanded);
          }
        });
      }
      // Ensure links respond to taps on iOS as expected
      attachMobileLinkHandlers(nav);
      // Close the dropdown when a link is tapped (mobile)
      nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        const toggle = document.querySelector('.endowed-nav .nav-toggle');
        if (!toggle) return;
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav--open');
        document.body.classList.remove('nav-open');
        document.body.classList.remove('nav-open-scroll-lock');
      }));
      return;
    }
    
    // Ensure nav has role attribute for consistency
    if (nav && !nav.hasAttribute('role')) {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Main navigation');
    }

    // Add mobile menu button
    const mobileMenuBtn = createMobileMenuButton();
    const headerContent = header.querySelector('.header-content') || header;
    if (headerContent && !headerContent.querySelector('.nav-toggle')) {
      headerContent.insertBefore(mobileMenuBtn, nav);
    }

    // Add language switcher to nav
    const lang = getCurrentLang();
    const langConfig = navConfig[lang];
    
    // Check if language switcher already exists
    if (!nav.querySelector('.nav-lang-switch')) {
      const langSwitch = document.createElement('a');
      langSwitch.href = langConfig.langSwitch.href + getCurrentPage();
      langSwitch.className = 'nav-lang-switch';
      langSwitch.textContent = langConfig.langSwitch.text;
      langSwitch.setAttribute('aria-label', `Switch to ${langConfig.langSwitch.text === 'EN' ? 'English' : 'Japanese'}`);
      nav.appendChild(langSwitch);
    }

    // Localize existing nav item texts on JP pages based on href mapping
    if (lang === 'jp' && nav && langConfig && Array.isArray(langConfig.items)) {
      const map = new Map(langConfig.items.map(item => [item.href, item.text]));
      nav.querySelectorAll('a').forEach(a => {
        if (a.classList.contains('nav-lang-switch')) return;
        const href = a.getAttribute('href') || '';
        if (map.has(href)) {
          a.textContent = map.get(href);
        }
      });
    }

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('nav--open');
      document.body.classList.toggle('nav-open');
    });

    // Close menu when clicking on a navigation link
    const closeMenu = () => {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      nav.classList.remove('nav--open');
      document.body.classList.remove('nav-open');
    };

    // Add robust mobile handlers to all navigation links
    attachMobileLinkHandlers(nav);

    // Responsive menu state management
    const checkResponsiveState = () => {
      const isDesktop = window.innerWidth > 968;
      const menuIsOpen = nav.classList.contains('nav--open');
      
      if (isDesktop && menuIsOpen) {
        // Auto-close menu when transitioning to desktop
        closeMenu();
      }
    };

    // Listen for resize events to handle responsive state changes
    window.addEventListener('resize', checkResponsiveState);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && nav.classList.contains('nav--open')) {
        closeMenu();
      }
    });

    // Sticky header functionality with iOS-safe fallback
    const isIOS = /iP(hone|ad|od)/.test(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    let lastScroll = 0;
    const scrollThreshold = 100;

    if (isIOS) {
      // On iOS, avoid fixed+transform glitches; use CSS sticky instead
      header.classList.add('header--ios-sticky');
    } else {
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove sticky class
        if (currentScroll > scrollThreshold) {
          header.classList.add('header--sticky');
          
          // Hide/show based on scroll direction
          if (currentScroll > lastScroll && currentScroll > header.offsetHeight) {
            header.classList.add('header--hidden');
          } else {
            header.classList.remove('header--hidden');
          }
        } else {
          header.classList.remove('header--sticky', 'header--hidden');
        }
        
        lastScroll = currentScroll;
      });
    }

    // Add scroll progress indicator
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    header.appendChild(progress);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progress.style.width = scrolled + '%';
    });
  };

  // Add navigation CSS
  const addNavigationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Mobile menu button */
      .nav-toggle {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 24px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 12px; /* Expanded touch area */
        z-index: 1001; /* Higher z-index for reliable touch */
        margin-left: auto;
        min-width: 44px; /* iOS accessibility requirement */
        min-height: 44px;
      }

      .nav-toggle__bar {
        display: block;
        width: 100%;
        height: 3px;
        background: var(--color-text-inverse);
        transition: all var(--transition-base);
        border-radius: 2px;
      }

      .nav-toggle[aria-expanded="true"] .nav-toggle__bar:nth-child(1) {
        transform: translateY(10.5px) rotate(45deg);
      }

      .nav-toggle[aria-expanded="true"] .nav-toggle__bar:nth-child(2) {
        opacity: 0;
      }

      .nav-toggle[aria-expanded="true"] .nav-toggle__bar:nth-child(3) {
        transform: translateY(-10.5px) rotate(-45deg);
      }

      /* Language switcher */
      .nav-lang-switch {
        margin-left: auto;
        padding: 0.5rem 1rem;
        border: 2px solid currentColor;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        background: transparent;
        display: inline-block;
        text-decoration: none;
        color: inherit;
        flex-shrink: 0;
      }

      .nav-lang-switch:hover {
        background: currentColor;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      /* Sticky header */
      header {
        transition: transform var(--transition-base), box-shadow var(--transition-base);
      }

      .header--sticky {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: var(--z-index-sticky);
        box-shadow: var(--shadow-md);
        padding-top: env(safe-area-inset-top);
      }

      .header--hidden {
        transform: translateY(-100%);
      }

      /* Compensate for fixed header */
      .header--sticky ~ main {
        padding-top: 80px;
      }

      /* Scroll progress */
      .scroll-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--color-accent-research);
        width: 0%;
        transition: width 0.1s ease-out;
      }

      /* Mobile styles */
      @media (max-width: 968px) {
        /* Endowed (nanomaterial) pages: collapse list under a toggle */
        .endowed-nav {
          display: block !important;
          position: relative;
          padding: 8px 8px 0 8px;
        }

        .endowed-nav .nav-toggle {
          display: flex;
          position: absolute;
          right: 8px;
          top: 8px;
        }

        .endowed-nav ul {
          display: none;
          flex-direction: column;
          width: 100%;
          margin: 48px 0 8px 0; /* leave space for toggle */
          position: relative;
          z-index: 1002; /* Above body overlay if present */
          -webkit-overflow-scrolling: touch;
        }

        .endowed-nav ul.nav--open {
          display: flex;
        }

        .endowed-nav a {
          display: block;
          padding: 14px 16px;
          min-height: 44px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .nav-toggle {
          display: flex;
          position: relative;
        }

        nav[role="navigation"] {
          position: fixed;
          top: 0;
          right: -100%;
          width: 80%;
          max-width: 400px;
          /* Use dynamic viewport height to avoid iOS 100vh issues */
          height: 100vh;
          height: 100svh;
          background: var(--color-surface);
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          transition: right var(--transition-base), transform var(--transition-base), opacity var(--transition-base);
          display: flex !important;
          flex-direction: column;
          padding: calc(80px + env(safe-area-inset-top)) 2rem 2rem;
          overflow-y: auto;
          z-index: 1001; /* Above overlay (999) */
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain; /* Prevent background rubber-banding */
        }

        nav[role="navigation"].nav--open {
          right: 0;
        }

        nav[role="navigation"] a {
          display: block;
          padding: 16px 20px; /* Increased padding for better touch */
          font-size: 1.1rem;
          line-height: 1.5;
          border-bottom: 1px solid var(--color-border);
          color: var(--color-text-primary);
          background: transparent;
          pointer-events: auto;
          cursor: pointer;
          min-height: 48px; /* Increased from 44px for better accessibility */
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          text-decoration: none;
          transition: background-color 0.2s ease;
          -webkit-user-select: none;
          user-select: none;
        }

        nav[role="navigation"] a:hover,
        nav[role="navigation"] a:active {
          background: var(--color-border);
        }

        nav[role="navigation"] a:last-child {
          border-bottom: none;
        }

        .nav-lang-switch {
          margin-top: 2rem;
          text-align: center;
          align-self: center;
          width: 80px;
          padding: 0.8rem 1.2rem;
          background: var(--color-primary, #1a252f);
          color: var(--color-white, #fff);
          border-color: var(--color-primary, #1a252f);
        }
        
        .nav-lang-switch:hover {
          background: var(--color-primary-light, #2c3e50);
          border-color: var(--color-primary-light, #2c3e50);
        }

        /* Overlay */
        body.nav-open::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999; /* Below nav but above content */
          transition: opacity var(--transition-base);
          opacity: 1;
          pointer-events: auto;
          cursor: pointer;
        }

        /* Lock background scroll when nav is open */
        body.nav-open {
          overflow: hidden;
          touch-action: none;
        }

        /* Scroll lock without overlay (used by endowed-nav) */
        body.nav-open-scroll-lock {
          overflow: hidden;
        }

        /* Smooth collapsing when menu closes */
        body:not(.nav-open) nav[role="navigation"] {
          transition: right var(--transition-base), opacity var(--transition-base);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      }

      /* iOS sticky header fallback */
      header.header--ios-sticky {
        position: sticky;
        top: 0;
        z-index: var(--z-index-sticky);
        padding-top: env(safe-area-inset-top);
      }

      /* Ensure nav is visible on desktop */
      @media (min-width: 969px) {
        /* Nanomaterial pages: vertical sidebar layout */
        body.endowed-layout {
          --endowed-sidebar-width: 280px;
          display: grid;
          grid-template-columns: var(--endowed-sidebar-width) 1fr;
          grid-template-rows: auto 1fr;
          grid-template-areas:
            'header header'
            'sidebar content';
          column-gap: 32px;
          align-items: start;
        }

        body.endowed-layout .endowed-header { grid-area: header; }
        body.endowed-layout .endowed-nav {
          grid-area: sidebar;
          align-self: start;
          position: sticky;
          top: 24px;
          max-height: calc(100svh - 24px);
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        body.endowed-layout .endowed-nav ul {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 0;
        }
        body.endowed-layout .endowed-nav a {
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        body.endowed-layout .main-content { grid-area: content; }

        nav[role="navigation"] {
          display: flex !important;
          gap: 1.5rem;
          align-items: center;
        }
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addNavigationStyles();
      enhanceNavigation();
    });
  } else {
    addNavigationStyles();
    enhanceNavigation();
  }
})();
