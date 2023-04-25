import Ground from './Ground.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 682;

const MAX_JUMP_HEIGHT = canvas.height;
const MIN_JUMP_HEIGHT = 150;
const GROUND_AND_CACTUS_SPEED = 0.5;

// 이미지
const dinoImage = new Image();
dinoImage.src = '/public/standing_still.png';

const cactusImage = new Image();
cactusImage.src = '/public/cactus_1.png';

const ground = new Ground(ctx, canvas.width, 10, GROUND_AND_CACTUS_SPEED);

// 공룡 캐릭터의 속성
const dino = {
  x: 10,
  y: 200,
  width: 88 / 1.5,
  height: 94 / 1.5,

  draw() {
    ctx.drawImage(dinoImage, this.x, this.y, this.width, this.height);
  },
};

// 장애물 클래스
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 48 / 1.5;
    this.height = 100 / 1.5;
  }

  draw() {
    ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
const cactusArr = [];

// 점프 기능
let dinoJump = false;
let dinoJumpTimer = 0;

let animation;

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    dinoJump = true;
  }
});

// 충돌 확인
function iscollision(dino, cactus) {
  const xSpace = cactus.x - (dino.x + dino.width);
  const ySpace = cactus.y - (dino.y + dino.height);

  if (xSpace < 0 && ySpace < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation); // 충돌 시 게임 중단
    showGameOver();
  }
}

// 게임 오버 문구 띄우기
function showGameOver() {
  const fontSize = 70;
  ctx.font = `${fontSize}px Verdana`;
  ctx.fillStyle = 'grey';
  const x = canvas.width / 4.5;
  const y = canvas.height / 2;
  ctx.fillText('GAME OVER', x, y);
}

function gameLoop() {
  animation = requestAnimationFrame(gameLoop); // 1초에 모니터 FPS만큼 렌더링
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 네모 잔상 지우기

  // 200 프레임마다 장애물 하나 스폰
  if (timer % 200 === 0) {
    let cactus = new Cactus();
    cactusArr.push(cactus);
  }

  // 장애물 배열 한번에 스폰
  cactusArr.forEach((el, i, o) => {
    // 장애물의 x좌표가 0미만이면 제거
    if (el.x < 0) {
      o.splice(i, 1);
    }
    iscollision(dino, el); // 충돌 확인

    el.x--; // 왼쪽으로 이동
    el.draw();
  });

  if (dinoJump) {
    dino.y--;
    dinoJumpTimer++;
  }

  if (!dinoJump) {
    if (dino.y < 200) {
      dino.y++;
      dinoJumpTimer = 0;
    }
  }

  if (dinoJumpTimer > 100) {
    dinoJump = false;
  }

  ground.draw();
  dino.draw();
}

gameLoop();
