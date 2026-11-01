// 1. DATA REPOSITORY: Raw custom garden parameters
const gardenData = [
    {
        id: "clip-1",
        type: "Quote / Text Clipping",
        typeClass: "bg-amber-custom",
        source: "The Agile Creator Manifesto",
        platform: "Internal Workspace Log",
        content: '"I operate on an agile production model. I don\'t build monuments; I ship Capsules. Every rapid era is a themed version drop. When the sprint closes, the catalog locks."',
        meta: "⌥ Remixed 3x"
    },
    {
        id: "clip-2",
        type: "Visual Identity",
        typeClass: "bg-purple-custom",
        source: "Color Profile Anchor",
        platform: "Active Media Index",
        content: "<div class='media-container-stub'>[Aesthetic Stem: 3D Glitch Render Loop .mp4]</div><br>Color configuration profile anchor for Era 04. Blending deep violet (#2a0845) with retro CRT neon scan lines.",
        meta: "★ Active Asset"
    },
    {
        id: "clip-3",
        type: "Theory / Research Link",
        typeClass: "bg-blue-custom",
        source: "Stuart Brown's Archetypes of Play",
        platform: "Concept Architecture Guide",
        content: "Analyzing the structural, thematic overlaps between the 'Explorer' play profile and modern agile software versioning deployment cycles.",
        meta: "★ Starred v1.2"
    }
];

const catalogData = [
    {
        id: "era-03",
        number: "03",
        title: "Capsule: Brutalist Ecologies",
        version: "v1.0.4",
        badge: "",
        description: "3 Singles Drop · Blending concrete architecture frameworks with moss/foliage audio textures."
    },
    {
        id: "era-02",
        number: "02",
        title: "Capsule: Neon Nostalgia",
        version: "v2.1.0",
        badge: "DELUXE EDITION RELEASED",
        description: "5 Singles Drop · Retro game UI systems re-examined alongside cognitive science notes."
    }
];
// 2. RUNTIME LOGIC ENGINE
function initApplication() {
    renderGardenGrid();
    renderCatalog();
    setupEventHandlers();
    
    // Fallback security execution check for Lucide icon package engine
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function renderGardenGrid() {
    const grid = document.getElementById('garden-grid');
    if (!grid) return;
    
    grid.innerHTML = gardenData.map(card => `
        <article class="sublime-card" onclick="openStemModal('${card.id}')">
            <div>
                <div class="card-header-row">
                    <span class="type-badge ${card.typeClass}">${card.type}</span>
                    <span class="platform-tag">${card.platform}</span>
                </div>
                <div class="card-body">
                    ${card.content.length > 140 && !card.content.includes('media-container-stub') ? card.content.substring(0, 140) + '...' : card.content}
                </div>
            </div>
            <div class="card-footer-row">
                <span>Source: <span class="link-span">${card.source}</span></span>
                <span class="card-meta-detail">${card.meta}</span>
            </div>
        </article>
    `).join('');
}

function renderCatalog() {
    const list = document.getElementById('catalog-list');
    if (!list) return;

    list.innerHTML = catalogData.map(era => `
        <div class="era-item">
            <div class="era-meta-left">
                <span class="era-number">${era.number}</span>
                <div>
                    <h3 class="era-title-line">
                        ${era.title} 
                        ${era.badge ? `<span class="era-deluxe">${era.badge}</span>` : `<span class="era-ver">${era.version}</span>`}
                    </h3>
                    <p class="era-description">${era.description}</p>
                </div>
            </div>
            <div class="btn-group">
                <button class="catalog-btn">▶ Play Stream</button>
                <button class="catalog-btn">⌥ Download Stems</button>
            </div>
        </div>
    `).join('');
}

function openStemModal(id) {
    const card = gardenData.find(item => item.id === id);
    if (!card) return;

    document.getElementById('modal-title').innerText = card.source;
    document.getElementById('modal-content').innerHTML = card.content;
    document.getElementById('modal-source').innerText = `Origin Workspace: ${card.platform}`;
    
    const tagContainer = document.getElementById('modal-tag-container');
    tagContainer.innerHTML = `<span class="type-badge ${card.typeClass}">${card.type}</span>`;

    document.getElementById('stem-modal').classList.remove('modal-hidden');
}

function setupEventHandlers() {
    const closeModal = () => document.getElementById('stem-modal').classList.add('modal-hidden');
    
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    
    const modalBg = document.getElementById('stem-modal');
    if (modalBg) {
        modalBg.addEventListener('click', (e) => {
            if (e.target.id === 'stem-modal') closeModal();
        });
    }

    const addBtn = document.getElementById('add-clip-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const textPrompt = prompt("Clip a quick thought, link, or theory token into your Garden:");
            if (textPrompt) {
                gardenData.unshift({
                    id: `clip-${Date.now()}`,
                    type: "Clipped Insight Note",
                    typeClass: "bg-neutral-custom",
                    source: "Manual Capture Drop",
                    platform: "via Quick Clip",
                    content: `"${textPrompt}"`,
                    meta: "★ Freshly Planted"
                });
                renderGardenGrid();
            }
        });
    }
}

// Start rendering when DOM structure resolves safely
window.addEventListener('DOMContentLoaded', initApplication);

