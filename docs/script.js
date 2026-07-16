document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const documentCards = document.querySelectorAll('.document-card');
    const emptyState = document.getElementById('emptyState');
    const documentsGrid = document.getElementById('documentsGrid');

    let currentFilter = 'all';
    let currentSearch = '';

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        filterDocuments();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            filterDocuments();
        });
    });

    function filterDocuments() {
        let visibleCount = 0;

        documentCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category');

            const matchesSearch = title.includes(currentSearch);
            const matchesFilter = currentFilter === 'all' || category === currentFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                visibleCount++;
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            documentsGrid.style.display = 'none';
            emptyState.style.display = 'block';
        } else {
            documentsGrid.style.display = 'grid';
            emptyState.style.display = 'none';
        }
    }

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        logo.style.cursor = 'pointer';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            currentSearch = '';
            searchInput.blur();
            filterDocuments();
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Inserisce il badge di livello (basso/medio/alto) accanto alla data, se presente.
    // Fallback inline: assegna anche il background e il bordo direttamente dal JS
    const rootStyles = getComputedStyle(document.documentElement);
    const colorMap = {
        'basso': rootStyles.getPropertyValue('--level-low').trim() || '#2ecc71',
        'medio': rootStyles.getPropertyValue('--level-mid').trim() || '#f1c40f',
        'alto': rootStyles.getPropertyValue('--level-high').trim() || '#e74c3c',
        'deprecato': rootStyles.getPropertyValue('--level-deprecated').trim() || '#7d7d7d',

        // sinonimi in inglese
        'low': rootStyles.getPropertyValue('--level-low').trim() || '#2ecc71',
        'medium': rootStyles.getPropertyValue('--level-mid').trim() || '#f1c40f',
        'high': rootStyles.getPropertyValue('--level-high').trim() || '#e74c3c',
        'deprecated': rootStyles.getPropertyValue('--level-deprecated').trim() || '#7d7d7d',
    };

    documentCards.forEach(card => {
        const rawLevel = card.getAttribute('data-level'); // non usare dataset per rispetto del case
        const level = rawLevel ? rawLevel.toLowerCase().trim() : null; // normalizza
        const meta = card.querySelector('.document-meta');
        const dateNode = meta ? meta.querySelector('.document-date') : null;

        if (level && meta) {
            const badge = document.createElement('span');
            badge.className = 'document-level-badge';
            badge.textContent = level.charAt(0).toUpperCase() + level.slice(1);

            const color = colorMap[level] || null;
            if (color) {
                badge.style.backgroundColor = color;
                // testo scuro su giallo, chiaro sugli altri
                badge.style.color = (level === 'medio' || level === 'medium') ? '#000' : '#fff';
                // bordo sinistro forzato sul card per garantire visibilità
                card.style.borderLeft = `4px solid ${color}`;
            }

            if (dateNode) meta.insertBefore(badge, dateNode);
            else meta.appendChild(badge);
        }
        observer.observe(card);
    });

    filterDocuments();
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
