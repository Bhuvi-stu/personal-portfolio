const navLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const hamburger = document.querySelector('.hamburger');

const updateActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveLink(entry.target.id);
      }
    });
  },
  { rootMargin: '-15% 0px -70% 0px' }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const closeSidebar = () => {
  sidebar?.classList.remove('open');
  overlay?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
};

const toggleSidebar = () => {
  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
};

hamburger?.addEventListener('click', toggleSidebar);
overlay?.addEventListener('click', closeSidebar);

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const target = targetId ? document.querySelector(targetId) : null;

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (window.innerWidth < 768) {
      closeSidebar();
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    closeSidebar();
  }
});
