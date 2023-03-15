var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var enemies = [];
var score = 0;
var enemySpeed = 2;

// クリックした位置を取得し、敵を消去する
function handleClick(event) {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    if (enemy.x < event.clientX && enemy.x + enemy.width > event.clientX &&
        enemy.y < event.clientY && enemy.y + enemy.height > event.clientY) {
      ctx.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
      enemies.splice(i, 1);
      score += 10;
      break;
    }
  }
}

// 敵の図形を描画する
function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    enemy.y += enemySpeed;
    if (enemy.y > canvas.height) {
      enemies.splice(i, 1);
      break;
    }
  }
}

// 敵の図形を作成する
function createEnemy() {
  var x = Math.floor(Math.random() * (canvas.width - 50));
  var y = 0;
  var width = 30;
  var height = 30;
  var color = "red";
  var enemy = {x: x, y: y, width: width, height: height, color: color};
  enemies.push(enemy);
}

// 1000ms毎に敵を作成する
setInterval(createEnemy, 1000);

// マウスクリックイベントを追加する
canvas.addEventListener("click", handleClick);

// ゲームループを開始する
setInterval(function() {
  drawEnemies();
  enemySpeed += 0.01;
}, 100);
