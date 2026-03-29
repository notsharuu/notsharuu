// ── BOOT ──
const bootEl = document.getElementById('boot');
[
  {t:0,   c:'g', s:'[    0.000000] Booting portfolio kernel v1.7.0...'},
  {t:90,  c:'',  s:'[    0.014000] BIOS-e820: [mem 0x0000000000000000-0x0009ffff] usable'},
  {t:170, c:'c', s:'[    0.102000] Loading modules: fullstack.ko reactnative.ko nodejs.ko electron.ko...'},
  {t:290, c:'g', s:'[    0.340000] ✓ javascript.conf loaded'},
  {t:390, c:'g', s:'[    0.512000] ✓ projects database mounted at /work'},
  {t:510, c:'g', s:'[    0.720000] ✓ skills indexed — 15 technologies found'},
  {t:630, c:'y', s:'[    0.900000] Initializing shell for Sharif Jameel...'},
  {t:790, c:'w', s:'[    1.200000] Welcome. System nominal.'},
].forEach(({t,c,s}) => {
  setTimeout(()=>{
    const d=document.createElement('div');
    d.className=`bl ${c}`; d.textContent=s;
    bootEl.appendChild(d);
  },t);
});
setTimeout(()=>{
  bootEl.classList.add('gone');
  setTimeout(()=>bootEl.remove(),600);
  run('welcome',false);
},1700);

// ── STATE ──
const out   = document.getElementById('out');
const input = document.getElementById('cmd');
let hist=[], hi=-1, curTheme='default';

// ── THEME ENGINE ──
// Maps name → body class (empty = default)
const THEMES = { default:'', light:'t-light', hacker:'t-hacker', retro:'t-retro' };

function setTheme(name){
  if(!THEMES.hasOwnProperty(name)) return false;
  // Remove all theme classes, add the new one
  document.body.className = THEMES[name];
  curTheme = name;
  document.getElementById('bartheme').textContent = name;
  // Highlight active swatch everywhere on page
  document.querySelectorAll('.sw').forEach(s => {
    s.classList.toggle('on', s.dataset.t === name);
  });
  return true;
}

// ── PROMPT HTML ──
const PR = c => `<div class="prompt">
  <span class="pu">sharif</span><span class="pat">@</span><span class="ph2">jameel</span>
  <span class="pp"> ~/portfolio</span><span class="pd"> $</span><span class="pc"> ${c}</span>
</div>`;

// ── SKILL BAR HELPER ──
const sb = rows => rows.map(([n,p,cl])=>`
  <div class="sr">
    <span class="sn">${n}</span>
    <div class="sb"><div class="sf ${cl}" style="width:${p}%"></div></div>
    <span class="sp">${p}%</span>
  </div>`).join('');

// ── SWATCH HTML ──
const swatchHTML = () => `
  <div class="swatches">
    ${Object.keys(THEMES).map(n=>`<div class="sw${curTheme===n?' on':''}" data-t="${n}" onclick="clickTheme('${n}')">${{default:'⬛',light:'⬜',hacker:'🟩',retro:'🟧'}[n]} ${n}</div>`).join('')}
  </div>`;

