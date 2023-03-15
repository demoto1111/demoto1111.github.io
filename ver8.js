var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var enemies = [];
var score = 0;
var maxEnemies = 15;

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

// 初期スコアを表示する
updateScore();

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
