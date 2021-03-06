// 画面ロード時
window.onload = () => {
  new Draw().makeImage();
};

// ファイル選択時
fileChanged = (input) => {
  if (input.files.length > 0) {
    new Draw().makeImage();
  }
};

const Draw = class {
  P = {
    x: 13,
    y: 13,
    w: 330,
    h: 330 * 2.166,
    r: 330 * 0.148,
  };

  Point = class {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  };

  makeImage() {
    const board = document.querySelector("#board");
    board.width = this.P.w + this.P.x * 2;
    board.height = this.P.h + this.P.y * 2;
    const ctx = board.getContext("2d");

    // this.drawFrame(ctx);
    this.loadImageAndDraw(ctx);
  }

  loadImageAndDraw(ctx) {
    const image = new Image();
    const oFReader = new FileReader();
    const fileDom = document.getElementById("uploadImage");
    const _self = this;

    if (fileDom.files.length > 0) {
      oFReader.readAsDataURL(fileDom.files[0]);

      oFReader.onload = (oFREvent) => {
        image.src = oFREvent.target.result;
        image.onload = () => {
          _self.drawScreen(ctx, image);
        };
      };
    } else {
      // 画像未選択のときはサンプル画像を表示
      image.src = "/img/sample.png";
      image.onload = () => {
        _self.drawScreen(ctx, image);
      };
    }
  }

  drawScreen(ctx, image) {
    const ratio = 1.8;
    const ratio2 = 1.3;
    ctx.drawImage(
      image,
      this.P.x * ratio,
      this.P.y * ratio,
      this.P.w - this.P.x * ratio2,
      this.P.h - this.P.y * ratio2
    );

    this.drawFrame(ctx);
    this.drawNotch(ctx);
    this.drawSpeaker(ctx);
    this.drawCamera(ctx);
  }

  drawBox(ctx, x, y, w, h, r) {
    const p1 = new this.Point(x + r, y);
    const p2 = new this.Point(x + w - r, y);
    const p3 = new this.Point(x + w, y + r);
    const p4 = new this.Point(x + w, y + h - r);
    const p5 = new this.Point(x + w - r, y + h);
    const p6 = new this.Point(x + r, y + h);
    const p7 = new this.Point(x, y + h - r);
    const p8 = new this.Point(x, y + r);

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

  drawCircle(ctx, x, y, h) {
    ctx.beginPath();
    ctx.arc(x, y, h, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.stroke();
  }

  drawFrame(ctx) {
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 20;

    const x = this.P.x;
    const y = this.P.y;
    const w = this.P.w;
    const h = this.P.h;
    const r = this.P.r;
    this.drawBox(ctx, x, y, w, h, r);
    ctx.clip();
  }

  drawNotch(ctx) {
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = 40;

    const width_ratio = 3.3;
    const x = this.P.x + this.P.w / width_ratio;
    const y = this.P.y;
    const w = this.P.w - (this.P.w / width_ratio) * 2;
    const h = this.P.h / 30;
    const r = this.P.r / 30;
    this.drawBox(ctx, x, y, w, h, r);
  }

  drawSpeaker(ctx) {
    ctx.strokeStyle = "rgb(50, 50, 50)";
    ctx.lineWidth = 5;

    const width_ratio = 2.3;
    const x = this.P.x + this.P.w / width_ratio;
    const y = this.P.y + this.P.h / 40;
    const w = this.P.w - (this.P.w / width_ratio) * 2;
    const h = this.P.h / 180;
    const r = this.P.r / 12;
    this.drawBox(ctx, x, y, w, h, r);
  }

  drawCamera(ctx) {
    ctx.strokeStyle = "rgb(0, 40, 40)";
    ctx.lineWidth = 5;

    const width_ratio = 1.65;
    const x = this.P.x + this.P.w / width_ratio;
    const y = this.P.y + this.P.h / 36;
    const h = this.P.h / 500;
    this.drawCircle(ctx, x, y, h);
  }
};
