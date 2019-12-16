var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3000;
server.listen(port);
app.use(express.static(__dirname + '/public'));
//io.sockets.connected[socketId]
var karta=[];
for(var i=0;i<10;i++)
{
	karta.push([]);
	for(var i2=0;i2<10;i2++)
	{
		karta[i].push(null);
	}
}
function sozdNPC()
{
	
	var x= 6+Math.floor(Math.random()*(karta.length-6));
	var y= 6+Math.floor(Math.random()*(karta[x].length-6));
	while(karta[x][y]!==null)
	{
		x= 6+Math.floor(Math.random()*(karta.length-6));
		y= 6+Math.floor(Math.random()*(karta[x].length-6));
	}
	karta[x][y]={};
	karta[x][y].type="NPC";
	karta[x][y].img="NPC";
	karta[x][y].rotation=0;
	
	var moveNPC=function()
	{
		if(karta[x][y]===null)
		{
			return;
		}
		var v=[[x,y,karta[x][y].rotation]];
		var ki=null;
		if(y>0)
		{
			v.push([x,y-1,270]);
			if(karta[x][y-1]!==null)
			{
				if(karta[x][y - 1].type === "player")
				{
					ki=[x,y-1,270];
				}
			}
		}
		if(y<karta[x].length-1)
		{
			v.push([x,y+1,90]);
			if(karta[x][y+1]!==null)
			{
				if(karta[x][y+1].type === "player")
				{
					ki=[x,y+1,90];
				}
			}
		}
		if(x>0)
		{
			v.push([x-1,y,0]);
			if(karta[x-1][y]!==null)
			{
				if(karta[x-1][y].type === "player")
				{
					ki=[x-1,y,0]
				}
			}
			if(y>0)
			{
				v.push([x-1,y-1,180]);
				if(karta[x-1][y-1]!==null)
				{
					if(karta[x-1][y-1].type === "player")
					{
						ki=[x-1,y-1,180]
					}
				}
			}
			if(y<karta[x].length-1)
			{
				v.push([x-1,y+1,0]);
				if(karta[x-1][y+1]!==null)
				{
					if(karta[x-1][y+1].type === "player")
					{
						ki=[x-1,y+1,0]
					}
				}
			}
		}
		if(x<karta.length-1)
		{
			v.push([x+1,y,180]);
			if(karta[x+1][y]!==null)
			{
				if(karta[x+1][y].type === "player")
				{
					ki=[x+1,y,180]
				}
			}
			if(y>0)
			{
				v.push([x+1,y-1,270]);
				if(karta[x+1][y-1]!==null)
				{
					if(karta[x+1][y-1].type === "player")
					{
						ki=[x+1,y-1,270]
					}
				}
			}
			if(y<karta[x].length-1)
			{
				v.push([x+1,y+1,90]);
				if(karta[x+1][y+1]!==null)
				{
					if(karta[x+1][y+1].type === "player")
					{
						ki=[x+1,y+1,90]
					}
				}
			}
		}
		v=v[Math.floor(Math.random()*v.length)];
		x2=v[0];
		y2=v[1];
		karta[x][y].rotation=v[2];
		if(ki!==null)
		{
			x2=ki[0];
			y2=ki[1];
			karta[x][y].rotation=ki[2];
		}
		//console.log("NPC повернул "+karta[x][y].rotation);
		if((x2!==x)||(y2!==y))
		{
			if(karta[x2][y2]===null)
			{
				karta[x2][y2]=karta[x][y];
				karta[x][y]=null;
				x=x2;
				y=y2;
			}
			else if(karta[x2][y2].type==="player")
			{
				//karta[x2][y2]
				io.to(karta[x2][y2].socket_id).emit("smert");
				log(players[karta[x2][y2].socket_id].name+" убит");
				io.sockets.emit("vr",x,y,"NPC_fire");
				//vr(x2,y2,"bah");
			}
		}
		//console.log(x+","+y+"->",x2+","+y2);
		obnKarta();
		
		setTimeout(moveNPC,2000);
	};
	//setTimeout(moveNPC,5000);
	moveNPC();
}
sozdNPC();
setTimeout(sozdNPC,400);
setTimeout(sozdNPC,800);
//sozdNPC();
//sozdNPC();

