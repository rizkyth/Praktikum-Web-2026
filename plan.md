# Interactive Portfolio Tracker (Modul 4) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the Modul 4 portfolio page with 4 mandatory features: (1) dynamic project form with validation, (2) live search filter, (3) toggle status & delete on each card, (4) instant stats updates.

**Architecture:** Single-page vanilla ES6+ app. State lives in a single `projects` array in `main.js`. All mutations go through pure helper functions; `renderProjects()` and `updateStats()` are the only DOM writers. Event delegation handles toggle/delete on dynamically rendered cards.

**Tech Stack:** HTML5, CSS3 (embedded), vanilla JavaScript (ES6+), `Intl.NumberFormat` for IDR, Node.js only for running the starter scripts.

**Spec:** Modul 4 PDF – Bab 3 (Tugas Mandiri)

---

## Global Constraints
- Must run by opening `index.html` in a browser (no build step, no server).
- Keep all code in `index.html`, `main.js` (existing files); no new files.
- Use `const`/`let`, arrow functions, `filter`/`map`/`reduce`/`find`/`forEach`.
- Strict equality (`===`) everywhere.
- ID generation: `Date.now()`.
- Validation: title non-empty, budget > 0.
- Search: case-insensitive substring on `title`.
- Filter buttons (category) and search input work together (AND logic).
- Stats cards: Total Projects, Total Budget, Completed Projects.
- Zero red errors in browser console.

---

## Review Focus
| Input / Condition | Expected Behavior |
|---|---|
| Empty title or budget ≤ 0 submitted | Form rejects, no new project, no error toast required |
| Search term matches no projects | Render empty-state message ("Tidak ada proyek pada kategori ini.") |
| Toggle status on a project | `completed` flips, badge + stats update instantly |
| Delete a project | Item removed from array, list + stats update instantly |
| Category filter + search combined | Results satisfy BOTH filters (AND) |

---

## File Structure
- `index.html` – add `<form id="project-form">` above stats grid; add `<input id="search-input">` inside filter group
- `main.js` – extend with form handler, search handler, toggle/delete handlers, combined filter logic

---

### Task 1: Add Form Markup & Search Input

**Files:**
- Modify: `index.html` (insert form before `.stats-grid`, insert search input in `.filter-group`)

**Interfaces:**
- Produces: DOM elements `#project-form`, `#search-input`, form fields `#title`, `#category`, `#budget`, `#completed`

- [ ] **Step 1: Write the failing test (manual)**
  Open `index.html` in browser; verify form and search input exist in DOM (DevTools Elements tab).

- [ ] **Step 2: Implement form markup in `index.html`**
  Insert before `.stats-grid`:
  ```html
  <form id="project-form" style="margin-bottom:20px;padding:15px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;align-items:end;">
      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">Judul Proyek</label>
        <input type="text" id="title" required placeholder="Contoh: Sistem Inventory" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">Kategori</label>
        <select id="category" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">
          <option value="Web App">Web App</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Desktop App">Desktop App</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;">Estimasi Anggaran (Rp)</label>
        <input type="number" id="budget" required min="1" step="100000" placeholder="2500000" style="width:100%;padding:8px;border:1px solid #cbd5e1;border-radius:6px;">
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <input type="checkbox" id="completed" style="width:18px;height:18px;">
        <label for="completed" style="font-size:13px;">Sudah Selesai</label>
      </div>
      <div>
        <button type="submit" class="btn-filter" style="background:#1e3a8a;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;">Tambah Proyek</button>
      </div>
    </div>
  </form>
  ```
  Insert search input inside `.filter-group` (after the filter buttons):
  ```html
  <input type="text" id="search-input" placeholder="Cari proyek..." style="flex:1;min-width:200px;padding:8px 12px;border:1px solid #cbd5e1;border-radius:6px;font-size:13px;">
  ```

- [ ] **Step 3: Verify in browser**
  Reload `index.html`; confirm form renders, search input appears, no console errors.

- [ ] **Step 4: Commit**
  ```bash
  git add index.html
  git commit -m "feat: add project form and search input markup"
  ```

---

### Task 2: Form Submit Handler + Validation

**Files:**
- Modify: `main.js` (add `handleFormSubmit`, integrate in `DOMContentLoaded`)

**Interfaces:**
- Consumes: `#project-form` submit event, form field values
- Produces: new project object pushed to `projects` array; calls `renderProjects(filtered)` and `updateStats(projects)`

- [ ] **Step 1: Write the failing test (manual)**
  Fill form with valid data → submit → expect new card appears and stats increment.

