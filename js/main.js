// main.js - controles de tema, animações, formulários e contadores

// THEME: toggle & persist
const themeToggleButtons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-2, #theme-toggle-3'));
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('doapet_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('doapet_theme', 'light');
  }
  // update button icon (simple)
  themeToggleButtons.forEach(btn => {
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? '🌞' : '🌙';
  });
}

const savedTheme = localStorage.getItem('doapet_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);

themeToggleButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
});

// Smooth on-scroll reveal for elements with data-animate
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in-view');
  });
},{ threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Hero image slight parallax on mouse move (subtle)
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (ev) => {
    const img = hero.querySelector('.hero-img');
    const rect = hero.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    if (img) img.style.transform = `translate(${x * 6}px, ${y * 4}px) scale(1.02)`;
  });
  hero.addEventListener('mouseleave', () => {
    const img = hero.querySelector('.hero-img');
    if (img) img.style.transform = 'scale(1.02)';
  });
}

// Simple counters (animate numbers)
function animateCount(id, to, duration = 1400) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const steps = Math.min(60, Math.ceil(duration / 20));
  const stepValue = to / steps;
  let cur = 0;
  const timer = setInterval(() => {
    cur += stepValue;
    el.textContent = Math.floor(cur);
    if (cur >= to) {
      el.textContent = to;
      clearInterval(timer);
    }
  }, duration / steps);
}
document.addEventListener('DOMContentLoaded', () => {
  animateCount('stat-resgates', 256, 1600);
  animateCount('stat-adocoes', 198, 1600);
  animateCount('stat-volunt', 42, 1600);

  // Form handling
  const volForm = document.getElementById('vol-form');
  if (volForm) {
    volForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = volForm.nome.value.trim();
      const email = volForm.email.value.trim();
      if (!name || !email) {
        alert('Por favor preencha nome e e-mail.');
        return;
      }
      alert(`Obrigado ${name}! Recebemos seu cadastro. Entraremos em contato.`);
      volForm.reset();
    });
  }

  // Donate button quick feedback
  const donateBtn = document.getElementById('donate-btn');
  if (donateBtn) donateBtn.addEventListener('click', donationModal);
});

// DONATION modal simple stub
function donationModal(){
  alert('Obrigado pelo interesse em doar! Entre em contato pelo e-mail: contato@doapet.org');
}
window.donationModal = donationModal;
