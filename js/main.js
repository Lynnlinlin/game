var can1;//fishes,dust,UI,circle
var can2;//background,ane,fruits

var ctx1;//can1对应的场景
var ctx2;

var canWidth;
var canHeight;

var lastTime;//因为每帧之间的执行时间不统一，要知道当前帧在两帧之间的执行时间
var deltaTime;//两帧间隔的时间差

var bgPic = new Image();
//body加载完后执行某个函数：

var ane; 

var fruit;

var mom;
var baby;

var mx;
var my;//有关鼠标的变量

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var data;

var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload = game;//body加载完之后就把game作为所有js脚本的入口
function game()
{
  init();//进行初始化
  lastTime = Date.now();
  deltaTime = 0;
  gameloop();
}

function init()
{
  //获得canvas context 
  can1 = document.getElementById("canvas1");
  ctx1 = can1.getContext('2d');
  can2 = document.getElementById("canvas2");//canvas相当于画
  ctx2 = can2.getContext('2d');//相当于画布，获得2d场景

  can1.addEventListener('mousemove', onMouseMove, false);//监测鼠标

  bgPic.src = "./src/background.jpg";//加载背景图片

  canWidth = can1.width;
  canHeight = can2.height;

  ane = new aneObj();
  ane.init();

  fruit = new fruitObj();
  fruit.init();

  mom = new momObj();
  mom.init();

  baby = new babyObj();
  baby.init();

  mx = canWidth * 0.5;
  my = canHeight * 0.5; 

  for(var i = 0; i < 8; i++)
  {
    babyTail[i] = new Image();
    babyTail[i].src = "./src/babyTail" + i + ".png";
  }

  for(var i = 0; i < 2; i++)
  {
    babyEye[i] = new Image();
    babyEye[i].src = "./src/babyEye" + i +".png";
  }

  for(var i = 0; i < 20; i++)
  {
    babyBody[i] = new Image();
    babyBody[i].src = "./src/babyFade" + i + ".png";
  }

  for(var i = 0; i < 8; i++)
  {
    momTail[i] = new Image();
    momTail[i].src = "./src/bigTail" + i + ".png";
  }

  for(var i = 0; i < 2; i++)
  {
    momEye[i] = new Image();
    momEye[i].src = "./src/bigEye" + i + ".png";
  }

  data = new dataObj();

  for(var i = 0; i < 8; i++)
  {
    momBodyOra[i] = new Image();
    momBodyBlue[i] = new Image();
    momBodyOra[i].src = "./src/bigSwim" + i + ".png";
    momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
  }
  ctx1.font = "30px Verdana";
  ctx1.textAlign = "center";

  wave = new waveObj();
  wave.init();

  halo = new haloObj();
  halo.init();

  for(var i = 0; i < 7; i++)
  {
    dustPic[i] = new Image;
    dustPic[i].src = "./src/dust" + i + ".png";
  }

  dust = new dustObj();
  dust.init();

}

function gameloop()//动起来，刷新
{
  window.requestAnimFrame(gameloop);//比setInterval,setTimeout更科学，当前绘制完成之后，根据机器的性能来确定间隔多长时间绘制下一帧是智能计算的过程，setInterval,setTimeout是定死的时间，但是fps(frame per second)每秒多少帧不固定，requestAnimFrame不同浏览器需要配置
  var now = Date.now();
  deltaTime = now - lastTime;//每两帧之间的时间间隔
  lastTime = now;
  if(deltaTime > 40) deltaTime = 40;

  drawBackground();
  ane.draw();
  fruitMonitor();
  fruit.draw();

  ctx1.clearRect(0, 0, canWidth, canHeight);
  mom.draw();//ctx1是部分透明的覆盖在闯天下上，每次绘制的时候都要把前面一帧的内容clear一下，然后再绘制新的
  baby.draw();
  momFruitsCollision();
  momBabyCollision();

  data.draw();
  wave.draw();
  halo.draw();
  dust.draw();
}

function onMouseMove(e)
{
  if(!data.gameOver)
  {
    if(e.offSetX || e.layerX)
    {
      mx = e.offSetX == undefined ? e.layerX : e.offSetX;
      my = e.offSetY == undefined ? e.layerY : e.offSetY;
    }
  }
}