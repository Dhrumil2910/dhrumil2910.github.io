var count=0;
active=0;
X=0;
Y=0;
blade_P=[];


function iniArray(arr){
	var len=arr.length;
	while(len--)
		arr.shift();
	return arr;
}

function _getid(id){
	return document.getElementById(id);
}

function makerect(points){
	ctx.beginPath();
	ctx.moveTo(points[0],points[1]);
	ctx.lineTo(points[2],points[3]);
	ctx.lineTo(points[4],points[5]);
	ctx.lineTo(points[6],points[7]);
	ctx.closePath();
	ctx.fillStyle='white';
	ctx.strokeStyle='gray';
	ctx.lineWidth=5;
	ctx.stroke();
	ctx.fill();
	blade_P.shift();
	blade_P.shift();

}

function blade(){
        count=0;
	var len=blade_P.length;
		
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
	
	blade_P.push(X);	
	blade_P.push(Y);
	blade_P.push(X);	
	blade_P.push(Y);
	
	var i,x1,x2,y1,y2,slope,si,co,points=[];
	for(i=0;i<len;i++)
	{
		x1=blade_P[i++];
		y1=blade_P[i++];	
		x2=blade_P[i++];	
		y2=blade_P[i];
		slope=(y1-y2)/(x1-x2);
		si=slope/(Math.sqrt(1+slope*slope));
		co=1/(Math.sqrt(1+slope*slope));
		var d=10;
		points[0]=x1+d*si;
		points[1]=y1+d*co;
		points[2]=x2+d*si;
		points[3]=y2+d*co;
		//points[4]=x2-d*si;
		points[4]=x2;
		//points[5]=y2-d*co;
		points[5]=y2;	
		points[6]=x2;
		points[7]=y2;
		makerect(points);
	
	}	

}

onmousemove=function(event){
	
	prevX = X;
	prevY = Y;
	X=event.clientX;
	Y=event.clientY;
		
	if(active == 1)
	{
		
		count++;
		if(count == 3)
		{
			count=0;
			blade();
			sound_blade.play();
		
		}
		newPage();	
	}
}
onmousedown=function(event){
	blade_P.push(event.clientX);
	blade_P.push(event.clientY);
	active=1;
}		
onmouseup=function(){
	active=0;
	ctx.clearRect(0,0,window.innerWidth,window.innerHeight);			
	blade_P=iniArray(blade_P);
		
}