// ── COMMANDS ──
const cmds = {

  welcome: ()=>`
    <pre class="ascii">                                                                                                                                                              
                                         mm                                               
                       ##                ##                                               
 ##m####m   m####m   #######   mm#####m  ##m####m   m#####m   ##m####  ##    ##  ##    ## 
 ##"   ##  ##"  "##    ##      ##mmmm "  ##"   ##   " mmm##   ##"      ##    ##  ##    ## 
 ##    ##  ##    ##    ##       """"##m  ##    ##  m##"""##   ##       ##    ##  ##    ## 
 ##    ##  "##mm##"    ##mmm   #mmmmm##  ##    ##  ##mmm###   ##       ##mmm###  ##mmm### 
 ""    ""    """"       """"    """"""   ""    ""   """" ""   ""        """" ""   """" ""                                                                                  
    </pre>
    <p><span class="em2">sharif jameel</span> <span class="mu">·</span> full-stack dev <span class="mu">·</span> 17 y/o <span class="mu">·</span> india</p>
    <p class="mu">Started at 11. Still going. Type <span class="em">/help</span> to explore.<span class="blink"></span></p>
    <div class="cgrid" style="margin-top:20px">
      <div class="ci"><div class="cl">Stack</div><div class="cv">React · Node · Mongo</div></div>
      <div class="ci"><div class="cl">Mobile</div><div class="cv">React Native</div></div>
      <div class="ci"><div class="cl">Desktop</div><div class="cv">Electron</div></div>
      <div class="ci"><div class="cl">Status</div><div class="cv"><span class="ok">● Building</span></div></div>
    </div>`,

  '/help': ()=>`
    <p class="mu">Available commands:</p>
    <table class="htbl">
      <tr><td>/about</td><td>My story — the real one</td></tr>
      <tr><td>/projects</td><td>Things I've actually shipped</td></tr>
      <tr><td>/skills</td><td>Tech stack and proficiencies</td></tr>
      <tr><td>/contact</td><td>Where to find me</td></tr>
      <tr><td>/themes</td><td>Switch the terminal theme</td></tr>
      <tr><td>/clear</td><td>Clear the terminal</td></tr>
    </table>
    <p class="mu" style="margin-top:8px">↑/↓ history &nbsp;·&nbsp; Tab autocomplete &nbsp;·&nbsp; or click a swatch in /themes</p>`,

  '/about': ()=>`
    <div class="sh">Sharif Jameel</div>
    <p>I'm <span class="em2">17</span>, self-taught, and full-stack. I build for the web, mobile, and desktop — and I've been doing this longer than most people my age.</p>
    <p>It started when I was <span class="em">11</span>. Stumbled in through YouTube rabbit holes and copy-pasted code I didn't understand. I learned a little, got frustrated, quit. Came back. Quit again. Came back again.</p>
    <p>That's just how it went. Programming and me have always had an <span class="em3">on-and-off relationship</span> — but never a breakup. Every time I walked away, something pulled me back. A new idea. A new challenge. The memory of that one time something I built actually <em>worked</em>.</p>
    <p>Along the way I've learned from genuinely great people — open source contributors, indie hackers, strangers on YouTube who explained things clearly. I owe a lot to the internet, and I plan to give back to it.</p>
    <p>Right now I'm deep in <span class="em">full-stack development</span> — React on the frontend, Node.js on the backend, React Native for mobile, Electron when I want to go desktop. Building real things. Learning every day.</p>
    <hr class="dv">
    <div class="ss">The honest version</div>
    <p class="mu">▸ Self-taught since age <span class="em">11</span><br>
    ▸ Quit and came back more times than I can count<br>
    ▸ I build to understand, not to pad a resume<br>
    ▸ 17 years old, shipping real things<br>
    ▸ Open to opportunities and collabs</p>
    <hr class="dv">
    <p class="mu">📍 India 🇮🇳 &nbsp;·&nbsp; <span class="ok">● Open to work</span></p>`,

  '/projects': ()=>`
    <div class="sh">Selected Projects</div>

    <div class="pcard">
      <div class="pt"><span class="pn">🖥️ NgrokGUI</span><span class="pd2">electron · open source · org project</span></div>
      <p class="pdesc">Ngrok is powerful — but nobody wants to live in a terminal all day. NgrokGUI wraps the ngrok CLI in a clean desktop GUI. Expose tunnels, manage sessions, and share local dev servers without touching the command line.</p>
      <div class="ptags">
        <span class="tag c">Electron</span><span class="tag c">JavaScript</span>
        <span class="tag c">Node.js</span><span class="tag g">Open Source</span><span class="tag y">Desktop</span>
      </div>
    </div>

    <div class="pcard">
      <div class="pt"><span class="pn">🔥 RnFirebaseApp</span><span class="pd2">react native · mobile</span></div>
      <p class="pdesc">A React Native app with complete Firebase auth — login, signup, session management, and real-time database. Clean enough to serve as a starter template for any mobile product that needs auth out of the box.</p>
      <div class="ptags">
        <span class="tag c">React Native</span><span class="tag c">Firebase</span>
        <span class="tag c">Java</span><span class="tag y">Mobile</span>
      </div>
    </div>

    <div class="pcard">
      <div class="pt"><span class="pn">🔍 Google Searcher</span><span class="pd2">javascript · productivity</span></div>
      <p class="pdesc">Most people use Google wrong. This surfaces advanced search operators — site:, filetype:, intitle: — in a usable UI so you can do power searches without memorising the syntax. Search smarter, not harder.</p>
      <div class="ptags">
        <span class="tag c">JavaScript</span><span class="tag c">HTML / CSS</span><span class="tag y">Productivity</span>
      </div>
    </div>

    <div class="pcard">
      <div class="pt"><span class="pn">🧩 jquery-script-code</span><span class="pd2">vs code extension · published</span></div>
      <p class="pdesc">A VS Code extension that drops a jQuery script tag into your project via the command palette. Hit Cmd+Shift+P, type <code style="color:var(--accent4);font-size:11px">jqc</code>, done. Small tool — real time saver. Published on the marketplace.</p>
      <div class="ptags">
        <span class="tag c">JavaScript</span><span class="tag c">VS Code API</span>
        <span class="tag g">2 ⭐ GitHub</span><span class="tag g">Published</span>
      </div>
    </div>`,

  '/skills': ()=>`
    <div class="sh">Tech Stack</div>
    <div class="ss">Languages & Markup</div>
    ${sb([['JavaScript',90,''],['HTML',93,'g'],['CSS',90,'g'],['SQL',68,'y']])}
    <div class="ss">Frontend</div>
    ${sb([['React',88,''],['React Native',80,''],['Electron',75,'g'],['EJS',70,'y'],['Bootstrap',85,'g'],['Tailwind CSS',82,'']])}
    <div class="ss">Backend & Databases</div>
    ${sb([['Node.js',85,''],['MongoDB',80,'g'],['MySQL',70,'y'],['Firebase',78,'']])}
    <div class="ss">DevOps & Tooling</div>
    <div class="cgrid" style="margin-top:8px">
      ${['Docker','Heroku','GitHub','VS Code API'].map(s=>`<div class="ci"><div class="cv" style="font-size:12px">▸ ${s}</div></div>`).join('')}
    </div>`,

  '/contact': ()=>`
    <div class="sh">Find Me</div>
    <p>I'm 17 and building in public. Cool idea, collab, or just wanna talk code? Hit me up — I actually reply.</p>
    <table class="ctbl">
      <tr><td>email</td><td><a href="mailto:sharifjameel20@gmail.com">sharifjameel20@gmail.com</a></td></tr>
      <tr><td>github</td><td><a href="https://github.com/notsharuu" target="_blank">github.com/notsharuu</a></td></tr>
      <tr><td>linkedin</td><td><a href="https://linkedin.com/in/notsharuu" target="_blank">linkedin.com/in/notsharuu</a></td></tr>
      <tr><td>twitter</td><td><a href="https://twitter.com/notsharuu" target="_blank">@notsharuu</a></td></tr>
      <tr><td>instagram</td><td><a href="https://instagram.com/_notsharuu_" target="_blank">@_notsharuu_</a></td></tr>
      <tr><td>location</td><td>India 🇮🇳 · Remote-friendly</td></tr>
      <tr><td>status</td><td><span class="ok">● Open to opportunities</span></td></tr>
    </table>`,

  '/themes': ()=>`
    <div class="sh">Themes</div>
    <p class="mu">Click a theme or type its name and press Enter:</p>
    ${swatchHTML()}
    <table class="htbl" style="margin-top:4px">
      <tr><td>default</td><td>Dark blue-grey with cyan glow</td></tr>
      <tr><td>light</td><td>Light terminal, easy on the eyes</td></tr>
      <tr><td>hacker</td><td>Classic green phosphor CRT</td></tr>
      <tr><td>retro</td><td>Amber glow — old school display</td></tr>
    </table>`,

  '/clear': ()=>null,
};

