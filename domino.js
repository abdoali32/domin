// دومينو كاملة ضد الكمبيوتر أو مع صديق

let dominoState = {};

function generateDominoSet() {
  let set = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = i; j <= 6; j++) {
      set.push([i, j]);
    }
  }
  return set;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startDominoGame(mode) {
  let set = shuffle(generateDominoSet());
  let userHand = set.splice(0, 7);
  let aiHand = set.splice(0, 7);
  let board = [];
  let turn = (Math.random() < 0.5) ? "user" : "ai";
  dominoState = { set, userHand, aiHand, board, turn, mode, gameOver: false, friendTurn: "player1", friendHand: set.splice(0, 7), friendHand2: set.splice(0, 7) };
  renderDominoGame();
}

function renderDominoGame(message = "") {
  const { userHand, aiHand, board, turn, mode, gameOver, friendTurn, friendHand, friendHand2 } = dominoState;
  let html = `<div class="game-status">${message}</div>`;

  // السبورة
  html += `<div class="domino-board"><div class="domino-row">`;
  if (board.length === 0) {
    html += `<span style="color:#aaa;">لم تبدأ بعد</span>`;
  } else {
    for (let tile of board) {
      html += `<div class="domino-tile">${tile[0]} | ${tile[1]}</div>`;
    }
  }
  html += `</div></div>`;

  // يد اللاعب أو الأصدقاء
  if (mode === "ai") {
    html += `<div class="player-hand">يدك:<br>`;
    userHand.forEach((tile, idx) => {
      html += `<span class="domino-tile" onclick="userPlayDomino(${idx})">${tile[0]} | ${tile[1]}</span>`;
    });
    html += `</div>`;
  } else if (mode === "friend") {
    html += `<div class="player-hand">يد ${friendTurn === "player1" ? "١" : "٢"}:<br>`;
    let hand = friendTurn === "player1" ? friendHand : friendHand2;
    hand.forEach((tile, idx) => {
      html += `<span class="domino-tile" onclick="friendPlayDomino(${idx})">${tile[0]} | ${tile[1]}</span>`;
    });
    html += `</div>`;
  }

  // نهاية
  html += `<button class="back-btn" onclick="startDominoGameMenu()">⬅️ رجوع للقائمة</button>`;

  document.getElementById('domino-game').innerHTML = html;

  // الكمبيوتر يلعب
  if (mode === "ai" && turn === "ai" && !gameOver) {
    setTimeout(aiPlayDomino, 1100);
  }
}

function isValidMove(tile, board) {
  if (board.length === 0) return true;
  let left = board[0][0], right = board[board.length - 1][1];
  return tile[0] === left || tile[1] === left || tile[0] === right || tile[1] === right;
}

function userPlayDomino(idx) {
  if (dominoState.turn !== "user" || dominoState.gameOver) return;
  const tile = dominoState.userHand[idx];
  if (!isValidMove(tile, dominoState.board)) {
    playSound('play');
    renderDominoGame("القطعة لا تناسب الطاولة! جرب غيرها.");
    return;
  }
  playDominoTile(tile, "user");
  dominoState.userHand.splice(idx, 1);
  checkEndGame();
  if (!dominoState.gameOver) {
    dominoState.turn = "ai";
    renderDominoGame();
  }
}

function aiPlayDomino() {
  if (dominoState.turn !== "ai" || dominoState.gameOver) return;
  let moveIdx = dominoState.aiHand.findIndex(tile => isValidMove(tile, dominoState.board));
  if (moveIdx === -1) {
    renderDominoGame("الكمبيوتر مش قادر يلعب!");
    dominoState.turn = "user";
    return;
  }
  let tile = dominoState.aiHand[moveIdx];
  playDominoTile(tile, "ai");
  dominoState.aiHand.splice(moveIdx, 1);
  checkEndGame();
  if (!dominoState.gameOver) {
    dominoState.turn = "user";
    renderDominoGame();
  }
}

function friendPlayDomino(idx) {
  if (dominoState.gameOver) return;
  let hand = dominoState.friendTurn === "player1" ? dominoState.friendHand : dominoState.friendHand2;
  const tile = hand[idx];
  if (!isValidMove(tile, dominoState.board)) {
    playSound('play');
    renderDominoGame("القطعة لا تناسب الطاولة! جرب غيرها.");
    return;
  }
  playDominoTile(tile, dominoState.friendTurn);
  hand.splice(idx, 1);
  checkEndGame();
  if (!dominoState.gameOver) {
    dominoState.friendTurn = dominoState.friendTurn === "player1" ? "player2" : "player1";
    renderDominoGame();
  }
}

function playDominoTile(tile, player) {
  playSound('play');
  if (dominoState.board.length === 0) {
    dominoState.board.push(tile);
    return;
  }
  let left = dominoState.board[0][0], right = dominoState.board[dominoState.board.length - 1][1];
  if (tile[1] === left) {
    dominoState.board.unshift(tile);
  } else if (tile[0] === left) {
    dominoState.board.unshift([tile[1], tile[0]]);
  } else if (tile[0] === right) {
    dominoState.board.push(tile);
  } else if (tile[1] === right) {
    dominoState.board.push([tile[1], tile[0]]);
  }
}

function checkEndGame() {
  if (dominoState.userHand && dominoState.userHand.length === 0) {
    dominoState.gameOver = true;
    playSound('win');
    renderDominoGame("إنت الملك، سيب بصمتك! 🎉");
  } else if (dominoState.aiHand && dominoState.aiHand.length === 0) {
    dominoState.gameOver = true;
    playSound('lose');
    renderDominoGame("خسرت؟ معلش... الدور الجاي ليك يا وحش");
  } else if (dominoState.friendHand && dominoState.friendHand.length === 0) {
    dominoState.gameOver = true;
    playSound('win');
    renderDominoGame("اللاعب ١ كسب! 🎉");
  } else if (dominoState.friendHand2 && dominoState.friendHand2.length === 0) {
    dominoState.gameOver = true;
    playSound('win');
    renderDominoGame("اللاعب ٢ كسب! 🎉");
  }
}