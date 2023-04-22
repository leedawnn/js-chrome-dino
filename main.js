const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// 공룡 캐릭터의 속성
const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

// 장애물 클래스
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
const cactusArr = [];

// 장애물 이동
function frame() {
  requestAnimationFrame(frame); // 1초에 모니터 FPS만큼 렌더링
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 120 프레임마다 장애물 하나 스폰
  if (timer % 120 === 0) {
    let cactus = new Cactus();
    cactusArr.push(cactus);
  }

  // 장애물 배열 한번에 스폰
  cactusArr.forEach((el) => {
    el.x--; // 왼쪽으로 이동
    el.draw();
  });

  dino.draw();
}

frame();
