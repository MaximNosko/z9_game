var name="";
var socket_id="";
var karta=[];
var vr_izobr=[];
function otrisovka()
{
	if(socket_id==="")
	{
		return;
	}
	td=document.getElementById("osn");
	td.innerHTML="";
	td.appendChild(document.createElement("table"));
	td=td.children[0];
	for(var i=0;i<karta.length;i++)
	{
		td.appendChild(document.createElement("tr"));
		for(var i2 = 0; i2 < karta[i].length; i2++)
		{
			td.rows[i].appendChild(document.createElement("td"));
			td.rows[i].cells[i2].appendChild(document.createElement("img"));
			td.rows[i].cells[i2].children[0].src="nichego.png";
			if((i>=6)||(i2>=6))
			{
				td.rows[i].cells[i2].children[0].src="NPCspawn.png";
				//td.rows[i].cells[i2].style.backgroundImage="url(\"NPCspawn.png\")";
			}
		}
	}
	for(var i=0;i<karta.length;i++)
	{
		for(var i2=0;i2<karta[i].length;i2++)
		{
			if(karta[i][i2]!==null)
			{
				if(karta[i][i2][0] === "player")
				{
					td.rows[i].cells[i2].appendChild(document.createElement("div"));
					td.rows[i].cells[i2].children[1].innerHTML=karta[i][i2][2];
					td.rows[i].cells[i2].children[1].style.textAlign="center";
					td.rows[i].cells[i2].children[1].style.position="absolute";
					td.rows[i].cells[i2].children[1].style.marginTop="-100px";
					//td.rows[i].cells[i2].children[0].src = karta[i][i2][1] + ".png";
					td.rows[i].cells[i2].children[0].src = "enemy.png";
					td.rows[i].cells[i2].children[0].style.transform="rotate("+karta[i][i2][4]+"deg)";
					if(karta[i][i2][3]===socket_id)
					{
						//td.rows[i].cells[i2].children[0].src = karta[i][i2][1] + ".png";
						td.rows[i].cells[i2].children[0].src = "player.png";
						td.rows[i].cells[i2].children[0].style.transform="rotate("+karta[i][i2][4]+"deg)";
						if(i2 > 0)
						{
							if(karta[i][i2-1]===null)
							{
								td.rows[i].cells[i2 - 1].children[0].className = "move";
								td.rows[i].cells[i2 - 1].children[0].onclick = function()
								{
									vr_izobr=[];
									otrisovka();
									move(6)
								};
							}
						}
						if(i2 < karta[i].length - 1)
						{
							if(karta[i][i2+1]===null)
							{
								td.rows[i].cells[i2 + 1].children[0].className = "move";
								td.rows[i].cells[i2 + 1].children[0].onclick = function()
								{
									vr_izobr=[];
									otrisovka();
									move(2)
								};
							}
						}
						if(i > 0)
						{
							if(karta[i-1][i2]===null)
							{
								td.rows[i - 1].cells[i2].children[0].className = "move";
								td.rows[i - 1].cells[i2].children[0].onclick = function()
								{
									vr_izobr=[];
									otrisovka();
									move(0)
								};
							}
							if(i2 > 0)
							{
								if(karta[i-1][i2-1]===null)
								{
									td.rows[i - 1].cells[i2 - 1].children[0].className = "move";
									td.rows[i - 1].cells[i2 - 1].children[0].onclick = function()
									{
										vr_izobr=[];
										otrisovka();
										move(7)
									};
								}
							}
							if(i2 < karta[i].length - 1)
							{
								if(karta[i-1][i2+1]===null)
								{
									td.rows[i - 1].cells[i2 + 1].children[0].className = "move";
									td.rows[i - 1].cells[i2 + 1].children[0].onclick = function()
									{
										vr_izobr=[];
										otrisovka();
										move(1)
									};
								}
							}
						}
						if(i < karta.length - 1)
						{
							if(karta[i+1][i2]===null)
							{
								td.rows[i + 1].cells[i2].children[0].className = "move";
								td.rows[i + 1].cells[i2].children[0].onclick = function()
								{
									vr_izobr=[];
									otrisovka();
									move(4)
								};
							}
							if(i2 > 0)
							{
								if(karta[i+1][i2-1]===null)
								{
									td.rows[i + 1].cells[i2 - 1].children[0].className = "move";
									td.rows[i + 1].cells[i2 - 1].children[0].onclick = function()
									{
										vr_izobr=[];
										otrisovka();
										move(5)
									};
								}
							}
							if(i2 < karta[i].length - 1)
							{
								if(karta[i+1][i2+1]===null)
								{
									td.rows[i + 1].cells[i2 + 1].children[0].className = "move";
									td.rows[i + 1].cells[i2 + 1].children[0].onclick = function()
									{
										vr_izobr=[];
										otrisovka();
										move(3)
									};
								}
							}
						}
						for(var ti=0;ti<karta.length;ti++)
						{
							for(var ti2=0;ti2<karta[ti].length;ti2++)
							{
								var r=Math.sqrt((i-ti)*(i-ti)+(i2-ti2)*(i2-ti2));
								//console.log(r);
								if((r<=2.8)&&(r>0))
								{
									if(r>1.5)
									{
										td.rows[ti].cells[ti2].children[0].className = "fire";
									}
									//else
									//{
										if(karta[ti][ti2]!==null)
										{
											//if(karta[ti][ti2].l)
											if(karta[ti][ti2].length>=4)
											{
												if(karta[ti][ti2][3]!==socket_id)
												{
													td.rows[ti].cells[ti2].children[0].className = "fire";
													td.rows[ti].cells[ti2].children[0].ti=ti;
													td.rows[ti].cells[ti2].children[0].ti2=ti2;
													td.rows[ti].cells[ti2].children[0].onclick=function()
													{
														socket.emit("fire",this.ti,this.ti2);
														console.log("!!");
														//console.log(this.ti);
													};
													
												}
											}
											else
											{
												td.rows[ti].cells[ti2].children[0].className = "fire";
												td.rows[ti].cells[ti2].children[0].ti=ti;
												td.rows[ti].cells[ti2].children[0].ti2=ti2;
												td.rows[ti].cells[ti2].children[0].onclick=function()
												{
													socket.emit("fire",this.ti,this.ti2);
													console.log("!!");
													//console.log(this.ti);
												};
												
											}
										}
									//}
									
								}
							}
						}
					}
				}
				else if(karta[i][i2][0]==="NPC")
				{
					td.rows[i].cells[i2].children[0].src = "NPC.png";
					td.rows[i].cells[i2].children[0].style.transform="rotate("+karta[i][i2][2]+"deg)";
					console.log(td.rows[i].cells[i2].children[0].style.transform);
					//td.rows[i].cells[i2].children[0].className = "fire";
					/*td.rows[i].cells[i2].children[0].ti=i;
					td.rows[i].cells[i2].children[0].ti2=i2;
					td.rows[i].cells[i2].children[0].onclick=function()
					{
						socket.emit("fire",this.ti,this.ti2);
						console.log("!!");
						//console.log(this.ti);
					};*/
					//alert(1);
				}
			}
		}
	}
	for(var i=0;i<vr_izobr.length;i++)
	{
		td.rows[vr_izobr[i][0]].cells[vr_izobr[i][1]].children[0].src=vr_izobr[i][2]+".png";
		if(karta[vr_izobr[i][0]][vr_izobr[i][1]]!==null)
		{
			if(karta[vr_izobr[i][0]][vr_izobr[i][1]].length>=4)
			{
				td.rows[vr_izobr[i][0]].cells[vr_izobr[i][1]].children[0].style.transform="rotate("+karta[vr_izobr[i][0]][vr_izobr[i][1]][4]+"deg)";
			}
			else
			{
				td.rows[vr_izobr[i][0]].cells[vr_izobr[i][1]].children[0].style.transform="rotate("+karta[vr_izobr[i][0]][vr_izobr[i][1]][2]+"deg)";
			}
		}
		/*var t=td.rows[vr_izobr[i][0]].cells[vr_izobr[i][1]];
		t.appendChild(document.createElement("img"));
		t.children[t.children.length-1].src=vr_izobr[i][2]+".png";
		t.children[t.children.length-1].className="vr";*/
	}
}
//otrisovka();
function marshrut(x1,y1,x2,y2)//для построения очереди перемещений
{

}

