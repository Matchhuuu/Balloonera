const $ = s => document.querySelector(s), KEY = 'balloonera_demo_v1';
const templates = [{ id: 'arch', name: 'Classic Balloon Arch', price: 1800, desc: 'A festive arch for birthdays and entrances.', type: 'Arch' }, { id: 'garland', name: 'Organic Balloon Garland', price: 1200, desc: 'A flowing arrangement for party backdrops.', type: 'Garland' }, { id: 'bouquet', name: 'Celebration Bouquet', price: 650, desc: 'A cheerful balloon bouquet for any occasion.', type: 'Bouquet' }, { id: 'column', name: 'Party Balloon Columns', price: 950, desc: 'Statement balloon columns for celebrations.', type: 'Column' }, { id: 'bobo', name: 'Bobo Balloon', price: 0, desc: 'Personalized transparent birthday bubble balloon in a floral vase. Price upon inquiry.', type: 'Bubble Balloon' }, { id: 'rose60', name: 'Rose Gold 60th Birthday Balloon', price: 0, desc: 'Rose gold birthday arrangement with a clear bubble and metallic 60. Price upon inquiry.', type: 'Birthday Balloon' }];
const palettes = [{ name: 'Blush & Gold', colors: ['#f5a8c5', '#f8d6df', '#e8ba68'] }, { name: 'Lavender Dream', colors: ['#b8a2e8', '#ead8ff', '#ffffff'] }, { name: 'Ocean Breeze', colors: ['#8fcfe0', '#bce9ee', '#e6f6ff'] }, { name: 'Sunshine Party', colors: ['#ffcc68', '#ff9292', '#ffedd0'] }, { name: 'Elegant Neutrals', colors: ['#e9d7c6', '#c8ad98', '#fff5e9'] }];
let data;
try {
    data = JSON.parse(localStorage.getItem(KEY)) || { designs: [], inquiries: [], templates, settings: { themes: ['Pastel', 'Elegant', 'Bright', 'Minimal'], decorations: ['Ribbon', 'Stars', 'Confetti', 'Flowers'] } };
}
catch {
    data = { designs: [], inquiries: [], templates, settings: { themes: ['Pastel', 'Elegant', 'Bright', 'Minimal'], decorations: ['Ribbon', 'Stars', 'Confetti', 'Flowers'] } };
}
if (!Array.isArray(data.templates))
    data.templates = templates.slice();
if (!data.templates.some(t => t.id === 'bobo'))
    data.templates.push(templates.find(t => t.id === 'bobo'));
if (!data.templates.some(t => t.id === 'rose60'))
    data.templates.push(templates.find(t => t.id === 'rose60'));
if (!data.settings)
    data.settings = { themes: ['Pastel', 'Elegant', 'Bright', 'Minimal'], decorations: ['Ribbon', 'Stars', 'Confetti', 'Flowers'] };
