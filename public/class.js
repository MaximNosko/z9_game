class Kletka
{
	constructor(x,y)
	{
		this.img="error.png";
		this.x=x;
		this.y=y;
	};
	onclick()
	{
		alert("!"+this.x+","+this.y);
	};
}
class Nichego extends Kletka
{
	constructor(x,y)
	{
		super(x,y);
		this.img="nichego.png";
	};
	onclick()
	{
		alert(">"+this.x+","+this.y);
	}
}
class Player extends Kletka
{
	constructor(x,y)
	{
		super(x,y);
		this.img="ya.png";
	};
	onclick(){};
}