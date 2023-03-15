var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var enemies = [];
var score = 0;
var maxEnemies = 15;
var timeLeft = 30; // 制限時間（秒）
var timeElement = document.getElementById("time"); // 残り時間を表示する要素

// クリックした位置を取得し、敵を消去する
function handleClick(event) {
  var rect = canvas.getBoundingClientRect();
  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  enemies = enemies.filter(function(enemy) {
    if (enemy.x < mouseX && enemy.x + enemy.size > mouseX &&
        enemy.y < mouseY && enemy.y + enemy.size > mouseY) {
      ctx.clearRect(enemy.x, enemy.y, enemy.size, enemy.size);
      score += enemy.size * 10;
      updateScore();
      return false;
    }
    return true;
  });
}

// 敵の図形を描画する
function drawEnemies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    if (enemy.x < 0 || enemy.x + enemy.size > canvas.width) {
      enemy.dx *= -1;
    }
    if (enemy.y < 0 || enemy.y + enemy.size > canvas.height) {
      enemy.dy *= -1;
    }
  }
  if (enemies.length < maxEnemies) {
    createEnemy();
  }
}

// 敵の図形を作成する
function createEnemy() {
  var x = Math.floor(Math.random() * (canvas.width - 50));
  var y = Math.floor(Math.random() * (canvas.height - 50));
  var dx = Math.floor(Math.random() * 5) + 1;
  var dy = Math.floor(Math.random() * 5) + 1;
  dx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  dy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  var size = Math.floor(Math.random() * 20) + 10;
  var color = "red";
  var enemy = {x: x, y: y, dx: dx, dy: dy, size: size, color: color};
  enemies.push(enemy);
}

function drawEnemies() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var speed = Math.sqrt(Math.pow(enemy.dx, 2) + Math.pow(enemy.dy, 2));
    var scoreMultiplier = Math.floor(speed / 2) + 1;
    ctx.fillStyle = getEnemyColor(scoreMultiplier);
    ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    if (enemy.x < 0 || enemy.x + enemy.size > canvas.width) {
      enemy.dx *= -1;
    }
    if (enemy.y < 0 || enemy.y + enemy.size > canvas.height) {
      enemy.dy *= -1;
    }
    enemy.score = enemy.size * 10 * scoreMultiplier;
  }
  if (enemies.length < maxEnemies) {
    createEnemy();
  }
}

function getEnemyColor(scoreMultiplier) {
  var hue = scoreMultiplier * 20;
  return "hsl(" + hue + ", 100%, 50%)";
}


// 初期スコアを表示する
updateScore();

// 残り時間を表示する
updateTime();

// 1秒ごとに残り時間を減らす
var intervalId = setInterval(function() {
  timeLeft--;
  updateTime();
  if (timeLeft <= 0) {
    clearInterval(intervalId);
    canvas.removeEventListener("click", handleClick);
  }
}, 1000);

// 残り時間を更新する
function updateTime() {
  timeElement.innerHTML = "Time Left: " + timeLeft;
}

// マウスクリックイベントを追加する
canvas.addEventListener("click", handleClick);

// スコアを更新する
function updateScore() {
  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "Score: " + score;
  var totalScoreElement = document.getElementById("totalScore");
  totalScoreElement.innerHTML = "Total Score: " + score;
}

// ゲームループを開始する
setInterval(drawEnemies, 30);
