/* Balloonera's research-aligned catalog and front-end experience.
 * Starting prices are illustrative until the owner confirms them.
 * Recommendations are transparent, predefined rule-based prototype suggestions,
 * not a connected generative AI service.
 */

const OCCASIONS = [
  {name:'Birthday',short:'Birthday',base:850,templates:['number','garland','bouquet','arch','backdrop'],palettes:['Rose Champagne','Lavender Lilac','Butterfly Blush','Warm Neutrals']},
  {name:'Anniversary',short:'Anniversary',base:1000,templates:['garland','bouquet','backdrop','number','hoop'],palettes:['Burgundy Blush','Rose Champagne','Pearl & Gold']},
  {name:'Opening',short:'Opening',base:1600,templates:['arch','column','garland','backdrop'],palettes:['Midnight Gold','Citrus Play','Burgundy Blush']},
  {name:'Wedding',short:'Wedding',base:1900,templates:['hoop','arch','garland','backdrop'],palettes:['Warm Neutrals','Garden Sage','Pearl & Gold']}
];
const CURATED_PALETTES = [
  {name:'Rose Champagne',colors:['#d5a3a5','#f1dcd5','#c59a67'],themes:['Romantic','Elegant','Pastel']},
  {name:'Lavender Lilac',colors:['#9682c4','#d5c8ec','#f3eaf4'],themes:['Pastel','Modern','Butterfly']},
  {name:'Butterfly Blush',colors:['#efa7be','#e5d6ed','#ecd5ae'],themes:['Butterfly','Pastel','Whimsical']},
  {name:'Warm Neutrals',colors:['#d0bba5','#eee3d7','#9c8774'],themes:['Minimal','Elegant','Modern']},
  {name:'Garden Sage',colors:['#9db49a','#e8e4ce','#d4b2a3'],themes:['Garden','Elegant','Rustic']},
  {name:'Pearl & Gold',colors:['#f7f0e1','#d6b66b','#d8d0c4'],themes:['Elegant','Classic','Minimal']},
  {name:'Burgundy Blush',colors:['#7b3e53','#edc9cf','#d7b2a2'],themes:['Romantic','Elegant','Classic']},
  {name:'Candy Pastel',colors:['#ffa9c9','#b9d6ee','#f8dea0'],themes:['Pastel','Playful','Whimsical']},
  {name:'Sky & Cloud',colors:['#91b9d4','#f3f3ed','#d7d3eb'],themes:['Classic','Minimal','Pastel']},
  {name:'Citrus Play',colors:['#e8b94a','#ef876f','#7fae98'],themes:['Bright','Playful','Modern']},
  {name:'Midnight Gold',colors:['#303b53','#e5c16c','#f5eee0'],themes:['Elegant','Classic','Modern']},
  {name:'Evergreen Gold',colors:['#466d59','#dbb96e','#faf0dd'],themes:['Classic','Rustic','Elegant']}
];
const ARRANGEMENTS = [
  {id:'arch',name:'Full Balloon Arch',price:2800,type:'Arch',desc:'A full arch for entrances and photo areas.'},
  {id:'garland',name:'Organic Balloon Garland',price:1500,type:'Garland',desc:'A flowing, asymmetric backdrop accent.'},
  {id:'bouquet',name:'Personalized Balloon Bouquet',price:650,type:'Bouquet',desc:'A compact arrangement for gifting.'},
  {id:'column',name:'Statement Balloon Columns',price:1100,type:'Column',desc:'Freestanding columns for entryways.'},
  {id:'number',name:'Milestone Number Display',price:1850,type:'Number',desc:'Birthday milestone display with statement number balloons.'},
  {id:'backdrop',name:'Celebration Photo Backdrop',price:5200,type:'Backdrop',desc:'Photo-ready arrangement using an organic balloon wall.'},
  {id:'hoop',name:'Round Hoop Arrangement',price:2400,type:'Hoop',desc:'A circular frame accented with balloon clusters.'},
  {id:'cluster',name:'Freestanding Balloon Cluster',price:900,type:'Cluster',desc:'A cluster for a table corner or venue accent.'},
  {id:'centerpiece',name:'Table Centerpiece',price:750,type:'Centerpiece',desc:'A lower tabletop balloon arrangement.'},
  {id:'bubble',name:'Personalized Bubble Balloon',price:950,type:'Bubble Balloon',desc:'A clear-style balloon gift with decorative base.'},
  {id:'bobo',name:'Bobo Balloon Arrangement',price:950,type:'Bubble Balloon',desc:'A bubble balloon with gift-style base.'},
  {id:'rose60',name:'Rose Gold Milestone Arrangement',price:1850,type:'Number',desc:'A rose-gold inspired milestone arrangement.'}
];
const BIRTHDAY_FEATURES = [
  {name:'Rose Gold Birthday Display',image:'assets/birthday-rose-gold.jpg',price:2350,template:'number',desc:'A rose-gold and ivory display with floral balloons and metallic lettering.'},
  {name:'Lavender 18th Birthday Backdrop',image:'assets/birthday-lavender-18.jpg',price:6850,template:'backdrop',desc:'Lavender balloon wall with illuminated birthday signage and milestone numbers.'},
  {name:'Butterfly Birthday Backdrop',image:'assets/birthday-butterfly.jpg',price:5950,template:'backdrop',desc:'Pastel butterfly-themed setup with balloon garlands, florals, and display accents.'},
  {name:'Gold 50th Birthday Arrangement',image:'assets/birthday-gold-50.jpg',price:2650,template:'number',desc:'White, pink and gold milestone birthday arrangement with a balloon gift.'}
];
const CATALOG_STYLES = [
  {name:'Balloon Bouquet',template:'bouquet',price:0,desc:'A personalized balloon gift to match the occasion.'},
  {name:'Organic Garland',template:'garland',price:900,desc:'Layered balloons to frame a sign or backdrop.'},
  {name:'Table Centerpiece',template:'centerpiece',price:350,desc:'A compact feature for a reception or party table.'},
  {name:'Milestone Display',template:'number',price:1100,desc:'Statement details for a special milestone.'},
  {name:'Statement Columns',template:'column',price:650,desc:'Two freestanding accents for an entrance.'},
  {name:'Celebration Backdrop',template:'backdrop',price:3800,desc:'A photo area anchored with large balloon clusters.'},
  {name:'Full Balloon Arch',template:'arch',price:2600,desc:'A decorated arch for guests to pass through.'},
  {name:'Round Hoop Decor',template:'hoop',price:1700,desc:'A contemporary circular frame with balloons.'},
  {name:'Bubble Balloon Gift',template:'bubble',price:250,desc:'A transparent-look balloon with personalized details.'},
  {name:'Freestanding Cluster',template:'cluster',price:200,desc:'A versatile balloon accent for smaller spaces.'}
];

