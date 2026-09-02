"use strict";
/* ---------- Firebase setup ---------- */
let authMode = "signin"; // "signin" | "signup" — declared first so it's never left uninitialized

const firebaseConfig = {
  apiKey: "AIzaSyAG9AJ_I4gv0rGIat7tsENp8GlzBANdgAk",
  authDomain: "leziria-europeia.firebaseapp.com",
  projectId: "leziria-europeia",
  storageBucket: "leziria-europeia.firebasestorage.app",
  messagingSenderId: "27346355871",
  appId: "1:27346355871:web:c1072154d510698b8884aa"
};

let auth = null;
let firebaseReady = false;

function showAuthMsg(text, ok=false){
  const el = document.getElementById("authError");
  if(!el) return;
  if(!text){ el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  el.className = "authmsg " + (ok ? "ok" : "err");
  el.textContent = text;
}

try{
  if(typeof firebase === "undefined"){
    throw new Error("Firebase SDK did not load from the CDN.");
  }
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  firebaseReady = true;
}catch(e){
  console.error("Firebase failed to initialize:", e);
}

/* Fire-and-forget analytics logging via Umami — never lets an analytics failure break the game.
   Umami's script attaches a global `umami` object once loaded; the `defer` on its <script>
   tag can mean it isn't ready the instant the game boots, so we guard every call. */
function track(eventName, params){
  try{ if(window.umami) window.umami.track(eventName, params || {}); }catch(e){}
}

window.addEventListener("DOMContentLoaded", () => {
  if(!firebaseReady){
    showAuthMsg("Could not connect to the sign-in service. Check your internet connection, or that an ad-blocker / privacy extension isn't blocking gstatic.com, then reload the page.");
    const submitBtn = document.getElementById("authSubmit");
    if(submitBtn) submitBtn.disabled = true;
  }
});

function setAuthTab(mode){
  authMode = mode;
  document.getElementById("tabSignin").classList.toggle("sel", mode === "signin");
  document.getElementById("tabSignup").classList.toggle("sel", mode === "signup");
  document.getElementById("tabSignin").setAttribute("aria-pressed", mode === "signin");
  document.getElementById("tabSignup").setAttribute("aria-pressed", mode === "signup");
  document.getElementById("authSubmit").textContent = mode === "signin" ? "Sign in" : "Create account";
  document.getElementById("authPass").autocomplete = mode === "signin" ? "current-password" : "new-password";
  showAuthMsg(null);
}

function showAuthMsg(text, ok=false){
  const el = document.getElementById("authError");
  if(!text){ el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  el.className = "authmsg " + (ok ? "ok" : "err");
  el.textContent = text;
}

function friendlyAuthError(err){
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/missing-password": "Please enter a password.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/email-already-in-use": "An account already exists for that email — try Sign in instead.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/user-not-found": "No account found for that email — try Sign up instead.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled."
  };
  return map[err.code] || err.message || "Something went wrong. Please try again.";
}

function submitAuth(){
  if(!firebaseReady){ showAuthMsg("Sign-in service unavailable — reload the page once you're back online."); return; }
  const email = document.getElementById("authEmail").value.trim();
  const pass = document.getElementById("authPass").value;
  showAuthMsg(null);
  if(!email || !pass){ showAuthMsg("Please fill in both fields."); return; }
  const wasSignup = authMode === "signup";
  const action = authMode === "signin"
    ? auth.signInWithEmailAndPassword(email, pass)
    : auth.createUserWithEmailAndPassword(email, pass);
  action
    .then(cred => {
      track(wasSignup ? "sign_up" : "login", { method: "password" });
      if(wasSignup && cred.user && !cred.user.emailVerified){
        cred.user.sendEmailVerification().catch(()=>{});
      }
    })
    .catch(err => showAuthMsg(friendlyAuthError(err)));
}

function doGoogle(){
  if(!firebaseReady){ showAuthMsg("Sign-in service unavailable — reload the page once you're back online."); return; }
  showAuthMsg(null);
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(cred => {
      const isNew = cred.additionalUserInfo && cred.additionalUserInfo.isNewUser;
      track(isNew ? "sign_up" : "login", { method: "google" });
    })
    .catch(err => showAuthMsg(friendlyAuthError(err)));
}

function doReset(){
  if(!firebaseReady){ showAuthMsg("Sign-in service unavailable — reload the page once you're back online."); return; }
  const email = document.getElementById("authEmail").value.trim();
  if(!email){ showAuthMsg("Enter your email above first, then click 'Forgot password?'."); return; }
  auth.sendPasswordResetEmail(email)
    .then(() => showAuthMsg("Password reset email sent — check your inbox.", true))
    .catch(err => showAuthMsg(friendlyAuthError(err)));
}

function signOutGM(){
  if(auth) auth.signOut();
}

if(auth){
  auth.onAuthStateChanged(user => {
    const gate = document.getElementById("authgate");
    const setupSec = document.getElementById("setup");
    const gameSec = document.getElementById("game");
    const badge = document.getElementById("gmBadge");
    const resetBtn = document.getElementById("resetBtn");

    if(user){
      gate.classList.add("hidden");
      setupSec.classList.remove("hidden");
      const label = user.email || user.displayName || "GM";
      badge.classList.remove("hidden");
      badge.innerHTML = `Signed in as <b>${user.displayName || label}</b> <button class="authlink" onclick="signOutGM()">Sign out</button>`;
      ["menuProfile","menuHistory","menuVote","menuProposal","menuSettings","menuAbout","menuPrivacy"].forEach(id=>document.getElementById(id).classList.remove("hidden"));
    } else {
      gate.classList.remove("hidden");
      setupSec.classList.add("hidden");
      gameSec.classList.add("hidden");
      badge.classList.add("hidden");
      badge.innerHTML = "";
      resetBtn.classList.add("hidden");
      ["menuProfile","menuHistory","menuVote","menuProposal","menuSettings","menuAbout","menuPrivacy"].forEach(id=>document.getElementById(id).classList.add("hidden"));
      /* modals.js loads after auth.js; Firebase can resolve auth state before it's
         finished loading, so guard this the same way setLang() guards cross-file calls. */
      if(typeof closeModal === "function") closeModal();
    }
  });
}

/* =====================================================
   Profile · History · Settings · Privacy
   History and Settings are stored in localStorage (no
   Firestore) — per-browser, not synced across devices.
   ===================================================== */
const LS_HISTORY = "leziria_history";
const LS_SETTINGS = "leziria_settings";
