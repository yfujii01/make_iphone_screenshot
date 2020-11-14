function fileChanged(input) {
  console.log(input);
  if (input.files.length > 0) {
    console.log(input.files[0]);
    makeImage();
  }
}

function drawFrame(ctx, x, y, width, height, radius) {
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.lineWidth = 20;

  // 枠
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // 左上
  ctx.lineTo(x + width - radius, y); // 左上→右上
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius); // 右上カーブ
  ctx.lineTo(x + width, y + height - radius); // 右上→右下
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height); // 右下カーブ
  ctx.lineTo(x + radius, y + height); // 右下→左下
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius); // 左下カーブ
  ctx.lineTo(x, y + radius); // 左下→左上
  ctx.quadraticCurveTo(x, y, x + radius, y); // 左上カーブ
  ctx.closePath();

  ctx.stroke();
  ctx.clip();
}

function drawNotch(ctx, x, y, width, height, radius) {
  // 切り欠き(ノッチ)
  ctx.lineWidth = 40;

  const width_ratio = 3.5;
  const x2 = x + width / width_ratio;
  const y2 = y;
  const width2 = width - (width / width_ratio) * 2;
  const height2 = height / 60;
  const radius2 = 1;
  ctx.beginPath();
  ctx.moveTo(x2 + width2, y2); // 右上
  ctx.lineTo(x2 + width2, y2 + height2 - radius2); // 右上→右下
  ctx.quadraticCurveTo(
    x2 + width2,
    y2 + height2,
    x2 + width2 - radius2,
    y2 + height2
  ); // 右下カーブ
  ctx.lineTo(x2 + radius2, y2 + height2); // 右下→左下
  ctx.quadraticCurveTo(x2, y2 + height2, x2, y2 + height2 - radius2); // 左下カーブ
  ctx.lineTo(x2, y2); // 左下→左上

  ctx.closePath();
  ctx.stroke();
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

  drawFrame(ctx, x, y, width, height, radius);

  // 画像読み込み
  loadImageAndDraw(ctx, image, x, y, width, height, radius);
}

function loadImageAndDraw(ctx, image, x, y, width, height, radius) {
  const image = new Image();
  const oFReader = new FileReader();
  const fileDom = document.getElementById("uploadImage");
  console.log(fileDom.files);
  if (fileDom.files.length > 0) {
    oFReader.readAsDataURL(fileDom.files[0]);

    oFReader.onload = function (oFREvent) {
      image.onload = function () {
        drawScreen(ctx,image, x, y, width, height, radius);
      };
      image.src = oFREvent.target.result;
    };
  } else {
    drawScreen(ctx, image, x, y, width, height, radius);
  }
}

function drawScreen(ctx, image, x, y, width, height, radius) {
  ctx.drawImage(image, x, y, width, height);

  drawNotch(ctx, x, y, width, height, radius);
}

window.onload = () => {
  makeImage();
};
