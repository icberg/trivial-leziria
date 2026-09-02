"use strict";
let teamLabels = {};
function renderCountButtons(){
  const el = document.getElementById("countbtns");
  el.innerHTML = [4,5,6].map(n=>`<button class="${n===teamCount?'sel':''}" onclick="setCount(${n})">${n} teams</button>`).join("");
}

function renderTeamNameInputs(){
  document.getElementById("teampreview").innerHTML = TEAMS_ALL.slice(0,teamCount).map(team=>`
    <div style="display:flex;align-items:center;gap:8px;border:1px solid var(--line);border-radius:10px;padding:7px 10px;margin-bottom:7px">
      <span class="dot" style="background:${team.color};flex-shrink:0"></span>
      <input class="field2" style="flex:1" placeholder="${t('teamNamePlaceholder')}"
        value="${(teamLabels[team.name]||'').replace(/"/g,'&quot;')}"
        oninput="teamLabels['${team.name}']=this.value">
      <button class="authlink" aria-label="About ${escapeHtml(team.name)}" onclick="event.stopPropagation();document.getElementById('modalRoot').innerHTML=partyStanceModalHTML('${team.name}')">ⓘ</button>
    </div>`).join("");
}

function setCount(n){ teamCount = n; renderCountButtons(); }

function goToNames(){
  document.getElementById("setupStep1").classList.add("hidden");
  document.getElementById("setupStep2").classList.remove("hidden");
  renderTeamNameInputs();
}
function goBackToCount(){
  document.getElementById("setupStep2").classList.add("hidden");
  document.getElementById("setupStep1").classList.remove("hidden");
}

let sessionStartTime = null;

function startGame(){
  teams = TEAMS_ALL.slice(0,teamCount).map(t=>{
    const custom = (teamLabels[t.name]||"").trim();
    const finalName = custom || t.name;
    const letters = finalName.replace(/[^\p{L}\p{N}]/gu, "").slice(0,3).toUpperCase() || t.letter;
    return {...t, party:t.name, name: finalName, letter: letters, pos:0, lifeline:true, skip:false,
      stats:{correct:0, wrong:0, byCat:{parliament:0,meps:0,laws:0,leziria:0}, log:[]}};
  });
  cur = -1; winner = null; usedQ.clear(); usedE.clear();
  document.getElementById("setup").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  document.getElementById("resetBtn").classList.remove("hidden");
  document.getElementById("log").innerHTML = "";
  currentSessionId = addHistoryEntry({ date: Date.now(), teamCount: teams.length, status:"in progress", winner:null });
  sessionStartTime = Date.now();
  track("game_start", { team_count: teams.length, language: currentLang });
  buildBoard(); renderTeams(); log("The race to the European Parliament begins. Boa viagem!");
  nextTurn();
}

function confirmReset(){ 
  if(confirm("Restart the game? Current positions will be lost.")){
    if(currentSessionId && !winner){
      updateHistoryEntry(currentSessionId, { status:"abandoned" });
      const durationSec = sessionStartTime ? Math.round((Date.now()-sessionStartTime)/1000) : 0;
      track("game_abandoned", { duration_seconds: durationSec, team_count: teams.length, language: currentLang });
    }
    currentSessionId = null; sessionStartTime = null;
    document.getElementById("game").classList.add("hidden");
    document.getElementById("setup").classList.remove("hidden");
    document.getElementById("setupStep2").classList.add("hidden");
    document.getElementById("setupStep1").classList.remove("hidden");
    document.getElementById("resetBtn").classList.add("hidden");
    clearTimer();
  }
}

/* ---------- Board Layout & Rendering ---------- */
function posXY(p){
  /* Start/finish pawns are anchored clear of the Santarém/European Parliament
     label boxes (not on top of them) so stacked team badges never cover the text. */
  if(p === 0) return [46, 372];
  if(p === 33) return [45, 155];
  const row = Math.floor((p-1)/8), idx = (p-1)%8;
  const col = row % 2 === 0 ? idx : 7 - idx;
  return [95 + col * 72, 430 - row * 110];
}

