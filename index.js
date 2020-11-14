const P = {
  x: 10,
  y: 10,
  w: 406,
  h: 879,
  r: 60,
};

const Point = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

function makeImage() {
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");
  drawFrame(ctx);

  // 画像読み込み
  loadImageAndDraw(ctx);
}

function loadImageAndDraw(ctx) {
  const image = new Image();
  const oFReader = new FileReader();
  const fileDom = document.getElementById("uploadImage");
  if (fileDom.files.length > 0) {
    oFReader.readAsDataURL(fileDom.files[0]);

    oFReader.onload = function (oFREvent) {
      image.onload = function () {
        drawScreen(ctx, image);
      };
      image.src = oFREvent.target.result;
    };
  } else {
    drawScreen(ctx, image);
  }
}

function drawScreen(ctx, image) {
  ctx.drawImage(image, P.x, P.y, P.w, P.h);

  drawNotch(ctx);
  drawSpeaker(ctx);
  drawCamera(ctx);
}

window.onload = () => {
  makeImage();
};

function fileChanged(input) {
  if (input.files.length > 0) {
    makeImage();
  }
}

function drawBox(ctx, x, y, w, h, r) {
  const p1 = new Point(x + r, y);
  const p2 = new Point(x + w - r, y);
  const p3 = new Point(x + w, y + r);
  const p4 = new Point(x + w, y + h - r);
  const p5 = new Point(x + w - r, y + h);
  const p6 = new Point(x + r, y + h);
  const p7 = new Point(x, y + h - r);
  const p8 = new Point(x, y + r);

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y); // 左上(1)
  ctx.lineTo(p2.x, p2.y); // 左上→右上(1->2)
  ctx.quadraticCurveTo(p3.x, p2.y, p3.x, p3.y); // 右上カーブ(2->3)
  ctx.lineTo(p4.x, p4.y); // 右上→右下(3->4)
  ctx.quadraticCurveTo(p4.x, p5.y, p5.x, p5.y); // 右下カーブ(4->5)
  ctx.lineTo(p6.x, p6.y); // 右下→左下(5->6)
  ctx.quadraticCurveTo(p7.x, p6.y, p7.x, p7.y); // 左下カーブ(6->7)
  ctx.lineTo(p8.x, p8.y); // 左下→左上(7->8)
  ctx.quadraticCurveTo(p8.x, p1.y, p1.x, p1.y); // 左上カーブ(8->1)
  ctx.closePath();
  ctx.stroke();
}

function drawCircle(ctx, x, y, h) {
  ctx.beginPath();
  ctx.arc(x, y, h, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.stroke();
}

function drawFrame(ctx) {
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 20;

  const x = P.x;
  const y = P.y;
  const w = P.w;
  const h = P.h;
  const r = P.r;
  drawBox(ctx, x, y, w, h, r);
  ctx.clip();
}

function drawSpeaker(ctx) {
  ctx.strokeStyle = "rgb(50, 50, 50)";
  ctx.lineWidth = 5;

  const width_ratio = 2.3;
  const x = P.x + P.w / width_ratio;
  const y = P.y + P.h / 60;
  const w = P.w - (P.w / width_ratio) * 2;
  const h = P.h / 180;
  const r = P.r / 12;
  drawBox(ctx, x, y, w, h, r);
}

function drawCamera(ctx) {
  ctx.strokeStyle = "rgb(0, 40, 40)";
  ctx.lineWidth = 5;

  const width_ratio = 1.65;
  const x = P.x + P.w / width_ratio;
  const y = P.y + P.h / 52;
  const h = P.h / 500;
  drawCircle(ctx, x, y, h);
}

function drawNotch(ctx) {
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 40;

  const width_ratio = 3.5;
  const x = P.x + P.w / width_ratio;
  const y = P.y;
  const w = P.w - (P.w / width_ratio) * 2;
  const h = P.h / 60;
  const r = P.r / 60;
  drawBox(ctx, x, y, w, h, r);
}
