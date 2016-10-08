var dataObj = function()
{
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
}

dataObj.prototype.draw = function()
{
	var w = can1.width;
	var h = can1.height;

	ctx1.save();//为了使得这对api内的央视只适用于这段内容
	ctx1.shadowBlur = 10;//字体阴影
	ctx1.shadowColor = "white";//字体阴影颜色
	ctx1.fillStyle = "white";
	ctx1.fillText("SCORE:  " + this.score, w * 0.5, h - 20);

	if(this.gameOver)
	{
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1)
			this.alpha = 1;
		ctx1.fillStyle = "rgba(255,255,255," + this.alpha +")";//GAMEOVER渐变出现
		ctx1.fillText("GAMEOVER", w * 0.5, h * 0.5);
	}
	ctx1.restore();
}

dataObj.prototype.addScore = function()
{
	this.score += this.fruitNum * 100 * this.double;
	this.fruitNum = 0;
	this.double = 1;
}