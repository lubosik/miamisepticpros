/**
 * Table of Contents - Builds TOC from headings and highlights active section
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    const toc = document.querySelector('[data-toc]');
    if (!toc) return;

    const article = document.querySelector('.article-main');
    if (!article) return;

    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    const headingMap = new Map();

    // Build map of headings to TOC links
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      const id = href.slice(1); // Remove #
      const heading = document.getElementById(id);
      
      if (heading) {
        headingMap.set(heading, link);
      }
    });

    if (headingMap.size === 0) return;

    // IntersectionObserver to detect active section
    const observer = new IntersectionObserver(
      function(entries) {
        entries.forEach(entry => {
          const link = headingMap.get(entry.target);
          if (!link) return;

          if (entry.isIntersecting) {
            // Remove aria-current from all links
            links.forEach(l => {
              l.removeAttribute('aria-current');
              l.classList.remove('active');
            });
            
            // Set active state
            link.setAttribute('aria-current', 'true');
            link.classList.add('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -70% 0px', // Trigger when heading is 70% from top
        threshold: 0.1
      }
    );

    // Observe all headings
    headingMap.forEach((_, heading) => {
      observer.observe(heading);
    });

    // Smooth scroll on TOC link click
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        e.preventDefault();
        const target = document.getElementById(href.slice(1));
        if (!target) return;

        const headerOffset = 100; // Offset for sticky header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update hash without jumping
        history.pushState(null, '', href);
      });
    });
  });
})();

