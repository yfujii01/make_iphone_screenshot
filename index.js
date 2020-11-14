const ImgParam = class {
  constructor(ctx, x, y, width, height, radius, image) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.image = image;
  }
};

const Point = class {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

function fileChanged(input) {
  console.log(input);
  if (input.files.length > 0) {
    console.log(input.files[0]);
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

  // 枠
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

function drawCircle(ctx, x, y, w, h, r) {
  ctx.beginPath();

  ctx.arc(x, y, h, 0, Math.PI * 2, true); // 外の円

  ctx.closePath();
  ctx.stroke();
}

function drawFrame(prm) {
  prm.ctx.strokeStyle = "rgb(0, 0, 0)";
  prm.ctx.lineWidth = 20;

  const x = prm.x;
  const y = prm.y;
  const w = prm.width;
  const h = prm.height;
  const r = prm.radius;
  drawBox(prm.ctx, x, y, w, h, r);
  prm.ctx.clip();
}

function drawSpeaker(prm) {
  prm.ctx.strokeStyle = "rgb(50, 50, 50)";
  prm.ctx.lineWidth = 5;

  const width_ratio = 2.3;
  const x = prm.x + prm.width / width_ratio;
  const y = prm.y + prm.height / 60;
  const w = prm.width - (prm.width / width_ratio) * 2;
  const h = prm.height / 180;
  const r = prm.radius / 12;
  drawBox(prm.ctx, x, y, w, h, r);
}

function drawCamera(prm) {
  prm.ctx.strokeStyle = "rgb(0, 40, 40)";
  prm.ctx.lineWidth = 5;

  const width_ratio = 1.65;
  const x = prm.x + prm.width / width_ratio;
  const y = prm.y + prm.height / 52;
  const w = prm.width - (prm.width / width_ratio) * 2;
  const h = prm.height / 500;
  const r = 5;
  drawCircle(prm.ctx, x, y, w, h, r);
}

function drawNotch(prm) {
  prm.ctx.strokeStyle = "rgb(0, 0, 0)";
  prm.ctx.lineWidth = 40;

  const width_ratio = 3.5;
  const x = prm.x + prm.width / width_ratio;
  const y = prm.y;
  const w = prm.width - (prm.width / width_ratio) * 2;
  const h = prm.height / 60;
  const r = prm.radius / 60;
  drawBox(prm.ctx, x, y, w, h, r);
}

function makeImage() {
  const board = document.querySelector("#board");
  const ctx = board.getContext("2d");

  const x = 10;
  const y = 10;
  const width = 406;
  const height = 879;
  const radius = 60;

  const imgParam = new ImgParam(ctx, x, y, width, height, radius, new Image());

  drawFrame(imgParam);

  // 画像読み込み
  loadImageAndDraw(imgParam);
}

function loadImageAndDraw(prm) {
  const oFReader = new FileReader();
  const fileDom = document.getElementById("uploadImage");
  if (fileDom.files.length > 0) {
    oFReader.readAsDataURL(fileDom.files[0]);

    oFReader.onload = function (oFREvent) {
      prm.image.onload = function () {
        drawScreen(prm);
      };
      prm.image.src = oFREvent.target.result;
    };
  } else {
    drawScreen(prm);
  }
}

function drawScreen(prm) {
  prm.ctx.drawImage(prm.image, prm.x, prm.y, prm.width, prm.height);

  drawNotch(prm);
  drawSpeaker(prm);
  drawCamera(prm);
}

window.onload = () => {
  makeImage();
};
