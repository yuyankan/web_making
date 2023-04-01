const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight-85;
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0,0,0)';
ctx.fillRect(0,0,width,height);

const colorPicker = document.querySelector('input[type="color"]');
const sizePicker = document.querySelector('input[type="range"]');
const output = document.querySelector('.output');
const clearBtn = document.querySelector('button');

// covert degrees to radians
function degToRad(degrees) {
  return degrees * Math.PI / 180;
};

// update sizepicker output value

sizePicker.addEventListener('input', () => output.textContent = sizePicker.value);

// store mouse pointer coordinates, and whether the button is pressed
let curX;
let curY;
let pressed = false;

// update mouse pointer coordinates
document.addEventListener('mousemove', e => {
  curX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  curY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
});
/*window.event 是一个由微软 IE 引入的属性，只有当 DOM 事件处理程序被调用的时候会被用到。它的值是当前正在处理的事件对象。
  MouseEvent.pageX: pageX 是一个由 MouseEvent 接口返回的相对于整个文档的 x（水平）坐标以像素为单位的只读属性。
  document.documentElement: 是一个会返回文档对象（document）的根元素的只读属性（如 HTML 文档的 <html> 元素）。
  Element.scrollLeft: 属性可以读取或设置元素滚动条到元素左边的距离。
  Document.body: Document.body 表示当前文档中的 <body> 或 <frameset> 元素，如果不存在此类元素，则为 null。
*/

canvas.addEventListener('mousedown', () => pressed = true);

canvas.addEventListener('mouseup', () => pressed = false);

clearBtn.addEventListener('click', () => {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0,0,width,height);
});

function draw() {
  if (pressed) {
    ctx.fillStyle = colorPicker.value;
    ctx.beginPath();
    ctx.arc(curX, curY-85, sizePicker.value, degToRad(0), degToRad(360), false);
    /*arc() 函数有六个参数。前两个指定圆心的位置坐标，第三个是圆的半径，
    第四、五个是绘制弧的起、止角度（给定 0° 和 360° 便能绘制一个完整的圆），第六个是绘制方向（false 是顺时针，true 是逆时针）*/
    ctx.fill();
  }

  requestAnimationFrame(draw);
}

draw();