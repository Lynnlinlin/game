var waveObj = function()
{
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];//半径
}

waveObj.prototype.num = 10;

waveObj.prototype.init = function()
{
	for(var i = 0; i < this.num; i++)
	{
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

waveObj.prototype.draw = function()
{
	for(var i = 0; i < this.num; i++)
	{
		ctx1.save();
		ctx1.lineWidth = 2;
		ctx1.shadowBlur = 10;
		ctx1.shadowColor = "white";
		if(this.alive[i])
		{
			this.r[i] += deltaTime * 0.04;
			if(this.r[i] > 50)
			{
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;//[0,1] alpha的值超过0~1会认为是1，绘制成不透明状态
			//draw 画圆：arc(中心x,中心y,半径r,起始角，结束角，顺逆是指顺为false、可省略)、可以闭合路径 描边：strokeStyle 线宽：linWidth
			ctx1.beginPath();//开始绘制路径
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255, 255, 255," + alpha + ")";
			ctx1.stroke();//绘制
		}
		ctx1.restore();
	}
}

waveObj.prototype.born = function(x, y)
{
	for(var i = 0; i < this.num; i++)
	{
		if(!this.alive[i])
		{
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;
			this.y[i] = y; 
			//born;
			return;
		}
	}
}