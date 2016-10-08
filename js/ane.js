var aneObj = function()
{
	//利用二次贝塞尔曲线和正弦函数使得海葵动起来
	//二次贝塞尔曲线需要开始点，控制点和结束点
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = [];//振幅
	this.alpha = 0;//控制正选函数角度
}

aneObj.prototype.num = 50;//prototype 向对象添加属性和方法。定义有50条海葵
aneObj.prototype.init = function()//初始化海葵位置
{
	for(var i = 0; i < this.num; i++)
	{
		this.rootx[i] = i * 16 + Math.random() * 20; //random返回[0,1）的任意值
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
}

aneObj.prototype.draw = function()
{
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);//[-1, 1]
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for(var i = 0; i<this.num; i++)
	{
		//beginPath, moveTo, lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha(给绘制物品一定透明度)
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i], canHeight);
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);//二次贝塞尔曲线
		ctx2.stroke();
	}
	ctx2.restore();//save() restore()告诉画布，上述在save() restore()里的样式即for及其里面的定义只在save() restore()之间起作用。
}