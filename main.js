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

// Render Projects
const renderProjects = (data) => {
    projectList.innerHTML = data.length ? '' : '<p style="text-align:center;grid-column:1/-1;padding:20px;">Tidak ada proyek pada kategori ini.</p>';
    
    data.forEach(proj => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-header">
                <h3 class="project-title">${proj.title}</h3>
                <span class="badge ${proj.completed ? 'badge-success' : 'badge-warning'}">${proj.completed ? 'Selesai' : 'Dalam Pengerjaan'}</span>
            </div>
            <div class="project-info">
                <p>Kategori: ${proj.category}</p>
                <p class="project-budget">Estimasi: ${formatCurrency(proj.budget)}</p>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="btn-toggle" data-id="${proj.id}" style="padding:4px 10px;border:1px solid #cbd5e1;background:#fff;border-radius:4px;font-size:11px;cursor:pointer;">
                    ${proj.completed ? 'Batal Selesai' : 'Tandai Selesai'}
                </button>
                <button class="btn-delete" data-id="${proj.id}" style="padding:4px 10px;border:1px solid #ef4444;background:#fff;color:#ef4444;border-radius:4px;font-size:11px;cursor:pointer;">
                    Hapus
                </button>
            </div>
        `;
        projectList.appendChild(card);
    });
};

// Helper: Apply filters and render
const applyFiltersAndRender = () => {
    const activeBtn = document.querySelector('.btn-filter.active');
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
    // Buttons
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            applyFiltersAndRender();
        });
    });

    document.getElementById('project-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('search-input').addEventListener('input', applyFiltersAndRender);

    applyFiltersAndRender();
});
