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

function drawBox(ctx, p1, p2, p3, p4, p5, p6, p7, p8) {
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

function drawFrame(prm) {
  prm.ctx.strokeStyle = "rgb(0, 0, 0)";
  prm.ctx.lineWidth = 20;

  const p1 = new Point(prm.x + prm.radius, prm.y);
  const p2 = new Point(prm.x + prm.width - prm.radius, prm.y);
  const p3 = new Point(prm.x + prm.width, prm.y + prm.radius);
  const p4 = new Point(prm.x + prm.width, prm.y + prm.height - prm.radius);
  const p5 = new Point(prm.x + prm.width - prm.radius, prm.y + prm.height);
  const p6 = new Point(prm.x + prm.radius, prm.y + prm.height);
  const p7 = new Point(prm.x, prm.y + prm.height - prm.radius);
  const p8 = new Point(prm.x, prm.y + prm.radius);

  drawBox(prm.ctx, p1, p2, p3, p4, p5, p6, p7, p8);
  prm.ctx.clip();
}

function drawSpeaker(imgParam) {
  imgParam.ctx.strokeStyle = "rgb(50, 50, 50)";
  imgParam.ctx.lineWidth = 5;

  const width_ratio = 2.3;
  const x2 = imgParam.x + imgParam.width / width_ratio;
  const y2 = imgParam.y + imgParam.height / 60;
  const width2 = imgParam.width - (imgParam.width / width_ratio) * 2;
  const height2 = imgParam.height / 180;
  const radius2 = 5;
  imgParam.ctx.beginPath();

  imgParam.ctx.moveTo(x2 + radius2, y2); // 左上
  imgParam.ctx.lineTo(x2 + width2 - radius2, y2); // 左上→右上
  imgParam.ctx.quadraticCurveTo(x2 + width2, y2, x2 + width2, y2 + radius2); // 右上カーブ

  imgParam.ctx.lineTo(x2 + width2, y2 + height2 - radius2); // 右上→右下
  imgParam.ctx.quadraticCurveTo(
    x2 + width2,
    y2 + height2,
    x2 + width2 - radius2,
    y2 + height2
  ); // 右下カーブ
  imgParam.ctx.lineTo(x2 + radius2, y2 + height2); // 右下→左下
  imgParam.ctx.quadraticCurveTo(x2, y2 + height2, x2, y2 + height2 - radius2); // 左下カーブ
  imgParam.ctx.lineTo(x2, y2 + radius2); // 左下→左上
  imgParam.ctx.quadraticCurveTo(x2, y2, x2 + radius2, y2); // 左上カーブ

  imgParam.ctx.closePath();
  imgParam.ctx.stroke();
}

function drawCamera(imgParam) {
  imgParam.ctx.strokeStyle = "rgb(0, 40, 40)";
  imgParam.ctx.lineWidth = 5;

  const width_ratio = 1.65;
  const x2 = imgParam.x + imgParam.width / width_ratio;
  const y2 = imgParam.y + imgParam.height / 52;
  const width2 = imgParam.width - (imgParam.width / width_ratio) * 2;
  const height2 = imgParam.height / 500;
  const radius2 = 5;
  imgParam.ctx.beginPath();

  imgParam.ctx.arc(x2, y2, height2, 0, Math.PI * 2, true); // 外の円

  imgParam.ctx.closePath();
  imgParam.ctx.stroke();
}

function drawNotch(imgParam) {
  // 切り欠き(ノッチ)
  imgParam.ctx.strokeStyle = "rgb(0, 0, 0)";
  imgParam.ctx.lineWidth = 40;

  const width_ratio = 3.5;
  const x2 = imgParam.x + imgParam.width / width_ratio;
  const y2 = imgParam.y;
  const width2 = imgParam.width - (imgParam.width / width_ratio) * 2;
  const height2 = imgParam.height / 60;
  const radius2 = 1;
  imgParam.ctx.beginPath();
  imgParam.ctx.moveTo(x2 + width2, y2); // 右上
  imgParam.ctx.lineTo(x2 + width2, y2 + height2 - radius2); // 右上→右下
  imgParam.ctx.quadraticCurveTo(
    x2 + width2,
    y2 + height2,
    x2 + width2 - radius2,
    y2 + height2
  ); // 右下カーブ
  imgParam.ctx.lineTo(x2 + radius2, y2 + height2); // 右下→左下
  imgParam.ctx.quadraticCurveTo(x2, y2 + height2, x2, y2 + height2 - radius2); // 左下カーブ
  imgParam.ctx.lineTo(x2, y2); // 左下→左上

  imgParam.ctx.closePath();
  imgParam.ctx.stroke();
}

function makeImage() {
  console.log("start make Image!");
  // canvas準備
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

function loadImageAndDraw(imgParam) {
  // const image = new Image();
  const oFReader = new FileReader();
  const fileDom = document.getElementById("uploadImage");
  console.log(fileDom.files);
  if (fileDom.files.length > 0) {
    oFReader.readAsDataURL(fileDom.files[0]);

    oFReader.onload = function (oFREvent) {
      imgParam.image.onload = function () {
        drawScreen(imgParam);
      };
      imgParam.image.src = oFREvent.target.result;
    };
  } else {
    drawScreen(imgParam);
  }
}

function drawScreen(imgParam) {
  imgParam.ctx.drawImage(
    imgParam.image,
    imgParam.x,
    imgParam.y,
    imgParam.width,
    imgParam.height
  );

  drawNotch(imgParam);
  drawSpeaker(imgParam);
  drawCamera(imgParam);
}

window.onload = () => {
  makeImage();
};
