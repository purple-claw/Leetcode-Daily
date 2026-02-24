// State
let allProblems = [];
let currentPage = 1;
const itemsPerPage = 9;
let currentFilters = {
    search: '',
    difficulty: 'All',
    tag: '',
    sort: 'number_asc'
};

// Easter egg trackers
let titleClickCount = 0;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    loadStats();
    loadTags();
    loadProblems();
    setupEventListeners();
    handleRouting();
    setupEasterEggs();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Easter egg: shake the page on theme switch
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
}

// Easter Eggs Setup
function setupEasterEggs() {
    // Title click counter
    const title = document.getElementById('main-title');
    if (title) {
        title.addEventListener('click', () => {
            titleClickCount++;
            
            if (titleClickCount === 5) {
                title.textContent = '🎉 You found an easter egg! 🎉';
                title.classList.add('rainbow');
                setTimeout(() => {
                    title.textContent = 'Not your typical Leetcode';
                    title.classList.remove('rainbow');
                    titleClickCount = 0;
                }, 3000);
            } else if (titleClickCount === 3) {
                title.classList.add('shake');
                setTimeout(() => title.classList.remove('shake'), 500);
            }
        });
    }
    
    // Konami code
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
        
        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateKonamiCode();
            konamiCode = [];
        }
    });
    
    // Secret keyword in search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (e.target.value.toLowerCase() === 'konami') {
                activateKonamiCode();
                e.target.value = '';
            } else if (e.target.value.toLowerCase() === 'matrix') {
                activateMatrixMode();
                e.target.value = '';
            }
        });
    }
    
    // Double click on stats for surprise
    document.querySelectorAll('.stat-box').forEach(box => {
        box.addEventListener('dblclick', () => {
            box.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                box.style.transform = '';
            }, 500);
        });
    });
}

function activateKonamiCode() {
    const statusDiv = document.getElementById('status-message');
    statusDiv.className = 'status-message';
    statusDiv.innerHTML = '<strong>🎮 Konami Code Activated! You are a true developer! 🎮</strong><br>Extra lives granted: ∞';
    statusDiv.style.display = 'block';
    
    // Rainbow effect on all cards
    document.querySelectorAll('.problem-card').forEach(card => {
        card.classList.add('rainbow');
    });
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
        document.querySelectorAll('.problem-card').forEach(card => {
            card.classList.remove('rainbow');
        });
    }, 5000);
}

function activateMatrixMode() {
    const statusDiv = document.getElementById('status-message');
    statusDiv.className = 'status-message';
    statusDiv.innerHTML = '<strong>🟢 Matrix Mode Activated! Follow the white rabbit... 🐰</strong>';
    statusDiv.style.display = 'block';
    
    // Change theme to dark
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Event Listeners
function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', debounce(handleFilterChange, 300));
    document.getElementById('difficulty-filter').addEventListener('change', handleFilterChange);
    document.getElementById('tag-filter').addEventListener('change', handleFilterChange);
    document.getElementById('sort-select').addEventListener('change', handleFilterChange);
    document.getElementById('toggle-editor').addEventListener('click', toggleEditorPanel);
    document.getElementById('editor-clear').addEventListener('click', clearEditor);
    document.getElementById('editor-save').addEventListener('click', handleEditorSave);
    document.getElementById('prev-btn').addEventListener('click', () => changePage(-1));
    document.getElementById('next-btn').addEventListener('click', () => changePage(1));
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Handle browser back/forward
    window.addEventListener('popstate', handleRouting);
}

// Debounce helper
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// API Calls
async function loadStats() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        document.getElementById('stat-total').textContent = data.total;
        document.getElementById('stat-easy').textContent = data.easy;
        document.getElementById('stat-medium').textContent = data.medium;
        document.getElementById('stat-hard').textContent = data.hard;
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

async function loadTags() {
    try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        
        const tagSelect = document.getElementById('tag-filter');
        tagSelect.innerHTML = '<option value="">All Tags</option>';
        data.tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            tagSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Failed to load tags:', error);
    }
}