function buildBoard(){
  let s = `<svg viewBox="0 0 700 520" xmlns="http://www.w3.org/2000/svg" aria-label="Game board">`;
  s += `<text x="350" y="30" text-anchor="middle" font-family="'Bricolage Grotesque',sans-serif" font-size="24" font-weight="800" fill="var(--ink)">${escapeHtml(t("gameTitle"))}</text>`;
  s += `<path d="M45 430 H599 C665 430 665 320 599 320 H95 C29 320 29 210 95 210 H599 C665 210 665 100 599 100 H60"
        fill="none" stroke="var(--road)" stroke-width="42" stroke-linecap="round"/>`;
  s += `<text x="350" y="382" text-anchor="middle" font-size="12" font-weight="700" fill="#A89F91" letter-spacing="1">★★</text>`;
  s += `<text x="350" y="272" text-anchor="middle" font-size="12" font-weight="700" fill="#A89F91" letter-spacing="1">★★★</text>`;
  s += `<text x="350" y="162" text-anchor="middle" font-size="12" font-weight="700" fill="#A89F91" letter-spacing="1">★★★</text>`;
  s += `<text x="350" y="492" text-anchor="middle" font-size="12" font-weight="700" fill="#A89F91" letter-spacing="1">★</text>`;
  
  for(let p=1; p<=32; p++){
    const [x,y] = posXY(p); const t2 = LAYOUT[p-1];
    const fill = t2 === "EVENT" ? "var(--cat-event)" : t2 === "TRILOGUE" ? "var(--cat-trilogue)" : CATS[t2].color;
    s += `<circle cx="${x}" cy="${y}" r="16" fill="${fill}" stroke="#FAF7F0" stroke-width="2"/>`;
    if(t2 === "TRILOGUE") s += `<text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">🤝</text>`;
    if(t2 === "EVENT") s += `<text x="${x}" y="${y+4.5}" text-anchor="middle" font-size="12" fill="#fff" font-weight="800">?</text>`;
  }
  
  s += `<rect x="8" y="403" width="76" height="52" rx="10" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5"/>
        <text x="46" y="425" text-anchor="middle" font-size="12.5" font-weight="800" fill="#14532D">Santarém</text>
        <text x="46" y="441" text-anchor="middle" font-size="11" font-weight="600" fill="#166534">Partida</text>`;
  s += `<rect x="6" y="73" width="78" height="52" rx="10" fill="#DBEAFE" stroke="#2563EB" stroke-width="1.5"/>
        <text x="45" y="95" text-anchor="middle" font-size="11.5" font-weight="800" fill="#1E40AF">European</text>
        <text x="45" y="111" text-anchor="middle" font-size="11" font-weight="600" fill="#1D4ED8">Parliament</text>`;
  s += `<g id="pawns"></g></svg>`;
  
  document.getElementById("boardwrap").innerHTML = s;
  const g = document.getElementById("pawns");
  teams.forEach((tm, i) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "g");
    el.setAttribute("class", "pawn"); 
    el.setAttribute("id", "pawn" + i);
    const fsize = tm.letter.length >= 3 ? 8 : tm.letter.length === 2 ? 9.5 : 11;
    el.innerHTML = `<circle r="12" fill="${tm.color}" stroke="#FFFFFF" stroke-width="2.5" shadow="0 2px 4px rgba(0,0,0,0.2)"/>
                    <text y="4" text-anchor="middle" font-size="${fsize}" font-weight="800" fill="#fff">${escapeHtml(tm.letter)}</text>`;
    g.appendChild(el);
  });
  updatePawns();
}
function escapeHtml(str){
  return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function updatePawns(){
  teams.forEach((t, i) => {
    const [x,y] = posXY(t.pos); 
    const [dx,dy] = OFFS[i];
    const el = document.getElementById("pawn" + i);
    if(el) el.setAttribute("transform", `translate(${x+dx},${y+dy})`);
  });
}

/* ---------- Sidebar & Logging ---------- */
function sqLabel(p){ return p === 0 ? "Santarém" : p === 33 ? "European Parliament 🏁" : "Square " + p; }

function renderTeams(){
  document.getElementById("teams").innerHTML = teams.map((t, i) => `
    <div class="teamcard ${i === cur && !winner ? 'cur' : ''}" style="border-left-color:${t.color}">
      <div class="nm"><span class="dot" style="background:${t.color}"></span>${t.name}</div>
      <div class="st">
        <span>${sqLabel(t.pos)}</span>
        <span class="badge ${t.lifeline ? 'on' : 'off'}">📞 Ask group</span>
        ${t.skip ? '<span class="badge skip">Skips next</span>' : ''}
      </div>
    </div>`).join("");
}

function toggleLog(){
  const el = document.getElementById("log");
  const btn = document.getElementById("logToggleBtn");
  const nowHidden = el.classList.toggle("hidden");
  btn.textContent = nowHidden ? "Show" : "Hide";
}

function log(msg){
  const li = document.createElement("li"); 
  li.innerHTML = msg;
  const el = document.getElementById("log"); 
  el.prepend(li);
  while(el.children.length > 40) el.removeChild(el.lastChild);
}

/* ---------- Turn Engine ---------- */
function clearTimer(){ if(timerInt){ clearInterval(timerInt); timerInt = null; } }
function setAction(html){ clearTimer(); document.getElementById("action").innerHTML = html; }

function turnHead(extra = ""){
  const t = teams[cur];
  return `<div class="turnhead"><span class="dot" style="width:16px;height:16px;background:${t.color}"></span> ${t.name}${extra}</div>`;
}

function nextTurn(){
  if(winner) return;
  cur = (cur + 1) % teams.length;
  const t = teams[cur]; 
  renderTeams();
  if(t.skip){
    t.skip = false; 
    renderTeams();
    log(`<b>${t.name}</b> sits this turn out.`);
    setAction(turnHead(" — skipped") + `<p class="muted">This team skips its turn (event or failed trilogue).</p>
      <div class="btnrow"><button class="btn primary" onclick="nextTurn()">Next team ▸</button></div>`);
    return;
  }
  showRoll();
}

function showRoll(sameTeam = false){
  const t = teams[cur];
  setAction(turnHead(sameTeam ? " — roll again!" : " — your turn") +
    `<p class="muted">${sameTeam ? "The event lets you roll again." : "Roll the die to travel."} You are at ${sqLabel(t.pos)}.</p>
     <div class="btnrow"><button class="btn big primary" onclick="doRoll()"><span class="die">⚄</span> Roll the die</button></div>`);
}

function doRoll(){
  Sound.roll();
  const t = teams[cur]; 
  turnStart = t.pos;
  const r = 1 + Math.floor(Math.random() * 6);
  let raw = t.pos + r, target = raw > 33 ? 66 - raw : raw;
  setAction(turnHead() + `<p style="font-size:42px;margin:8px 0">${DIEF[r-1]} <b style="font-family:'Bricolage Grotesque'">${r}</b></p>`);
  log(`<b>${t.name}</b> rolls a ${r}${raw > 33 ? " — too far! Bounces back from Brussels." : ""}`);
  t.pos = target; 
  updatePawns(); 
  renderTeams();
  setTimeout(resolveSquare, 750);
}

function resolveSquare(){
  const t = teams[cur], p = t.pos;
  if(p === 33){ plenary(); return; }
  const sq = LAYOUT[p-1];
  if(sq === "EVENT"){ drawEvent(); return; }
  if(sq === "TRILOGUE"){ startTrilogue(); return; }
  
  const shift = { easier:-1, standard:0, harder:1 }[getSettings().difficulty] || 0;
  let diff = (p <= 8 ? 1 : p <= 16 ? 2 : 3) + shift;
  diff = Math.max(1, Math.min(3, diff));
  askQuestion({
    cat: sq, diff, secs: getSettings().questionSecs,
    intro: `Landed on square ${p} — ${CATS[sq].label}, ${"★".repeat(diff)}.`,
    onCorrect(){ 
      Sound.correct();
      if(diff === 3 && t.pos < 32){
        t.pos = Math.min(32, t.pos + 1);
        updatePawns(); renderTeams();
        log(`<b>${t.name}</b> nails a ★★★ question and holds square ${p} — plus 1 bonus square for the hard answer.`);
        endTurn("Correct on a ★★★ question! The team keeps its square and advances 1 extra for the difficulty.");
      } else {
        log(`<b>${t.name}</b> answers correctly and holds square ${p}.`); 
        endTurn("Correct! The team keeps its square."); 
      }
    },
    onWrong(){ 
      Sound.wrong();
      t.pos = turnStart; 
      updatePawns(); 
      renderTeams();
      log(`<b>${t.name}</b> answers wrong and returns to ${sqLabel(turnStart)}.`);
      endTurn("Wrong — back to where the turn started."); 
    }
  });
}

function endTurn(msg){
  setAction(turnHead() + `<p style="margin-bottom:10px">${msg}</p>
    <div class="btnrow"><button class="btn primary" onclick="nextTurn()">Next team ▸</button></div>`);
}

/* ---------- Questions ---------- */
function pickQuestion(cat, diff){
  let pool = DB.questions.filter(q => q.cat === cat && q.diff === diff && !usedQ.has(q.id));
  if(pool.length === 0){
    DB.questions.filter(q => q.cat === cat && q.diff === diff).forEach(q => usedQ.delete(q.id));
    pool = DB.questions.filter(q => q.cat === cat && q.diff === diff);
  }
  const q = pool[Math.floor(Math.random() * pool.length)];
  if(q) usedQ.add(q.id);
  return q;
}

function askQuestion(o){
  const q = pickQuestion(o.cat, o.diff);
  if(!q){ endTurn("No question found for this category — check database."); return; }
  window.__q = {q, o};
  renderQuestionUI(q, o);
}
function renderQuestionUI(q, o){
  const t = teams[cur];
  const lq = localizedQ(q);
  const chip = `<span class="chip" style="background:${CATS[o.cat].hex}">${CATS[o.cat].label} ${"★".repeat(o.diff)}</span>`;
  setAction(turnHead() +
    `<p class="muted">${o.intro || ""}</p>
     <div style="margin:8px 0 2px">${chip}</div>
     <p class="qtext">${lq.text}</p>
     <div class="btnrow">
       <button class="btn" id="timerStartBtn" onclick="startTimer(${o.secs || 30})">⏱ ${t_("startTimer")} ${o.secs || 30}s</button>
       <button class="btn hidden" id="timerPauseBtn" onclick="pauseTimer()">⏸ ${t_("pause")}</button>
       <button class="btn hidden" id="timerStopBtn" onclick="stopTimer()">⏹ ${t_("stop")}</button>
       <span class="timer-digit hidden" id="timerDisplay"></span>
       ${(o.allowLifeline !== false && t.lifeline) ? `<button class="btn" id="lifeBtn" onclick="useLifeline()">${t_("askGroup")}</button>` : ""}
       <button class="btn" id="showOptsBtn" onclick="showOptionsGM()" title="Reveal options for the GM without spending the team's lifeline">${t_("showOptionsGM")}</button>
       <button class="btn primary" onclick="revealAnswer()">${t_("showAnswer")}</button>
     </div>
     <div id="opts"></div><div id="answer"></div>`);
}
function t_(key){ return typeof t === "function" ? t(key) : key; }

let timerLeft = 0, timerPaused = false;
function startTimer(secs){
  clearTimer();
  const display = document.getElementById("timerDisplay");
  if(!display) return;
  display.classList.remove("hidden", "low");
  document.getElementById("timerStartBtn").classList.add("hidden");
  document.getElementById("timerPauseBtn").classList.remove("hidden");
  document.getElementById("timerStopBtn").classList.remove("hidden");
  document.getElementById("timerPauseBtn").textContent = "⏸ Pause";

  timerLeft = secs; timerPaused = false;
  display.textContent = timerLeft + "s";
  runTimerInterval();
}
function runTimerInterval(){
  timerInt = setInterval(() => {
    if(timerPaused) return;
    timerLeft--;
    const display = document.getElementById("timerDisplay");
    if(display) display.textContent = timerLeft + "s";
    if(timerLeft <= 5 && display) display.classList.add("low");
    if(timerLeft <= 0){
      clearTimer();
      if(display) display.textContent = "0s";
      Sound.wrong();
    }
  }, 1000);
}
function pauseTimer(){
  const btn = document.getElementById("timerPauseBtn");
  timerPaused = !timerPaused;
  if(btn) btn.textContent = timerPaused ? "▶ Resume" : "⏸ Pause";
}
function stopTimer(){
  clearTimer();
  const display = document.getElementById("timerDisplay");
  if(display){ display.textContent = "Stopped"; display.classList.remove("low"); }
  const pauseBtn = document.getElementById("timerPauseBtn"); if(pauseBtn) pauseBtn.classList.add("hidden");
  const stopBtn = document.getElementById("timerStopBtn"); if(stopBtn) stopBtn.classList.add("hidden");
}
function showOptionsGM(){
  const {q} = window.__q || {};
  if(!q) return;
  const lq = localizedQ(q);
  document.getElementById("opts").innerHTML =
    `<p class="muted" style="margin-top:12px">👁 GM view — the three options (not shown to the team unless you read them aloud):</p>
     <div class="options">${lq.options.map(x => `<div>${x}</div>`).join("")}</div>`;
  const btn = document.getElementById("showOptsBtn"); if(btn) btn.disabled = true;
}

function useLifeline(){
  const t = teams[cur]; if(!t.lifeline) return;
  t.lifeline = false; renderTeams();
  const b = document.getElementById("lifeBtn"); if(b) b.disabled = true;
  const {q} = window.__q;
  const lq = localizedQ(q);
  const shuffled = [...lq.options].sort(() => Math.random() - .5);
  document.getElementById("opts").innerHTML =
    `<p class="muted" style="margin-top:12px">📞 The <b>${t.name}</b> group huddles: “It's one of these…”</p>
     <div class="options">${shuffled.map(x => `<div>${x}</div>`).join("")}</div>`;
  log(`<b>${t.name}</b> asks the group — lifeline used.`);
}

function revealAnswer(){
  const {q, o} = window.__q; clearTimer();
  const lq = localizedQ(q);
  document.getElementById("answer").innerHTML =
    `<div class="answerbox"><div class="a">${lq.answer}</div>
      ${lq.dyk ? `<div class="dyk">💡 ${lq.dyk}</div>` : ""}
      ${lq.source ? `<div class="dyk">Source: <a href="${lq.source}" target="_blank" rel="noopener">${lq.source.replace("https://","")}</a></div>` : ""}
     </div>
     <div class="btnrow" style="margin-top:14px">
       <button class="btn good" onclick="judge(true)">${t_("correct")}</button>
       <button class="btn bad" onclick="judge(false)">${t_("wrong")}</button>
     </div>`;
}

function judge(ok){
  const {q, o} = window.__q; window.__q = null;
  recordStat(teams[cur], q, o.cat, ok);
  if(window.__tri && window.__tri.partner && o.diff === 3 && o.secs === getSettings().trilogueSecs && o.intro && o.intro.indexOf("Joint") === 0){
    recordStat(window.__tri.partner, q, o.cat, ok);
  }
  ok ? o.onCorrect() : o.onWrong();
}
function recordStat(team, q, cat, ok){
  if(!team.stats) return;
  team.stats[ok ? "correct" : "wrong"]++;
  if(ok) team.stats.byCat[cat] = (team.stats.byCat[cat]||0) + 1;
  const lq = localizedQ(q);
  team.stats.log.push({ q: lq.text, answer: lq.answer, cat, ok, source: lq.source });
}

/* ---------- Events ---------- */
function drawEvent(){
  const t = teams[cur];
  let pool = DB.events.filter(e => !usedE.has(e.id));
  if(pool.length === 0){ usedE.clear(); pool = DB.events; }
  const e = pool[Math.floor(Math.random() * pool.length)]; 
  usedE.add(e.id);
  const lc = localizedCard(e);
  
  log(`<b>${t.name}</b> lands on an event: ${lc.title}`);
  const card = `<div class="eventcard"><h3>${lc.title}</h3><p>${lc.text}</p></div>`;
  
  switch(e.effect){
    case "skip": 
      t.skip = true; renderTeams();
      setAction(turnHead() + card); endAppend("The team skips its next turn."); break;
    case "advance": 
      t.pos = Math.min(32, t.pos + e.amount); updatePawns(); renderTeams();
      setAction(turnHead() + card); endAppend(`Advance ${e.amount} — now at ${sqLabel(t.pos)}.`); break;
    case "back": 
      t.pos = Math.max(0, t.pos - e.amount); updatePawns(); renderTeams();
      setAction(turnHead() + card); endAppend(`Back ${e.amount} — now at ${sqLabel(t.pos)}.`); break;
    case "rollAgain":
      setAction(turnHead() + card + `<div class="btnrow"><button class="btn big primary" onclick="showRoll(true)"><span class="die">⚄</span> Roll again</button></div>`); break;
    case "lastBonus": {
      const last = [...teams].sort((a,b) => a.pos - b.pos)[0];
      last.pos = Math.min(32, last.pos + e.amount); updatePawns(); renderTeams();
      setAction(turnHead() + card); endAppend(`<b>${last.name}</b> (last place) advances ${e.amount}.`); break; 
    }
    case "questionOrSkip":
      setAction(turnHead() + card);
      askEventQuestion(e.qcat, 
        () => { Sound.correct(); endTurn("Badge found — nothing happens."); },
        () => { Sound.wrong(); t.skip = true; renderTeams(); endTurn("No badge — team skips its next turn."); }
      ); break;
    case "questionOrBack":
      setAction(turnHead() + card);
      askEventQuestion(e.qcat, 
        () => { Sound.correct(); endTurn("Help organised — team holds its ground."); },
        () => { Sound.wrong(); t.pos = Math.max(0, t.pos - e.amount); updatePawns(); renderTeams(); endTurn(`Back ${e.amount} squares.`); }
      ); break;
    default:
      setAction(turnHead() + card); endAppend("Nothing happens. Lucky!");
  }
}

function endAppend(msg){
  document.getElementById("action").insertAdjacentHTML("beforeend",
    `<p style="margin-top:8px">${msg}</p><div class="btnrow"><button class="btn primary" onclick="nextTurn()">Next team ▸</button></div>`);
}

function askEventQuestion(cat, onOk, onNo){
  askQuestion({cat, diff:1, secs:30, intro:"Event question:", allowLifeline:true, onCorrect:onOk, onWrong:onNo});
}

/* ---------- Trilogue ---------- */
function startTrilogue(){
  const t = teams[cur];
  let pool = DB.trilogues; 
  const tc = pool[Math.floor(Math.random() * pool.length)];
  window.__tri = {card: tc, partner: null, splitSelf: 2, cat: null};
  const lc = localizedCard(tc);
  
  const behind = teams.filter(x => x !== t && x.pos < t.pos).sort((a,b) => b.pos - a.pos);
  const ahead = teams.filter(x => x !== t && x.pos > t.pos).sort((a,b) => a.pos - b.pos);
  let suggested = tc.partner === "ahead" ? (ahead[0] || behind[0]) : (behind[0] || ahead[0]);
  const others = teams.filter(x => x !== t);
  
  log(`<b>${t.name}</b> lands on a trilogue: ${lc.title}`);
  setAction(turnHead(t_("trilogueBang")) +
    `<div class="eventcard trg"><h3>🤝 ${lc.title}</h3><p>${lc.text}</p></div>
     <p class="muted">Choose negotiation partner${suggested ? ` (suggested: <b>${suggested.name}</b>)` : ""}:</p>
     <div class="btnrow">${others.map(x => `<button class="btn ${x === suggested ? 'primary' : ''}" onclick="triPartner(${teams.indexOf(x)})">${x.name} — ${sqLabel(x.pos)}</button>`).join("")}</div>`);
}

function triPartner(idx){
  const t = teams[cur], p = teams[idx], tri = window.__tri; 
  tri.partner = p;
  if(tri.card.fixedSplit === "self"){ tri.splitSelf = 2; triCategory(); return; }
  setAction(turnHead(" — trilogue with " + p.name) +
    `<p class="muted">Negotiate the split out loud, then record the deal:</p>
     <div class="btnrow">
       <button class="btn" onclick="triSplit(2)">${t.name} +2 · ${p.name} +1</button>
       <button class="btn" onclick="triSplit(1)">${t.name} +1 · ${p.name} +2</button>
       <button class="btn bad" onclick="triNoDeal()">No deal — both skip a turn</button>
     </div>`);
}

function triSplit(selfAmt){ window.__tri.splitSelf = selfAmt; triCategory(); }

function triNoDeal(){
  const t = teams[cur], p = window.__tri.partner;
  t.skip = true; p.skip = true; renderTeams();
  Sound.wrong();
  log(`Trilogue collapses — <b>${t.name}</b> and <b>${p.name}</b> skip next turn.`);
  endTurn("No deal in time. Both delegations skip their next turn.");
}

function triCategory(){
  const tri = window.__tri, picker = tri.card.partnerPicksCategory ? tri.partner.name : "the table";
  setAction(turnHead(" — trilogue") +
    `<p class="muted">${tri.card.partnerPicksCategory ? `<b>${picker}</b> chooses category:` : "Choose question category:"}</p>
     <div class="btnrow">${Object.keys(CATS).map(c => `<button class="btn" onclick="triAsk('${c}')">${CATS[c].label}</button>`).join("")}</div>`);
}

function triAsk(cat){
  const t = teams[cur], tri = window.__tri, p = tri.partner;
  askQuestion({
    cat, diff: 3, secs: getSettings().trilogueSecs, allowLifeline: false,
    intro: `Joint ★★★ question — ${t.name} & ${p.name} answer together. Deal: ${t.name} +${tri.splitSelf}, ${p.name} +${3-tri.splitSelf}.`,
    onCorrect(){
      Sound.correct();
      t.pos = Math.min(32, t.pos + tri.splitSelf); 
      p.pos = Math.min(32, p.pos + (3 - tri.splitSelf));
      updatePawns(); renderTeams();
      log(`Trilogue success! <b>${t.name}</b> +${tri.splitSelf}, <b>${p.name}</b> +${3-tri.splitSelf}.`);
      endTurn("Deal honoured — both teams advance.");
    },
    onWrong(){
      Sound.wrong();
      t.skip = true; p.skip = true; renderTeams();
      log(`Trilogue fails — <b>${t.name}</b> and <b>${p.name}</b> skip next turn.`);
      endTurn("Wrong answer — deal collapses and both teams skip next turn.");
    }
  });
}

/* ---------- Plenary & Victory ---------- */
function plenary(){
  const t = teams[cur];
  log(`<b>${t.name}</b> reaches Brussels! Plenary question ahead.`);
  setAction(turnHead(t_("europeanParliamentBang")) +
    `<p class="qtext" style="margin-top:4px">The Plenary Question</p>
     <p class="muted">The <b>other teams</b> vote out loud on the category:</p>
     <div class="btnrow">${Object.keys(CATS).map(c => `<button class="btn" onclick="plenaryAsk('${c}')">${CATS[c].label}</button>`).join("")}</div>`);
}

function plenaryAsk(cat){
  const t = teams[cur];
  askQuestion({
    cat, diff: 3, secs: getSettings().trilogueSecs,
    intro: "★★★ plenary question — answer correctly to win the game.",
    onCorrect(){ win(t); },
    onWrong(){ 
      Sound.wrong();
      t.pos = 30; updatePawns(); renderTeams();
      log(`<b>${t.name}</b> fails plenary vote and retreats to square 30.`);
      endTurn("Plenary rejected — retreat 3 squares."); 
    }
  });
}

function win(t){
  winner = t; renderTeams();
  Sound.win();
  log(`🏆 <b>${t.name}</b> wins the race to the European Parliament!`);
  if(currentSessionId){ updateHistoryEntry(currentSessionId, { status:"finished", winner: t.name }); }
  const durationSec = sessionStartTime ? Math.round((Date.now()-sessionStartTime)/1000) : 0;
  track("game_finish", { duration_seconds: durationSec, team_count: teams.length, language: currentLang });
  setAction(`<div class="winner">
    <div class="cup">🏆</div>
    <h3>${t.name} Wins!</h3>
    <p class="muted">The ${t.name} delegation carries the day in the hemicycle.</p>
    <div class="btnrow" style="justify-content:center;margin-top:20px">
      <button class="btn" onclick="showRecap()">See recap &amp; sources</button>
      <button class="btn primary" onclick="confirmReset()">Play again</button>
    </div></div>`);
}

function showRecap(){
  const totalCorrect = teams.reduce((s,x)=>s+x.stats.correct,0);
  const totalAsked = teams.reduce((s,x)=>s+x.stats.correct+x.stats.wrong,0);
  const catOrder = ["parliament","meps","laws","leziria"];
  document.getElementById("modalRoot").innerHTML = `<div class="modaloverlay" onclick="if(event.target===this)closeModal()">
    <div class="modalbox" style="max-width:640px">
      <button class="close" onclick="closeModal()">&times;</button>
      <h2>Session recap</h2>
      <p class="sub">${totalAsked} questions answered across ${teams.length} teams — ${totalCorrect} correct. Use this to debrief with the class.</p>
      ${teams.map(x=>`
        <section>
          <h3><span class="dot" style="background:${x.color};width:11px;height:11px;display:inline-block;margin-right:6px"></span>${x.name} — ${x.stats.correct} correct / ${x.stats.wrong} wrong</h3>
          <div style="display:flex;gap:14px;flex-wrap:wrap;font-size:12.5px;color:var(--ink2);margin-bottom:8px">
            ${catOrder.map(c=>`<span>${CATS[c].label}: <b style="color:var(--ink)">${x.stats.byCat[c]||0}</b></span>`).join("")}
          </div>
          <div style="max-height:140px;overflow-y:auto">
            ${x.stats.log.map(e=>`<div class="histrow" style="font-size:12.5px">
              <span>${e.ok?"✓":"✗"} ${e.q}</span>
              ${e.source ? `<a href="${e.source}" target="_blank" rel="noopener" style="color:var(--blue)">source</a>` : ""}
            </div>`).join("") || `<p class="histempty" style="padding:8px 0">No questions logged.</p>`}
          </div>
        </section>`).join("")}
    </div>
  </div>`;
}
