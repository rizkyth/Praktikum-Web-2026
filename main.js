// State
let projects = [
    { id: 1, title: 'Dashboard Analitik Penjualan UMKM', category: 'Web App', budget: 5000000, completed: true },
    { id: 2, title: 'Aplikasi Reservasi Lapangan Futsal', category: 'Mobile App', budget: 7500000, completed: false }
];

// DOM elements
const projectList = document.getElementById('project-list');
const totalProjectsEl = document.getElementById('total-projects');
const totalBudgetEl = document.getElementById('total-budget');
const completedProjectsEl = document.getElementById('completed-projects');

// Format IDR
const formatCurrency = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

// Update Stats
const updateStats = (data) => {
    totalProjectsEl.innerText = data.length;
    totalBudgetEl.innerText = formatCurrency(data.reduce((sum, p) => sum + p.budget, 0));
    completedProjectsEl.innerText = data.filter(p => p.completed).length;
};

// Render Projects - uses <article> matching style.css "section article" selector
const renderProjects = (data) => {
    if (data.length === 0) {
        projectList.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:20px;color:var(--muted);">Tidak ada proyek pada kategori ini.</p>';
        return;
    }

    projectList.innerHTML = data.map(proj => `
        <article>
            <header>
                <h3>${proj.title}</h3>
                <p><time datetime="">${proj.category}</time> | Status: <span class="${proj.completed ? 'badge-success' : 'badge-warning'}" style="text-transform:capitalize;">${proj.completed ? 'selesai' : 'dalam pengerjaan'}</span></p>
            </header>
            <p>Estimasi Anggaran: <strong>${formatCurrency(proj.budget)}</strong></p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:1rem;">
                <button class="btn-toggle" data-id="${proj.id}" style="padding:4px 10px;border:1px solid var(--border);background:#fff;border-radius:4px;font-size:11px;cursor:pointer;font-weight:600;">
                    ${proj.completed ? 'Batal Selesai' : 'Tandai Selesai'}
                </button>
                <button class="btn-delete" data-id="${proj.id}" style="padding:4px 10px;border:1px solid var(--danger);background:#fff;color:var(--danger);border-radius:4px;font-size:11px;cursor:pointer;font-weight:600;">
                    Hapus
                </button>
            </div>
        </article>
    `).join('');
};

// Helper: Apply filters and render
const applyFiltersAndRender = () => {
    const activeBtn = document.querySelector('.filter-group .btn-filter.active') ?? document.querySelector('.profil-links .btn-filter.active') ?? document.querySelector('.btn-filter.active');
    const category = activeBtn?.dataset.category ?? 'Semua';
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filtered = projects;
    if (category !== 'Semua') filtered = filtered.filter(p => p.category === category);
    if (searchTerm) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm));

    renderProjects(filtered);
    updateStats(projects);
};

// Form Handler
const handleFormSubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const budget = Number(document.getElementById('budget').value);
    const completed = document.getElementById('completed').checked;

    if (!title || budget <= 0) return;

    const newProject = { id: Date.now(), title, category, budget, completed };
    projects.push(newProject);
    document.getElementById('project-form').reset();
    applyFiltersAndRender();
};

// Event Delegation for Toggle/Delete
projectList.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;

    if (e.target.classList.contains('btn-toggle')) {
        const proj = projects.find(p => p.id === id);
        if (proj) { proj.completed = !proj.completed; applyFiltersAndRender(); }
    }
    if (e.target.classList.contains('btn-delete')) {
        const idx = projects.findIndex(p => p.id === id);
        if (idx !== -1) { projects.splice(idx, 1); applyFiltersAndRender(); }
    }
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Filter buttons - find them in .profil-links
    document.querySelectorAll('.profil-links .btn-filter, .filter-group .btn-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.profil-links .btn-filter, .filter-group .btn-filter').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            applyFiltersAndRender();
        });
    });

    // Set initial active button
    const firstBtn = document.querySelector('.profil-links .btn-filter, .filter-group .btn-filter');
    if (firstBtn) firstBtn.classList.add('active');

    document.getElementById('project-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('search-input').addEventListener('input', applyFiltersAndRender);

    applyFiltersAndRender();
});