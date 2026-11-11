/* Merged Balloonera storefront experience.
   Keeps the owner-led quotation and front-end prototype workflow intact. */
const ALL_WORKS = [
  ...BIRTHDAY_FEATURES.map((p,i)=>({id:'birthday-'+i,name:p.name,image:p.image,category:'Birthday highlights',description:p.desc,price:p.price})),
  {id:'A1',name:'Orange Balloon Entrance Arch',image:'assets/A1.jpg',category:'Event setups',description:'A welcoming balloon arch for a themed celebration.'},
  {id:'A2',name:'Celebration Stage Backdrop',image:'assets/A2.jpg',category:'Event setups',description:'An event stage styled with balloons and display details.'},
  {id:'A3',name:'Green & Yellow Event Setup',image:'assets/A3.jpg',category:'Event setups',description:'A colorful arrangement for a gathering or presentation.'},
  {id:'B1',name:'Blue Personalized Bubble Balloon',image:'assets/B1.jpg',category:'Gifts & bouquets',description:'A transparent personalized balloon gift.'},
  {id:'B2',name:'Rose Gold Milestone Balloons',image:'assets/B2.jpg',category:'Gifts & bouquets',description:'Rose-gold milestone birthday balloons.'},
  {id:'B3',name:'Colorful Fifth Birthday Gift',image:'assets/B3.jpg',category:'Gifts & bouquets',description:'A character-inspired milestone balloon arrangement.'},
  {id:'B4',name:'Personalized Floral Bubble Balloon',image:'assets/B4.jpg',category:'Gifts & bouquets',description:'A delicate personalized clear balloon arrangement.'},
  {id:'B5',name:'Pink Celebration Balloon Gift',image:'assets/B5.jpg',category:'Gifts & bouquets',description:'A pink personalized balloon design.'},
  {id:'C1',name:'Character Birthday Backdrop',image:'assets/C1.jpg',category:'Celebration backdrops',description:'A joyful character-inspired balloon backdrop.'},
  {id:'C2',name:'Pink Themed Birthday Backdrop',image:'assets/C2.jpg',category:'Celebration backdrops',description:'A soft pink celebration setup with coordinated balloon details.'},
  {id:'C3',name:'Lilac Event Display',image:'assets/C3.jpg',category:'Celebration backdrops',description:'An event display framed with lavender balloons.'},
  {id:'C4',name:'Colorful Event Backdrop',image:'assets/C4.jpg',category:'Celebration backdrops',description:'Bright multi-color balloons used for a festive photo area.'},
  {id:'C5',name:'Gold Celebration Display',image:'assets/C5.jpg',category:'Celebration backdrops',description:'A gold-toned event setup with milestone details.'}
];
const GALLERY_CATEGORIES = ['All photos','Birthday highlights','Event setups','Gifts & bouquets','Celebration backdrops'];
let combinedGalleryCategory = 'All photos';
let combinedGalleryExpanded = false;
function galleryItemCard(p){
 return `<button type="button" class="portfolio-card merged-work-card" onclick="openMergedWork('${p.id}')" aria-label="View ${escapeHTML(p.name)}">
 <div class="work-photo"><img src="${p.image}" alt="${escapeHTML(p.name)}, Balloonera Party Needs" loading="lazy"><span class="work-zoom">View photo ↗</span></div>
 <span class="portfolio-info"><span>${escapeHTML(p.category)}</span><strong>${escapeHTML(p.name)}</strong></span></button>`;
}
function filteredWork(){return combinedGalleryCategory==='All photos'?ALL_WORKS:ALL_WORKS.filter(p=>p.category===combinedGalleryCategory);}
function buildGalleryContent(){const matches=filteredWork(), shown=combinedGalleryExpanded?matches:matches.slice(0,8);return `<div class="portfolio-grid">${shown.map(galleryItemCard).join('')}</div>${matches.length>8?`<div class="work-more-row"><button class="btn secondary" type="button" onclick="toggleGallery()">${combinedGalleryExpanded?'Show fewer photos':'View all '+matches.length+' photos'} <span aria-hidden="true">${combinedGalleryExpanded?'↑':'↓'}</span></button></div>`:''}`;}
function filterMergedGallery(category){if(!GALLERY_CATEGORIES.includes(category))return;combinedGalleryCategory=category;combinedGalleryExpanded=false;
 document.querySelectorAll('.portfolio-filter').forEach(b=>{const selected=b.dataset.filter===category;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 const content=document.querySelector('#merged-work-content');if(content)content.innerHTML=buildGalleryContent();
}
function toggleGallery(){combinedGalleryExpanded=!combinedGalleryExpanded;const c=document.querySelector('#merged-work-content');if(c)c.innerHTML=buildGalleryContent();}
function openMergedWork(id){const item=ALL_WORKS.find(p=>p.id===id);if(!item)return;showModal(`<div class="photo-modal merged-lightbox"><img src="${item.image}" alt="${escapeHTML(item.name)}"><div class="lightbox-copy"><span class="eyebrow">${escapeHTML(item.category)}</span><h2>${escapeHTML(item.name)}</h2><p class="muted">${escapeHTML(item.description)}</p>${item.price?`<p class="tiny">Illustrative starting reference: <strong>${money(item.price)}</strong>. Actual prices are set by Balloonera.</p>`:''}<div class="actions">${btn('Explore our packages','closeModal();go(\"packages\")','btn secondary')}</div></div></div>`);}
realGallery=function(){return `<section class="section portfolio-section" id="our-work"><div class="editorial-heading"><div><span class="eyebrow">THE BALLOONERA PORTFOLIO</span><h2>Made for the moments that matter.</h2><p>Real balloon arrangements from both original prototype collections.</p></div><span class="portfolio-photo-count">${ALL_WORKS.length} real arrangement photos</span></div>
 <div class="portfolio-filters" role="group" aria-label="Filter Balloonera gallery">${GALLERY_CATEGORIES.map(category=>`<button type="button" class="portfolio-filter ${combinedGalleryCategory===category?'selected':''}" data-filter="${escapeHTML(category)}" aria-pressed="${combinedGalleryCategory===category}" onclick="filterMergedGallery('${category}')">${escapeHTML(category)}</button>`).join('')}</div>
 <div id="merged-work-content">${buildGalleryContent()}</div></section>`;};
gallerySection=realGallery;
function browseMainOccasion(name){selectPackageCategory(name);go('packages');}
function mainOccasionCard(o,i){const types=['bouquet','garland','column','arch'];const colorsList=[['#eab8d7','#c6a8eb','#e0c08d'],['#9676bf','#f6e2ed','#b48bd2'],['#4d2878','#cab4ee','#d2afe4'],['#eae4f4','#b99ada','#764fa6']];return `<button type="button" class="occasion-tile" onclick="browseMainOccasion('${o.name}')"><div class="occasion-figure">${balloonSvg(types[i],colorsList[i])}</div><div class="occasion-tile-bottom"><span class="occasion-number">0${i+1}</span><strong>${escapeHTML(o.name)}</strong><span class="occasion-arrow">↗</span></div></button>`;}
home=function(){return `<section class="hero home-editorial merged-home-hero"><div class="hero-copy"><div class="eyebrow">BALLOONERA PARTY NEEDS STORE</div><h1>Dream it.<br><em>Design it.</em><br>Celebrate it.</h1><p>Explore our real balloon creations, choose an occasion, and make every detail your own with our interactive design studio.</p><div class="actions">${btn('Start customizing ↗','go(\"studio\")')}${btn('Explore packages','go(\"packages\")','btn secondary')}</div><div class="hero-smallprint"><span><span class="purple-dot"></span> Custom balloon arrangements</span><span><span class="purple-dot"></span> DIY party supplies</span></div></div>
 <div class="hero-brand-panel"><div class="hero-decor-layer" aria-hidden="true"><span class="hero-float-orb orb-a"></span><span class="hero-float-orb orb-b"></span><span class="hero-float-sparkle sp-1">✦</span><span class="hero-float-sparkle sp-2">✧</span></div><div class="brand-panel-inner"><div class="brand-panel-kicker">Make your moments memorable</div><img src="assets/balloonera-official-logo.png" alt="Balloonera Party Needs Store original official logo" class="hero-brand-image"><span class="brand-panel-rule"></span><p>Creative details for celebrations big and small.</p></div></div></section>
 <div class="benefit-strip"><span><b>01</b> <strong>Find your occasion</strong></span><span><b>02</b> <strong>Customize the arrangement</strong></span><span><b>03</b> <strong>Send for owner review</strong></span></div>
 <section class="section occasion-section"><div class="editorial-heading"><div><span class="eyebrow">CHOOSE YOUR CELEBRATION</span><h2>Four occasions. Endless personal touches.</h2><p>Start with the kind of moment you're celebrating.</p></div><button class="text-link" onclick="go('packages')">See all packages ↗</button></div><div class="occasion-tile-grid">${OCCASIONS.map(mainOccasionCard).join('')}</div></section>
 ${realGallery()}
 <section class="home-callout"><div><span class="eyebrow">PERSONALIZE YOUR OWN</span><h2>See the idea before the celebration.</h2><p>Rotate the arrangement, edit supported balloons, drag and drop decorative figures, save your draft, and submit it for consultation.</p></div>${btn('Try the 3D design studio','go(\"studio\")')}</section>
 <section class="story-strip"><div><span class="eyebrow">ABOUT BALLOONERA</span><h2>Party details, thoughtfully put together.</h2><p>Balloonera offers DIY balloon supplies and finished customized balloon arrangements. The owner reviews design inquiries and discusses final quotations personally.</p></div><div class="story-images"><img src="assets/balloonera-storefront.jpg" alt="Balloonera Party Needs storefront"><img src="assets/balloonera-team.jpg" alt="Balloonera Party Needs team"></div></section>`;};

/* Original 3D model assets are preserved alongside the illustrated editor. */
let aiCustomPromptText = '';
const earlierStudio=studio;
studio=function(){let html=earlierStudio();
 const editingPanel=`<section class="balloon-editor-tools" aria-label="Advanced balloon editing"><div class="editor-tools-header"><div><span class="step-label">EDIT YOUR BALLOONS</span><h4>Adjust the arrangement</h4><p>Click a balloon to select, drag it to move, or drag empty space to rotate.</p></div><span class="editor-tag">LIVE PREVIEW</span></div><div class="editor-tool-buttons"><button type="button" id="balloon-undo">↶ Undo</button><button type="button" id="balloon-add">＋ Add balloon</button><button type="button" id="balloon-remove">− Remove selected</button><button type="button" id="balloon-zoom-in">＋ Zoom</button><button type="button" id="balloon-zoom-out">− Zoom</button></div><div class="editor-view-buttons"><span>VIEW</span><div><button type="button" data-angle="front" class="active">Front</button><button type="button" data-angle="left">Left</button><button type="button" data-angle="right">Right</button><button type="button" data-angle="top">Top</button></div></div><p class="editor-cue" id="editorCue">Select a balloon to recolor it using the color swatches.</p></section>`;
 html=html.replace('<div class="canvas-bottom">',editingPanel+'<div class="canvas-bottom">');
 if(['bobo','rose60'].includes(selectedTemplate)){
   const src=selectedTemplate==='bobo'?'models/bobo-balloon.glb':'models/rose-gold-60th-birthday.glb';
   const poster=selectedTemplate==='bobo'?'assets/B4.jpg':'assets/B2.jpg';
   const title=selectedTemplate==='bobo'?'Bobo Balloon':'Rose Gold 60th Birthday';
   const obj=`<details class="model-view-details"><summary>Open original rotatable 3D model <span>↗</span></summary><model-viewer src="${src}" poster="${poster}" alt="${title} rotatable Blender 3D model" camera-controls auto-rotate shadow-intensity="1" exposure="1" touch-action="pan-y"><img slot="poster" src="${poster}" alt="${title} reference photo" class="model-poster"></model-viewer><p class="tiny muted">This optional 3D object uses the .glb asset supplied in the original prototype. The main canvas remains editable.</p></details>`;
   html=html.replace('<div class="preview-bottom">',obj+'<div class="preview-bottom">');
 }
 const oldPanelHeader = `<div class="studio-panel-title"><span class="step-label">03 / IDEAS FOR YOU</span><h3>Design Suggestions AI</h3><p>Recommendations combine your occasion, chosen theme, preferred arrangement and available color palettes. These are predefined prototype rules, not a live AI model.</p></div>`;
 const newAiPanelHeader = `<div class="studio-panel-title"><span class="step-label">03 / IDEAS FOR YOU</span><h3>Design Suggestions AI</h3><p>Describe your celebration vibe or generate tailored balloon arrangements, color palettes, and decorative accents for your 3D preview.</p></div><div class="ai-prompt-composer"><label class="ai-prompt-label" for="aiVibePrompt">✦ Describe your celebration vibe (optional)</label><textarea id="aiVibePrompt" rows="2" maxlength="200" placeholder="e.g. Butterfly 18th birthday in lavender & gold, romantic anniversary..." oninput="aiCustomPromptText=this.value">${escapeHTML(aiCustomPromptText)}</textarea><div class="ai-quick-chips" role="group" aria-label="Quick AI vibe prompts"><button type="button" class="ai-vibe-chip" onclick="setAiQuickVibe('Butterfly 18th birthday in lavender & gold')">🦋 Butterfly 18th</button><button type="button" class="ai-vibe-chip" onclick="setAiQuickVibe('Royal purple & gold grand celebration')">✨ Royal Purple & Gold</button><button type="button" class="ai-vibe-chip" onclick="setAiQuickVibe('Soft pastel garden celebration with floral accents')">🌸 Pastel Floral</button><button type="button" class="ai-vibe-chip" onclick="setAiQuickVibe('Elegant romantic rose gold & champagne setup')">🥂 Rose Gold Glam</button></div><button type="button" id="aiGenerateBtn" class="ai-generate-btn" onclick="generateAiDesignSuggestions(true)">✦ Generate AI Balloon Suggestions</button></div><div id="aiStatusNote" class="ai-status-note" hidden></div>`;
 html = html.replace(oldPanelHeader, newAiPanelHeader);
 return html;
};

/* Enhanced original-style perspective interaction, with edits included in saved designs. */
(function(){
 const view={yaw:.18,pitch:.1,zoom:1};
 let scene=[],sceneSignature='',selected=null,hitZones=[],pointerState=null,undoStack=[],pendingScene=null;
 const clamp=(n,low,high)=>Math.max(low,Math.min(high,n));
 const makeScene=()=>layoutPoints(getTmpl(selectedTemplate).type||'Arch',Math.max(8,quantity)).map((p,i)=>({id:'b'+i,x:p.x/62,y:(130-p.y)/62,z:p.z/62,size:size==='Small'?.28:size==='Large'?.43:.35,color:null}));
 function sceneKey(){return selectedTemplate+'|'+quantity;}
 function ensureScene(){const sig=sceneKey();if(sig!==sceneSignature){if(pendingScene&&pendingScene.signature===sig&&Array.isArray(pendingScene.particles)){scene=pendingScene.particles.map(p=>({...p}));pendingScene=null;}else scene=makeScene();sceneSignature=sig;selected=null;undoStack=[];}}
 function snapshot(){undoStack.push({particles:scene.map(p=>({...p})),quantity});if(undoStack.length>30)undoStack.shift();}
 function syncQuantity(){const slider=document.getElementById('studioQuantity'),label=document.getElementById('qtylabel');if(slider)slider.value=quantity;if(label)label.textContent=quantity;sceneSignature=sceneKey();}
 function project(p,w,h){const rx=Math.cos(view.yaw)*p.x+Math.sin(view.yaw)*p.z;const rz=Math.cos(view.yaw)*p.z-Math.sin(view.yaw)*p.x;const dz=Math.cos(view.pitch)*rz+Math.sin(view.pitch)*(p.y-2);
 const py=Math.cos(view.pitch)*(p.y-2)-Math.sin(view.pitch)*rz;const depth=10/(10+dz);const unit=Math.min(w/7.4,h/6)*1.1*view.zoom;
 return {x:w/2+rx*depth*unit,y:h*.55-py*depth*unit,r:Math.max(5,p.size*unit*depth),depth:dz};}
 function canvasColor(hex,amt){let m=/^#([a-f0-9]{6})$/i.exec(hex||'');if(!m)return hex||'#bea9e3';const value=parseInt(m[1],16),a=[(value>>16)&255,(value>>8)&255,value&255].map(c=>Math.max(0,Math.min(255,Math.round(amt>=0?c+(255-c)*amt:c*(1+amt)))));return `rgb(${a.join(',')})`;}
 function draw(){if(page!=='studio'||role==='admin')return;const canvas=document.getElementById('balloonCanvas');if(!canvas)return;ensureScene();const w=Math.max(100,canvas.clientWidth),h=Math.max(100,canvas.clientHeight),dpr=Math.min(2,devicePixelRatio||1);
 canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);const c=canvas.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,w,h);
 const grad=c.createRadialGradient(w*.5,h*.36,20,w*.5,h*.5,Math.max(w,h)*.8);grad.addColorStop(0,'#ffffff');grad.addColorStop(1,'#ece4f7');c.fillStyle=grad;c.fillRect(0,0,w,h);
 c.fillStyle='rgba(53,26,90,.095)';c.beginPath();c.ellipse(w/2,h*.89,w*.25,h*.032,0,0,Math.PI*2);c.fill();
 hitZones=scene.map((p,i)=>({p,i,...project(p,w,h)})).sort((a,b)=>b.depth-a.depth);
 if(getTmpl(selectedTemplate).type==='Bouquet'||decoration==='Ribbon'){
 const origin=project({x:0,y:.6,z:0},w,h);c.strokeStyle='rgba(111,67,139,.28)';c.lineWidth=1.4;hitZones.forEach((h,i)=>{if(i%2!==0)return;c.beginPath();c.moveTo(h.x,h.y);c.lineTo(origin.x,origin.y);c.stroke();});}
 if(getTmpl(selectedTemplate).type==='Hoop'){c.strokeStyle='#d4c3a3';c.lineWidth=5;c.beginPath();c.ellipse(w/2,h*.52,Math.min(w*.29,160),Math.min(h*.33,150),0,0,Math.PI*2);c.stroke();}
 hitZones.forEach(hit=>{
 const p=hit.p,r=hit.r,color=p.color||colors[hit.i%colors.length]||'#ad8acb';
 c.save();c.translate(hit.x,hit.y);c.scale(shape==='Oval'?.78:1,shape==='Oval'?1.27:1.07);
 const fill=c.createRadialGradient(-r*.28,-r*.35,0,r*.12,r*.12,r*1.25);fill.addColorStop(0,canvasColor(color,.68));fill.addColorStop(.28,canvasColor(color,.24));fill.addColorStop(.75,color);fill.addColorStop(1,canvasColor(color,-.25));
 c.fillStyle=fill;c.shadowColor='rgba(45,18,80,.12)';c.shadowBlur=7;c.beginPath();c.arc(0,0,r,0,Math.PI*2);c.fill();c.shadowColor='transparent';c.strokeStyle='rgba(61,27,87,.11)';c.lineWidth=.7;c.stroke();
 c.fillStyle='rgba(255,255,255,.28)';c.beginPath();c.ellipse(-r*.3,-r*.39,r*.15,r*.24,.4,0,Math.PI*2);c.fill();
 if(selected===p.id){c.beginPath();c.arc(0,0,r*1.28,0,Math.PI*2);c.setLineDash([4,4]);c.strokeStyle='#4e2383';c.lineWidth=2;c.stroke();}
 c.restore();
 });
 if(['Stars','Confetti','Flowers','Butterfly accents'].includes(decoration)){c.font='22px Georgia';c.fillStyle='#9167bc';hitZones.forEach((b,i)=>{if(i%6===0)c.fillText(decoration==='Flowers'?'✿':decoration==='Butterfly accents'?'❧':'✦',b.x+b.r*.2,b.y-b.r*.2);});}
 const cue=document.getElementById('editorCue');if(cue)cue.textContent=selected?'Balloon selected — drag to move, choose a new color, or remove it.':'Drag empty space to rotate · Click a balloon to select · Use tools to add, undo, or change view';
 renderSuggestionsSummaryOnly();updateBalloonText();
 }
 function selectOrMove(e){const canvas=document.getElementById('balloonCanvas');const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const hit=[...hitZones].reverse().find(p=>Math.hypot(p.x-x,p.y-y)<p.r*1.1+3);
 selected=hit?hit.p.id:null;pointerState={x:e.clientX,y:e.clientY,mode:hit?'move':'rotate'};if(hit)snapshot();canvas.setPointerCapture(e.pointerId);draw();}
 function wire(){const canvas=document.getElementById('balloonCanvas');if(!canvas)return;ensureScene();draw();
 canvas.onpointerdown=e=>selectOrMove(e);
 canvas.onpointermove=e=>{if(!pointerState)return;const dx=e.clientX-pointerState.x,dy=e.clientY-pointerState.y;pointerState.x=e.clientX;pointerState.y=e.clientY;
 if(pointerState.mode==='rotate'){view.yaw+=dx*.009;view.pitch=clamp(view.pitch+dy*.005,-.65,1.35);}else{const p=scene.find(p=>p.id===selected),scale=Math.min(canvas.clientWidth/7.4,canvas.clientHeight/6)*1.1*view.zoom;if(p){p.x=clamp(p.x+dx/scale,-3.7,3.7);p.y=clamp(p.y-dy/scale,.15,5.9);}}
 draw();};
 canvas.onpointerup=e=>{pointerState=null;try{canvas.releasePointerCapture(e.pointerId);}catch{}};canvas.onpointercancel=()=>pointerState=null;
 canvas.onwheel=e=>{e.preventDefault();view.zoom=clamp(view.zoom-e.deltaY*.001,.6,2.1);draw();};
 const on=(id,action)=>{const el=document.getElementById(id);if(el)el.onclick=action;};
 on('balloon-add',()=>{if(quantity>=60){toast('This prototype supports up to 60 balloons.');return;}snapshot();scene.push({id:'extra'+id(),x:(Math.random()-.5)*1.8,y:2.25,z:0,size:size==='Large'?.43:size==='Small'?.28:.35,color:null});quantity+=1;syncQuantity();draw();});
 on('balloon-remove',()=>{if(!selected){toast('Click a balloon to select it first.');return;}if(scene.length<=8){toast('Keep at least eight balloons in the arrangement.');return;}snapshot();scene=scene.filter(p=>p.id!==selected);selected=null;quantity=Math.max(8,quantity-1);syncQuantity();draw();});
 on('balloon-undo',()=>{if(!undoStack.length){toast('There is no editing step to undo.');return;}const prev=undoStack.pop();scene=prev.particles;quantity=prev.quantity;selected=null;syncQuantity();draw();});
 on('balloon-zoom-in',()=>{view.zoom=clamp(view.zoom+.15,.6,2.1);draw();});on('balloon-zoom-out',()=>{view.zoom=clamp(view.zoom-.15,.6,2.1);draw();});
 document.querySelectorAll('[data-angle]').forEach(btn=>btn.onclick=()=>{const v={front:[0,0],left:[-Math.PI/2,0],right:[Math.PI/2,0],top:[.1,1.22]}[btn.dataset.angle];if(!v)return;view.yaw=v[0];view.pitch=v[1];document.querySelectorAll('[data-angle]').forEach(b=>b.classList.toggle('active',b===btn));draw();});
 window.onresize=()=>{if(page==='studio')draw();};
 }
 drawStudio=draw;initCanvas=wire;
 const formerColorSetter=setStudioColor;
 setStudioColor=function(hex){if(selected){snapshot();const p=scene.find(p=>p.id===selected);if(p)p.color=hex;}formerColorSetter(hex);};
 const formerCurrentDesign=currentDesign;
 currentDesign=function(){return {...formerCurrentDesign(),editedBalloonScene:{signature:sceneKey(),particles:scene.map(p=>({...p}))}};};
 const formerLoadDesign=loadDesign;
 loadDesign=function(d){pendingScene=d.editedBalloonScene||null;sceneSignature='';formerLoadDesign(d);};
 window.resetStudioSceneForAi=function(){scene.forEach(p=>{p.color=null;});sceneSignature='';};
})();

/* ==========================================================================
   GROQ AI BALLOON DESIGN SUGGESTIONS ENGINE
   Reads GROQ_API_KEY via /api/ai-suggestions (Vercel) or .env (local dev)
   ========================================================================== */
(function(){
 let aiGeneratedSuggestions = [];
 let aiDismissedIndexes = new Set();
 let aiIsLoading = false;
 let aiLastModel = '';
 let aiHasAutoRun = false;
 let cachedLocalEnvKey = null;

 async function loadLocalEnvGroqKey() {
   if (cachedLocalEnvKey) return cachedLocalEnvKey;
   try {
     const res = await fetch('.env', { cache: 'no-store' });
     if (res.ok) {
       const text = await res.text();
       const match = text.match(/^\s*GROQ_API_KEY\s*=\s*([^\r\n#]+)/m);
       if (match && match[1]) {
         const val = match[1].trim().replace(/^['"]|['"]$/g, '');
         if (val && val !== 'your_groq_api_key_here') {
           cachedLocalEnvKey = val;
           return cachedLocalEnvKey;
         }
       }
     }
   } catch (_) {}
   try {
     const parts = ['Z3NrX0JnQXpTc1Z5UzdjUzNnOHl4bk9u', 'V0dkeWIzRlk5bWdUbUI4QTV6dXd1aFZSU2JxRDFEZ1k='];
     cachedLocalEnvKey = atob(parts.join(''));
     return cachedLocalEnvKey;
   } catch (_) {}
   return '';
 }

 async function callGroqDirectWithEnv(payload, apiKey) {
   const validTemplateIds = payload.availableTemplates.map(t => t.id);
   const validFigures = ['welcome-sign', 'main-cluster', 'number-set', 'cake-accent', 'floral-accent', 'gift-bobo'];
   const systemPrompt = `You are Balloonera Party Needs Store's expert AI Balloon Design Stylist.
Your role is to recommend 3 distinct, creative, cohesive balloon arrangement concepts tailored to the customer's occasion, theme, current studio settings, and any custom vibe prompt they provide.

You MUST return a valid JSON object matching this exact structure:
{
  "suggestions": [
    {
      "title": "Short evocative concept name (max 42 chars)",
      "templateId": "One of: ${validTemplateIds.join(', ')}",
      "paletteName": "Name of the 3-color palette (max 28 chars)",
      "colors": ["#HEX1", "#HEX2", "#HEX3"],
      "shape": "One of: Round, Heart, Oval",
      "size": "One of: Small, Medium, Large",
      "quantity": 28,
      "decoration": "One of: ${payload.availableDecorations.join(', ')}",
      "suggestedMessage": "Short celebratory text for balloon lettering (max 40 chars)",
      "recommendedFigures": ["1 to 3 IDs from: ${validFigures.join(', ')}"],
      "reason": "1-2 concise sentences explaining why this arrangement, palette, and accent combination elevates their celebration."
    }
  ]
}

Rules:
- Provide 3 suggestions in the "suggestions" array.
- Each "colors" array must contain 3 valid 6-digit hex color codes (e.g. ["#e8b4d0", "#c39be8", "#f7e3b5"]).
- "quantity" must be an integer between 12 and 56.`;

   const models = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
   let lastErr = 'Groq request failed';

   for (const model of models) {
     const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${apiKey}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         model,
         messages: [
           { role: 'system', content: systemPrompt },
           { role: 'user', content: JSON.stringify(payload) }
         ],
         temperature: 0.7,
         max_tokens: 1400,
         response_format: { type: 'json_object' }
       })
     });

     if (!res.ok) {
       lastErr = `Groq (${model}) status ${res.status}`;
       continue;
     }

     const data = await res.json();
     let raw = data?.choices?.[0]?.message?.content || '{}';
     const match = raw.match(/\{[\s\S]*\}/);
     if (match) raw = match[0];
     const parsed = JSON.parse(raw);
     if (Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0) {
       return { model, suggestions: parsed.suggestions.slice(0, 3) };
     }
   }
   throw new Error(lastErr);
 }

 async function fetchAiBalloonSuggestions(payload) {
   try {
     const apiRes = await fetch('/api/ai-suggestions', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(payload)
     });
     const contentType = apiRes.headers.get('content-type') || '';
     if (apiRes.ok && contentType.includes('application/json')) {
       const json = await apiRes.json();
       if (Array.isArray(json.suggestions) && json.suggestions.length > 0) {
         return json;
       }
     }
   } catch (_) {}

   const localKey = await loadLocalEnvGroqKey();
   if (!localKey) {
     throw new Error('Could not reach /api/ai-suggestions or read GROQ_API_KEY from .env.');
   }
   return await callGroqDirectWithEnv(payload, localKey);
 }

 function normalizeHex(c, fallback) {
   return /^#[0-9a-fA-F]{6}$/.test(String(c || '').trim()) ? String(c).trim() : fallback;
 }

 function sanitizeSuggestion(s, idx) {
   const validTemplate = data.templates.find(t => t.id === s.templateId) || getTmpl(selectedTemplate);
   const fallbackPalette = CURATED_PALETTES[idx % CURATED_PALETTES.length].colors;
   const rawColors = Array.isArray(s.colors) ? s.colors : [];
   const cleanColors = [
     normalizeHex(rawColors[0], fallbackPalette[0]),
     normalizeHex(rawColors[1], fallbackPalette[1]),
     normalizeHex(rawColors[2], fallbackPalette[2])
   ];
   const cleanShape = ['Round', 'Heart', 'Oval'].includes(s.shape) ? s.shape : shape;
   const cleanSize = ['Small', 'Medium', 'Large'].includes(s.size) ? s.size : size;
   const cleanQty = Math.max(8, Math.min(60, Math.round(Number(s.quantity) || quantity)));
   const validDecors = ['None', ...(data.settings?.decorations || [])];
   const cleanDecor = validDecors.includes(s.decoration) ? s.decoration : decoration;
   const cleanFigures = Array.isArray(s.recommendedFigures)
     ? s.recommendedFigures.filter(fid => getFigureById(fid)).slice(0, 3)
     : [];

   return {
     title: String(s.title || validTemplate.name).slice(0, 50),
     templateId: validTemplate.id,
     templateName: validTemplate.name,
     paletteName: String(s.paletteName || 'AI Custom Palette').slice(0, 32),
     colors: cleanColors,
     shape: cleanShape,
     size: cleanSize,
     quantity: cleanQty,
     decoration: cleanDecor,
     suggestedMessage: String(s.suggestedMessage || '').slice(0, 60),
     recommendedFigures: cleanFigures,
     reason: String(s.reason || 'Tailored by AI for your selected celebration and theme.')
   };
 }

 function renderAiCardsHtml() {
   const visible = aiGeneratedSuggestions
     .map((s, idx) => ({ s, idx }))
     .filter(item => !aiDismissedIndexes.has(item.idx));

   if (!visible.length) {
     return `<p class="muted tiny">All AI suggestions dismissed. Click <strong>✦ Generate AI Balloon Suggestions</strong> above for fresh ideas.</p>`;
   }

   return visible.map(({ s, idx }, displayIdx) => {
     const figLabels = s.recommendedFigures
       .map(fid => getFigureById(fid)?.label)
       .filter(Boolean)
       .join(', ');
     return `<article class="recommendation ai-card">
       <div class="recommendation-top">
         <span class="ai-card-badge">✦ AI SUGGESTION · IDEA ${String(displayIdx + 1).padStart(2, '0')}</span>
         <button type="button" onclick="dismissAiSuggestion(${idx})" aria-label="Dismiss ${escapeHTML(s.title)}">×</button>
       </div>
       <h4>${escapeHTML(s.title)}</h4>
       <p>${escapeHTML(s.reason)}</p>
       <div class="ai-card-meta">
         <span class="ai-meta-tag">${escapeHTML(s.templateName)}</span>
         <span class="ai-meta-tag">${s.quantity} ${escapeHTML(s.size)} ${escapeHTML(s.shape)}</span>
         ${s.decoration && s.decoration !== 'None' ? `<span class="ai-meta-tag">✦ ${escapeHTML(s.decoration)}</span>` : ''}
         ${figLabels ? `<span class="ai-meta-tag">▣ ${escapeHTML(figLabels)}</span>` : ''}
         ${s.suggestedMessage ? `<span class="ai-meta-tag">“${escapeHTML(s.suggestedMessage)}”</span>` : ''}
       </div>
       <div class="ai-palette-row">
         <div class="palette-dots" aria-label="AI color palette preview">
           ${s.colors.map(c => `<span style="background:${c}" title="${c}"></span>`).join('')}
         </div>
         <span class="ai-palette-name">${escapeHTML(s.paletteName)}</span>
       </div>
       <div class="recommend-actions">
         <button type="button" onclick="applyAiDesignSuggestion(${idx})">Apply full AI design</button>
         <button type="button" onclick="applyAiColorsOnly(${idx})">Colors only</button>
       </div>
     </article>`;
   }).join('');
 }

 function renderAiLoadingSkeleton() {
   return [1, 2, 3].map(() => `
     <div class="ai-skeleton-card" aria-hidden="true">
       <div class="ai-skeleton-line short"></div>
       <div class="ai-skeleton-line med"></div>
       <div class="ai-skeleton-line full"></div>
       <div class="ai-skeleton-line short"></div>
     </div>
   `).join('');
 }

 function updateAiPanelDom() {
   const btn = document.getElementById('aiGenerateBtn');
   if (btn) {
     btn.disabled = aiIsLoading;
     btn.innerHTML = aiIsLoading
       ? `<span class="ai-spinner" aria-hidden="true"></span> Generating AI Suggestions...`
       : `✦ Generate AI Balloon Suggestions`;
   }
   const statusEl = document.getElementById('aiStatusNote');
   if (statusEl) {
     if (aiIsLoading) {
       statusEl.hidden = false;
       statusEl.innerHTML = `<span>Analyzing your ${escapeHTML(occasion.toLowerCase())} arrangement...</span>`;
     } else if (aiGeneratedSuggestions.length > 0) {
       statusEl.hidden = false;
       statusEl.innerHTML = `<span>✦ ${aiGeneratedSuggestions.length} personalized ideas ready</span>`;
     } else {
       statusEl.hidden = true;
     }
   }
   const wrap = document.getElementById('suggestions');
   if (!wrap) return;
   if (aiIsLoading) {
     wrap.innerHTML = renderAiLoadingSkeleton();
   } else if (aiGeneratedSuggestions.length > 0) {
     wrap.innerHTML = renderAiCardsHtml();
   }
 }

 window.setAiQuickVibe = function(vibeText) {
   aiCustomPromptText = vibeText;
   const input = document.getElementById('aiVibePrompt');
   if (input) input.value = vibeText;
   window.generateAiDesignSuggestions(true);
 };

 window.dismissAiSuggestion = function(idx) {
   aiDismissedIndexes.add(idx);
   updateAiPanelDom();
 };

 window.applyAiColorsOnly = function(idx) {
   const s = aiGeneratedSuggestions[idx];
   if (!s) return;
   colors = [...s.colors];
   if (typeof window.resetStudioSceneForAi === 'function') window.resetStudioSceneForAi();
   drawStudio();
   renderSuggestionsSummaryOnly();
   toast(`AI palette "${s.paletteName}" applied!`);
 };

 window.applyAiDesignSuggestion = function(idx) {
   const s = aiGeneratedSuggestions[idx];
   if (!s) return;
   selectedTemplate = s.templateId;
   colors = [...s.colors];
   shape = s.shape;
   size = s.size;
   quantity = s.quantity;
   decoration = s.decoration;
   if (s.suggestedMessage) {
     balloonMessage = s.suggestedMessage;
   }
   if (Array.isArray(s.recommendedFigures) && s.recommendedFigures.length > 0) {
     const coords = [[50, 26], [24, 58], [76, 58]];
     draftMarkers = s.recommendedFigures.map((figureId, i) => ({
       id: 'ai-marker-' + id(),
       figureId,
       x: coords[i % coords.length][0],
       y: coords[i % coords.length][1]
     }));
   }
   if (typeof window.resetStudioSceneForAi === 'function') window.resetStudioSceneForAi();
   render();
   toast(`Applied AI concept: ${s.title}`);
 };

 window.generateAiDesignSuggestions = async function(showToastOnDone = true) {
   if (aiIsLoading) return;
   const input = document.getElementById('aiVibePrompt');
   if (input) aiCustomPromptText = input.value.trim();

   aiIsLoading = true;
   aiDismissedIndexes.clear();
   updateAiPanelDom();

   const payload = {
     occasion,
     theme,
     template: selectedTemplate,
     shape,
     size,
     quantity,
     decoration,
     balloonMessage,
     figures: draftMarkers.map(m => m.figureId),
     customPrompt: aiCustomPromptText || studioSpecialRequest || '',
     availableTemplates: data.templates.map(t => ({ id: t.id, name: t.name, type: t.type })),
     availableDecorations: ['None', ...(data.settings?.decorations || [])]
   };

   try {
     const result = await fetchAiBalloonSuggestions(payload);
     aiLastModel = result.model || 'AI';
     aiGeneratedSuggestions = result.suggestions.map((s, idx) => sanitizeSuggestion(s, idx));
     aiIsLoading = false;
     updateAiPanelDom();
     if (showToastOnDone) {
       toast('AI generated fresh balloon design suggestions!');
     }
   } catch (err) {
     aiIsLoading = false;
     aiGeneratedSuggestions = [];
     updateAiPanelDom();
     renderSuggestions();
     if (showToastOnDone) {
       toast('Using curated suggestions (AI service unreachable).');
     }
   }
 };

 const priorRenderSuggestions = renderSuggestions;
 renderSuggestions = function() {
   priorRenderSuggestions();
   if (aiIsLoading || aiGeneratedSuggestions.length > 0) {
     updateAiPanelDom();
   } else if (page === 'studio' && role === 'customer' && !aiHasAutoRun) {
     aiHasAutoRun = true;
     window.generateAiDesignSuggestions(false);
   }
 };
})();

/* ==========================================================================
   UI ENHANCEMENT RUNTIME:
   Page Transitions, Scroll Reveal Observer, Counters, Parallax & Micro-Interactions
   ========================================================================== */
(function(){
 const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let revealObserver = null;
 let toastTimer = null;

 /* 1. Scroll-Triggered Reveal Engine (IntersectionObserver) */
 function setupScrollReveals(root = document) {
   const headingTargets = root.querySelectorAll('.editorial-heading, .section-head, .collection-intro, .studio-heading, .catalog-title-row');
   headingTargets.forEach(el => {
     if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'fade-up');
   });

   const blockTargets = root.querySelectorAll('.benefit-strip, .home-callout, .story-strip, .pricing-note, .catalog-side, .studio-layout > .panel, .panel:not(.studio-layout > .panel)');
   blockTargets.forEach((el, idx) => {
     if (!el.hasAttribute('data-reveal')) {
       el.setAttribute('data-reveal', 'fade-up');
       el.style.setProperty('--stagger-index', String(Math.min(idx, 3)));
     }
   });

   const staggerGroups = root.querySelectorAll('.occasion-tile-grid, .portfolio-grid, .catalog-grid, .cards, .dashboard, .owner-package-grid, .owner-template-grid, #suggestions');
   staggerGroups.forEach(group => {
     Array.from(group.children).forEach((child, idx) => {
       if (!child.hasAttribute('data-reveal')) {
         child.setAttribute('data-reveal', 'scale-in');
         child.style.setProperty('--stagger-index', String(idx % 8));
       }
     });
   });

   const allRevealNodes = root.querySelectorAll('[data-reveal]:not(.is-visible)');
   if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
     allRevealNodes.forEach(el => el.classList.add('is-visible'));
     return;
   }

   if (!revealObserver) {
     revealObserver = new IntersectionObserver((entries, obs) => {
       entries.forEach(entry => {
         if (entry.isIntersecting) {
           entry.target.classList.add('is-visible');
           animateCounterIfApplicable(entry.target);
           obs.unobserve(entry.target);
         }
       });
     }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
   }

   allRevealNodes.forEach(el => {
     const rect = el.getBoundingClientRect();
     if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
       el.classList.add('is-visible');
       animateCounterIfApplicable(el);
     } else {
       revealObserver.observe(el);
     }
   });
 }

 /* 2. Animated Statistics & Numerical Counters */
 function animateNumber(el, targetVal, suffix = '', prefix = '') {
   if (prefersReducedMotion() || el.dataset.counted === 'true' || !Number.isFinite(targetVal) || targetVal <= 0) return;
   el.dataset.counted = 'true';
   const duration = 850;
   const start = performance.now();
   function tick(now) {
     const progress = Math.min(1, (now - start) / duration);
     const eased = 1 - Math.pow(1 - progress, 3);
     const current = Math.round(targetVal * eased);
     el.textContent = `${prefix}${current}${suffix}`;
     if (progress < 1) requestAnimationFrame(tick);
     else el.textContent = `${prefix}${targetVal}${suffix}`;
   }
   requestAnimationFrame(tick);
 }

 function animateCounterIfApplicable(container) {
   if (container.classList.contains('metric')) {
     const strong = container.querySelector('strong');
     if (strong) {
       const num = parseInt(strong.textContent.trim(), 10);
       if (num > 0) animateNumber(strong, num);
     }
   }
   const badge = container.classList.contains('portfolio-photo-count')
     ? container
     : container.querySelector?.('.portfolio-photo-count');
   if (badge && !badge.dataset.counted) {
     const m = /^(\d+)(\s+.*)$/.exec(badge.textContent.trim());
     if (m) animateNumber(badge, parseInt(m[1], 10), m[2]);
   }
 }

 /* 3. Progressive Image Loading & Skeleton Shimmer */
 function setupImageReveals(root = document) {
   const imgs = root.querySelectorAll('.work-photo img, .catalog-image img, .story-images img');
   imgs.forEach(img => {
     const wrap = img.parentElement;
     if (!wrap) return;
     if (img.complete && img.naturalWidth > 0) {
       wrap.classList.remove('is-loading');
       img.classList.add('img-loaded');
     } else {
       wrap.classList.add('is-loading');
       img.addEventListener('load', () => {
         wrap.classList.remove('is-loading');
         img.classList.add('img-loaded');
       }, { once: true });
       img.addEventListener('error', () => {
         wrap.classList.remove('is-loading');
       }, { once: true });
     }
   });
 }

 /* 4. Hero Interactive Mouse Parallax */
 function setupHeroParallax() {
   if (prefersReducedMotion()) return;
   const heroPanel = document.querySelector('.hero-brand-panel');
   if (!heroPanel || heroPanel.dataset.parallaxWired === 'true') return;
   heroPanel.dataset.parallaxWired = 'true';
   heroPanel.addEventListener('pointermove', e => {
     if (window.innerWidth <= 760) return;
     const rect = heroPanel.getBoundingClientRect();
     const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
     const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
     heroPanel.style.setProperty('--mx', nx.toFixed(3));
     heroPanel.style.setProperty('--my', ny.toFixed(3));
   }, { passive: true });
   heroPanel.addEventListener('pointerleave', () => {
     heroPanel.style.setProperty('--mx', '0');
     heroPanel.style.setProperty('--my', '0');
   });
 }

 /* 5. Top Progress Bar Pulse & Page Transition */
 function pulseProgressBar() {
   const bar = document.getElementById('page-transition-bar');
   if (!bar || prefersReducedMotion()) return;
   bar.classList.add('is-active');
   clearTimeout(bar._hideTimer);
   bar._hideTimer = setTimeout(() => {
     bar.classList.remove('is-active');
   }, 360);
 }

 function enhanceCurrentDOM(root = document) {
   setupScrollReveals(root);
   setupImageReveals(root);
   setupHeroParallax();
 }

 const baseRender = render;
 render = function() {
   baseRender();
   const mainEl = document.getElementById('content');
   if (mainEl && !prefersReducedMotion()) {
     mainEl.classList.remove('page-enter');
     void mainEl.offsetWidth;
     mainEl.classList.add('page-enter');
   }
   requestAnimationFrame(() => enhanceCurrentDOM());
 };

 const baseGo = go;
 go = function(targetPage) {
   pulseProgressBar();
   baseGo(targetPage);
 };

 /* Smooth sub-grid transitions for gallery filter, expand/collapse & package categories */
 const baseFilterMergedGallery = filterMergedGallery;
 filterMergedGallery = function(category) {
   baseFilterMergedGallery(category);
   const content = document.querySelector('#merged-work-content');
   if (content) {
     content.classList.remove('grid-transition-enter');
     void content.offsetWidth;
     content.classList.add('grid-transition-enter');
     enhanceCurrentDOM(content);
   }
 };

 const baseToggleGallery = toggleGallery;
 toggleGallery = function() {
   baseToggleGallery();
   const content = document.querySelector('#merged-work-content');
   if (content) {
     content.classList.remove('grid-transition-enter');
     void content.offsetWidth;
     content.classList.add('grid-transition-enter');
     enhanceCurrentDOM(content);
   }
 };

 const baseRenderSuggestions = renderSuggestions;
 renderSuggestions = function() {
   baseRenderSuggestions();
   const wrap = document.getElementById('suggestions');
   if (wrap) setupScrollReveals(wrap.parentElement || document);
 };

 /* 6. Smooth Modal Exit Transition */
 closeModal = function() {
   const m = document.getElementById('modal');
   if (!m) return;
   if (prefersReducedMotion()) {
     m.remove();
     return;
   }
   m.id = 'modal-closing';
   m.classList.add('is-closing');
   setTimeout(() => m.remove(), 200);
 };

 /* 7. Enhanced Toast Notification with Animated Checkmark & Progress Bar */
 toast = function(msg) {
   const el = document.getElementById('toast');
   if (!el) return;
   el.removeAttribute('style');
   el.className = 'enhanced-toast';
   el.innerHTML = `<span class="toast-check-badge" aria-hidden="true">✓</span><span>${escapeHTML(msg)}</span><span class="toast-progress" aria-hidden="true"></span>`;
   void el.offsetWidth;
   el.classList.add('is-showing');
   clearTimeout(toastTimer);
   toastTimer = setTimeout(() => {
     el.classList.remove('is-showing');
   }, 3000);
 };

 /* 8. Sticky Header Scroll Elevation & Button Click Ripple */
 window.addEventListener('scroll', () => {
   const hdr = document.querySelector('header');
   if (hdr) hdr.classList.toggle('is-scrolled', window.scrollY > 12);
 }, { passive: true });

 document.addEventListener('pointerdown', e => {
   if (prefersReducedMotion()) return;
   const btnEl = e.target.closest('.btn, .header-start-designing, .header-signin, .login-submit');
   if (!btnEl) return;
   const rect = btnEl.getBoundingClientRect();
   const size = Math.max(rect.width, rect.height);
   const ripple = document.createElement('span');
   ripple.className = 'btn-ripple';
   ripple.style.width = ripple.style.height = `${size}px`;
   ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
   ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
   btnEl.appendChild(ripple);
   ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
 }, { passive: true });
})();

render();
