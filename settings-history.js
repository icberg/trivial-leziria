"use strict";
const DEFAULT_SETTINGS = { questionSecs:30, trilogueSecs:60, sound:true, difficulty:"standard" };

function getSettings(){
  try{ return {...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(LS_SETTINGS)||"{}")}; }
  catch(e){ return {...DEFAULT_SETTINGS}; }
}
function saveSettings(s){
  try{ localStorage.setItem(LS_SETTINGS, JSON.stringify(s)); }catch(e){}
}
function getHistory(){
  try{ return JSON.parse(localStorage.getItem(LS_HISTORY)||"[]"); }catch(e){ return []; }
}
function addHistoryEntry(entry){
  try{
    const h = getHistory();
    const id = "s_" + Date.now() + "_" + Math.floor(Math.random()*10000);
    h.unshift({ id, ...entry });
    localStorage.setItem(LS_HISTORY, JSON.stringify(h.slice(0,80)));
    return id;
  }catch(e){ return null; }
}
function updateHistoryEntry(id, patch){
  try{
    const h = getHistory();
    const i = h.findIndex(x=>x.id===id);
    if(i>-1){ h[i] = {...h[i], ...patch}; localStorage.setItem(LS_HISTORY, JSON.stringify(h)); }
  }catch(e){}
}
function clearHistory(){
  if(!confirm(t("confirmClearHistory"))) return;
  try{ localStorage.removeItem(LS_HISTORY); }catch(e){}
  openModal("history");
}

let currentModal = null;