async function loadProblems() {
    showLoading(true);
    
    try {
        const params = new URLSearchParams({
            difficulty: currentFilters.difficulty,
            sort: currentFilters.sort
        });
        
        if (currentFilters.search) params.append('search', currentFilters.search);
        if (currentFilters.tag) params.append('tag', currentFilters.tag);
        
        const response = await fetch(`/api/problems?${params}`);
        const data = await response.json();
        
        allProblems = data.problems;
        currentPage = 1;
        renderProblems();
    } catch (error) {
        console.error('Failed to load problems:', error);
        showError('Failed to load problems. Please try again.');
    } finally {
        showLoading(false);
    }
}

async function loadProblem(slug) {
    showLoading(true);
    
    try {
        const response = await fetch(`/api/problems/${slug}`);
        if (!response.ok) throw new Error('Problem not found');
        
        const problem = await response.json();
        renderProblemDetail(problem);
    } catch (error) {
        console.error('Failed to load problem:', error);
        showError('Problem not found. Redirecting to list...');
        setTimeout(() => {
            window.history.pushState({}, '', '/');
            handleRouting();
        }, 2000);
    } finally {
        showLoading(false);
    }
}

// Render Functions
function renderProblems() {
    const container = document.getElementById('problems-container');
    const pagination = document.getElementById('pagination');
    
    if (allProblems.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">No problems found matching your filters.</div>
            </div>
        `;
        pagination.style.display = 'none';
        return;
    }
    
    // Pagination
    const totalPages = Math.ceil(allProblems.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageProblems = allProblems.slice(startIdx, endIdx);
    
    // Render grid
    const gridHTML = `
        <div class="problems-grid">
            ${pageProblems.map(problem => createProblemCard(problem)).join('')}
        </div>
    `;
    
    container.innerHTML = gridHTML;
    
    // Update pagination
    if (totalPages > 1) {
        pagination.style.display = 'flex';
        document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages} • ${allProblems.length} problem(s)`;
        document.getElementById('prev-btn').disabled = currentPage === 1;
        document.getElementById('next-btn').disabled = currentPage === totalPages;
    } else {
        pagination.style.display = 'none';
    }
    
    // Add click handlers to cards
    document.querySelectorAll('.problem-card').forEach(card => {
        card.addEventListener('click', () => {
            const slug = card.dataset.slug;
            window.history.pushState({ slug }, '', `/?problem=${slug}`);
            handleRouting();
        });
    });
}

function createProblemCard(problem) {
    const difficultyClass = `difficulty-${problem.difficulty.toLowerCase()}`;
    const numberText = problem.number ? `#${problem.number}` : '';
    const dateText = problem.date || '';
    const difficultyBadge = createDifficultyBadge(problem.difficulty);
    const tagBadges = createTagBadges(problem.tags, 3);
    
    return `
        <div class="problem-card ${difficultyClass}" data-slug="${problem.slug}">
            <div class="problem-number">${numberText}</div>
            <div class="problem-title">${escapeHtml(problem.title)}</div>
            ${difficultyBadge}
            ${tagBadges}
            <div class="problem-date">${dateText}</div>
        </div>
    `;
}