var players={};
var kvo_players=0;
function log(txt)
{
	console.log(txt);
	io.sockets.emit("log",txt);
}
function obnKarta()
{
	var tk=[];
	for(var i=0;i<karta.length;i++)
	{
		tk.push([]);
		for(var i2=0;i2<karta[i].length;i2++)
		{
			if(karta[i][i2]===null)
			{
				tk[i].push(null)
			}
			else
			{
				tk[i].push([karta[i][i2].type]);
				tk[i][i2].push(karta[i][i2].img);
				
				if(karta[i][i2].type==="player")
				{
					tk[i][i2].push(karta[i][i2].name);
					tk[i][i2].push(karta[i][i2].socket_id);
				}
				tk[i][i2].push(karta[i][i2].rotation);
				/*tk[i].push({});
				tk[i][i2].type==karta[i][i2].type;
				tk[i][i2].img==karta[i][i2].img;
				tk[i][i2].rotation==karta[i][i2].rotation;
				if(karta[i][i2].type==="player")
				{
					tk[i][i2].name==karta[i][i2].name;
					tk[i][i2].socket_id==karta[i][i2].type
				}*/
				
			}
		}
	}
	io.sockets.emit("obnKarta",tk);
}
function vr(x,y,img)
{
	io.sockets.emit("vr",x,y,img);
}
io.on('connection', function (socket)
{
	//var defName="Игрок "+(Object.keys(players).length+1);
	kvo_players++;
	var defName="Игрок "+kvo_players;
	players[socket.id.toString()]={};
	players[socket.id.toString()].socket_id=socket.id.toString();
	players[socket.id.toString()].type="player";
	players[socket.id.toString()].img="player";
	players[socket.id.toString()].name=defName;
	players[socket.id.toString()].status=false;
	players[socket.id.toString()].coins=0;
	players[socket.id.toString()].rotation=0;
	socket.emit("hello",defName);
	var tm=[];
	for(var i in players)
	{
		if(players[i].status)
		{
			tm.push(players[i].name);
		}
		tm.push(players[i].name);
	}
	socket.on('disconnect', function()
	{
		log("Отключился "+players[socket.id.toString()].name);
		for(var i=0;i<karta.length;i++)
		{
			for(var i2=0;i2<karta[i].length;i2++)
			{
				if(karta[i][i2]===players[socket.id.toString()])
				{
					karta[i][i2]=null;
				}
			}
		}
		delete players[socket.id.toString()];
		var tm=[];
		for(var i in players)
		{
			if(players[i].status)
			{
				tm.push([players[i].name,players[i].coins]);
			}
		}
		
		io.sockets.emit("obnSpisok",tm);
		obnKarta();
	});
	io.sockets.emit("obnSpisok",tm);
	socket.on("vvodName",function(name)
	{
		//log("Игрок "+players[socket.id.toString()].name+" сменил имя на "+name);
		log("Подключился "+players[socket.id.toString()].name);
		
		players[socket.id.toString()].name=name;
		players[socket.id.toString()].status=true;
		players[socket.id.toString()].ready_move=true;
		players[socket.id.toString()].ready_fire=true;
		players[socket.id.toString()].coins=0;
		players[socket.id.toString()].rotation=0;
		
		/*socket.emit("reload",10000,"fire");
		setTimeout(function(){players[socket.id.toString()].ready_fire=true;socket.emit("ready","fire");},10000);
		socket.emit("reload",2000,"move");
		setTimeout(function(){players[socket.id.toString()].ready_move=true;socket.emit("ready","move");},2000);
		*/
		var tm=[];
		for(var i in players)
		{
			if(players[i].status)
			{
				tm.push([players[i].name,players[i].coins]);
			}
		}
		var x=0;
		var y=0;
		while(karta[x][y]!==null)
		{
			x++;
			if(x===karta.length)
			{
				x=0;
				y++;
				//когда кончится карта, всё будет плохо
			}
		}
		karta[x][y]=players[socket.id.toString()];
		io.sockets.emit("obnSpisok",tm);
		obnKarta();
	});
	socket.on("move",function(kuda)
	{
		if(!players[socket.id.toString()].ready_move)
		{
			return;
		}
		socket.emit("reload",2000,"move");
		var x=0;
		var y=0;
		while(karta[x][y]!==players[socket.id.toString()])
		{
			x++;
			if(x===karta.length)
			{
				x = 0;
				y++;
			}
		}
		var x2=x;
		var y2=y;
		switch(kuda)
		{
			case 0:
				if(x2>0)
				{
					karta[x][y].rotation=0;
					x2--;
				}
				break;
			case 1:
				if(x2>0)
				{
					karta[x][y].rotation=0;
					x2--;
				}
				if(y2<karta[x2].length-1)
				{
					karta[x][y].rotation=0;
					y2++;
				}
				break;
			case 2:
				if(y2<karta[x2].length-1)
				{
					karta[x][y].rotation=90;
					y2++;
				}
				break;
			case 3:
				if(y2<karta[x2].length-1)
				{
					karta[x][y].rotation=90;
					y2++;
				}
				if(x2<karta.length-1)
				{
					karta[x][y].rotation=90;
					x2++;
				}
				break;
			case 4:
				if(x2<karta.length-1)
				{
					karta[x][y].rotation=180;
					x2++;
				}
				break;
			case 5:
				if(x2<karta.length-1)
				{
					karta[x][y].rotation=180;
					x2++;
				}
				if(y2>0)
				{
					karta[x][y].rotation=180;
					y2--;
				}
				break;
			case 6:
				if(y2>0)
				{
					karta[x][y].rotation=270;
					y2--;
				}
				break;
			case 7:
				if(y2>0)
				{
					karta[x][y].rotation=270;
					y2--;
				}
				if(x2>0)
				{
					karta[x][y].rotation=270;
					x2--;
				}
				break;
		}
		if(((x!==x2)||(y!==y2))&&(karta[x2][y2]===null))
		{
			karta[x2][y2]=karta[x][y];
			karta[x][y]=null;
			obnKarta();
			if(players.hasOwnProperty(socket.id.toString()))
			{
				if(players[socket.id.toString()]!==undefined)
				{
					players[socket.id.toString()].ready_move=false;
					setTimeout(function(){if(players.hasOwnProperty(socket.id.toString())){players[socket.id.toString()].ready_move=true;socket.emit("ready","move");}},2000);
				}
				
			}
			
			
		}
	});
	socket.on("fire",function(x2,y2)
	{
		if(!players[socket.id.toString()].ready_fire)
		{
			return;
		}
		var x=0;
		var y=0;
		while(karta[x][y]!==players[socket.id.toString()])
		{
			x++;
			if(x===karta.length)
			{
				x = 0;
				y++;
			}
		}
		
		var rasst=Math.sqrt((x-x2)*(x-x2)+(y-y2)*(y-y2));
		if((rasst<=3)&&(rasst>0))
		{
			socket.emit("reload",10000,"fire");
			if(players.hasOwnProperty(socket.id.toString()))
			{
				if(players[socket.id.toString()]!==undefined)
				{
					players[socket.id.toString()].ready_fire=false;
					setTimeout(function(){if(players.hasOwnProperty(socket.id.toString())){players[socket.id.toString()].ready_fire=true;socket.emit("ready","fire");}},10000);
				}
			}
			
			if(karta[x2][y2]!==null)
			{
				if(karta[x2][y2].type==="player")
				{
					io.to(karta[x2][y2].socket_id).emit("smert");
					log(players[karta[x2][y2].socket_id].name+" убит");
					vr(x2,y2,"bah");
					//vr(x,y,"player_fire");
					socket.emit("vr",x,y,"player_fire");
					socket.broadcast.emit("vr",x,y,"enemy_fire");
					karta[x][y].coins+=10;
					var tm=[];
					for(var i in players)
					{
						if(players[i].status)
						{
							tm.push([players[i].name,players[i].coins]);
						}
					}
					socket.emit("coins",karta[x][y].coins);
					io.sockets.emit("obnSpisok",tm);
					//socket.emit("coins",karta[x][y].coins);
					obnKarta();
					io.sockets.connected[karta[x2][y2].socket_id].disconnect();
				}
				else if(karta[x2][y2].type==="NPC")
				{
					//console.log("Игрок выстрелил, расстояние до нпс "+rasst)
					karta[x2][y2]=null;
					
					vr(x2,y2,"bah");
					//vr(x,y,"player_fire");
					socket.emit("vr",x,y,"player_fire");
					socket.broadcast.emit("vr",x,y,"enemy_fire");
					obnKarta();
					//sozdNPC();
					karta[x][y].coins+=1;
					var tm=[];
					for(var i in players)
					{
						if(players[i].status)
						{
							tm.push([players[i].name,players[i].coins]);
						}
					}
					socket.emit("coins",karta[x][y].coins);
					io.sockets.emit("obnSpisok",tm);
					sozdNPC(sozdNPC,2000);
				}
			}
		}
	})
});