// ── RENDER BLOCK ──
function addBlock(ph, oh) {
  const d = document.createElement('div');
  d.className = 'output';
  d.innerHTML = (ph||'') + (oh||'');
  out.appendChild(d);
  d.scrollIntoView({behavior:'smooth',block:'end'});
}

// ── APPLY THEME (from swatch click) ──
function clickTheme(name) {
  setTheme(name);
  addBlock('', `<p class="ok">✓ Theme switched to <span class="em">${name}</span>.</p>`);
}

// ── RUN COMMAND ──
function run(c, showP=true) {
  const n = c.trim().toLowerCase();

  // Theme names as commands
  if (THEMES.hasOwnProperty(n)) {
    setTheme(n);
    addBlock(showP ? PR(c) : '', `<p class="ok">✓ Theme switched to <span class="em">${n}</span>.</p>`);
    return;
  }
  // Clear
  if (n === '/clear') { out.innerHTML = ''; return; }
  // Named commands
  const fn = cmds[n] || cmds[c] || null;
  if (fn) {
    const o = fn();
    if (o !== null) addBlock(showP ? PR(c) : '', o);
  } else if (n === 'welcome') {
    addBlock('', cmds.welcome());
  } else if (c) {
    addBlock(PR(c), `<p class="er">bash: ${c}: command not found</p><p class="mu">Try <span class="em">/help</span></p>`);
  }
}

// ── INPUT ──
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const v = input.value.trim();
    if (!v) return;
    hist.unshift(v); hi = -1;
    input.value = '';
    run(v);
  }
  if (e.key === 'ArrowUp')   { hi=Math.min(hi+1,hist.length-1); input.value=hist[hi]||''; e.preventDefault(); }
  if (e.key === 'ArrowDown') { hi=Math.max(hi-1,-1); input.value=hi===-1?'':hist[hi]; e.preventDefault(); }
  if (e.key === 'Tab') {
    e.preventDefault();
    const m = Object.keys(cmds).filter(k=>k.startsWith('/')).find(k=>k.startsWith(input.value));
    if (m) input.value = m;
  }
});

document.addEventListener('click', e => { if(!e.target.closest('.sw')) input.focus(); });
input.focus();