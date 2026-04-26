// Active nav highlighting
(function() {
  const path = window.location.pathname;
  const isHome = path === '/' || path === '/index.html';
  function matches(href) {
    if (!href) return false;
    if (isHome) return href === '/';
    if (href === '/') return false;
    return href === path || href === path + '/' || href === path.replace(/\/$/, '');
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    if (matches(link.getAttribute('href'))) link.classList.add('active');
  });
  document.querySelectorAll('.nav-dropdown-item').forEach(item => {
    if (matches(item.getAttribute('href'))) {
      item.classList.add('active');
      const parent = item.closest('.nav-dropdown');
      const trigger = parent && parent.querySelector('.nav-dropdown-trigger');
      if (trigger) trigger.classList.add('active');
    }
  });
})();

// Resources dropdown toggle
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.nav-dropdown');
  if (!dropdown) return;
  const trigger = dropdown.querySelector('.nav-dropdown-trigger');
  const menu = dropdown.querySelector('.nav-dropdown-menu');
  if (!trigger || !menu) return;

  function closeMenu() {
    menu.classList.add('hidden');
    dropdown.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    menu.classList.remove('hidden');
    dropdown.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) closeMenu(); else openMenu();
  });
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });
});

// Prompt filtering
let activeFilter = 'all';

function setFilter(btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.dataset.filter;
  filterPrompts();
}

function filterPrompts() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('#promptGrid .prompt-card');
  let visible = 0;
  cards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !query || card.dataset.title.includes(query) || card.dataset.category.includes(query) || card.textContent.toLowerCase().includes(query);
    if (matchesFilter && matchesSearch) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  document.getElementById('noResults').classList.toggle('hidden', visible > 0);
}

// Copy prompt buttons
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.prompt-expand pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.className = 'font-mono text-xs border-2 border-rust text-rust px-3 py-1 block ml-auto mb-2 hover:bg-rust hover:text-cream transition-colors';
    btn.onclick = function(e) {
      e.stopPropagation();
      navigator.clipboard.writeText(pre.textContent.trim()).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    };
    pre.parentNode.insertBefore(btn, pre);
  });
});

// Card expand/collapse
function toggleCard(card) {
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.prompt-card.open').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}

function scrollToArticle(id) {
  setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function filterGlossary() {
  const q = document.getElementById('glossarySearch').value.toLowerCase().trim();
  const terms = document.querySelectorAll('.glossary-term');
  const groups = document.querySelectorAll('.letter-group');
  let visible = 0;
  terms.forEach(t => {
    const match = !q || t.dataset.term.includes(q) || t.textContent.toLowerCase().includes(q);
    t.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  groups.forEach(g => {
    const anyVisible = [...g.querySelectorAll('.glossary-term')].some(t => t.style.display !== 'none');
    g.style.display = anyVisible ? '' : 'none';
  });
  document.getElementById('glossaryNoResults').classList.toggle('hidden', visible > 0);
  document.getElementById('letterNav').style.display = q ? 'none' : '';
}

function jumpToLetter(l) {
  setTimeout(() => {
    const group = document.querySelector(`.letter-group[data-letter="${l}"]`);
    if (group) group.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

// Changelog panel toggle (homepage)
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('changelog-toggle');
  const panel = document.getElementById('changelog-panel');
  if (!btn || !panel) return;
  btn.addEventListener('click', function() {
    const open = !panel.classList.contains('hidden');
    panel.classList.toggle('hidden', open);
    btn.querySelector('.expand-icon').textContent = open ? '+' : '−';
  });
});

function toggleFaq(card) {
  const answer = card.querySelector('.faq-answer');
  const icon = card.querySelector('.expand-icon');
  const isOpen = !answer.classList.contains('hidden');
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
  document.querySelectorAll('.faq-card .expand-icon').forEach(i => i.style.transform = '');
  if (!isOpen) {
    answer.classList.remove('hidden');
    icon.style.transform = 'rotate(45deg)';
  }
}

// Scroll progress bar (only runs on pages that include #scroll-progress)
(function() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = `scaleX(${pct})`;
    ticking = false;
  }
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
