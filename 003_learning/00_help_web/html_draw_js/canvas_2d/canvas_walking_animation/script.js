const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

ctx.translate(width/2,height/2);

const image = new Image();
image.src = 'walk.png';
image.onload = draw;

let sprite = 1;
let posX = 13;

function draw() {
  ctx.fillRect(-(width/2),-(height/2),width,height);//方法绘制一个覆盖整个区域的矩形（前两个参数是矩形左上顶点的坐标，后两个参数是矩形的长宽
  ctx.drawImage(image, (sprite*102), 0, 102, 148, 0+posX, -74, 102, 148);
  /*image 指定需要嵌入的图片。
    参数 2、3 指定切片左上顶点在原图的位置坐标，X 值为 sprite（精灵序列 0 - 5）乘 102，Y 值恒为 0。
    参数 4、5 指定切片尺寸：102 × 148 像素。
    参数 6、7 指定切片在画布绘制区域的坐上顶点坐标。X 坐标位置为 0 + posX，意味着我们可以通过修改 posX 的值来修改绘制的位置。
    参数 8、9 指定图片在画布中的尺寸。这里需要图片保持原始尺寸，因此我们指定宽、高值为 102、148。*/

  if (posX % 13 === 0) {
    if (sprite === 5) {
      sprite = 0;
    } else {
      sprite++;
    }
  }

  if (posX > width/2) {
    let newStartPos = -((width/2) + 102);
    posX = Math.ceil(newStartPos);
    console.log(posX);
  } else {
    posX += 2;
  }

  window.requestAnimationFrame(draw);
};