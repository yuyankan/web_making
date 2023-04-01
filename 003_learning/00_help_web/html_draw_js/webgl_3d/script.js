const scene = new THREE.Scene();//构造器创建一个新的场景，表示即将显示的整个 3D 世界。

//需要一部摄影机来看到整个场景。在 3D 绘图语境中，摄影机表示观察者在世界里的位置，可通过下面代码创建一部摄影机：
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
/*
PerspectiveCamera() 构造器有四个参数：
观察区域：镜头视角大小，用角度表示。
屏幕宽高比：一般情况下，宽高比等于屏幕的宽比上屏幕的高。使用其他的值会使场景扭曲（也许正是你需要的，但一般都不是）。
近裁切面：停止渲染前对象离摄影机的最近距离。设想一下，举起一个手指，逐渐移近双眼，某个点后就在也看不到这根手指了。
远裁切面：停止渲染前离摄像机最远的对象的距离。
将摄像机的位置设定为距 Z 轴 5 个距离单位的位置。与 CSS 类似，在屏幕之外你（观察者）的位置
*/


//第三个重要参数是渲染器。我们用它来渲染给定的场景，可通过给定位值得摄影机观察。
//现在我们使用 WebGLRenderer() 构造器创建一个渲染器供稍后使用
const renderer = new THREE.WebGLRenderer();//创建一个新的渲染器
renderer.setSize(window.innerWidth, window.innerHeight);//设定渲染器在当前摄影机视角下的尺寸//

const container = document.createElement('div')
container.appendChild(renderer.domElement);//将渲染好的 <canvas> 对象加入 HTML 的 <body> 中。现在渲染器绘制的内容将在窗口中显示出来//

//document.body.appendChild(renderer.domElement);//将渲染好的 <canvas> 对象加入 HTML 的 <body> 中。现在渲染器绘制的内容将在窗口中显示出来//


//下一步, 在画布中创建魔方
let cube;//全局变量 cube，这样就可以在代码任意位置访问我们的魔方。

const loader = new THREE.TextureLoader();//创建一个 TextureLoader 对象

/*调用 load()。这里 load() 包含两个参数（其他情况可以有更多参数）：需要调用的纹理图（PNG 文件）和纹理加载成功后调用的函数。

  函数内部，我们用 texture 对象的属性指明我们要在魔方的每个面渲染 2 × 2 的图片，

  然后创建一个 BoxGeometry 对象和一个 MeshLambertMaterial 对象，将两者作为 Mesh 的参数来创建我们的魔方。 
  Mesh 一般就需要两个参数：一个几何（形状）和一个素材（形状表面外观）。

  最后，将魔方添加进场景中，调用我们的 draw() 函数开始动画。
*/
loader.load("C:/02_Project/100_project_github/web_making/003_learning/00_help_web/html_draw_js/webgl_3d/img.png", texture => {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);

  const geometry = new THREE.BoxGeometry(2.4,2.4,2.4);
  const material = new THREE.MeshLambertMaterial( { map: texture } );
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);//将魔方添加进场景中

  draw();//调用我们的 draw()
});

//定义 draw() 函数前，我们需要先为场景打光，以照亮场景中的物体
const light = new THREE.AmbientLight('rgb(255,255,255)'); 
// soft white light, AmbientLight 对象是可以轻度照亮整个场景的柔光，就像户外的阳光
scene.add(light);

const spotLight = new THREE.SpotLight('rgb(255,255,255)');
// SpotLight 对象是直射的硬光，就像闪光灯和手电筒（或者它的英文字面意思——聚光灯）。
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
scene.add(spotLight);

/*这段代码很直观:
每一帧我们都沿 X 轴 和 Y 轴将魔方轻微转动，
然后按摄像机视角渲染场景，
最后调用 requestAnimationFrame() 来准备下一帧。
*/
function draw() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}