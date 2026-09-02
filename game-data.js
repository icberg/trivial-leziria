"use strict";
const CATS = {
  parliament: {label:"Parliament", color:"var(--cat-parliament)", hex:"#2563EB"},
  meps: {label:"Portuguese MEPs", color:"var(--cat-meps)", hex:"#DC2626"},
  laws: {label:"Laws", color:"var(--cat-laws)", hex:"#16A34A"},
  leziria: {label:"Lezíria", color:"var(--cat-leziria)", hex:"#D97706"},
  euknow: {label:"EU Knowledge", color:"var(--cat-euknow)", hex:"#0D9488"}
};

const LAYOUT = [
  "parliament","meps","laws","leziria","euknow","EVENT","parliament","EVENT",
  "meps","laws","leziria","euknow","parliament","TRILOGUE","meps","EVENT",
  "laws","leziria","euknow","parliament","meps","EVENT","laws","TRILOGUE",
  "leziria","euknow","parliament","meps","laws","TRILOGUE","leziria","euknow"
];

const TEAMS_ALL = [
  {name:"EPP", color:"#2563EB", letter:"E"},
  {name:"S&D", color:"#DC2626", letter:"S"},
  {name:"Patriots", color:"#1E293B", letter:"P"},
  {name:"Renew", color:"#D97706", letter:"R"},
  {name:"The Left", color:"#991B1B", letter:"L"},
  {name:"Greens/EFA", color:"#16A34A", letter:"G"}
];

/* General, simplified characterisations for teaching purposes — not
   official manifesto text, and individual MEPs within a group can differ. */
const PARTY_STANCES = {
  "EPP": ["Broadly pro-market and pro-business, including for farmers.", "Has pushed back on strict green rules it sees as burdening food production.", "Generally supports continued strong CAP funding."],
  "S&D": ["Centre-left; tends to pair farm support with social and environmental conditions.", "Often backs eco-schemes and rural income support together.", "Portugal's S&D delegation includes the CAP simplification rapporteur."],
  "Patriots": ["National-conservative and eurosceptic bloc.", "Frequently critical of EU-wide environmental mandates on farmers.", "Emphasises national sovereignty over agricultural policy."],
  "Renew": ["Liberal-centrist; generally market-friendly with support for modernisation.", "Tends to favour innovation and digital tools in farming.", "Often positions itself as a swing/bridge vote between blocs."],
  "The Left": ["Left-wing; prioritises small farmers over large agribusiness.", "Generally pushes for stronger environmental and labour protections.", "Often critical of large-scale industrial agriculture subsidies."],
  "Greens/EFA": ["Environmental focus; strongest backers of the Nature Restoration Law.", "Pushes for higher eco-scheme targets and biodiversity measures.", "Often in tension with farm groups worried about short-term costs."]
};
function partyStanceModalHTML(name){
  const s = PARTY_STANCES[name] || [];
  return `<div class="modaloverlay" onclick="if(event.target===this)closeModal()">
    <div class="modalbox">
      <button class="close" onclick="closeModal()" aria-label="Close">&times;</button>
      <h2>${name}</h2>
      <p class="sub">Simplified for teaching — real debates are more nuanced, and MEPs within a group can disagree.</p>
      <ul style="padding-left:18px; font-size:14px; line-height:1.7">${s.map(x=>`<li>${x}</li>`).join("")}</ul>
    </div>
  </div>`;
}

const OFFS = [[-8,-8],[8,-8],[-8,8],[8,8],[0,-12],[0,12]];
const DIEF = ["⚀","⚁","⚂","⚃","⚄","⚅"];

let DB = null, teams = [], cur = -1, turnStart = 0, usedQ = new Set(), usedE = new Set(), winner = null, timerInt = null, teamCount = 4, currentSessionId = null;

/* ---------- Boot ---------- */
async function loadDB(){
  try { const r = await fetch("questions.json"); if(r.ok){ return await r.json(); } } catch(e){}
  return null;
}

window.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("langBtnEn").classList.toggle("sel", currentLang==="en");
  document.getElementById("langBtnPt").classList.toggle("sel", currentLang==="pt");
  document.getElementById("langBtnEn").setAttribute("aria-pressed", currentLang==="en");
  document.getElementById("langBtnPt").setAttribute("aria-pressed", currentLang==="pt");
  document.getElementById("routeText").textContent = t("route");
  CATS.parliament.label = t("catParliament");
  CATS.meps.label = t("catMeps");
  CATS.laws.label = t("catLaws");
  CATS.leziria.label = t("catLeziria");
    CATS.euknow.label = t("catEuknow");
  renderSetupStaticText();
  DB = await loadDB();
  if(!DB || !DB.questions){ 
    document.getElementById("setup").innerHTML = "<p><b>Could not load questions.</b> Check file configuration.</p>"; 
    return; 
  }
  renderCountButtons();
});