const DRAG_FIGURES = [
  {id:'welcome-sign',label:'Welcome Sign',icon:'▣',desc:'A sign or greeting board.'},
  {id:'main-cluster',label:'Main Cluster',icon:'●',desc:'A large balloon cluster.'},
  {id:'number-set',label:'Number Figure',icon:'18',desc:'Milestone numbers or initials.'},
  {id:'cake-accent',label:'Cake Table Accent',icon:'◔',desc:'A small front arrangement.'},
  {id:'floral-accent',label:'Floral Accent',icon:'✿',desc:'A floral or butterfly accent.'},
  {id:'gift-bobo',label:'Gift Balloon',icon:'◌',desc:'A bubble or gift balloon feature.'}
];
const FIGURE_SLOTS = [
  {id:'slot-backdrop',label:'Backdrop / main wall'},
  {id:'slot-left',label:'Left side'},
  {id:'slot-center',label:'Center focus'},
  {id:'slot-right',label:'Right side'}
];
function defaultFigureDraft(){return {'slot-backdrop':null,'slot-left':null,'slot-center':null,'slot-right':null};}
function getFigureById(id){return DRAG_FIGURES.find(item=>item.id===id)||null;}
let studioFigureDraft=defaultFigureDraft();
function startFigureDrag(ev,id){ev.dataTransfer.setData('text/plain',id);ev.dataTransfer.effectAllowed='copy';}
function allowFigureDrop(ev){ev.preventDefault();ev.dataTransfer.dropEffect='copy';}
function dropFigureOnSlot(ev,slotId){ev.preventDefault();const figureId=ev.dataTransfer.getData('text/plain');if(!getFigureById(figureId))return;studioFigureDraft[slotId]=figureId;render();toast('Figure placed in your draft layout.');}
function clearFigureSlot(slotId){studioFigureDraft[slotId]=null;renderSuggestionsSummaryOnly();render();}
function resetFigureDraft(){studioFigureDraft=defaultFigureDraft();renderSuggestionsSummaryOnly();render();toast('Draft layout reset.');}
function figureDraftSummary(){const picked=FIGURE_SLOTS.map(slot=>{const fig=getFigureById(studioFigureDraft[slot.id]);return fig?`${slot.label}: ${fig.label}`:'';}).filter(Boolean);return picked.length?picked.join(' · '):'No figures drafted yet';}
function figureLibraryMarkup(){return `<div class="figure-library">${DRAG_FIGURES.map(fig=>`<div class="figure-chip" draggable="true" ondragstart="startFigureDrag(event,'${fig.id}')" title="${escapeHTML(fig.desc)}"><span class="figure-chip-icon">${fig.icon}</span><div><strong>${escapeHTML(fig.label)}</strong><small>${escapeHTML(fig.desc)}</small></div></div>`).join('')}</div>`;}
function figureDraftMarkup(){return `<div class="draft-layout-card"><div class="draft-layout-head"><div><span class="step-label">DRAFT & DRAG</span><h3>Figure planner</h3><p class="muted tiny">Drag supported figures below to sketch the arrangement layout you want.</p></div><button type="button" class="btn ghost small" onclick="resetFigureDraft()">Reset</button></div>${figureLibraryMarkup()}<div class="draft-board">${FIGURE_SLOTS.map(slot=>{const fig=getFigureById(studioFigureDraft[slot.id]);return `<div class="draft-slot ${fig?'filled':''}" ondragover="allowFigureDrop(event)" ondrop="dropFigureOnSlot(event,'${slot.id}')"><span class="draft-slot-label">${escapeHTML(slot.label)}</span>${fig?`<div class="draft-placed"><span class="draft-placed-icon">${fig.icon}</span><strong>${escapeHTML(fig.label)}</strong><button type="button" aria-label="Remove ${escapeHTML(fig.label)}" onclick="clearFigureSlot('${slot.id}')">×</button></div>`:`<div class="draft-placeholder">Drop a figure here</div>`}</div>`;}).join('')}</div></div>`;}
let studioCustomOccasion='';
let studioSpecialRequest='';
let activeSuggestRejections=new Set();
let adminCatalogOccasion='Birthday';
let liveSuggestions=[];
let chosenPackageId=null;
if (!data.catalogPrices || typeof data.catalogPrices!=='object') data.catalogPrices={};
if (!Array.isArray(data.templates)) data.templates=[];
for (const t of ARRANGEMENTS) {
  const existing=data.templates.find(x=>x.id===t.id);
  if (!existing) data.templates.push({...t});
  else if (Number(existing.price)<=0) existing.price=t.price;
}
for (const t of data.templates) { if (!t.type) t.type=(ARRANGEMENTS.find(x=>x.id===t.id)?.type||'Cluster'); }
if (!data.settings) data.settings={themes:[],decorations:[]};
for (const item of ['Classic','Modern','Rustic','Romantic','Garden','Playful','Butterfly','Whimsical']) {
 if (!data.settings.themes.includes(item)) data.settings.themes.push(item);
}
if (!data.settings.decorations.includes('Butterfly accents')) data.settings.decorations.push('Butterfly accents');
for (const inquiry of data.inquiries) {
  if(inquiry.status==='Submitted') inquiry.status='Pending';
  if(inquiry.status==='Reviewed') inquiry.status='Responded';
}
const STATUSES=['Pending','Under Review','Revision Requested','Responded','Closed'];
function money(n){return '₱'+Math.round(Number(n)).toLocaleString('en-PH');}
function getOccasion(name){return OCCASIONS.find(x=>x.name===name)||OCCASIONS[OCCASIONS.length-1];}
function getTmpl(id){return data.templates.find(x=>x.id===id)||ARRANGEMENTS[0];}
function getCatalog(category){
 const event=getOccasion(category);
 return CATALOG_STYLES.map((item,i)=>{
  const featured=category==='Birthday'?BIRTHDAY_FEATURES[i]:null;
  const defaultPrice=featured?.price||Math.round((event.base+item.price)/50)*50;
  const id=event.name+'-'+(i+1);
  const p=Number(data.catalogPrices[id]);
  return {id,index:i+1,category:event.name,name:featured?.name||`${event.short} ${item.name}`,template:featured?.template||item.template,desc:featured?.desc||item.desc,image:featured?.image||null,price:Number.isFinite(p)&&p>0?p:defaultPrice};
 });
}
function getCategoryPackages(category){return getCatalog(category);}
function setStudioOccasion(next){occasion=next;activeSuggestRejections.clear();render();}
function setStudioTheme(next){theme=next;activeSuggestRejections.clear();renderSuggestions();}
function setStudioTemplate(next){selectedTemplate=next;activeSuggestRejections.clear();render();}
function setStudioColor(hex){colors[0]=hex;activeSuggestRejections.clear();drawStudio();renderSuggestions();}
function setStudioCustom(value){studioCustomOccasion=value;renderSuggestionsSummaryOnly();}
function setStudioRequest(value){studioSpecialRequest=value;renderSuggestionsSummaryOnly();}
function occasionOptions(){return OCCASIONS.map(c=>`<option value="${escapeHTML(c.name)}" ${c.name===occasion?'selected':''}>${escapeHTML(c.name)}</option>`).join('');}
function templateOptions(){return data.templates.map(t=>`<option value="${escapeHTML(t.id)}" ${t.id===selectedTemplate?'selected':''}>${escapeHTML(t.name)}</option>`).join('');}
const GALLERY_EXTRA = [
 {name:'Balloonera Party Needs Storefront',image:'assets/balloonera-storefront.jpg',category:'Our Store',desc:'Storefront of Balloonera Party Needs in Las Piñas.'},
 {name:'Balloonera Store Location',image:'assets/balloonera-building.jpg',category:'Our Store',desc:'Balloonera Party Needs store building in Las Piñas.'},
 {name:'The Balloonera Team',image:'assets/balloonera-team.jpg',category:'Our Team',desc:'Staff of Balloonera Party Needs, as pictured in the research paper.'}
];
let activeGalleryFilter='All Photos';
function filterPortfolio(kind){activeGalleryFilter=kind;const cards=document.querySelectorAll('.portfolio-card');cards.forEach(c=>{c.hidden=kind!=='All Photos'&&c.dataset.category!==kind;});document.querySelectorAll('.portfolio-filter').forEach(b=>{b.classList.toggle('selected',b.dataset.filter===kind);b.setAttribute('aria-pressed',String(b.dataset.filter===kind));});}
function openExtraGalleryPhoto(i){const p=GALLERY_EXTRA[i];if(!p)return;showModal(`<div class="photo-modal"><img src="${p.image}" alt="${escapeHTML(p.name)}"><h2>${escapeHTML(p.name)}</h2><p class="muted">${escapeHTML(p.desc)}</p></div>`);}
function realGallery(){
 const cards=BIRTHDAY_FEATURES.map((item,i)=>`<button class="portfolio-card" data-category="Balloon Arrangements" ${activeGalleryFilter==='All Photos'||activeGalleryFilter==='Balloon Arrangements'?'':'hidden'} onclick="openRealPhoto(${i})" aria-label="View ${escapeHTML(item.name)}"><img src="${item.image}" alt="${escapeHTML(item.name)} from Balloonera Party Needs" loading="lazy"><span class="portfolio-info"><span>Balloon arrangements</span><strong>${escapeHTML(item.name)}</strong></span></button>`).join('');
 const extra=GALLERY_EXTRA.map((item,i)=>`<button class="portfolio-card" data-category="${item.category}" ${activeGalleryFilter==='All Photos'||activeGalleryFilter===item.category?'':'hidden'} onclick="openExtraGalleryPhoto(${i})" aria-label="View ${escapeHTML(item.name)}"><img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy"><span class="portfolio-info"><span>${escapeHTML(item.category)}</span><strong>${escapeHTML(item.name)}</strong></span></button>`).join('');
 return `<section class="section portfolio-section" id="our-work"><div class="editorial-heading"><div><span class="eyebrow">OUR PHOTO ALBUM</span><h2>From Balloonera, with care.</h2><p>Balloon arrangements from the submitted photos and business photographs from your research paper.</p></div><button class="text-link" onclick="selectPackageCategory('Birthday');go('packages')">Explore birthday packages ↗</button></div><div class="portfolio-filters">${['All Photos','Balloon Arrangements','Our Store','Our Team'].map(kind=>`<button class="portfolio-filter ${activeGalleryFilter===kind?'selected':''}" data-filter="${kind}" aria-pressed="${activeGalleryFilter===kind}" onclick="filterPortfolio('${kind}')">${kind}</button>`).join('')}</div><div class="portfolio-grid">${cards}${extra}</div></section>`;
}
gallerySection=realGallery;
function openRealPhoto(i){const p=BIRTHDAY_FEATURES[i];if(!p)return;showModal(`<div class="photo-modal"><img src="${p.image}" alt="${escapeHTML(p.name)}"><h2>${escapeHTML(p.name)}</h2><p class="muted">${escapeHTML(p.desc)}</p><div class="row"><span>Illustrative starting price</span><strong>${money(p.price)}</strong></div><p class="tiny muted">Sample price for demonstration only. The owner confirms the actual price.</p><div class="actions">${btn('Explore Birthday Packages',"closeModal();selectPackageCategory('Birthday');go('packages')")}</div></div>`);}
home=function(){return `<section class="hero home-editorial"><div class="hero-copy"><div class="eyebrow">BALLOONERA PARTY NEEDS · LAS PIÑAS</div><h1>Celebrate the moment.<br><em>We’ll help with the details.</em></h1><p>Balloon decorations, personalized gifts and DIY party supplies. Browse real celebrations, choose a starting design, and make it your own.</p><div class="actions">${btn('Browse our packages','go("packages")')}${btn('Try drag & drop','go("studio")','btn secondary')}</div><div class="hero-smallprint"><span>Personalized balloon arrangements</span><span>•</span><span>DIY party supplies</span></div></div><div class="hero-brand-panel"><img src="assets/balloonera-official-logo.png" alt="Balloonera Party Needs Store official logo" class="hero-brand-image"></div></section><div class="benefit-strip"><span>01 <strong>Choose your occasion</strong></span><span>02 <strong>Explore color combinations</strong></span><span>03 <strong>Send your design inquiry</strong></span></div>${realGallery()}<section class="home-callout"><div><span class="eyebrow">MAKE IT PERSONAL</span><h2>A decoration that feels like yours.</h2><p>Choose an arrangement, adjust supported colors and details, then share your design with Balloonera for review.</p></div>${btn('Open the Design Studio','go("studio")')}</section>`;};
packages=function(){
 const current=getOccasion(activePackageCategory);
 const list=getCatalog(current.name);
 return `<section class="collection-intro"><div class="eyebrow">OUR COLLECTION</div><h1>Find the right arrangement<br>for your occasion.</h1><p>Browse starting ideas and sample prices. Every design may be discussed and adjusted with the owner.</p></section><div class="catalog-layout"><aside class="catalog-side"><h3>Shop by occasion</h3><div class="package-category-tabs" role="group" aria-label="Occasion categories">${OCCASIONS.map(cat=>`<button type="button" class="package-category-tab ${cat.name===current.name?'selected':''}" onclick="selectPackageCategory('${cat.name.replace(/'/g,"\\'")}')" aria-pressed="${cat.name===current.name}">${escapeHTML(cat.name)}</button>`).join('')}</div></aside><div class="catalog-content"><div class="catalog-title-row"><div><span class="eyebrow">${escapeHTML(current.name).toUpperCase()}</span><h2>${escapeHTML(current.name)} packages</h2><p>${list.length} starting ideas · Select a design to view details</p></div><span class="small-outline">SAMPLE PRICES</span></div><div class="catalog-grid">${list.map(item=>`<article class="catalog-card"><div class="catalog-image">${item.image?`<img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy">`:`<div class="illustration-wrap">${balloonSvg(item.template, getOccasionColors(item.category))}<span>Arrangement illustration</span></div>`}</div><div class="catalog-card-body"><span class="catalog-type">${escapeHTML(getTmpl(item.template).type||'Arrangement')}</span><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.desc)}</p><div class="catalog-card-foot"><div><small>Sample starting at</small><strong>${money(item.price)}</strong></div><button class="outline-arrow" onclick="openCatalogPackage('${item.id.replace(/'/g,"\\'")}')">View details ↗</button></div></div></article>`).join('')}</div><div class="pricing-note"><strong>A note on pricing</strong><p>All prices shown are illustrative starting rates for this academic prototype. The owner will review each inquiry, discuss the specific design and provide the final quotation. No payment or confirmed booking happens here.</p></div></div></div>`;
};
function getOccasionColors(name){const n=getOccasion(name).palettes[0];return [...(CURATED_PALETTES.find(p=>p.name===n)?.colors||CURATED_PALETTES[0].colors)];}
function openCatalogPackage(id){
 const [category]=OCCASIONS.filter(c=>id.startsWith(c.name+'-'));
 if(!category)return;
 const item=getCatalog(category.name).find(p=>p.id===id);if(!item)return;
 showModal(`<div class="catalog-modal">${item.image?`<img class="modal-preview-image" src="${item.image}" alt="${escapeHTML(item.name)}">`:`<div class="modal-preview-illustration">${balloonSvg(item.template,getOccasionColors(item.category))}</div>`}<span class="eyebrow">${escapeHTML(item.category)}</span><h2>${escapeHTML(item.name)}</h2><p class="muted">${escapeHTML(item.desc)}</p><div class="catalog-modal-price"><span>Sample starting price</span><strong>${money(item.price)}</strong></div><p class="tiny muted">Photo (where shown): supplied real Balloonera work. Pricing: illustrative, subject to owner review. Design preview may differ from the finished arrangement.</p><div class="actions">${btn('Use as my starting design',`chooseCatalogPackage('${item.id.replace(/'/g,"\\'")}')`)}${btn('Close','closeModal()','btn secondary')}</div></div>`);
}
function chooseCatalogPackage(id){
 const cat=OCCASIONS.find(c=>id.startsWith(c.name+'-'));
 const item=cat&&getCatalog(cat.name).find(p=>p.id===id);
 if(!item)return;
 occasion=cat.name; selectedTemplate=item.template; chosenPackageId=id;colors=getOccasionColors(occasion);activeSuggestRejections.clear();closeModal();go('studio');
}
function selectPackageCategory(category){if(!OCCASIONS.find(x=>x.name===category))return;activePackageCategory=category;if(page==='packages'&&role==='customer')render();}
function makeSuggestionSet(){
 const o=getOccasion(occasion);
 const matches=[];
 const preferred=new Set([selectedTemplate,...o.templates]);
 const ranked=[...data.templates].sort((a,b)=>{
  function score(t){let s=0;if(t.id===selectedTemplate)s+=100;if(o.templates.includes(t.id))s+=45-o.templates.indexOf(t.id)*7;if(Array.isArray(t.occasionTags)&&t.occasionTags.includes(o.name))s+=40;
   if(getTmpl(selectedTemplate).type===t.type)s+=8;return s;}
  return score(b)-score(a);
 });
 const candidates=ranked.slice(0,Math.min(6,ranked.length));
 const paletteOrder=[...CURATED_PALETTES].sort((a,b)=>{
  function score(p){let s=0;if(o.palettes.includes(p.name))s+=60-o.palettes.indexOf(p.name)*9;if(p.themes.includes(theme))s+=34;
   if(colors?.[0]&&p.colors.some(c=>c.toLowerCase()===colors[0].toLowerCase()))s+=5;return s;}
  return score(b)-score(a);
 });
 const count=Math.min(5,candidates.length);
 for(let i=0;i<count;i++){
  let t=candidates[i],pal=paletteOrder[i%paletteOrder.length];
  if(i===1&&paletteOrder[0])pal=paletteOrder[0];
  matches.push({template:t,palette:pal,id:`${t.id}|${pal.name}`,reason: t.id===selectedTemplate?'Matches your chosen arrangement type':o.templates.includes(t.id)?`Common starting idea for ${o.short.toLowerCase()}`:'An alternative supported arrangement'});
 }
 return matches;
}
function getPalette(name){return CURATED_PALETTES.find(p=>p.name===name)||CURATED_PALETTES[0];}
function applyRecommended(id){const suggestion=liveSuggestions.find(x=>x.id===id);if(!suggestion)return;
 selectedTemplate=suggestion.template.id;colors=[...suggestion.palette.colors];activeSuggestRejections.clear();render();toast('Recommended arrangement and colors applied.');}
function rejectRecommended(id){activeSuggestRejections.add(id);renderSuggestions();}
function applyCuratedPalette(name){colors=[...getPalette(name).colors];drawStudio();renderSuggestions();toast('Color combination applied.');}
function getStudioSummary(){return `<dl class="summary-data"><div><dt>Occasion</dt><dd>${escapeHTML(occasion)}</dd></div><div><dt>Arrangement</dt><dd>${escapeHTML(getTmpl(selectedTemplate).name)}</dd></div><div><dt>Theme</dt><dd>${escapeHTML(theme)}</dd></div><div><dt>Balloon size / shape</dt><dd>${escapeHTML(size)} / ${escapeHTML(shape)}</dd></div><div><dt>Quantity</dt><dd>${quantity}</dd></div><div><dt>Decorative accent</dt><dd>${escapeHTML(decoration)}</dd></div><div><dt>Drafted figures</dt><dd>${escapeHTML(figureDraftSummary())}</dd></div>${studioSpecialRequest?`<div><dt>Notes for owner</dt><dd>${escapeHTML(studioSpecialRequest)}</dd></div>`:''}</dl>`;}
renderSuggestions=function(){
 const wrap=$('#suggestions');
 liveSuggestions=makeSuggestionSet();
 if(wrap)wrap.innerHTML=liveSuggestions.filter(s=>!activeSuggestRejections.has(s.id)).map((s,i)=>`<article class="recommendation"><div class="recommendation-top"><span>OPTION ${String(i+1).padStart(2,'0')}</span><button onclick="rejectRecommended('${s.id}')" aria-label="Reject ${escapeHTML(s.template.name)} suggestion">×</button></div><h4>${escapeHTML(s.template.name)}</h4><p>${escapeHTML(s.reason)} · ${escapeHTML(s.palette.name)} color palette.</p><div class="palette-dots" aria-label="Palette preview">${s.palette.colors.map(c=>`<span style="background:${c}" title="${c}"></span>`).join('')}</div><div class="recommend-actions"><button onclick="applyRecommended('${s.id}')">Use design + colors</button><button onclick="applyCuratedPalette('${s.palette.name}')">Colors only</button></div></article>`).join('')||`<p class="muted">All current suggestions have been dismissed. Change the occasion, theme or arrangement to see new options.</p>`;
 const summary=$('#summary');if(summary)summary.innerHTML=getStudioSummary();
};
renderSuggestionsSummaryOnly=function(){refreshStudioEstimate();const summary=$('#summary');if(summary)summary.innerHTML=getStudioSummary();};
function studioSwatchPicker(){const swatches=['#f2d9d9','#bd91a9','#a589cd','#98bdc5','#dfc18e','#f8f0e3','#bb6d70','#a1b9a4','#4f6e82','#ad8c73','#d69a50','#4e4356'];return `<div class="swatches">${swatches.map(c=>`<button type="button" class="swatch ${colors[0]===c?'selected':''}" style="background:${c}" title="${c}" aria-label="Choose ${c}" onclick="setStudioColor('${c}')"></button>`).join('')}<label class="color-custom" title="Choose another color"><input type="color" value="${colors[0]}" aria-label="Custom balloon color" oninput="setStudioColor(this.value)"></label></div>`;}
studio=function(){
 const t=getTmpl(selectedTemplate);
 return `<div class="studio-heading"><div><span class="eyebrow">BALLOONERA DESIGN STUDIO</span><h1>Make it <em>your celebration.</em></h1><p>Try a supported arrangement and explore compatible color combinations before submitting a design inquiry.</p></div><span class="studio-caption">Interactive preview · Academic prototype</span></div><div class="layout studio-layout"><section class="panel design-controls"><div class="studio-panel-title"><span class="step-label">01 / YOUR DESIGN</span><h3>Customize your arrangement</h3></div><div class="field"><label for="template">Arrangement template</label><select id="template" onchange="setStudioTemplate(this.value)">${templateOptions()}</select></div><div class="field"><label for="studioOccasion">Occasion</label><select id="studioOccasion" onchange="setStudioOccasion(this.value)">${occasionOptions()}</select></div><div class="field"><label for="studioTheme">Preferred theme</label><select id="studioTheme" onchange="setStudioTheme(this.value)">${data.settings.themes.map(x=>`<option ${x===theme?'selected':''}>${escapeHTML(x)}</option>`).join('')}</select></div><div class="field"><label for="studioShape">Balloon shape</label><select id="studioShape" onchange="shape=this.value;drawStudio()">${['Round','Heart','Oval'].map(x=>`<option ${x===shape?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label for="studioSize">Balloon size</label><select id="studioSize" onchange="size=this.value;drawStudio()">${['Small','Medium','Large'].map(x=>`<option ${x===size?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label for="studioQuantity">Balloon quantity: <strong id="qtylabel">${quantity}</strong></label><input id="studioQuantity" type="range" min="8" max="60" value="${quantity}" oninput="quantity=+this.value;$('#qtylabel').textContent=quantity;drawStudio()"></div><div class="field"><label>Preferred balloon colors</label>${studioSwatchPicker()}</div><div class="field"><label for="studioDecor">Additional accents</label><select id="studioDecor" onchange="decoration=this.value;drawStudio()"><option ${decoration==='None'?'selected':''}>None</option>${data.settings.decorations.map(x=>`<option ${x===decoration?'selected':''}>${escapeHTML(x)}</option>`).join('')}</select></div><div class="field"><label for="balloonMessage">Personalized balloon lettering</label><textarea id="balloonMessage" maxlength="60" rows="2" placeholder="e.g. Happy Birthday, Maria!" oninput="balloonMessage=this.value;updateBalloonText()">${escapeHTML(balloonMessage)}</textarea></div><div class="field"><label for="balloonTextColor">Lettering color</label><input id="balloonTextColor" type="color" value="${textColor}" oninput="textColor=this.value;updateBalloonText()"></div><div class="field"><label for="specialRequest">Additional details for the owner (optional)</label><textarea id="specialRequest" rows="3" maxlength="300" placeholder="Your requested arrangement details. Suggestions still use supported templates." oninput="setStudioRequest(this.value)">${escapeHTML(studioSpecialRequest)}</textarea></div><div class="notice">The preview is illustrative. Exact materials, placement and final costs must be confirmed by the owner.</div></section><section class="panel studio-preview"><div class="studio-panel-title"><span class="step-label">02 / PREVIEW</span><div class="row"><h3>Your arrangement preview</h3><span class="stat">ROTATABLE</span></div></div>${directDragToolsMarkup()}<div class="canvas-wrap drag-stage" id="canvaswrap" ondragover="allowPreviewDrop(event)" ondrop="dropFigureOnPreview(event)" onclick="placeSelectedFigure(event)"><span class="canvas-label">Drag to rotate · Scroll to zoom</span><canvas id="balloonCanvas" aria-label="Rotatable balloon arrangement preview"></canvas><div class="personalized-message canvas-message" id="personalizedMessage" aria-live="polite"></div><div class="figure-overlay" id="figureOverlay">${previewMarkersMarkup()}</div><div class="preview-drag-hint" id="previewDragHint">Drop a figure onto the design</div></div><div class="canvas-bottom"><span class="hint">An illustrative 3D-style preview, not a photograph or production drawing.</span><div>${btn('Reset view','rotation=.3;tilt=.15;zoom=1;drawStudio()','btn ghost small')} ${btn('Rotate','rotation+=.45;drawStudio()','btn ghost small')}</div></div><div class="preview-bottom"><div><strong>${escapeHTML(t.name)}</strong><p id="studioLiveEstimate"></p></div>${btn('Save design','saveDesign()')}</div><div class="preview-submit">${btn('Submit design inquiry ↗','openInquiry()','btn secondary')}</div></section><aside class="panel recommendation-panel"><div class="studio-panel-title"><span class="step-label">03 / IDEAS FOR YOU</span><h3>Design Suggestions AI</h3><p>Recommendations combine your occasion, chosen theme, preferred arrangement and available color palettes. These are predefined prototype rules, not a live AI model.</p></div><div id="suggestions"></div><div class="divider"></div><h3>Current design</h3><div id="summary"></div></aside></div>`;
};
/* Keep one rotatable visual implementation for all arrangements; no missing external .glb assets. */
function layoutPoints(kind,n){const pts=[];for(let i=0;i<n;i++){
 const t=i/Math.max(1,n-1),angle=i*2.399963;let x=0,y=0,z=Math.sin(i*2.15)*20;
 if(kind==='Arch'){let a=Math.PI*(1-t);x=145*Math.cos(a);y=-122*Math.sin(a)+68;}
 else if(kind==='Garland'){x=-150+300*t;y=-76+135*t+Math.sin(i*.93)*14;z=Math.cos(i*1.9)*25;}
 else if(kind==='Bouquet'){let r=110*Math.sqrt(t);x=r*Math.cos(angle);y=-100+55*Math.sin(angle)+70*t;z=r*.45*Math.sin(angle);}
 else if(kind==='Column'){x=(i%2?95:-95)+12*Math.sin(i);y=96-Math.floor(i/2)*23;}
 else if(kind==='Number'){x=-125+250*t+22*Math.sin(i*1.2);y=105-180*Math.sin(Math.PI*t);z=Math.sin(i*3)*28;}
 else if(kind==='Backdrop'){let row=i%8,col=Math.floor(i/8);x=-155+col*43;y=-112+row*34+Math.sin(i)*8;z=Math.cos(i*1.3)*15;}
 else if(kind==='Hoop'){let a=t*Math.PI*2;x=135*Math.cos(a);y=120*Math.sin(a)-15;z=Math.sin(i*.87)*24;}
 else if(kind==='Cluster'){let r=120*Math.sqrt(t);x=Math.cos(angle)*r;y=-25+90*Math.sin(angle)*Math.sqrt(t);}
 else if(kind==='Centerpiece'){let r=120*Math.sqrt(t);x=r*Math.cos(angle);y=78+40*Math.sin(angle)-100*(1-t);z=Math.sin(i)*24;}
 else {let a=i*Math.PI*2/n;x=70*Math.cos(a);y=80+58*Math.sin(a)-95*(i%4===0);}
 pts.push({x,y,z});
}return pts;}
drawStudio=function(){
 const canvas=$('#balloonCanvas');if(!canvas)return;const rect=canvas.getBoundingClientRect();const w=Math.max(120,rect.width),h=Math.max(120,rect.height),dpr=Math.min(2,devicePixelRatio||1);
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
 ctx.save();ctx.translate(w/2,h*.54);const scale=Math.min(w/410,h/405)*zoom;ctx.scale(scale,scale);
 ctx.fillStyle='rgba(55,49,42,.09)';ctx.beginPath();ctx.ellipse(0,148,144,20,0,0,Math.PI*2);ctx.fill();
 const t=getTmpl(selectedTemplate);let kind=t.type||'Cluster';let positions=layoutPoints(kind,Math.max(8,quantity)).map((p,i)=>{
 const x=p.x*Math.cos(rotation)+p.z*Math.sin(rotation),z=p.z*Math.cos(rotation)-p.x*Math.sin(rotation);
 return {x,y:p.y*Math.cos(tilt)-z*Math.sin(tilt),z,color:colors[i%colors.length]||'#ead6d9'};
 }).sort((a,b)=>a.z-b.z);
 if(kind==='Hoop'){ctx.strokeStyle='#aa997f';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,-7,135,122,0,0,Math.PI*2);ctx.stroke();}
 if(kind==='Backdrop'){ctx.fillStyle='#eae3da';ctx.fillRect(-167,-129,334,288);}
 if(kind==='Bouquet'||kind==='Bubble Balloon'){ctx.strokeStyle='#baad9b';ctx.lineWidth=1.4;positions.forEach(p=>{ctx.beginPath();ctx.moveTo(p.x,p.y+8);ctx.lineTo(0,148);ctx.stroke();});}
 for (const p of positions){const r=(size==='Small'?17:size==='Large'?26:21)*(1+p.z/500);let sx=shape==='Oval'?.79:.88,sy=shape==='Oval'?1.25:1;
 ctx.save();ctx.translate(p.x,p.y);ctx.scale(sx,sy);ctx.shadowColor='rgba(40,35,35,.14)';ctx.shadowBlur=9;ctx.shadowOffsetY=3;
 const grad=ctx.createRadialGradient(-r*.35,-r*.46,1,1,3,r*1.55);grad.addColorStop(0,'#ffffff');grad.addColorStop(.2,p.color);grad.addColorStop(1,shadeColor(p.color,-17));
 ctx.beginPath();ctx.ellipse(0,0,r,r*1.07,0,0,Math.PI*2);ctx.fillStyle=grad;ctx.fill();ctx.shadowColor='transparent';
 ctx.strokeStyle='rgba(35,25,35,.065)';ctx.lineWidth=.8;ctx.stroke();ctx.restore();}
 if(kind==='Bubble Balloon'){ctx.save();ctx.globalAlpha=.32;ctx.fillStyle='#fff';ctx.strokeStyle='#c4bcb3';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,-72,78,83,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.restore();}
 if(decoration==='Ribbon'){ctx.strokeStyle='#b98e82';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-17,122);ctx.quadraticCurveTo(-5,170,11,128);ctx.stroke();}
 if(['Stars','Confetti','Flowers','Butterfly accents'].includes(decoration)){ctx.fillStyle='#b89d63';ctx.font='24px Georgia';for(let i=0;i<7;i++)ctx.fillText(decoration==='Flowers'?'✿':decoration==='Butterfly accents'?'❧':'✦',Math.sin(i*7.2)*138,Math.cos(i*4.7)*100);}
 ctx.restore();renderSuggestionsSummaryOnly();updateBalloonText();
};
function shadeColor(hex,percent){let h=(hex||'#cccccc').replace('#','');if(h.length!==6)return hex;const v=parseInt(h,16);const adj=n=>Math.max(0,Math.min(255,n+percent));return `rgb(${adj((v>>16)&255)},${adj((v>>8)&255)},${adj(v&255)})`;}
/* No automatic final or quantity-based quotation: starting prices are reference-only. */
estimateForDesign=function(d){const t=getTmpl(d?.template);return {name:t.name,amount:null,startingPrice:Number(t.price)||null,quantity:Math.max(8,Math.min(60,Number(d?.quantity)||28))};};
refreshStudioEstimate=function(){const el=$('#studioLiveEstimate');if(el){const t=getTmpl(selectedTemplate);el.textContent=(Number(t.price)>0?`Sample starting at ${money(t.price)}`:'Price upon inquiry')+' · Final quotation by owner';}};
updateInquiryEstimate=function(q){const field=$('#inquiryQuantity');if(field){const qty=Math.max(8,Math.min(60,Number(q)||28));field.value=qty;const slider=$('#inquiryQuantitySlider');if(slider)slider.value=qty;const note=$('#inquiryEstimateBreakdown');if(note)note.textContent='Quantity is recorded for the owner’s review. It does not change the starting-price reference.';}};
currentDesign=function(){return {template:selectedTemplate,occasion,theme,shape,size,quantity,decoration,colors:[...colors],balloonMessage,textColor,customOccasionName:studioCustomOccasion,additionalRequest:studioSpecialRequest,packageId:chosenPackageId,figureDraft:{...studioFigureDraft},figureMarkers:draftMarkers.map(m=>({...m}))};};
loadDesign=function(d){selectedTemplate=d.template;occasion=OCCASIONS.some(x=>x.name===d.occasion)?d.occasion:OCCASIONS[0].name;theme=d.theme;shape=d.shape;size=d.size;quantity=d.quantity;decoration=d.decoration;colors=[...(d.colors||getOccasionColors(occasion))];balloonMessage=d.balloonMessage||'';textColor=d.textColor||'#42323d';studioCustomOccasion=d.customOccasionName||'';studioSpecialRequest=d.additionalRequest||'';chosenPackageId=d.packageId||null;studioFigureDraft={...defaultFigureDraft(),...(d.figureDraft||{})};draftMarkers=Array.isArray(d.figureMarkers)?d.figureMarkers.map(m=>({...m})):legacyMarkersFromSlots(d.figureDraft);selectedDraftFigure=null;go('studio');};
openInquiry=function(designId){
 if(isGuest){openAuthModal();return;}
 const d=data.designs.find(x=>x.id===(designId||activeDesign));if(!d){toast('Save your design before sending an inquiry.');return;}
 const price=getTmpl(d.template).price;
 showModal(`<h2>Send your design inquiry</h2><p class="muted">${escapeHTML(d.name)} · This is a request for consultation, not an order.</p><form id="inquiryForm" onsubmit="submitInquiry(event,'${d.id}')"><div class="formgrid"><div class="field"><label>Full name</label><input name="customer" required maxlength="80" placeholder="Your name"></div><div class="field"><label>Contact number or email</label><input name="contact" required maxlength="100" placeholder="How can the owner contact you?"></div><div class="field"><label>Event date</label><input name="date" type="date" required></div><div class="field"><label>Occasion</label><input name="event" maxlength="80" value="${escapeHTML(d.occasion==='Other / Custom Occasion'&&d.customOccasionName?d.customOccasionName:d.occasion)}" required></div></div><div class="field"><label>Additional requests</label><textarea name="notes" rows="3" maxlength="500" placeholder="Any changes, special notes or setup details">${escapeHTML(d.additionalRequest||'')}</textarea></div><section class="inquiry-estimate"><div class="estimate-head"><span>Price reference</span><span class="estimate-tag">NOT A FINAL QUOTE</span></div><div class="estimate-quantity"><label for="inquiryQuantity">Requested balloon quantity</label><input id="inquiryQuantity" name="balloonQuantity" type="number" min="8" max="60" step="1" required value="${d.quantity}" oninput="updateInquiryEstimate(this.value)"></div><input id="inquiryQuantitySlider" class="estimate-slider" type="range" min="8" max="60" step="1" value="${d.quantity}" aria-label="Balloon quantity" oninput="updateInquiryEstimate(this.value)"><div class="estimate-row"><span>${escapeHTML(getTmpl(d.template).name)}</span><strong>${price>0?'Starting at '+money(price):'Price upon inquiry'}</strong></div><p id="inquiryEstimateBreakdown" class="estimate-breakdown">Quantity is recorded for owner review; it does not change the starting price.</p><p class="estimate-disclaimer">This is an illustrative starting price only. The owner reviews your design and discusses the final quotation outside this website.</p></section><div class="actions"><button type="submit" class="btn">Submit inquiry</button></div></form>`);
};
submitInquiry=function(e,designId){e.preventDefault();const f=new FormData(e.target);const design=data.designs.find(x=>x.id===designId);if(!design)return toast('Saved design not found.');const qty=Number(f.get('balloonQuantity'));if(!Number.isInteger(qty)||qty<8||qty>60)return toast('Choose a balloon quantity between 8 and 60.');
 const t=getTmpl(design.template);const item={id:'INQ-'+id().slice(0,5),designId,customer:String(f.get('customer')).trim(),contact:String(f.get('contact')).trim(),date:f.get('date'),event:String(f.get('event')).trim(),notes:String(f.get('notes')||'').trim(),balloonQuantity:qty,startingPriceReference:Number(t.price)||null,startingTemplate:t.name,status:'Pending',feedback:'',created:new Date().toLocaleDateString(),revisions:0};
 data.inquiries.unshift(item);save();closeModal();go('inquiries');toast('Demo inquiry submitted for owner review.');
};
statusClass=function(s){return s==='Revision Requested'?'revision':['Responded','Closed'].includes(s)?'closed':'';};
viewInquiry=function(i){
 const x=data.inquiries.find(a=>a.id===i);if(!x)return;const d=data.designs.find(a=>a.id===x.designId);const ref=x.startingPriceReference??(d?getTmpl(d.template).price:null);
 showModal(`<h2>${escapeHTML(x.id)}</h2><span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span><p class="muted">${escapeHTML(x.event)} · Event date: ${escapeHTML(x.date)}</p><div class="inquiry-details"><p><b>Customer:</b> ${escapeHTML(x.customer)}</p><p><b>Contact:</b> ${escapeHTML(x.contact)}</p><p><b>Saved design:</b> ${escapeHTML(d?.name||'Unavailable')}</p><p><b>Drag & drop figures:</b> ${escapeHTML(describeSavedFigureMarkers(d))}</p><p><b>Requested balloons:</b> ${x.balloonQuantity??d?.quantity??'Not recorded'}</p><p><b>Sample starting reference:</b> ${ref?money(ref):'Not set'}</p><p><b>Notes:</b> ${escapeHTML(x.notes||'None')}</p></div>${x.feedback?`<div class="notice"><b>Owner feedback:</b> ${escapeHTML(x.feedback)}</div>`:''}${x.status==='Revision Requested'&&role==='customer'?`<p class="tiny muted">You can update and resubmit this design under the same inquiry.</p>${btn('Revise my design',`reviseInquiry('${x.id}')`)}`:role==='admin'?`<div class="field"><label>Inquiry status</label><select id="newStatus">${STATUSES.map(s=>`<option ${s===x.status?'selected':''}>${s}</option>`).join('')}</select></div><div class="field"><label>Owner feedback or revision request</label><textarea id="feedback" rows="3">${escapeHTML(x.feedback||'')}</textarea></div><div class="notice">Final price discussions, confirmations and payments occur outside the website.</div>${btn('Save inquiry status',`updateInquiry('${x.id}')`)}`:`<p class="tiny muted">The owner will review your request and discuss the final quotation with you outside the website.</p>`}`);
};
resubmitRevision=function(){const x=data.inquiries.find(q=>q.id===editingInquiry);if(!x)return;const d=data.designs.find(v=>v.id===x.designId);if(d)Object.assign(d,currentDesign());x.status='Pending';x.revisions++;x.feedback='';editingInquiry=null;save();go('inquiries');toast('Revised design sent under the same inquiry.');};
function ownerCatalog(){const items=getCatalog(adminCatalogOccasion);return `<section class="section panel owner-catalog"><div class="row"><div><span class="step-label">EVENT PACKAGES</span><h3>Package starting prices</h3><p class="muted tiny">Edit these sample starting prices as the owner. These are not final customer quotations.</p></div><div class="field"><label for="ownerCategory">Occasion</label><select id="ownerCategory" onchange="adminCatalogOccasion=this.value;render()">${OCCASIONS.map(c=>`<option value="${escapeHTML(c.name)}" ${c.name===adminCatalogOccasion?'selected':''}>${escapeHTML(c.name)}</option>`).join('')}</select></div></div><div class="owner-package-grid">${items.map(p=>`<div class="owner-price-item"><div><strong>${escapeHTML(p.name)}</strong><small>Starting at ${money(p.price)}</small></div><button class="btn ghost small" onclick="ownerEditCatalog('${p.id.replace(/'/g,"\\'")}')">Edit</button></div>`).join('')}</div></section>`;}
function ownerEditCatalog(id){const category=OCCASIONS.find(c=>id.startsWith(c.name+'-'));const p=category&&getCatalog(category.name).find(p=>p.id===id);if(!p)return;
 showModal(`<h2>Edit sample starting price</h2><p class="muted">${escapeHTML(p.name)}</p><form onsubmit="saveOwnerCatalog(event,'${id.replace(/'/g,"\\'")}')"><div class="field"><label>Starting price in PHP</label><input name="price" type="number" min="1" step="50" value="${p.price}" required></div><div class="notice">This is a reference price. Actual quotations must be discussed by the owner.</div><button class="btn" type="submit">Save starting price</button></form>`);}
function saveOwnerCatalog(e,id){e.preventDefault();const price=Number(new FormData(e.target).get('price'));if(!Number.isFinite(price)||price<=0)return;data.catalogPrices[id]=price;save();closeModal();render();toast('Sample package starting price saved.');}
function addTemplateForm(){showModal(`<h2>Add an arrangement template</h2><p class="muted">New templates are available for customers to choose. They will use the closest supported preview layout.</p><form onsubmit="saveNewTemplate(event)"><div class="field"><label>Template name</label><input name="name" maxlength="70" required></div><div class="field"><label>Preview layout</label><select name="type">${['Arch','Garland','Bouquet','Column','Number','Backdrop','Hoop','Cluster','Centerpiece','Bubble Balloon'].map(v=>`<option>${v}</option>`).join('')}</select></div><div class="field"><label>Description</label><textarea name="desc" maxlength="180"></textarea></div><div class="field"><label>Compatible occasions (comma separated, optional)</label><input name="occasionTags" placeholder="e.g. Birthday, Graduation"></div><div class="field"><label>Sample starting price</label><input name="price" type="number" min="0" value="950" required></div><button class="btn">Add template</button></form>`);}
function saveNewTemplate(e){e.preventDefault();const f=new FormData(e.target);const name=String(f.get('name')).trim();if(!name)return;const newId='custom-'+id().toLowerCase();data.templates.push({id:newId,name,type:f.get('type'),desc:f.get('desc'),price:Number(f.get('price'))||0,occasionTags:String(f.get('occasionTags')||'').split(',').map(x=>x.trim()).filter(x=>OCCASIONS.some(o=>o.name===x))});save();closeModal();render();toast('New arrangement template added.');}
admin=function(){const rev=data.inquiries.filter(x=>x.status==='Revision Requested').length;return `${title('Owner Dashboard','Review customization inquiries and manage supported templates and starting prices.')}<div class="dashboard"><div class="metric"><span>Customer inquiries</span><strong>${data.inquiries.length}</strong></div><div class="metric"><span>Pending review</span><strong>${data.inquiries.filter(x=>['Pending','Under Review'].includes(x.status)).length}</strong></div><div class="metric"><span>Revisions requested</span><strong>${rev}</strong></div></div><div class="panel"><h3>Incoming inquiries</h3>${data.inquiries.length?`<div class="table-scroll"><table class="table"><thead><tr><th>Reference</th><th>Customer</th><th>Occasion</th><th>Status</th><th></th></tr></thead><tbody>${data.inquiries.map(x=>`<tr><td>${escapeHTML(x.id)}</td><td>${escapeHTML(x.customer)}</td><td>${escapeHTML(x.event)}</td><td><span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span></td><td>${btn('Review',`viewInquiry('${x.id}')`,'btn ghost small')}</td></tr>`).join('')}</tbody></table></div>`:'<p class="muted">No demo inquiries yet.</p>'}</div>${ownerCatalog()}<section class="section panel"><div class="row"><div><h3>Arrangement templates</h3><p class="muted tiny">Manage supported previews and sample starting prices.</p></div>${btn('Add template','addTemplateForm()','btn secondary small')}</div><div class="owner-template-grid">${data.templates.map(t=>`<div><strong>${escapeHTML(t.name)}</strong><small>${escapeHTML(t.type||'Arrangement')} · ${Number(t.price)>0?'Starting at '+money(t.price):'Price on inquiry'}</small>${btn('Edit',`editPackage('${t.id}')`,'btn ghost small')}</div>`).join('')}</div></section><section class="section panel"><h3>Available design options</h3><p class="tiny muted">Suggestions use these administrator-supported themes and accents.</p><div class="two"><div class="field"><label>Available themes (comma separated)</label><input id="themes" value="${escapeHTML(data.settings.themes.join(', '))}"></div><div class="field"><label>Available accents (comma separated)</label><input id="decorations" value="${escapeHTML(data.settings.decorations.join(', '))}"></div></div>${btn('Save options','saveOptions()')}</section>`;};
/* Owner can update the template and its occasion matching rules. */
editPackage=function(i){const t=getTmpl(i);showModal(`<h2>Edit arrangement template</h2><form onsubmit="savePackage(event,'${i}')"><div class="field"><label>Name</label><input name="name" required maxlength="70" value="${escapeHTML(t.name)}"></div><div class="field"><label>Preview arrangement</label><select name="type">${['Arch','Garland','Bouquet','Column','Number','Backdrop','Hoop','Cluster','Centerpiece','Bubble Balloon'].map(type=>`<option ${t.type===type?'selected':''}>${type}</option>`).join('')}</select></div><div class="field"><label>Description</label><textarea name="desc" maxlength="180">${escapeHTML(t.desc||'')}</textarea></div><div class="field"><label>Recommended occasions (comma separated)</label><input name="occasionTags" value="${escapeHTML((t.occasionTags||[]).join(', '))}" placeholder="Birthday, Graduation"></div><div class="field"><label>Sample starting price (PHP)</label><input name="price" type="number" min="0" step="50" value="${Number(t.price)||0}" required></div><p class="tiny muted">Suggestions remain limited to available templates and supported colors.</p><button class="btn">Save template</button></form>`);};
savePackage=function(e,i){e.preventDefault();const t=getTmpl(i);const f=new FormData(e.target);t.name=String(f.get('name')).trim();t.desc=String(f.get('desc')||'');t.type=String(f.get('type'));t.price=Number(f.get('price'))||0;t.occasionTags=String(f.get('occasionTags')||'').split(',').map(v=>v.trim()).filter(v=>OCCASIONS.some(o=>o.name===v));save();closeModal();render();toast('Template and suggestion rules saved.');};
/* Avoid stale placeholder thumbnails for saved custom templates. */
const oldRender=render;
render=function(){oldRender();if(role==='customer'&&page==='studio'){renderSuggestions();requestAnimationFrame(()=>initCanvas());}};
/* Original render already schedules a canvas init for standard presets; the extra call
 * above also makes previews work for original Bobo and Rose Gold templates. */
textColor='#42323d';
render();


/* V3: Always-visible drag & drop layout over the rotatable arrangement. */
let selectedDraftFigure=null;
let draftMarkers=[];
function draftIcon(figureId){
 const iconMap={
 'welcome-sign':'▣', 'main-cluster':'●', 'number-set':'18',
 'cake-accent':'◒', 'floral-accent':'✿', 'gift-bobo':'◌'
 };
 return iconMap[figureId]||'●';
}
function describeSavedFigureMarkers(design){
 if(!design)return 'None';
 const markers=Array.isArray(design.figureMarkers)?design.figureMarkers:legacyMarkersFromSlots(design.figureDraft);
 return markers.length?markers.map(m=>getFigureById(m.figureId)?.label||'Decorative figure').join(', '):'None';
}
function legacyMarkersFromSlots(draft){
 const coordinates={'slot-backdrop':[50,22],'slot-left':[20,53],'slot-center':[50,50],'slot-right':[80,53]};
 return Object.entries(draft||{}).filter(([,v])=>getFigureById(v)).map(([slotId,figureId],index)=>({id:'old-'+index,figureId,x:(coordinates[slotId]||[50,50])[0],y:(coordinates[slotId]||[50,50])[1]}));
}
figureDraftSummary=function(){return draftMarkers.length?draftMarkers.map(m=>getFigureById(m.figureId)?.label||'Figure').join(', '):'No figures yet';};
function directDragToolsMarkup(){
 return `<section class="visible-figure-planner" id="drag-drop-studio" aria-label="Drag and drop balloon figures"><div class="figure-planner-heading"><div><span class="step-label">DRAG & DROP FIGURES</span><h3>Build your arrangement draft</h3><p>Drag an element onto the preview. On mobile, tap an element, then tap where you want it.</p></div><button type="button" class="planner-reset" onclick="clearAllDraftMarkers()">Clear figures</button></div><div class="figure-tool-list">${DRAG_FIGURES.map(fig=>`<button type="button" class="figure-tool ${selectedDraftFigure===fig.id?'selected':''}" draggable="true" ondragstart="startFigureDrag(event,'${fig.id}')" onclick="selectDraftFigure('${fig.id}')" aria-pressed="${selectedDraftFigure===fig.id}"><span class="figure-tool-symbol" aria-hidden="true">${draftIcon(fig.id)}</span><span>${escapeHTML(fig.label)}</span></button>`).join('')}</div><div class="planner-footnote"><span>Drag to place • Move a placed figure • × to remove</span><span id="figureCount">${draftMarkers.length} placed</span></div></section>`;
}
function selectDraftFigure(id){
 selectedDraftFigure=selectedDraftFigure===id?null:id;
 document.querySelectorAll('.figure-tool').forEach(btn=>{const chosen=btn.getAttribute('onclick')?.includes(`'${selectedDraftFigure}'`);btn.classList.toggle('selected',!!chosen);btn.setAttribute('aria-pressed',String(!!chosen));});
 const hint=document.getElementById('previewDragHint');if(hint)hint.textContent=selectedDraftFigure?'Tap the preview to place your figure':'Drop a figure onto the design';
}
startFigureDrag=function(e,id){
 e.dataTransfer.setData('text/plain',id);
 e.dataTransfer.effectAllowed='copy';
 selectedDraftFigure=id;
};
function allowPreviewDrop(ev){ev.preventDefault();ev.dataTransfer.dropEffect='copy';}
function clampPercent(value){return Math.min(89,Math.max(11,Math.round(value)));}
function addDraftMarker(figureId,px,py){
 if(!getFigureById(figureId))return;
 if(draftMarkers.length>=15){toast('Up to 15 figures can be placed in this prototype.');return;}
 draftMarkers.push({id:'marker-'+id(),figureId,x:clampPercent(px),y:clampPercent(py)});
 renderFigureOverlay();renderSuggestionsSummaryOnly();
}
function dropFigureOnPreview(ev){
 ev.preventDefault();const figureId=ev.dataTransfer.getData('text/plain');
 if(!getFigureById(figureId))return;
 const box=ev.currentTarget.getBoundingClientRect();
 addDraftMarker(figureId,(ev.clientX-box.left)*100/box.width,(ev.clientY-box.top)*100/box.height);
}
function placeSelectedFigure(ev){
 if(!selectedDraftFigure||ev.target.closest('.figure-marker'))return;
 const rect=ev.currentTarget.getBoundingClientRect();
 addDraftMarker(selectedDraftFigure,(ev.clientX-rect.left)*100/rect.width,(ev.clientY-rect.top)*100/rect.height);
 selectedDraftFigure=null;document.querySelectorAll('.figure-tool').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});
}
function previewMarkersMarkup(){return draftMarkers.map(m=>{
 const fig=getFigureById(m.figureId);if(!fig)return '';
 return `<div class="figure-marker" data-marker-id="${m.id}" style="left:${clampPercent(m.x)}%;top:${clampPercent(m.y)}%" onpointerdown="startMarkerMove(event,'${m.id}')" title="Drag ${escapeHTML(fig.label)} to reposition"><span class="marker-symbol">${draftIcon(m.figureId)}</span><span class="marker-title">${escapeHTML(fig.label)}</span><button type="button" class="remove-marker" title="Remove ${escapeHTML(fig.label)}" aria-label="Remove ${escapeHTML(fig.label)}" onclick="event.stopPropagation();removeDraftMarker('${m.id}')">×</button></div>`;
 }).join('');}