function renderProblemDetail(problem) {
    const container = document.getElementById('problems-container');
    const pagination = document.getElementById('pagination');
    pagination.style.display = 'none';
    
    const numberText = problem.number ? `#${problem.number} • ` : '';
    const dateText = problem.date || '';
    const difficultyBadge = createDifficultyBadge(problem.difficulty);
    const tagBadges = createTagBadges(problem.tags, 10);
    const permalink = `${window.location.origin}/?problem=${problem.slug}`;
    
    // Convert markdown to HTML (simple version)
    const bodyHTML = markdownToHTML(problem.body);
    
    const detailHTML = `
        <div class="detail-view">
            <button class="back-btn" onclick="goBack()">← Back to list</button>
            
            <div class="detail-header">
                <div class="detail-meta">${numberText}${dateText}</div>
                <h1 class="detail-title">${escapeHtml(problem.title)}</h1>
                <div class="detail-badges">
                    ${difficultyBadge}
                    ${tagBadges}
                </div>
                <div class="permalink-box">Permalink: ${permalink}</div>
            </div>
            
            ${problem.url ? `<p><a href="${problem.url}" target="_blank" rel="noopener">🔗 View on LeetCode</a></p><hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #e8ecf0;">` : ''}
            
            <div class="detail-body">
                ${bodyHTML}
            </div>
        </div>
    `;
    
    container.innerHTML = detailHTML;
}

function createDifficultyBadge(difficulty) {
    const badgeClass = `badge-${difficulty.toLowerCase()}`;
    return `<span class="badge ${badgeClass}">${difficulty}</span>`;
}

function createTagBadges(tags, maxTags) {
    if (!tags || tags.length === 0) return '';
    
    const shown = tags.slice(0, maxTags);
    let html = shown.map(tag => `<span class="badge badge-tag">${escapeHtml(tag)}</span>`).join('');
    
    if (tags.length > maxTags) {
        html += `<span class="badge badge-tag">+${tags.length - maxTags}</span>`;
    }
    
    return html;
}

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    
    // Paragraphs
    html = html.split('\n\n').map(para => {
        if (!para.trim()) return '';
        if (para.startsWith('<h') || para.startsWith('<pre') || para.startsWith('<ul') || para.startsWith('<ol')) {
            return para;
        }
        return `<p>${para}</p>`;
    }).join('\n');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Filter and Navigation
function handleFilterChange() {
    currentFilters.search = document.getElementById('search-input').value;
    currentFilters.difficulty = document.getElementById('difficulty-filter').value;
    currentFilters.tag = document.getElementById('tag-filter').value;
    currentFilters.sort = document.getElementById('sort-select').value;
    
    loadProblems();
}

function changePage(delta) {
    currentPage += delta;
    renderProblems();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
    window.history.pushState({}, '', '/');
    handleRouting();
}

// Routing
function handleRouting() {
    const urlParams = new URLSearchParams(window.location.search);
    const problemSlug = urlParams.get('problem');
    
    if (problemSlug) {
        loadProblem(problemSlug);
    } else {
        loadProblems();
    }
}

function toggleEditorPanel() {
    const panel = document.getElementById('editor-panel');
    const toggleBtn = document.getElementById('toggle-editor');
    const isVisible = panel.style.display !== 'none';

    panel.style.display = isVisible ? 'none' : 'block';
    toggleBtn.textContent = isVisible ? 'Markdown Editor' : 'Hide Editor';
}

function clearEditor() {
    document.getElementById('markdown-editor').value = '';
    document.getElementById('editor-filename').value = '';
}

async function handleEditorSave() {
    const rawMarkdown = document.getElementById('markdown-editor').value.trim();
    const filename = document.getElementById('editor-filename').value.trim();

    if (!rawMarkdown) {
        showError('Markdown content is empty. Paste some content first.');
        return;
    }

    showLoading(true);

    try {
        const response = await fetch('/api/editor/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                markdown: rawMarkdown,
                filename: filename || null
            })
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.detail || 'Failed to save markdown');
        }

        showSuccess(`Saved: ${result.title} → ${result.path}`);
        loadStats();
        loadTags();
        loadProblems();
    } catch (error) {
        console.error('Save failed:', error);
        showError(error.message || 'Failed to save markdown.');
    } finally {
        showLoading(false);
    }
}

// Utilities
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

function showError(message) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.className = 'status-message error';
    statusDiv.innerHTML = `<strong>❌ ${message}</strong>`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

function showSuccess(message) {
    const statusDiv = document.getElementById('status-message');
    statusDiv.className = 'status-message';
    statusDiv.innerHTML = `<strong>✅ ${message}</strong>`;
    statusDiv.style.display = 'block';

    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 4000);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
