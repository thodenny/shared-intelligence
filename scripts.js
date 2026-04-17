// Active nav highlighting
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
})();

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