- [ ] **Step 2: Implement `handleFormSubmit` in `main.js`**
  ```js
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const budget = Number(document.getElementById('budget').value);
    const completed = document.getElementById('completed').checked;

    if (!title || budget <= 0) return; // silent reject per spec

    const newProject = {
      id: Date.now(),
      title,
      category,
      budget,
      completed
    };
    projects.push(newProject);
    document.getElementById('project-form').reset();
    applyFiltersAndRender();
  };
  ```

- [ ] **Step 3: Add `applyFiltersAndRender` helper (combines category filter + search)**
  ```js
  const applyFiltersAndRender = () => {
    const activeBtn = document.querySelector('.btn-filter.active');
    const category = activeBtn?.dataset.category ?? 'Semua';
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    let filtered = projects;
    if (category !== 'Semua') filtered = filtered.filter(p => p.category === category);
    if (searchTerm) filtered = filtered.filter(p => p.title.toLowerCase().includes(searchTerm));

    renderProjects(filtered);
    updateStats(projects); // stats always reflect full dataset
  };
  ```

- [ ] **Step 4: Wire submit + search input + filter buttons to `applyFiltersAndRender`**
  In `DOMContentLoaded`:
  ```js
  document.getElementById('project-form').addEventListener('submit', handleFormSubmit);
  document.getElementById('search-input').addEventListener('input', applyFiltersAndRender);
  // existing filterButtons loop: replace its renderProjects call with applyFiltersAndRender
  ```

- [ ] **Step 5: Verify in browser**
  Submit 2 valid projects → cards + stats update. Submit empty title or budget 0 → nothing added. Type in search → live filter works. Click category buttons → combined filter works.

- [ ] **Step 6: Commit**
  ```bash
  git add main.js
  git commit -m "feat: form submit with validation, live search, combined category filter"
  ```

---

### Task 3: Toggle Status & Delete Buttons on Cards

**Files:**
- Modify: `main.js` (update `renderProjects` to emit buttons with data-id; add delegated click handler)

**Interfaces:**
- Consumes: click on `.btn-toggle` and `.btn-delete` inside `#project-list`
- Produces: mutates `projects` array (toggle `completed` or splice by id); calls `applyFiltersAndRender()`

- [ ] **Step 1: Write the failing test (manual)**
  Click "Ubah Status" → badge flips Selesai↔Dalam Pengerjaan, completed count updates. Click "Hapus" → card disappears, total projects & budget update.

- [ ] **Step 2: Update `renderProjects` to include action buttons**
  In the `.map()` template, append inside the card's right div:
  ```html
  <div style="display:flex;gap:8px;flex-wrap:wrap;">
    <button class="btn-toggle" data-id="${proj.id}" style="padding:4px 10px;border:1px solid #cbd5e1;background:#fff;border-radius:4px;font-size:11px;cursor:pointer;">
      ${proj.completed ? 'Batal Selesai' : 'Tandai Selesai'}
    </button>
    <button class="btn-delete" data-id="${proj.id}" style="padding:4px 10px;border:1px solid #ef4444;background:#fff;color:#ef4444;border-radius:4px;font-size:11px;cursor:pointer;">
      Hapus
    </button>
  </div>
  ```

- [ ] **Step 3: Add delegated event listener (once in `DOMContentLoaded`)**
  ```js
  document.getElementById('project-list').addEventListener('click', (e) => {
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
  ```

- [ ] **Step 4: Verify in browser**
  Toggle status on multiple cards → badge + stats sync. Delete cards → removed from list + stats sync. Search + category filter still work after mutations.

- [ ] **Step 5: Commit**
  ```bash
  git add main.js
  git commit -m "feat: toggle status and delete actions with instant stats update"
  ```

---

### Task 4: Final QA & Push

**Files:** none new

- [ ] **Step 1: Run full checklist (per PDF)**
  - Console: zero red errors
  - Add ≥2 projects via form → appear instantly
  - Search input filters live
  - Toggle status & delete work on multiple cards
  - Stats cards (total, budget, completed) always correct

- [ ] **Step 2: Commit & push to `pertemuan-4` branch**
  ```bash
  git status
  git add .
  git commit -m "Menyelesaikan tugas manajemen portofolio interaktif"
  git push -u origin pertemuan-4
  ```

- [ ] **Step 3: Verify remote branch exists on GitHub**

---

## Execution Handoff

Plan complete and saved to `plan.md`. Please review the plan. Which execution approach would you prefer?

- **Subagent-driven** – A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end. Most thorough; costs a fresh context per task and per review.
- **Native** – I implement every task myself in this session, then one fresh reviewer on the most capable model checks the whole branch. Cheapest and fastest; no independent review until the end.

For this plan I recommend **Native**, because the tasks are tightly coupled (all in two files), few in number (4), and a shipped mistake is low-cost (single HTML/JS page). Does the plan capture what you want, and which approach should we use?