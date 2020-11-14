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

function fileChanged(input) {
  console.log(input);
  if (input.files.length > 0) {
    console.log(input.files[0]);
    makeImage();
  }
}

function drawFrame(imgParam) {
  imgParam.ctx.strokeStyle = "rgb(0, 0, 0)";
  imgParam.ctx.lineWidth = 20;

  // 枠
  imgParam.ctx.beginPath();
  imgParam.ctx.moveTo(imgParam.x + imgParam.radius, imgParam.y); // 左上
  imgParam.ctx.lineTo(
    imgParam.x + imgParam.width - imgParam.radius,
    imgParam.y
  ); // 左上→右上
  imgParam.ctx.quadraticCurveTo(
    imgParam.x + imgParam.width,
    imgParam.y,
    imgParam.x + imgParam.width,
    imgParam.y + imgParam.radius
  ); // 右上カーブ
  imgParam.ctx.lineTo(
    imgParam.x + imgParam.width,
    imgParam.y + imgParam.height - imgParam.radius
  ); // 右上→右下
  imgParam.ctx.quadraticCurveTo(
    imgParam.x + imgParam.width,
    imgParam.y + imgParam.height,
    imgParam.x + imgParam.width - imgParam.radius,
    imgParam.y + imgParam.height
  ); // 右下カーブ
  imgParam.ctx.lineTo(
    imgParam.x + imgParam.radius,
    imgParam.y + imgParam.height
  ); // 右下→左下
  imgParam.ctx.quadraticCurveTo(
    imgParam.x,
    imgParam.y + imgParam.height,
    imgParam.x,
    imgParam.y + imgParam.height - imgParam.radius
  ); // 左下カーブ
  imgParam.ctx.lineTo(imgParam.x, imgParam.y + imgParam.radius); // 左下→左上
  imgParam.ctx.quadraticCurveTo(
    imgParam.x,
    imgParam.y,
    imgParam.x + imgParam.radius,
    imgParam.y
  ); // 左上カーブ
  imgParam.ctx.closePath();

  imgParam.ctx.stroke();
  imgParam.ctx.clip();
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
}

window.onload = () => {
  makeImage();
};