var port = 3000;
var socket = io.connect('http://localhost:' + port);
socket.on('hello', function(defName)
{
	socket_id=socket.id;
	name=defName;
	var ti=prompt("Введите Ваше имя",defName);
	if(ti!==null)
	{
		socket.emit("vvodName",ti);
		name=ti;
	}
	else
	{
		socket.emit("vvodName",defName);
	}
});
socket.on('obnSpisok',function(players)
{
	//alert(1);
	//document.getElementById("players").innerHTML="Список игроков: <br/>"+players.join("<br />");
	document.getElementById("players").innerHTML="Список игроков: <br/>";
	for(var i=0;i<players.length;i++)
	{
		document.getElementById("players").innerHTML+=players[i][0]+"("+players[i][1]+")";
	}
});
socket.on('coins',function(coins)
{
	document.getElementById("coins").innerHTML=coins;
});
socket.on('log',function(txt)
{
	//alert(1);
	document.getElementById("log").innerHTML+=txt+"<br />";
});
socket.on('obnKarta',function(tk)
{
	karta=tk;
	otrisovka();
	console.log(tk);
});
function move(kuda)
{
	
	socket.emit("move",kuda);
}
socket.on('reload',function(time,type)
{
	if(type==="move")
	{
		var tf=function(i)
		{
			document.getElementById("reload_move").value=i;
			if(i<100)
			{
				setTimeout(tf, time/100,i+1);
			}
			else
			{
				//console.log("Локальный таймер закончился");
			}
		};
		tf(1);
	}
	else
	{
		var tf=function(i)
		{
			document.getElementById("reload_fire").value=i;
			if(i<100)
			{
				setTimeout(tf, time/100,i+1);
			}
			else
			{
				//console.log("Локальный таймер закончился");
			}
		};
		tf(1);
	}
	
});
socket.on("ready",function(type){/*console.log("Удалённый таймер "+type+" закончился")*/});
socket.on("smert",function(){alert("Вы умерли");location.href="smert.html?"+document.getElementById("coins").innerHTML});
socket.on("vr",function(x,y,img)
{
	//alert(x);
	var tm=[x,y,img];
	vr_izobr.push(tm);
	setTimeout(function(){vr_izobr.splice(vr_izobr.indexOf(tm),1);otrisovka();},1000);
	otrisovka();
});