var dustObj = function()
{
	this.x = [];
	this.y = [];
	this.amp = [];
	this.NO =[];

	this.alpha;
}

dustObj.prototype.num = 30;

dustObj.prototype.init = function()
{
	for(var i = 0; i < this.num; i++)
	{
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 25;
		this.NO[i] = Math.floor(Math.random() * 7);//四舍五入，归一[0, 7)
	}
	this.alpha = 0;//要和海葵初始化的角度一致，为了摇摆角度一样
}

dustObj.prototype.draw = function()
{
	this.alpha += deltaTime * 0.0008;//0.0008和海葵一样
	var l = Math.sin(this.alpha);
	for(var i = 0; i < this.num; i++)
	{
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + this.amp[i] * l, this.y[i]);
	}
}