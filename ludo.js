// ليدو مبسطة: لاعب ضد كمبيوتر، خط مستقيم
let ludoState = {};

function startLudoGame(mode) {
  let playerCount = 2;
  let pieces = [
    {name: "أنت", idx:0, pos: 0, color: "player1"},
    {name: "الكمبيوتر", idx:1, pos: 0, color: "player2"}
  ];
  let turn = 0;
  let dice = null;
  let gameOver = false;
  let status = "دورك! اضغط رمي الزهر";
  renderLudoBoard();

  function renderLudoBoard() {
    let html = "";
    html += `<div class="ludo-board" style="grid-template-columns: repeat(14, 1fr); grid-template-rows: 1fr;">`;
    for(let i=0;i<14;i++) {
      html += `<div class="ludo-cell">`;
      pieces.forEach(p=>{
        if(p.pos===i) html += `<div class="ludo-piece ${p.color}">${p.idx+1}</div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;

    html += `<div class="ludo-controls">
      <button class="ludo-dice-btn" id="dice-btn"${ turn!==0||gameOver?' disabled':''}>🎲 رمي الزهر</button>
      <span class="ludo-dice" id="ludo-dice">${dice===null?"":dice}</span>
    </div>
    <div class="ludo-status">${status}</div>
    <button class="back-btn" onclick="startLudoGameMenu()">⬅️ رجوع</button>
    `;

    document.getElementById('ludo-game').innerHTML = html;
    if(turn===0 && !gameOver) document.getElementById('dice-btn').onclick = userRoll;
  }

  function userRoll() {
    dice = 1 + Math.floor(Math.random()*6);
    playSound('play');
    status = `رميت ${dice}... `;
    if(pieces[0].pos + dice <= 13) {
      pieces[0].pos += dice;
      status += `اتحركت ${dice} خطوة`;
    } else {
      status += "مش هينفع تتحرك!";
    }
    if(pieces[0].pos===13) {
      status = "إنت الملك، سيب بصمتك! 🎉";
      playSound('win');
      gameOver = true;
      renderLudoBoard();
      return;
    }
    turn = 1;
    renderLudoBoard();
    setTimeout(aiTurn, 1200);
  }

  function aiTurn() {
    dice = 1 + Math.floor(Math.random()*6);
    playSound('play');
    status = `دور الكمبيوتر: رمى ${dice}... `;
    if(pieces[1].pos + dice <= 13) {
      pieces[1].pos += dice;
      status += `تحرك ${dice} خطوة`;
    } else {
      status += "مش هينفع يتحرك!";
    }
    if(pieces[1].pos===13) {
      status = "خسرت؟ معلش... الدور الجاي ليك يا وحش";
      playSound('lose');
      gameOver = true;
      renderLudoBoard();
      return;
    }
    turn = 0;
    status += "<br>دورك!";
    renderLudoBoard();
  }
}