(() => {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const year = document.getElementById('year');
  const roleOutput = document.getElementById('roleOutput');
  const heroTitle = document.getElementById('hero-title');
  const heroHeadlineVisual = document.getElementById('heroHeadlineVisual');
  const heroHeadlineLead = document.getElementById('heroHeadlineLead');
  const heroHeadlineAccent = document.getElementById('heroHeadlineAccent');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const setTheme = (theme, persist = true) => {
    const nextTheme = theme === 'light' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    const isLight = nextTheme === 'light';
    themeToggle?.setAttribute('aria-pressed', String(isLight));
    themeToggle?.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isLight ? '#f7fafc' : '#08111c');
    if (persist) {
      try { localStorage.setItem('sai-portfolio-theme', nextTheme); } catch (_) {}
    }
  };

  setTheme(root.dataset.theme || 'dark', false);
  themeToggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

  const closeMenu = (returnFocus = false) => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation menu');
    body.classList.remove('menu-open');
    if (returnFocus) menuToggle?.focus();
  };

  const openMenu = () => {
    navLinks?.classList.add('open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    menuToggle?.setAttribute('aria-label', 'Close navigation menu');
    body.classList.add('menu-open');
    window.setTimeout(() => navLinks?.querySelector('a')?.focus(), 40);
  };

  menuToggle?.addEventListener('click', () => {
    menuToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });

  let framePending = false;
  const updateScrollUi = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.width = `${Math.min(100, Math.max(0, (scrollTop / max) * 100))}%`;
    header?.classList.toggle('scrolled', scrollTop > 20);
    framePending = false;
  };
  const requestScrollUi = () => {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateScrollUi);
    }
  };
  window.addEventListener('scroll', requestScrollUi, { passive: true });
  updateScrollUi();

  const revealElements = [...document.querySelectorAll('.reveal')];
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  }

  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = sectionLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      sectionLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${current.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-25% 0px -62% 0px', threshold: [0, 0.2, 0.6] });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  const roles = [
    'Business Intelligence Analyst',
    'Data Analyst',
    'Power BI Analyst',
    'BI Developer'
  ];
  const specialistPoints = [
    {
      lead: 'I build trusted BI systems that turn complex data into',
      accent: 'clear business decisions.'
    },
    {
      lead: 'I create executive dashboards that drive',
      accent: 'clearer, faster decisions.'
    },
    {
      lead: 'I automate reporting for',
      accent: 'faster, more reliable insight.'
    },
    {
      lead: 'I translate stakeholder questions into',
      accent: 'scalable data models and KPIs.'
    }
  ];
  let specialistIndex = 0;
  let specialistTimer;
  let specialistSwapTimer;
  let headlineResizeTimer;

  const renderSpecialistPoint = (point) => {
    if (!heroHeadlineLead || !heroHeadlineAccent) return;
    heroHeadlineLead.textContent = point.lead;
    heroHeadlineAccent.textContent = point.accent;
  };

  const lockSpecialistHeadlineHeight = () => {
    if (!heroTitle || !heroHeadlineVisual || !heroHeadlineLead || !heroHeadlineAccent) return;
    const width = heroHeadlineVisual.getBoundingClientRect().width;
    if (!width) return;
    const probe = document.createElement('span');
    const probeLead = document.createElement('span');
    const probeAccent = document.createElement('span');
    probe.className = 'hero-headline-visual';
    probeLead.className = 'hero-headline-lead';
    probeAccent.className = 'hero-headline-accent';
    probe.append(probeLead, probeAccent);
    probe.setAttribute('aria-hidden', 'true');
    Object.assign(probe.style, {
      position: 'absolute',
      visibility: 'hidden',
      pointerEvents: 'none',
      width: `${width}px`,
      transition: 'none',
      transform: 'none',
      filter: 'none'
    });
    heroTitle.append(probe);
    const tallest = specialistPoints.reduce((height, point) => {
      probeLead.textContent = point.lead;
      probeAccent.textContent = point.accent;
      return Math.max(height, probe.getBoundingClientRect().height);
    }, 0);
    probe.remove();
    heroTitle.style.minHeight = `${Math.ceil(tallest)}px`;
  };

  const rotateSpecialistPoint = () => {
    if (!heroHeadlineVisual || reduceMotion.matches || document.hidden) return;
    heroHeadlineVisual.classList.add('is-changing');
    specialistSwapTimer = window.setTimeout(() => {
      specialistIndex = (specialistIndex + 1) % specialistPoints.length;
      renderSpecialistPoint(specialistPoints[specialistIndex]);
      window.requestAnimationFrame(() => heroHeadlineVisual.classList.remove('is-changing'));
      specialistTimer = window.setTimeout(rotateSpecialistPoint, 3900);
    }, 290);
  };

  const resetSpecialistHeadline = () => {
    window.clearTimeout(specialistTimer);
    window.clearTimeout(specialistSwapTimer);
    specialistIndex = 0;
    renderSpecialistPoint(specialistPoints[0]);
    heroHeadlineVisual?.classList.remove('is-changing');
    if (!reduceMotion.matches && !document.hidden) {
      specialistTimer = window.setTimeout(rotateSpecialistPoint, 3500);
    }
  };
  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let erasing = true;
  let roleTimer;

  const animateRole = () => {
    if (!roleOutput || reduceMotion.matches || document.hidden) return;
    const role = roles[roleIndex];
    if (erasing) {
      characterIndex -= 1;
      roleOutput.textContent = role.slice(0, Math.max(0, characterIndex));
      if (characterIndex <= 0) {
        erasing = false;
        roleIndex = (roleIndex + 1) % roles.length;
        roleTimer = window.setTimeout(animateRole, 260);
      } else {
        roleTimer = window.setTimeout(animateRole, 38);
      }
      return;
    }
    const nextRole = roles[roleIndex];
    characterIndex += 1;
    roleOutput.textContent = nextRole.slice(0, characterIndex);
    if (characterIndex >= nextRole.length) {
      erasing = true;
      roleTimer = window.setTimeout(animateRole, 1550);
    } else {
      roleTimer = window.setTimeout(animateRole, 66);
    }
  };

  const resetRole = () => {
    window.clearTimeout(roleTimer);
    roleIndex = 0;
    characterIndex = roles[0].length;
    erasing = true;
    if (roleOutput) roleOutput.textContent = roles[0];
    if (!reduceMotion.matches && !document.hidden) roleTimer = window.setTimeout(animateRole, 1600);
  };
  resetRole();
  resetSpecialistHeadline();
  lockSpecialistHeadlineHeight();
  document.fonts?.ready.then(lockSpecialistHeadlineHeight);
  window.addEventListener('resize', () => {
    window.clearTimeout(headlineResizeTimer);
    headlineResizeTimer = window.setTimeout(lockSpecialistHeadlineHeight, 120);
  });
  reduceMotion.addEventListener?.('change', resetRole);
  reduceMotion.addEventListener?.('change', resetSpecialistHeadline);
  document.addEventListener('visibilitychange', resetRole);
  document.addEventListener('visibilitychange', resetSpecialistHeadline);

  if (year) year.textContent = String(new Date().getFullYear());
})();
