# OutReach Website Finalization Action Plan

## Phase 1: Critical Fixes (Complete First)

### Task 1: Fix Navigation Consistency
**Priority**: CRITICAL  
**Estimated Time**: 1 hour  
**Files to Update**:
- All JP pages: Add "News" link after "Home"
- All pages: Add `aria-current="page"` to active navigation items
- Standardize navigation order: Home → News → Research → Research DX → Publications → Talks → Contact

**Specific Changes**:
```html
<!-- Japanese Navigation Template -->
<nav role="navigation" aria-label="Main navigation">
  <a href="index.html">Home</a>
  <a href="news.html">News</a>
  <a href="research.html">Research</a>
  <a href="research-dx.html">Research DX</a>
  <a href="publications.html">Publications</a>
  <a href="talks.html">Talks</a>
  <a href="contact.html">Contact</a>
</nav>
```

### Task 2: Create Missing Images Directory
**Priority**: CRITICAL  
**Estimated Time**: 30 minutes  
**Actions**:
1. Create `/images/` directory at root level
2. Copy photos from `/nanomaterial/images/`:
   - hashimoto.png
   - iwase.png
   - tomai.jpg
3. Update all HTML files to use correct paths

### Task 3: Fix Image Path Issues
**Priority**: HIGH  
**Estimated Time**: 45 minutes  
**Files to Update**:
- `/nanomaterial/en/nanomaterial-members.html`
- `/nanomaterial/jp/nanomaterial-members.html`
- All pages referencing member photos

**Issues to Fix**:
- Incorrect alt text assignments (names don't match photos)
- Path references need updating to `/images/` or `../nanomaterial/images/`

## Phase 2: Content Alignment

### Task 4: Synchronize Page Content
**Priority**: HIGH  
**Estimated Time**: 2 hours  
**Actions**:
1. Compare EN and JP versions line by line
2. Add missing sections to ensure parity
3. Verify all translations are complete
4. Special attention to:
   - index.html (118 line difference)
   - news.html (69 line difference)

### Task 5: Review Research Pages
**Priority**: MEDIUM  
**Estimated Time**: 1 hour  
**Actions**:
1. Ensure research descriptions match between languages
2. Verify all research areas are represented
3. Check publication lists are synchronized

## Phase 3: Technical Improvements

### Task 6: CSS Consolidation
**Priority**: MEDIUM  
**Estimated Time**: 1.5 hours  
**Actions**:
1. Audit all CSS files for duplicates
2. Establish loading hierarchy:
   - variables.css (if exists)
   - components.css (if exists)
   - all-styles.css OR styles.css (not both)
   - page-specific styles
3. Remove redundant inline styles

### Task 7: Mobile Responsiveness Testing
**Priority**: HIGH  
**Estimated Time**: 1 hour  
**Test Scenarios**:
1. Navigation menu on small screens (< 480px)
2. Image scaling and layout
3. Text readability
4. Button/link touch targets (min 44x44px)
5. Form inputs on mobile

## Phase 4: Quality Assurance

### Task 8: Accessibility Audit
**Priority**: MEDIUM  
**Estimated Time**: 1 hour  
**Checklist**:
- [ ] All images have descriptive alt text
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Screen reader testing passes

### Task 9: SEO Verification
**Priority**: MEDIUM  
**Estimated Time**: 45 minutes  
**Checklist**:
- [ ] All pages have unique meta descriptions
- [ ] hreflang tags are correct
- [ ] Open Graph tags are complete
- [ ] Create and add favicon
- [ ] Verify sitemap.xml exists

### Task 10: Cross-browser Testing
**Priority**: HIGH  
**Estimated Time**: 1 hour  
**Test on**:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Phase 5: Final Polish

### Task 11: Performance Optimization
**Priority**: LOW  
**Estimated Time**: 1 hour  
**Actions**:
1. Compress images (target < 200KB each)
2. Minify CSS files
3. Minify JavaScript
4. Enable gzip compression

### Task 12: Documentation
**Priority**: LOW  
**Estimated Time**: 1 hour  
**Create**:
1. README for maintenance
2. Content update guide
3. Deployment checklist
4. Known issues log

## Deployment Checklist

### Pre-deployment
- [ ] All navigation links work
- [ ] No broken images
- [ ] Forms tested and working
- [ ] Language switcher functional
- [ ] Mobile responsive verified
- [ ] Accessibility checked
- [ ] SEO tags complete

### Deployment
- [ ] Backup current version
- [ ] Deploy to staging
- [ ] Test all functionality
- [ ] Deploy to production
- [ ] Verify live site
- [ ] Submit to search engines

### Post-deployment
- [ ] Monitor for 404 errors
- [ ] Check analytics setup
- [ ] Gather user feedback
- [ ] Plan iterative improvements

## Timeline Estimate
- Phase 1: 2.5 hours
- Phase 2: 3 hours
- Phase 3: 2.5 hours
- Phase 4: 3 hours
- Phase 5: 2 hours
- **Total: ~13 hours**

## Success Metrics
- Zero broken links or images
- All pages load in < 3 seconds
- Mobile usability score > 90
- Accessibility compliance achieved
- Consistent user experience across languages