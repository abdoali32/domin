// الأصوات (ضع ملفات mp3 في جذر المشروع)
const sounds = {
  welcome: "welcome.mp3", // "نورت نادي الألعاب يا سبع!"
  choose: "choose.mp3",   // "قول يا بطل... عايز تلعب ليدو ولا دومينو؟"
  play: "play.mp3",       // "يا مسهل! اتحرك يا نجم"
  win: "win.mp3",         // "إنت الملك، سيب بصمتك!"
  lose: "lose.mp3",       // "خسرت؟ معلش... الدور الجاي ليك يا وحش"
};

let soundEnabled = true;

function playSound(key) {
  if(!soundEnabled) return;
  const audio = document.getElementById('audio-player');
  if(sounds[key]) {
    audio.src = sounds[key];
    audio.play();
  }
}

window.onload = function() {
  playSound('welcome');
  setTimeout(()=>playSound('choose'), 1200);
};

document.getElementById('ludo-btn').onclick = function() {
  document.getElementById('main-menu').style.display = "none";
  document.getElementById('game-container').style.display = "block";
  startLudoGameMenu();
};

document.getElementById('domino-btn').onclick = function() {
  document.getElementById('main-menu').style.display = "none";
  document.getElementById('game-container').style.display = "block";
  startDominoGameMenu();
};

document.getElementById('sound-toggle').onclick = function() {
  soundEnabled = !soundEnabled;
  document.getElementById('sound-toggle').textContent = soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت";
  if(soundEnabled) playSound('welcome');
};

// قائمة دومينو
function startDominoGameMenu() {
  document.getElementById('game-container').innerHTML = `
    <h1>لعبة الدومينو</h1>
    <div class="subtitle">نادي الألعاب – عبده ❤️</div>
    <div class="voice-bar">
      <span>🔊 الصوت: </span>
      <button id="sound-toggle-2">${soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت"}</button>
    </div>
    <div class="buttons">
      <button id="vs-ai">العب ضد الكمبيوتر</button>
      <button id="vs-friend">العب مع صديق</button>
      <button id="back-btn">⬅️ رجوع للنادي</button>
    </div>
    <div class="footer">© 2025 نادي الألعاب</div>
    <div id="domino-game"></div>
    <audio id="audio-player-2"></audio>
  `;

  document.getElementById('sound-toggle-2').onclick = function() {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle-2').textContent = soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت";
    if(soundEnabled) playSound('welcome');
  };

  document.getElementById('back-btn').onclick = function() {
    document.getElementById('game-container').style.display = "none";
    document.getElementById('main-menu').style.display = "block";
    playSound('welcome');
  };

  document.getElementById('vs-ai').onclick = function() {
    startDominoGame("ai");
  };

  document.getElementById('vs-friend').onclick = function() {
    startDominoGame("friend");
  };
}

// قائمة ليدو
function startLudoGameMenu() {
  document.getElementById('game-container').innerHTML = `
    <h1>لعبة ليدو</h1>
    <div class="subtitle">نادي الألعاب – عبده ❤️</div>
    <div class="voice-bar">
      <span>🔊 الصوت: </span>
      <button id="sound-toggle-3">${soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت"}</button>
    </div>
    <div class="buttons">
      <button id="ludo-vs-ai">العب ضد الكمبيوتر</button>
      <button id="ludo-vs-friend">العب مع صديق</button>
      <button id="back-btn-ludo">⬅️ رجوع للنادي</button>
    </div>
    <div class="footer">© 2025 نادي الألعاب</div>
    <div id="ludo-game"></div>
    <audio id="audio-player-3"></audio>
  `;

  document.getElementById('sound-toggle-3').onclick = function() {
    soundEnabled = !soundEnabled;
    document.getElementById('sound-toggle-3').textContent = soundEnabled ? "إيقاف الصوت" : "تشغيل الصوت";
    if(soundEnabled) playSound('welcome');
  };

  document.getElementById('back-btn-ludo').onclick = function() {
    document.getElementById('game-container').style.display = "none";
    document.getElementById('main-menu').style.display = "block";
    playSound('welcome');
  };

  document.getElementById('ludo-vs-ai').onclick = function() {
    startLudoGame("ai");
  };

  document.getElementById('ludo-vs-friend').onclick = function() {
    startLudoGame("friend");
  };
}