var momObj = function()//Math.atan2(y,x);反正切api，返回一个数字在PI到-PI或者是NaN之间 
{
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;
}
momObj.prototype.init = function()
{
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
}
momObj.prototype.draw = function()
{
	//lerp x,y :使得一个值趋向一个目标值
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);
	
	//delta angle每一帧都需要跟随角度,用Math.antan2(y,x)计算
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX)+Math.PI;//鼠标和大鱼的角度差，返回值为[-PI,PI]

	//lerp angle；大鱼的角度趋向于鼠标角度
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//tail
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval
		if(this.momEyeCount == 0)
		{
			this.momEyeInterval = Math.random() * 1500 + 2000;
		}else
		{
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);//为了方便旋转用translate,用translate之后this.x,this.y就为原点了
	ctx1.rotate(this.angle);
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width * 0.5 + 30, -momTail[momTailCount].height * 0.5);
	var momBodyCount = this.momBodyCount;
	if(data.double == 1)//orange
	{
		ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width * 0.5, -momBodyOra[momBodyCount].height * 0.5);
	}else
	{
		ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyBlue[momBodyCount].width * 0.5, -momBodyBlue[momBodyCount].height * 0.5);	
	}
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width * 0.5, -momEye[momEyeCount].height * 0.5);
	ctx1.restore();//使save到restore之间的属性只使用于大鱼
}