"use strict";

/* =====================================================
   i18n — English / Portuguese
   ===================================================== */
const UI = {
  en: {
    route: "Santarém → European Parliament · Lezíria Europeia 2.0 · Associação Mentalidade X",
    gameTitle: "Trivial Lezíria Europeia 2.0",
    setupLead: "One screen, one Game Master, the whole class racing from Santarém to the European Parliament.",
    setupMuted: "Choose how many teams are playing. Give each team a name if you like — party colours stay as a visual guide.",
    teamNamePlaceholder: "Team name (optional, e.g. Team 1)",
    startRace: "Start the race",
    continueBtn: "Continue ▸",
    backBtn: "◂ Back",
    setupStep2Muted: "Give each team a name if you like (optional) — the party colours and the ⓘ button stay as a guide to who's who.",
    howToPlay: "How to play (30-second version)",
    rulesP1: "Teams roll the die and move along the road. Coloured squares ask a question of that category — the Game Master reads it aloud, the team answers out loud. Correct: stay. Wrong: return to where the turn started. Grey squares draw an event card. Purple squares force a trilogue: two teams negotiate a deal and answer together. Questions get harder in each row. Reaching the European Parliament needs an exact roll — then one final plenary question, category chosen by the other teams, decides the game.",
    rulesP2: "Each team may use \u201cAsk the group\u201d once per game to turn a question into multiple choice.",
    teams: "Teams",
    gameLog: "Game log",
    show: "Show", hide: "Hide",
    restartGame: "Restart game",
    rollDie: "Roll the die",
    rollAgain: "Roll again",
    yourTurn: " — your turn",
    rollAgainSuffix: " — roll again!",
    skipped: " — skipped",
    skipMsg: "This team skips its turn (event or failed trilogue).",
    nextTeam: "Next team ▸",
    startTimer: "Start",
    pause: "Pause", resume: "Resume", stop: "Stop",
    askGroup: "📞 Ask the group",
    showOptionsGM: "👁 Show options (GM)",
    showAnswer: "Show answer",
    correct: "✓ Correct", wrong: "✗ Wrong",
    keepsSquare: "Correct! The team keeps its square.",
    backToStart: "Wrong — back to where the turn started.",
    bonusMsg: "Correct on a ★★★ question! The team keeps its square and advances 1 extra for the difficulty.",
    trilogueBang: " — trilogue!",
    europeanParliamentBang: " — European Parliament! 🏛",
    playAgain: "Play again", seeRecap: "See recap & sources",
    sessionRecap: "Session recap",
    holdVote: "Hold a vote", voteMotion: "Motion being voted on",
    declareResult: "Declare result & log it", resetVote: "Reset vote",
    aboutTitle: "About Trivial Lezíria Europeia 2.0",
    partners: "Partners", credits: "Credits",
    privacyTitle: "Privacy", profileTitle: "Profile", historyTitle: "Session history", settingsTitle: "Game settings",
    catParliament: "Parliament", catMeps: "Portuguese MEPs", catLaws: "Laws", catLeziria: "Lezíria", catEuknow: "EU Knowledge",

    // Profile
    profileDisplayName: "Display name", profileSave: "Save", profileNamePlaceholder: "e.g. Mr. Silva",
    profileChangePass: "Change password", profileCurPass: "Current password", profileNewPass: "New password (min 6 characters)",
    profileUpdatePass: "Update password", profileDeleteAccount: "Delete account",
    profileDeleteWarn: "Permanently deletes your GM sign-in. Local session history on this device is not automatically removed — clear it separately in History.",
    profileDeleteBtn: "Delete my account",
    msgSaved: "Saved.", msgPassUpdated: "Password updated.", msgFillBoth: "Fill in both fields.",
    confirmDeleteAccount: "Delete your GM account permanently? This cannot be undone.",
    promptReenterPass: "Please re-enter your password to confirm account deletion:",

    // History
    historySub: "Every session started on this device — finished, abandoned, or still open. Stored only on this browser, not synced across computers.",
    historyEmpty: "No sessions started yet on this device.",
    historyWon: "won", historyAbandoned: "Abandoned", historyInProgress: "In progress",
    historyClear: "Clear history", teamsWord: "teams",
    confirmClearHistory: "Clear all local session history? This can't be undone.",

    // Settings
    settingsSub: "Saved on this device. Applies to the next game you start.",
    settingsQTimer: "Question timer", settingsQTimerSub: "Seconds for a normal question",
    settingsTTimer: "Trilogue / plenary timer", settingsTTimerSub: "Seconds for negotiation & final questions",
    settingsDiff: "Difficulty", settingsDiffSub: "Shifts which question tier gets pulled per row",
    settingsEasier: "Easier", settingsStandard: "Standard", settingsHarder: "Harder",
    settingsSound: "Sound effects", settingsSoundSub: "Roll, correct, wrong, win chimes",
    settingsSave: "Save settings",

    // Privacy
    privacySub: "Trivial Lezíria Europeia 2.0 · Associação Mentalidade X de Santarém",
    privacyWho: "Who this covers", privacyWhoP: "This sign-in is for Game Masters (teachers/facilitators) only. Students playing the board game do not create accounts or enter any personal data.",
    privacyStore: "What we store", privacyStoreP: "When you create a GM account, Google Firebase (our authentication provider) stores your email address, a securely hashed password (we never see or store your password ourselves), and, if you use Google Sign-In, your Google account's name and profile photo. This data is processed by Google/Firebase infrastructure.",
    privacyDevice: "What stays on your device", privacyDeviceP: "Session history and game settings are stored only in your browser's local storage — not sent to any server, not synced across devices, and cleared if you clear your browser data or use a different computer.",
    privacyDont: "What we don't do", privacyDontP: "No advertising, no tracking cookies, no selling or sharing data with third parties, no data collected from students.",
    privacyRights: "Your rights", privacyRightsP: "You can update your display name and password, or permanently delete your account, at any time from the Profile menu. Deleting your account removes it from Firebase; local browser history/settings should be cleared separately from the History menu.",
    privacyContact: "Contact", privacyContactP: "Questions about this data can be directed to Associação Mentalidade X de Santarém.",

    // Vote
    voteNeedGame: "Start a game first — a vote needs teams on the board to cast ballots.",
    voteSub: "A roll-call vote, like a real plenary sitting — read the motion aloud, then record each delegation's vote.",
    voteMotionPlaceholder: "e.g. Amendment on irrigation subsidies",
    voteFor: "For", voteAgainst: "Against", voteAbstain: "Abstain",
    voteTallySoFar: "Tally so far — For:", voteAgainstLbl: "· Against:", voteAbstainLbl: "· Abstain:",
    untitledMotion: "Untitled motion", voteAdopted: "ADOPTED", voteRejected: "REJECTED",

    // About
    aboutSubtitle: "Associação Mentalidade X · 2026",
    aboutPartners: "Partners",
    aboutTeaches: "What this game teaches",
    aboutTeachesP: "Trivial Lezíria Europeia 2.0 simulates how the European Parliament actually works: real MEPs, real parties, real laws from the current mandate, and their direct effect on the Lezíria do Tejo. The Trilogue squares specifically simulate coalition-building — no single group holds a majority in the real Parliament, so passing anything requires two or more groups agreeing to work together, exactly as delegations must negotiate a split and a joint answer here.",
    aboutCreditsP: "Developed as part of Lezíria Europeia 2.0, an Erasmus+ KA154 project organised by the Mentalidade X Association in partnership with Golegã Municipal Council and the Golegã, Azinhaga and Pombalinho School Group from July 2024 to June 2026.",
    aboutCreditsAdd: "— add developer / contributor names here —",
    aboutCreditsNames: "Fahim Murshed — project lead &amp; developer. Built with the assistance of Claude (Anthropic).",
    aboutAcknowledgement: "Supported by the European Union, Erasmus+, and Associação Mentalidade X.",

    // Proposal capstone
    proposalTitle: "Creating a Proposal",
    proposalNeedGame: "Start a game first — the proposal exercise uses the teams already on the board.",
    proposalStage0Title: "Stage 1 · Analyse",
    proposalStage0Sub: "Pick or write a real topic (e.g. an amendment on irrigation subsidies, or a Laws-category question the class already covered). Each team discusses out loud: what problem does it address? Who benefits? What are the trade-offs?",
    proposalTopicPlaceholder: "e.g. Should small farms get priority for irrigation subsidies?",
    proposalStage1Title: "Stage 2 · Present a position",
    proposalStage1Sub: "Each team states its position out loud. Optionally note a one-line summary per team below.",
    proposalPositionPlaceholder: "One-line position (optional)",
    proposalStage2Title: "Stage 3 · Negotiate",
    proposalStage2Sub: "Teams circulate and negotiate — like a real trilogue, but open to everyone. Use the timer to keep it moving.",
    proposalStage3Title: "Stage 4 · Vote",
    proposalStage3Sub: "Time to vote on the final proposal, exactly like a plenary sitting.",
    proposalResultTitle: "Proposal outcome",
    proposalNext: "Next ▸", proposalBack: "◂ Back",
    proposalFinish: "Finish & log to game log",
    proposalStartOver: "Start a new proposal",
    proposalPositionsRecap: "Positions taken:", proposalNoPosition: "(no position noted)"
  },
  pt: {
    route: "Santarém → Parlamento Europeu · Lezíria Europeia 2.0 · Associação Mentalidade X",
    gameTitle: "Trivial Lezíria Europeia 2.0",
    setupLead: "Um só ecrã, um Game Master, toda a turma a correr de Santarém até ao Parlamento Europeu.",
    setupMuted: "Escolham quantas equipas vão jogar. Deem um nome a cada equipa se quiserem — as cores dos partidos servem apenas de guia visual.",
    teamNamePlaceholder: "Nome da equipa (opcional, ex.: Equipa 1)",
    startRace: "Começar a corrida",
    continueBtn: "Continuar ▸",
    backBtn: "◂ Voltar",
    setupStep2Muted: "Deem um nome a cada equipa se quiserem (opcional) — as cores dos partidos e o botão ⓘ continuam a servir de guia.",
    howToPlay: "Como jogar (versão de 30 segundos)",
    rulesP1: "As equipas lançam o dado e avançam pelo tabuleiro. As casas coloridas fazem uma pergunta dessa categoria — o Game Master lê-a em voz alta, a equipa responde em voz alta. Certo: fica. Errado: volta à casa onde começou a jogada. As casas cinzentas puxam uma carta de evento. As casas roxas obrigam a um trílogo: duas equipas negoceiam um acordo e respondem em conjunto. As perguntas ficam mais difíceis em cada fila. Chegar ao Parlamento Europeu exige um lançamento exato — depois, uma última pergunta de plenário, com categoria escolhida pelas outras equipas, decide o jogo.",
    rulesP2: "Cada equipa pode usar \u201cPerguntar ao grupo\u201d uma vez por jogo para transformar uma pergunta em escolha múltipla.",
    teams: "Equipas",
    gameLog: "Registo do jogo",
    show: "Mostrar", hide: "Ocultar",
    restartGame: "Reiniciar jogo",
    rollDie: "Lançar o dado",
    rollAgain: "Lançar novamente",
    yourTurn: " — a vossa vez",
    rollAgainSuffix: " — lancem novamente!",
    skipped: " — passou a vez",
    skipMsg: "Esta equipa passa a vez (evento ou trílogo falhado).",
    nextTeam: "Equipa seguinte ▸",
    startTimer: "Iniciar",
    pause: "Pausa", resume: "Retomar", stop: "Parar",
    askGroup: "📞 Perguntar ao grupo",
    showOptionsGM: "👁 Mostrar opções (GM)",
    showAnswer: "Mostrar resposta",
    correct: "✓ Certo", wrong: "✗ Errado",
    keepsSquare: "Certo! A equipa fica na sua casa.",
    backToStart: "Errado — volta à casa onde começou a jogada.",
    bonusMsg: "Certo numa pergunta ★★★! A equipa fica na casa e avança mais 1 pela dificuldade.",
    trilogueBang: " — trílogo!",
    europeanParliamentBang: " — Parlamento Europeu! 🏛",
    playAgain: "Jogar novamente", seeRecap: "Ver resumo e fontes",
    sessionRecap: "Resumo da sessão",
    holdVote: "Fazer uma votação", voteMotion: "Moção em votação",
    declareResult: "Declarar resultado e registar", resetVote: "Repor votação",
    aboutTitle: "Sobre o Trivial Lezíria Europeia 2.0",
    partners: "Parceiros", credits: "Créditos",
    privacyTitle: "Privacidade", profileTitle: "Perfil", historyTitle: "Histórico de sessões", settingsTitle: "Definições do jogo",
    catParliament: "Parlamento", catMeps: "Eurodeputados Portugueses", catLaws: "Leis", catLeziria: "Lezíria", catEuknow: "Conhecimento da UE",

    // Profile
    profileDisplayName: "Nome apresentado", profileSave: "Guardar", profileNamePlaceholder: "ex.: Sr. Silva",
    profileChangePass: "Alterar palavra-passe", profileCurPass: "Palavra-passe atual", profileNewPass: "Nova palavra-passe (mín. 6 caracteres)",
    profileUpdatePass: "Atualizar palavra-passe", profileDeleteAccount: "Eliminar conta",
    profileDeleteWarn: "Elimina permanentemente o vosso acesso de Game Master. O histórico local de sessões neste dispositivo não é removido automaticamente — limpem-no em separado em Histórico.",
    profileDeleteBtn: "Eliminar a minha conta",
    msgSaved: "Guardado.", msgPassUpdated: "Palavra-passe atualizada.", msgFillBoth: "Preencham ambos os campos.",
    confirmDeleteAccount: "Eliminar permanentemente a vossa conta de GM? Esta ação não pode ser desfeita.",
    promptReenterPass: "Insiram novamente a vossa palavra-passe para confirmar a eliminação da conta:",

    // History
    historySub: "Todas as sessões iniciadas neste dispositivo — terminadas, abandonadas ou ainda a decorrer. Guardado apenas neste navegador, sem sincronização entre computadores.",
    historyEmpty: "Ainda não foi iniciada nenhuma sessão neste dispositivo.",
    historyWon: "venceu", historyAbandoned: "Abandonada", historyInProgress: "A decorrer",
    historyClear: "Limpar histórico", teamsWord: "equipas",
    confirmClearHistory: "Limpar todo o histórico local de sessões? Esta ação não pode ser desfeita.",

    // Settings
    settingsSub: "Guardado neste dispositivo. Aplica-se ao próximo jogo que iniciarem.",
    settingsQTimer: "Cronómetro das perguntas", settingsQTimerSub: "Segundos para uma pergunta normal",
    settingsTTimer: "Cronómetro de trílogo / plenário", settingsTTimerSub: "Segundos para negociação e perguntas finais",
    settingsDiff: "Dificuldade", settingsDiffSub: "Altera que nível de pergunta é usado em cada fila",
    settingsEasier: "Mais fácil", settingsStandard: "Padrão", settingsHarder: "Mais difícil",
    settingsSound: "Efeitos sonoros", settingsSoundSub: "Sons de lançar o dado, certo, errado, vitória",
    settingsSave: "Guardar definições",

    // Privacy
    privacySub: "Trivial Lezíria Europeia 2.0 · Associação Mentalidade X de Santarém",
    privacyWho: "A quem se aplica", privacyWhoP: "Este acesso é apenas para Game Masters (professores/facilitadores). Os alunos que jogam o tabuleiro não criam contas nem introduzem dados pessoais.",
    privacyStore: "O que guardamos", privacyStoreP: "Ao criar uma conta de GM, o Google Firebase (o nosso fornecedor de autenticação) guarda o vosso email, uma palavra-passe encriptada de forma segura (nunca vemos nem guardamos a vossa palavra-passe) e, se usarem o login com Google, o nome e a foto de perfil da vossa conta Google. Estes dados são processados pela infraestrutura da Google/Firebase.",
    privacyDevice: "O que fica no vosso dispositivo", privacyDeviceP: "O histórico de sessões e as definições do jogo são guardados apenas no armazenamento local do vosso navegador — não são enviados para nenhum servidor, não são sincronizados entre dispositivos, e são apagados se limparem os dados do navegador ou usarem outro computador.",
    privacyDont: "O que não fazemos", privacyDontP: "Sem publicidade, sem cookies de rastreio, sem venda ou partilha de dados com terceiros, sem recolha de dados de alunos.",
    privacyRights: "Os vossos direitos", privacyRightsP: "Podem atualizar o vosso nome apresentado e palavra-passe, ou eliminar permanentemente a vossa conta, a qualquer momento no menu Perfil. Eliminar a conta remove-a do Firebase; o histórico/definições locais do navegador devem ser limpos em separado no menu Histórico.",
    privacyContact: "Contacto", privacyContactP: "Questões sobre estes dados podem ser dirigidas à Associação Mentalidade X de Santarém.",

    // Vote
    voteNeedGame: "Iniciem um jogo primeiro — uma votação precisa de equipas no tabuleiro para votar.",
    voteSub: "Uma votação nominal, como numa sessão plenária real — leiam a moção em voz alta e depois registem o voto de cada delegação.",
    voteMotionPlaceholder: "ex.: Alteração aos subsídios de rega",
    voteFor: "A favor", voteAgainst: "Contra", voteAbstain: "Abstenção",
    voteTallySoFar: "Contagem até agora — A favor:", voteAgainstLbl: "· Contra:", voteAbstainLbl: "· Abstenção:",
    untitledMotion: "Moção sem título", voteAdopted: "APROVADA", voteRejected: "REJEITADA",

    // About
    aboutSubtitle: "Associação Mentalidade X · 2026",
    aboutPartners: "Parceiros",
    aboutTeaches: "O que este jogo ensina",
    aboutTeachesP: "O Trivial Lezíria Europeia 2.0 simula o funcionamento real do Parlamento Europeu: eurodeputados reais, partidos reais, leis reais da legislatura atual e o seu efeito direto na Lezíria do Tejo. As casas de Trílogo simulam especificamente a construção de alianças — nenhum grupo tem maioria absoluta no Parlamento real, por isso aprovar qualquer coisa exige que dois ou mais grupos concordem em trabalhar juntos, tal como as delegações têm de negociar aqui uma divisão e uma resposta conjunta.",
    aboutCreditsP: "Desenvolvido no âmbito do Lezíria Europeia 2.0, um projeto Erasmus+ KA154 organizado pela Associação Mentalidade X, em parceria com a Câmara Municipal da Golegã e o Agrupamento de Escolas de Golegã, Azinhaga e Pombalinho, de julho de 2024 a junho de 2026.",
    aboutCreditsAdd: "— adicionem aqui os nomes dos programadores/colaboradores —",
    aboutCreditsNames: "Fahim Murshed — responsável e programador do projeto. Desenvolvido com a assistência do Claude (Anthropic).",
    aboutAcknowledgement: "Apoiado pela União Europeia, pelo Erasmus+ e pela Associação Mentalidade X.",

    // Proposal capstone
    proposalTitle: "Criar uma Proposta",
    proposalNeedGame: "Iniciem um jogo primeiro — o exercício de proposta usa as equipas já em jogo.",
    proposalStage0Title: "Fase 1 · Analisar",
    proposalStage0Sub: "Escolham ou escrevam um tema real (ex.: uma alteração aos subsídios de rega, ou uma pergunta da categoria Leis já vista na aula). Cada equipa discute em voz alta: que problema resolve? Quem beneficia? Quais são os compromissos?",
    proposalTopicPlaceholder: "ex.: Os pequenos agricultores devem ter prioridade nos subsídios de rega?",
    proposalStage1Title: "Fase 2 · Apresentar uma posição",
    proposalStage1Sub: "Cada equipa apresenta a sua posição em voz alta. Podem anotar um resumo de uma linha por equipa abaixo.",
    proposalPositionPlaceholder: "Posição numa linha (opcional)",
    proposalStage2Title: "Fase 3 · Negociar",
    proposalStage2Sub: "As equipas circulam e negoceiam — como um trílogo real, mas aberto a todos. Usem o cronómetro para manter o ritmo.",
    proposalStage3Title: "Fase 4 · Votar",
    proposalStage3Sub: "Hora de votar a proposta final, tal como numa sessão plenária.",
    proposalResultTitle: "Resultado da proposta",
    proposalNext: "Seguinte ▸", proposalBack: "◂ Voltar",
    proposalFinish: "Terminar e registar no registo do jogo",
    proposalStartOver: "Iniciar uma nova proposta",
    proposalPositionsRecap: "Posições assumidas:", proposalNoPosition: "(sem posição registada)"
  }
};
let currentLang = (function(){
  try{ return localStorage.getItem("leziria_lang") || "en"; }catch(e){ return "en"; }
})();
function t(key){ return (UI[currentLang] && UI[currentLang][key]) || UI.en[key] || key; }
function setLang(lang){
  currentLang = lang;
  try{ localStorage.setItem("leziria_lang", lang); }catch(e){}
  document.getElementById("langBtnEn").classList.toggle("sel", lang==="en");
  document.getElementById("langBtnPt").classList.toggle("sel", lang==="pt");
  document.getElementById("langBtnEn").setAttribute("aria-pressed", lang==="en");
  document.getElementById("langBtnPt").setAttribute("aria-pressed", lang==="pt");
  document.getElementById("routeText").textContent = t("route");
  if(typeof CATS !== "undefined"){
    CATS.parliament.label = t("catParliament");
    CATS.meps.label = t("catMeps");
    CATS.laws.label = t("catLaws");
    CATS.leziria.label = t("catLeziria");
    CATS.euknow.label = t("catEuknow");
  }
  const setupEl = document.getElementById("setup");
  if(setupEl && !setupEl.classList.contains("hidden") && typeof renderCountButtons === "function"){
    renderSetupStaticText(); renderCountButtons();
    const step2 = document.getElementById("setupStep2");
    if(step2 && !step2.classList.contains("hidden")) renderTeamNameInputs();
  }
  if(typeof renderTeams === "function" && teams && teams.length) renderTeams();
  if(window.__q && typeof askQuestion === "function"){
    /* Re-render the currently displayed question in the new language */
    renderQuestionUI(window.__q.q, window.__q.o);
  }
  if(currentModal && typeof openModal === "function"){
    openModal(currentModal);
  }
}
function localizedQ(q){
  if(currentLang === "pt" && q.q_pt){
    return { text:q.q_pt, options:q.options_pt||q.options, answer:q.answer_pt||q.answer, dyk:q.dyk_pt||q.dyk, source:q.source };
  }
  return { text:q.q, options:q.options, answer:q.answer, dyk:q.dyk, source:q.source };
}
function localizedCard(c){
  if(currentLang === "pt" && c.title_pt){ return { title:c.title_pt, text:c.text_pt||c.text }; }
  return { title:c.title, text:c.text };
}
function renderSetupStaticText(){
  const lead = document.querySelector("#setup .lead");
  const muted = document.querySelector("#setupStep1 > p.muted");
  if(lead) lead.textContent = t("setupLead");
  if(muted) muted.textContent = t("setupMuted");
  const continueBtn = document.getElementById("continueBtn");
  if(continueBtn) continueBtn.textContent = t("continueBtn");
  const startBtn = document.getElementById("startRaceBtn");
  if(startBtn) startBtn.textContent = t("startRace");
  const backBtn = document.querySelector("#setupStep2 .btn");
  if(backBtn) backBtn.textContent = t("backBtn");
  const step2Muted = document.querySelector("#setupStep2 > p.muted");
  if(step2Muted) step2Muted.textContent = t("setupStep2Muted");
  const summary = document.querySelector("#setup details summary");
  if(summary) summary.textContent = t("howToPlay");
  const detailPs = document.querySelectorAll("#setup details p");
  if(detailPs[0]) detailPs[0].textContent = t("rulesP1");
  if(detailPs[1]) detailPs[1].innerHTML = t("rulesP2");
  const footerText = document.getElementById("pageFooterText");
  if(footerText) footerText.textContent = t("aboutAcknowledgement");
}