let balloonMessage = '';
let textColor = '#2d174e';
let isGuest = true;
let role = 'customer', page = 'home', selectedTemplate = 'arch', occasion = 'Birthday', theme = 'Pastel', shape = 'Round', size = 'Medium', quantity = 28, decoration = 'Ribbon', colors = [...palettes[0].colors], rotation = .3, tilt = .15, activeDesign = null, editingInquiry = null;
function save() { localStorage.setItem(KEY, JSON.stringify(data)); }
function toast(t) { $('#toast').textContent = t; $('#toast').style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:100;background:#4d3656;color:white;padding:15px 22px;border-radius:12px;box-shadow:0 8px 25px #0002'; setTimeout(() => $('#toast').style.display = 'none', 3000); }
function escapeHTML(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function id() { return Math.random().toString(36).slice(2, 9).toUpperCase(); }
function btn(label, fn, cls = 'btn') { return `<button class="${cls}" onclick="${fn}">${label}</button>`; }
function statusClass(s) { return s === 'Revision Requested' ? 'revision' : s === 'Reviewed' ? 'closed' : ''; }
function title(t, sub) { return `<div class="section-head"><div><h2>${t}</h2><div class="muted">${sub}</div></div></div>`; }
function balloonSvg(type = 'arch', cs = colors) { let a = []; const put = (x, y, r, i) => a.push(`<ellipse cx="${x}" cy="${y}" rx="${r * .83}" ry="${r}" fill="${cs[i % cs.length]}" stroke="#ffffff88" stroke-width="2"/><ellipse cx="${x - r * .25}" cy="${y - r * .36}" rx="${r * .17}" ry="${r * .28}" fill="#ffffff66"/>`); if (type === 'arch') {
    for (let i = 0; i < 19; i++) {
        let ang = Math.PI - (Math.PI * i / 18), x = 170 + 132 * Math.cos(ang), y = 183 - 133 * Math.sin(ang);
        put(x, y, 22, i);
    }
}
else if (type === 'garland') {
    for (let i = 0; i < 20; i++) {
        let x = 45 + i * 13, y = 76 + i * 5 + Math.sin(i * .8) * 18;
        put(x, y, 22, i);
    }
}
else if (type === 'bouquet') {
    for (let i = 0; i < 13; i++) {
        let x = 170 + Math.sin(i * 2.4) * 75, y = 65 + Math.floor(i / 4) * 35;
        put(x, y, 24, i);
    }
    a.push('<path d="M110 180L170 280L232 180" stroke="#b29ab5" stroke-width="2" fill="none"/>');
}
else {
    for (let i = 0; i < 12; i++)
        put(i % 2 ? 105 : 235, 225 - Math.floor(i / 2) * 35, 23, i);
} return `<svg viewBox="0 0 340 310" xmlns="http://www.w3.org/2000/svg"><ellipse cx="170" cy="286" rx="125" ry="11" fill="#8d70931c"/>${a.join('')}</svg>`; }
/* Portfolio gallery: new public Home section. Existing functions are unchanged. */
const portfolioGroups = [
    { key: 'A', label: 'Event Balloon Setups', description: 'Balloon arrangements for venues and special occasions.', files: ['A1', 'A2', 'A3'] },
    { key: 'B', label: 'Balloon Gifts & Bouquets', description: 'Personalized balloon gifts and smaller arrangements.', files: ['B1', 'B2', 'B3', 'B4', 'B5'] },
    { key: 'C', label: 'Celebration Backdrops', description: 'Decorative backdrops for memorable events.', files: ['C1', 'C2', 'C3', 'C4', 'C5'] }
];
function gallerySection() { return ''; }

function filterGallery(key) { document.querySelectorAll('.gallery-filter').forEach(b => { const active = b.dataset.galleryFilter === key; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); }); document.querySelectorAll('.gallery-card').forEach(c => { c.hidden = key !== 'all' && c.dataset.galleryGroup !== key; }); }
function openGalleryPhoto(file) { if (!/^[ABC][1-5]$/.test(file))
    return; const group = portfolioGroups.find(g => g.files.includes(file)); if (!group)
    return; const n = group.files.indexOf(file) + 1; const dialog = document.createElement('dialog'); dialog.className = 'gallery-dialog'; dialog.innerHTML = `<button type="button" class="gallery-dialog-close" aria-label="Close photo" onclick="this.closest('dialog').close()">×</button><img src="${file}.jpg" alt="${escapeHTML(group.label)} ${n}"><div class="gallery-dialog-caption"><strong>${escapeHTML(group.label)} ${String(n).padStart(2, '0')}</strong><span>Placeholder project name</span></div>`; dialog.addEventListener('close', () => dialog.remove()); dialog.addEventListener('click', e => { if (e.target === dialog)
    dialog.close(); }); document.body.appendChild(dialog); dialog.showModal(); }
function home() { return `<section class="hero"><div><div class="eyebrow">✦ Make every celebration yours</div><h1>Dream it.<br><em>Design it.</em><br>Celebrate it.</h1><p>Bring your balloon ideas to life. Explore arrangements, customize your colors, preview in 3D, and send your design for review.</p><div class="actions">${btn('✦ Start Customizing', 'go("studio")')}${btn('Browse Packages', 'go("packages")', 'btn secondary')}${isGuest ? btn('Log In / Sign Up', 'openAuthModal()', 'btn ghost') : ''}</div><p class="tiny muted">✨ Personalized color suggestions · Interactive design preview</p></div><div class="hero-art">${balloonSvg('arch', ['#ed8db6', '#c2a3e8', '#f1ca8d', '#9ddad6'])}</div></section>${gallerySection()}`; }
function studio() { let t = data.templates.find(x => x.id === selectedTemplate) || data.templates[0]; return `${title('3D Balloon Design Studio', 'Customize a balloon arrangement and explore it from different angles.')}<div class="layout"><div class="panel"><h3>✦ Customize your design</h3><div class="field"><label>Arrangement template</label><select id="template" onchange="selectedTemplate=this.value;render()">${data.templates.map(x => `<option value="${x.id}" ${x.id === selectedTemplate ? 'selected' : ''}>${escapeHTML(x.name)}</option>`).join('')}</select></div><div class="field"><label>Occasion</label><select onchange="occasion=this.value;renderSuggestions()">${['Birthday', 'Wedding', 'Anniversary', 'Baby Shower', 'Graduation', 'Other'].map(x => `<option ${x === occasion ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="field"><label>Theme</label><select onchange="theme=this.value;renderSuggestions()">${data.settings.themes.map(x => `<option ${x === theme ? 'selected' : ''}>${escapeHTML(x)}</option>`).join('')}</select></div><div class="field"><label>Balloon shape</label><select onchange="shape=this.value;drawStudio()">${['Round', 'Heart', 'Oval'].map(x => `<option ${x === shape ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="field"><label>Balloon size</label><select onchange="size=this.value;drawStudio()">${['Small', 'Medium', 'Large'].map(x => `<option ${x === size ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="field"><label>Balloon quantity: <strong id="qtylabel">${quantity}</strong></label><input type="range" min="8" max="60" value="${quantity}" oninput="quantity=+this.value;$('#qtylabel').textContent=quantity;drawStudio();refreshStudioEstimate()"></div><div class="field"><label>Primary balloon color</label><div class="swatches">${['#f5a8c5', '#b8a2e8', '#8fcfe0', '#ffcc68', '#e8ba68', '#ffffff', '#ed7777', '#92cfae', '#d5b7a2'].map(c => `<button class="swatch ${colors[0] === c ? 'selected' : ''}" style="background:${c}" title="${c}" onclick="colors[0]='${c}';drawStudio()"></button>`).join('')}</div></div><div class="field"><label>Additional decoration</label><select onchange="decoration=this.value;drawStudio()"><option>None</option>${data.settings.decorations.map(x => `<option ${x === decoration ? 'selected' : ''}>${escapeHTML(x)}</option>`).join('')}</select></div><div class="field"><label for="balloonMessage">Personalized balloon text</label><textarea id="balloonMessage" maxlength="60" rows="3" placeholder="Example: Happy Birthday, Maria!" oninput="balloonMessage=this.value;updateBalloonText()">${escapeHTML(balloonMessage)}</textarea><span class="tiny muted">Up to 60 characters · Live text preview</span></div><div class="field"><label for="balloonTextColor">Text color</label><input id="balloonTextColor" type="color" value="${textColor}" oninput="textColor=this.value;updateBalloonText()"></div><div class="notice">Digital preview only. The finished physical arrangement may look different.</div></div><div class="panel"><div class="row"><h3>Live 3D Preview</h3><span class="stat">INTERACTIVE</span></div>${(selectedTemplate === 'bobo' || selectedTemplate === 'rose60') ? `<div class="bobo-preview personalized-3d-preview"><model-viewer id="boboModel" src="${selectedTemplate === 'rose60' ? 'rose-gold-60th-birthday.glb' : 'bobo-balloon.glb'}" alt="${selectedTemplate === 'rose60' ? 'Rose Gold 60th Birthday' : 'Bobo Balloon'} interactive 3D model" camera-controls auto-rotate shadow-intensity="1" exposure="1.15" environment-image="neutral" touch-action="pan-y" poster="${selectedTemplate === 'rose60' ? 'B2.jpg' : 'B4.jpg'}"><div class="bobo-model-fallback" slot="poster"><img src="${selectedTemplate === 'rose60' ? 'B2.jpg' : 'B4.jpg'}" alt="Balloon arrangement reference photo"><span>3D model preview: export the Blender file as <b>${selectedTemplate === 'rose60' ? 'rose-gold-60th-birthday.glb' : 'bobo-balloon.glb'}</b> and place it beside index.html.</span></div></model-viewer><div class="personalized-message model-message" id="personalizedMessage" aria-live="polite"></div><p class="personalization-note">Text is a 2D preview overlay; it is not yet applied to the GLB surface.</p><p class="bobo-caption">↔ Drag to rotate · Scroll to zoom · Personalized Bobo Balloon</p></div>` : `<div class="canvas-wrap" id="canvaswrap"><span class="canvas-label">↔ Drag to rotate · Scroll to zoom</span><canvas id="balloonCanvas"></canvas><div class="personalized-message canvas-message" id="personalizedMessage" aria-live="polite"></div></div>`}<div class="canvas-bottom"><span class="hint">Drag to rotate the arrangement</span><div>${(selectedTemplate === 'bobo' || selectedTemplate === 'rose60') ? 'Use your mouse or touch to rotate the 3D model.' : `${btn('↶ Reset view', 'rotation=.3;tilt=.15;zoom=1;drawStudio()', 'btn ghost small')} ${btn('↻ Rotate', 'rotation+=.45;drawStudio()', 'btn ghost small')}`}</div></div><div class="divider"></div><div class="row"><div><strong>${escapeHTML(t.name)}</strong><div class="tiny muted" id="studioLiveEstimate">${(t.id === 'bobo' || t.id === 'rose60') ? 'Price upon inquiry' : `Estimated ₱${(estimateForDesign({ template: t.id, quantity }).amount || 0).toLocaleString('en-PH')} for ${quantity} balloons · Demo only`}</div></div>${btn('Save Design', 'saveDesign()')}</div><div class="actions">${btn('Submit Inquiry →', 'openInquiry()', 'btn secondary')}</div></div><div class="panel"><div class="eyebrow">✧ Design Suggestions AI</div><h3 style="margin-top:9px">Color inspiration for you</h3><p class="muted tiny">Prototype recommendations based on your occasion and theme. No external AI service is used.</p><div id="suggestions"></div><div class="divider"></div><h3>Design summary</h3><div id="summary"></div></div></div>`; }
function renderSuggestions() { let match = theme === 'Elegant' ? 4 : theme === 'Bright' ? 3 : occasion === 'Wedding' ? 1 : occasion === 'Baby Shower' ? 2 : 0; let options = [palettes[match], palettes[(match + 1) % palettes.length]]; if ($('#suggestions'))
    $('#suggestions').innerHTML = options.map((p, i) => `<div class="suggestion"><strong>${escapeHTML(p.name)}</strong><div class="dots">${p.colors.map(c => `<i style="background:${c};border:1px solid #ddd"></i>`).join('')}</div><p>${i ? 'An alternative palette that complements your arrangement.' : 'Suggested based on your selected occasion and theme.'}</p><div class="row">${btn('Apply colors', `applyPalette('${p.name}')`, 'btn small')}${btn('Dismiss', 'this.closest(".suggestion").remove()', 'btn ghost small')}</div></div>`).join(''); if ($('#summary'))
    $('#summary').innerHTML = `<p class="tiny muted"><b>Occasion:</b> ${escapeHTML(occasion)}<br><b>Theme:</b> ${escapeHTML(theme)}<br><b>Quantity:</b> ${quantity} balloons<br><b>Shape / size:</b> ${shape} / ${size}<br><b>Decoration:</b> ${escapeHTML(decoration)}<br><b>Balloon text:</b> ${escapeHTML(balloonMessage || 'None')}</p>`; }
function applyPalette(name) { colors = [...palettes.find(p => p.name === name).colors]; drawStudio(); toast('Color suggestion applied!'); }
let zoom = 1, dragging = false, lastX = 0, lastY = 0;
function drawStudio() { if (selectedTemplate === 'bobo' || selectedTemplate === 'rose60') {
    renderSuggestionsSummaryOnly();
    updateBalloonText();
    return;
} let canvas = $('#balloonCanvas'); if (!canvas)
    return; const rect = canvas.getBoundingClientRect(), w = Math.max(100, rect.width), h = Math.max(100, rect.height), dpr = Math.min(2, devicePixelRatio || 1); canvas.width = w * dpr; canvas.height = h * dpr; let ctx = canvas.getContext('2d'); ctx.scale(dpr, dpr); ctx.clearRect(0, 0, w, h); let cx = w / 2, cy = h * .56, scale = Math.min(w / 460, h / 430) * zoom; ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale); ctx.fillStyle = '#c7acc422'; ctx.beginPath(); ctx.ellipse(0, 135, 148, 25, 0, 0, Math.PI * 2); ctx.fill(); let pts = [], count = Math.max(8, quantity), typ = selectedTemplate; for (let i = 0; i < count; i++) {
    let t = i / (count - 1), x, y, z;
    if (typ === 'arch') {
        let a = Math.PI * (1 - t);
        x = 145 * Math.cos(a);
        y = -125 * Math.sin(a) + 45;
        z = Math.sin(i * 3.7) * 15;
    }
    else if (typ === 'garland') {
        x = -150 + 300 * t;
        y = -95 + 130 * t + Math.sin(i * .7) * 13;
        z = Math.sin(i * 2.1) * 23;
    }
    else if (typ === 'bouquet') {
        let a = i * 2.4, r = Math.sqrt(t) * 110;
        x = Math.cos(a) * r;
        y = -120 + Math.sin(a) * r * .55;
        z = Math.sin(a) * r;
    }
    else {
        x = (i % 2 ? 80 : -80) + Math.sin(i) * 13;
        y = 80 - 220 * t;
        z = Math.cos(i * 2.1) * 20;
    }
    let rx = x * Math.cos(rotation) + z * Math.sin(rotation), rz = z * Math.cos(rotation) - x * Math.sin(rotation), ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
    pts.push({ x: rx, y: ry, z: rz, c: colors[i % colors.length] });
} pts.sort((a, b) => a.z - b.z); if (typ === 'bouquet') {
    ctx.strokeStyle = '#baa2b8';
    ctx.lineWidth = 2;
    for (let p of pts) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + 12);
        ctx.lineTo(0, 145);
        ctx.stroke();
    }
} for (let p of pts) {
    let depth = 1 + p.z / 650, r = (size === 'Small' ? 14 : size === 'Large' ? 23 : 18) * depth;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.scale(shape === 'Oval' ? .78 : shape === 'Heart' ? 1.05 : .86, shape === 'Oval' ? 1.25 : 1);
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 1.1, 0, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = '#ffffff80';
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-r * .28, -r * .35, r * .18, r * .32, -.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff80';
    ctx.fill();
    ctx.restore();
} if (decoration === 'Ribbon') {
    ctx.strokeStyle = '#c78ba9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, 115);
    ctx.quadraticCurveTo(0, 160, 16, 123);
    ctx.stroke();
} if (decoration === 'Stars' || decoration === 'Confetti' || decoration === 'Flowers') {
    ctx.fillStyle = '#e6b95f';
    for (let i = 0; i < 9; i++) {
        let x = Math.sin(i * 8) * 140, y = Math.cos(i * 4) * 110;
        ctx.font = '19px sans-serif';
        ctx.fillText(decoration === 'Flowers' ? '✿' : '✦', x, y);
    }
} ctx.restore(); renderSuggestionsSummaryOnly(); updateBalloonText(); }
function renderSuggestionsSummaryOnly() { refreshStudioEstimate(); if ($('#summary'))
    $('#summary').innerHTML = `<p class="tiny muted"><b>Occasion:</b> ${escapeHTML(occasion)}<br><b>Theme:</b> ${escapeHTML(theme)}<br><b>Quantity:</b> ${quantity} balloons<br><b>Shape / size:</b> ${shape} / ${size}<br><b>Decoration:</b> ${escapeHTML(decoration)}<br><b>Balloon text:</b> ${escapeHTML(balloonMessage || 'None')}</p>`; }
function initCanvas() { let c = $('#balloonCanvas'); if (!c)
    return; drawStudio(); renderSuggestions(); c.onpointerdown = e => { dragging = true; lastX = e.clientX; lastY = e.clientY; c.setPointerCapture(e.pointerId); }; c.onpointermove = e => { if (!dragging)
    return; rotation += (e.clientX - lastX) * .009; tilt = Math.max(-.6, Math.min(.6, tilt + (e.clientY - lastY) * .004)); lastX = e.clientX; lastY = e.clientY; drawStudio(); }; c.onpointerup = () => dragging = false; c.onwheel = e => { e.preventDefault(); zoom = Math.max(.65, Math.min(1.65, zoom - e.deltaY * .001)); drawStudio(); }; window.onresize = () => { if (page === 'studio')
    drawStudio(); }; }
function currentDesign() { return { template: selectedTemplate, occasion, theme, shape, size, quantity, decoration, colors: [...colors], balloonMessage, textColor }; }
function loadDesign(d) { selectedTemplate = d.template; occasion = d.occasion; theme = d.theme; shape = d.shape; size = d.size; quantity = d.quantity; decoration = d.decoration; colors = [...d.colors]; balloonMessage = d.balloonMessage || ''; textColor = d.textColor || '#2d174e'; go('studio'); }
function saveDesign() { if (isGuest) {
    openAuthModal();
    return;
} let name = prompt('Name your design:', 'My Celebration Design'); if (name === null)
    return; name = name.trim(); if (!name) {
    toast('Please enter a design name.');
    return;
} let d = { id: id(), name, date: new Date().toLocaleDateString(), ...currentDesign() }; data.designs.unshift(d); activeDesign = d.id; save(); toast('Design saved in this browser!'); }
/* Legacy pricing functions retired: Chapter I limits pricing to owner-defined
   STARTING references. site-refresh.js provides the actual inquiry interface. */
function estimateForDesign(d) { const t = data.templates.find(x => x.id === d?.template); return {name:t?.name || 'Arrangement',amount:null,startingPrice:Number(t?.price)||null,quantity:d?.quantity||28}; }
function formatEstimate(n) { return n == null ? 'Owner quotation required' : '₱' + Number(n).toLocaleString('en-PH'); }
function refreshStudioEstimate() { }
function updateInquiryEstimate() { }
function openInquiry() { }
function submitInquiry() { }
function designs() { return `${title('My Saved Designs', 'Your saved arrangements are stored locally in this browser.')}<div class="row" style="margin-bottom:20px">${btn('+ Create New Design', 'go("studio")')}</div>${data.designs.length ? `<div class="cards">${data.designs.map(d => `<div class="card"><div class="thumb">${balloonSvg(d.template, d.colors)}</div><div class="info"><h3>${escapeHTML(d.name)}</h3><p class="tiny muted">${escapeHTML(d.occasion)} · ${escapeHTML(d.date)}</p><div class="actions">${btn('Edit', `editDesign('${d.id}')`, 'btn small')}${btn('Inquire', `openInquiry('${d.id}')`, 'btn secondary small')}${btn('Delete', `deleteDesign('${d.id}')`, 'btn ghost small')}</div></div></div>`).join('')}</div>` : `<div class="panel empty"><div class="emoji">🎈</div><h3>No saved designs yet</h3><p>Visit the 3D Studio to create your first arrangement.</p>${btn('Start Designing', 'go("studio")')}</div>`}`; }
function editDesign(i) { let d = data.designs.find(x => x.id === i); if (d) {
    activeDesign = i;
    loadDesign(d);
} }
function deleteDesign(i) { if (!confirm('Delete this saved design?'))
    return; data.designs = data.designs.filter(x => x.id !== i); save(); render(); }
function inquiries() { return `${title('My Customization Inquiries', 'Review the status of your submitted requests and respond to revisions.')}${data.inquiries.length ? `<div class="panel"><table class="table"><thead><tr><th>Inquiry</th><th>Event</th><th>Preferred date</th><th>Status</th><th>Action</th></tr></thead><tbody>${data.inquiries.map(x => `<tr><td><b>${escapeHTML(x.id)}</b><div class="tiny muted">${escapeHTML(x.customer)}</div></td><td>${escapeHTML(x.event)}</td><td>${escapeHTML(x.date)}</td><td><span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span></td><td>${btn('View Details', `viewInquiry('${x.id}')`, 'btn ghost small')}</td></tr>`).join('')}</tbody></table></div>` : `<div class="panel empty"><div class="emoji">💌</div><h3>No inquiries yet</h3><p>Save a balloon design and send it for owner review.</p>${btn('Design a Balloon Arrangement', 'go("studio")')}</div>`}`; }
function viewInquiry(i) { let x = data.inquiries.find(a => a.id === i), d = data.designs.find(a => a.id === x.designId); showModal(`<h2>${escapeHTML(x.id)}</h2><span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span><p class="muted">${escapeHTML(x.event)} · ${escapeHTML(x.date)}</p><p><b>Customer:</b> ${escapeHTML(x.customer)}<br><b>Contact:</b> ${escapeHTML(x.contact)}<br><b>Design:</b> ${escapeHTML(d?.name || 'Previously saved design')}<br><b>Requests:</b> ${escapeHTML(x.notes || 'None')}<br><b>Balloon quantity:</b> ${x.balloonQuantity ?? d?.quantity ?? 'Not recorded'}<br><b>Estimated price at submission:</b> ${x.estimatedTemplate ? formatEstimate(x.estimatedPrice) : 'Not recorded'}</p>${x.feedback ? `<div class="notice"><b>Owner feedback:</b> ${escapeHTML(x.feedback)}</div>` : ''}${x.status === 'Revision Requested' && role === 'customer' ? `<p class="muted tiny">Edit and resubmit a design under this same inquiry.</p>${btn('Revise Design', `reviseInquiry('${x.id}')`)}` : role === 'admin' ? `<div class="field"><label>Update inquiry status</label><select id="newStatus">${['Submitted', 'Under Review', 'Revision Requested', 'Reviewed'].map(s => `<option ${s === x.status ? 'selected' : ''}>${s}</option>`).join('')}</select></div><div class="field"><label>Revision notes / feedback</label><textarea id="feedback" rows="3">${escapeHTML(x.feedback)}</textarea></div>${btn('Save Status', `updateInquiry('${x.id}')`)}` : ''}`); }
function reviseInquiry(i) { let x = data.inquiries.find(x => x.id === i), d = data.designs.find(x => x.id === x.designId); if (!d) {
    toast('The linked design is unavailable.');
    return;
} editingInquiry = i; closeModal(); loadDesign(d); toast('Edit your design, then click Resubmit Revision.'); setTimeout(() => { let target = $('.canvas-bottom'); if (target)
    target.insertAdjacentHTML('afterend', `<div class="actions">${btn('Resubmit Revision', `resubmitRevision()`)}</div>`); }, 30); }
function resubmitRevision() { let x = data.inquiries.find(x => x.id === editingInquiry); if (!x)
    return; let d = data.designs.find(d => d.id === x.designId); if (d)
    Object.assign(d, currentDesign()); x.status = 'Submitted'; x.revisions++; x.feedback = ''; editingInquiry = null; save(); go('inquiries'); toast('Revision resubmitted under the same inquiry!'); }
function updateInquiry(i) { let x = data.inquiries.find(x => x.id === i); x.status = $('#newStatus').value; x.feedback = $('#feedback').value; save(); closeModal(); render(); toast('Inquiry updated'); }
function admin() { let rev = data.inquiries.filter(x => x.status === 'Revision Requested').length; return `${title('Owner Dashboard', 'Manage customer inquiries, arrangement templates and design options.')}<div class="dashboard"><div class="metric"><span class="muted">Total inquiries</span><strong>${data.inquiries.length}</strong></div><div class="metric"><span class="muted">Awaiting review</span><strong>${data.inquiries.filter(x => ['Submitted', 'Under Review'].includes(x.status)).length}</strong></div><div class="metric"><span class="muted">Revisions requested</span><strong>${rev}</strong></div></div><div class="panel"><h3>Customer inquiries</h3>${data.inquiries.length ? `<table class="table"><thead><tr><th>Inquiry</th><th>Customer</th><th>Event</th><th>Status</th><th>Action</th></tr></thead><tbody>${data.inquiries.map(x => `<tr><td>${escapeHTML(x.id)}</td><td>${escapeHTML(x.customer)}</td><td>${escapeHTML(x.event)}</td><td><span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span></td><td>${btn('Review', `viewInquiry('${x.id}')`, 'btn small')}</td></tr>`).join('')}</tbody></table>` : '<div class="empty">No customer inquiries yet. Switch to Customer view to create a demo inquiry.</div>'}</div><section class="section">${title('Manage Packages & Templates', 'Set owner-defined starting prices and arrangement availability.')}<div class="cards">${data.templates.map(t => `<div class="card"><div class="thumb">${balloonSvg(t.id)}</div><div class="info"><h3>${escapeHTML(t.name)}</h3><p class="muted">Starting at ₱${Number(t.price).toLocaleString()}</p>${btn('Edit Package', `editPackage('${t.id}')`, 'btn secondary small')}</div></div>`).join('')}</div></section><section class="section panel"><h3>Customization options</h3><div class="two"><div class="field"><label>Available themes (comma separated)</label><input id="themes" value="${escapeHTML(data.settings.themes.join(', '))}"></div><div class="field"><label>Available decorations (comma separated)</label><input id="decorations" value="${escapeHTML(data.settings.decorations.join(', '))}"></div></div>${btn('Save Options', 'saveOptions()')}</section>`; }
function saveOptions() { data.settings.themes = $('#themes').value.split(',').map(x => x.trim()).filter(Boolean); data.settings.decorations = $('#decorations').value.split(',').map(x => x.trim()).filter(Boolean); save(); toast('Customization options updated'); }
function editPackage(i) { let t = data.templates.find(t => t.id === i); showModal(`<h2>Edit Arrangement Package</h2><form onsubmit="savePackage(event,'${i}')"><div class="field"><label>Package name</label><input name="name" value="${escapeHTML(t.name)}" required></div><div class="field"><label>Description</label><textarea name="desc">${escapeHTML(t.desc)}</textarea></div><div class="field"><label>Starting price (PHP)</label><input name="price" type="number" min="0" value="${t.price}" required></div><button class="btn">Save Package</button></form>`); }
function savePackage(e, i) { e.preventDefault(); let t = data.templates.find(t => t.id === i), f = new FormData(e.target); t.name = f.get('name'); t.desc = f.get('desc'); t.price = Number(f.get('price')); save(); closeModal(); render(); toast('Package updated'); }
function showModal(html) { let div = document.createElement('div'); div.className = 'modal-back'; div.id = 'modal'; div.onclick = e => { if (e.target === div)
    closeModal(); }; div.innerHTML = `<div class="modal"><button class="close" onclick="closeModal()">✕</button>${html}</div>`; document.body.append(div); }
function closeModal() { $('#modal')?.remove(); }
/* Client-only Packages catalog. Each occasion has ten editable demo placeholders. */
const packageCategories = [
    { name: 'Birthday', icon: '🎂', description: 'Celebrate birthdays with colorful balloon setups.' },
    { name: 'Wedding', icon: '💍', description: 'Elegant decorations for a special day.' },
    { name: 'Anniversary', icon: '💜', description: 'Create a memorable anniversary celebration.' },
    { name: 'Baby Shower', icon: '🍼', description: 'Sweet and playful party arrangements.' },
    { name: 'Graduation', icon: '🎓', description: 'Celebrate a well-earned milestone.' },
    { name: 'Others', icon: '🎉', description: 'For every other celebration and gathering.' }
];
let activePackageCategory = 'Birthday';
function selectPackageCategory(category) {
    if (!packageCategories.some(item => item.name === category))
        return;
    activePackageCategory = category;
    if (page === 'packages' && role === 'customer')
        render();
}
function packages() {
    const current = packageCategories.find(item => item.name === activePackageCategory) || packageCategories[0];
    return `<section class="package-banner"><div><span class="eyebrow">✦ BALLOONERA COLLECTIONS</span><h1>Packages for every celebration</h1><p>Browse occasion-based package collections. These are sample placeholders ready for your own photos, descriptions, and prices.</p></div><div class="package-banner-art" aria-hidden="true">🎈✨🎁</div></section>
 <section class="section package-section">${title('Explore our packages', 'Choose an occasion to view its collection of 10 packages.')}
 <div class="package-category-tabs" role="group" aria-label="Package occasion categories">${packageCategories.map(item => `<button type="button" class="package-category-tab ${item.name === activePackageCategory ? 'selected' : ''}" onclick="selectPackageCategory('${item.name}')" aria-pressed="${item.name === activePackageCategory}"><span>${item.icon}</span> ${item.name}</button>`).join('')}</div>
 <div class="package-category-heading"><div><h3>${current.icon} ${current.name} Packages</h3><p class="muted">${current.description}</p></div><span class="package-count">10 packages</span></div>
 <div class="package-placeholder-grid">${Array.from({ length: 10 }, (_, index) => `<article class="package-placeholder-card"><div class="package-placeholder-image"><span class="package-placeholder-glyph">${current.icon}</span><span class="package-image-label">IMAGE PLACEHOLDER</span><span class="package-card-number">${String(index + 1).padStart(2, '0')}</span></div><div class="package-placeholder-info"><h3>${current.name} Package ${String(index + 1).padStart(2, '0')}</h3><p>Package details and description coming soon.</p><div class="package-placeholder-bottom"><span>Price to be added</span><button type="button" onclick="viewPackagePlaceholder('${current.name}',${index + 1})">View Details</button></div></div></article>`).join('')}</div>
 <div class="package-custom-cta"><div><h3>Want something personalized?</h3><p>Design your own balloon arrangement in our 3D Studio.</p></div>${btn('Open 3D Studio →', 'go("studio")')}</div></section>`;
}
function viewPackagePlaceholder(category, number) {
    const item = packageCategories.find(x => x.name === category);
    if (!item)
        return;
    showModal(`<div class="package-modal-icon">${item.icon}</div><span class="eyebrow">${escapeHTML(category)} collection</span><h2>${escapeHTML(category)} Package ${String(number).padStart(2, '0')}</h2><p class="muted">This is a sample package placeholder. The business can add its actual package photo, contents, price, and availability later.</p><div class="notice">No package purchase or booking is available in this demo.</div><div class="actions">${btn('Customize in 3D Studio', 'closeModal();go("studio")', 'btn secondary')}</div>`);
}
function pickTemplate(i) { selectedTemplate = i; go('studio'); }
function go(p) { if (isGuest && (p === 'designs' || p === 'inquiries')) {
    openAuthModal();
    return;
} page = p; render(); window.scrollTo({ top: 0, behavior: 'instant' }); }
function render() { document.querySelectorAll('nav button').forEach(b => { b.classList.toggle('active', b.dataset.page === page); b.style.display = role === 'admin' ? 'none' : ''; }); $('#content').innerHTML = role === 'admin' ? admin() : page === 'home' ? home() : page === 'packages' ? packages() : page === 'studio' ? studio() : page === 'designs' ? designs() : inquiries(); if (role === 'customer' && page === 'studio')
    requestAnimationFrame(() => { if (selectedTemplate === 'bobo' || selectedTemplate === 'rose60') {
        renderSuggestions();
        initBoboModel();
        updateBalloonText();
    }
    else {
        initCanvas();
        updateBalloonText();
    } }); }
document.querySelectorAll('nav button').forEach(b => b.onclick = () => go(b.dataset.page));
$('#role').onchange = e => { role = e.target.value; page = 'home'; render(); };
render();
/* Public browsing with optional client/admin demo login. Existing core functions are preserved. */
(function () {
    const login = document.getElementById('client-login');
    const app = document.getElementById('app');
    const logout = document.getElementById('client-logout');
    const authOpen = document.getElementById('client-auth-open');
    const form = document.getElementById('client-login-form');
    const roleInput = document.getElementById('login-role');
    const appRole = document.getElementById('role');
    const signupForm = document.getElementById('client-signup-form');
    const loginHeading = document.querySelector('.login-heading');
    const switchLine = document.getElementById('show-signup-line');
    const signupError = document.getElementById('signup-error');
    function showSignup() {
        form.hidden = true;
        signupForm.hidden = false;
        switchLine.hidden = true;
        loginHeading.hidden = true;
        signupError.hidden = true;
        signupForm.reset();
    }
    function showLogin() {
        signupForm.hidden = true;
        form.hidden = false;
        switchLine.hidden = false;
        loginHeading.hidden = false;
        signupError.hidden = true;
    }
    window.openAuthModal = function () {
        form.reset();
        showLogin();
        login.hidden = false;
        document.body.classList.add('auth-open');
        window.setTimeout(() => roleInput.focus(), 0);
    };
    function closeAuthModal() { login.hidden = true; document.body.classList.remove('auth-open'); }
    document.getElementById('close-auth').addEventListener('click', closeAuthModal);
    login.addEventListener('click', e => { if (e.target === login)
        closeAuthModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !login.hidden)
        closeAuthModal(); });
    authOpen.addEventListener('click', openAuthModal);
    document.getElementById('show-signup').addEventListener('click', showSignup);
    document.getElementById('show-login').addEventListener('click', showLogin);
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!signupForm.reportValidity())
            return;
        const password = document.getElementById('signup-password').value;
        const confirmation = document.getElementById('signup-confirm').value;
        if (password !== confirmation) {
            signupError.textContent = 'Passwords do not match. Please try again.';
            signupError.hidden = false;
            return;
        }
        const name = document.getElementById('signup-name').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        if (!name || !email)
            return;
        try {
            const key = 'balloonera_demo_profiles';
            const profiles = JSON.parse(localStorage.getItem(key) || '[]');
            const existing = profiles.findIndex(p => p.email === email);
            if (existing >= 0)
                profiles[existing] = { name, email };
            else
                profiles.push({ name, email });
            localStorage.setItem(key, JSON.stringify(profiles));
        }
        catch (e) { }
        showLogin();
        roleInput.value = 'customer';
        document.getElementById('client-email').value = email;
        document.getElementById('client-password').value = '';
        toast('Demo sign up complete! You can now log in as a Client.');
    });
    const sessionKey = 'balloonera_client_demo_session';
    const roleKey = 'balloonera_demo_login_role';
    function updateHeader() { logout.hidden = isGuest; authOpen.hidden = !isGuest; }
    function openApp(selectedRole) {
        isGuest = false;
        role = selectedRole === 'admin' ? 'admin' : 'customer';
        appRole.value = role;
        page = 'home';
        render();
        closeAuthModal();
        app.hidden = false;
        updateHeader();
        window.scrollTo(0, 0);
    }
    function openGuest() {
        isGuest = true;
        role = 'customer';
        appRole.value = 'customer';
        page = 'home';
        render();
        closeAuthModal();
        updateHeader();
        document.getElementById('modal')?.remove();
        window.scrollTo(0, 0);
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.reportValidity())
            return;
        const selectedRole = roleInput.value === 'admin' ? 'admin' : 'customer';
        try {
            sessionStorage.setItem(sessionKey, 'active');
            sessionStorage.setItem(roleKey, selectedRole);
        }
        catch (e) { }
        openApp(selectedRole);
    });
    logout.addEventListener('click', function () {
        try {
            sessionStorage.removeItem(sessionKey);
            sessionStorage.removeItem(roleKey);
        }
        catch (e) { }
        openGuest();
    });
    try {
        if (sessionStorage.getItem(sessionKey) === 'active')
            openApp(sessionStorage.getItem(roleKey));
        else
            openGuest();
    }
    catch (e) {
        openGuest();
    }
})();
/* 3D Bobo Balloon asset status. The exported GLB is supplied separately. */
function initBoboModel() {
    const viewer = document.getElementById('boboModel');
    if (!viewer)
        return;
    viewer.addEventListener('load', () => { const msg = document.getElementById('bobo-status'); if (msg)
        msg.textContent = '3D model loaded — drag to rotate, scroll to zoom.'; });
    viewer.addEventListener('error', () => { const msg = document.getElementById('bobo-status'); if (msg)
        msg.textContent = '3D model not found yet. Export bobo-balloon.glb from Blender and place it in the website folder.'; });
}
/* Balloon text is an accessible screen-space preview layer. It is intentionally not baked into GLB material. */
function updateBalloonText() {
    const el = document.getElementById('personalizedMessage');
    if (el) {
        el.textContent = balloonMessage;
        el.style.color = textColor;
        el.hidden = !balloonMessage.trim();
    }
    const summary = document.getElementById('summary');
    if (summary) {
        const existing = summary.querySelector('.custom-text-summary');
        if (existing)
            existing.remove();
        const p = document.createElement('p');
        p.className = 'tiny muted custom-text-summary';
        p.textContent = 'Personalized text: ' + (balloonMessage || 'None');
        summary.appendChild(p);
    }
}

