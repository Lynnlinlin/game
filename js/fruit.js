var fruitObj = function()
{
  this.alive = [];//bool
  this.x = [];
  this.y = [];
  this.aneNO = [];
  this.l = [];//表示图片的长度
  this.spd = [];//每个果实都有它独特的速度,即是它成长的速度也是它往上飘的速度
  this.fruitType = [];//区别果实类型
  this.orange = new Image();
  this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
  for(var i = 0; i < this.num; i++)
  {
    this.alive[i] = false;
    this.x[i] = 0;
    this.y[i] = 0;
    this.aneNO[i] = 0;
    this.spd[i] = Math.random() * 0.017 + 0.003;//在[0.003,0.02)间
    this.fruitType[i] = "";
  }
  this.orange.src = "./src/fruit.png";
  this.blue.src = "./src/blue.png"
}
fruitObj.prototype.draw = function()
{
  for(var i = 0; i < this.num; i++)
  {
    //draw
    //长在海葵上，之后向上飘
    if(this.alive[i])
    {
      if(this.fruitType[i] == "blue")
      {
        var pic = this.blue;
      }
      else
      {
        var pic = this.orange;
      }
      if(this.l[i] <= 14)
      {
        var NO = this.aneNO[i];
        this.x[i] = ane.headx[NO];
        this.y[i] = ane.heady[NO];
        this.l[i] += this.spd[i] * deltaTime;
        //用到一个随时间变化的变量时，用deltaTime保证过程流畅连贯
        ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i],this.l[i]);
      }
      else
      {
        this.y[i] -= this.spd[i] * 7 * deltaTime;//长大后往上飘，往上飘本质是y坐标不断减小
        ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i],this.l[i]);//drawImage绘制是从(0,0)开始的要减去宽度的一半
      }
      if(this.y[i] < -10)
      {
        this.alive[i] = false;
      }
    }
  }
}
fruitObj.prototype.born = function(i)
{
  this.aneNO[i] = Math.floor(Math.random() * ane.num);//记录海葵位置,id是要一个整数值，并且是0~海葵的数目,但会重叠
  this.l[i] = 0;
  this.alive[i] = true;
  var ran = Math.random();
  if(ran < 0.2)
  {
    this.fruitType[i] = "blue";//orange, blue
  }
  else
  {
    this.fruitType[i] = "orange";
  }
}
fruitObj.prototype.dead = function(i)
{
  this.alive[i] = false;
}
/*fruitObj.prototype.update = function()//检测当前屏幕上有多少果实
{
  var num =0;
  for(var i = 0; i < this.num; i++)
  {
    if(this.alive[i]) num++;
  }
}*/
//保持屏幕上有15个果实
function fruitMonitor()//判断屏幕上多少个果实活着
{
  var num = 0;
  for(var i = 0; i < fruit.num; i++)
  {
    if(fruit.alive[i]) num++;
  }
  if(num < 15)//让过是出生
  {
    sendFruit();
    return;
  }
}
function sendFruit()
{
  for(var i = 0; i < fruit.num; i++)
  {
    if(!fruit.alive[i])
    {
      fruit.born(i);
      return;
    }
  }
}