function renderFigureOverlay(){
 const layer=document.querySelector('#figureOverlay');if(layer)layer.innerHTML=previewMarkersMarkup();
 const count=document.querySelector('#figureCount');if(count)count.textContent=`${draftMarkers.length} placed`;
 const hint=document.querySelector('#previewDragHint');if(hint)hint.hidden=draftMarkers.length>0;
}
function removeDraftMarker(markerId){draftMarkers=draftMarkers.filter(m=>m.id!==markerId);renderFigureOverlay();renderSuggestionsSummaryOnly();}
function clearAllDraftMarkers(){draftMarkers=[];selectedDraftFigure=null;renderFigureOverlay();renderSuggestionsSummaryOnly();document.querySelectorAll('.figure-tool').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false');});toast('Figure draft cleared.');}
let activeMarkerMove=null;
function startMarkerMove(ev,markerId){
 if(ev.target.closest('button'))return;
 ev.stopPropagation();ev.preventDefault();
 const el=ev.currentTarget;el.setPointerCapture(ev.pointerId);
 activeMarkerMove={markerId,pointerId:ev.pointerId};
 el.classList.add('moving');
}
document.addEventListener('pointermove',ev=>{
 if(!activeMarkerMove||ev.pointerId!==activeMarkerMove.pointerId)return;
 const wrap=document.getElementById('canvaswrap');if(!wrap)return;
 const m=draftMarkers.find(m=>m.id===activeMarkerMove.markerId);if(!m)return;
 const rect=wrap.getBoundingClientRect();m.x=clampPercent((ev.clientX-rect.left)*100/rect.width);m.y=clampPercent((ev.clientY-rect.top)*100/rect.height);
 const marker=document.querySelector(`.figure-marker[data-marker-id="${m.id}"]`);
 if(marker){marker.style.left=m.x+'%';marker.style.top=m.y+'%';}
},{passive:true});
document.addEventListener('pointerup',ev=>{
 if(!activeMarkerMove||ev.pointerId!==activeMarkerMove.pointerId)return;
 const marker=document.querySelector(`.figure-marker[data-marker-id="${activeMarkerMove.markerId}"]`);
 marker?.classList.remove('moving');activeMarkerMove=null;renderSuggestionsSummaryOnly();
});
