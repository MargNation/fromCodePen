window.requestAnimFrame = ( function() {
	return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				};
})();

var canvas = document.getElementById('canvas'), 
		ctx = canvas.getContext('2d'), 
		canvasWidth = window.innerWidth, 
		canvasHeight = window.innerHeight, 
		beginningHoriz = [0, 75],
		beginningVert = [0, 75],
		heartbeats = [], 
		echoes = [],
		timerTotal = 91,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawBackground() {
	for (var i = 0; i < 25; i++) {
		ctx.beginPath();
		ctx.moveTo(beginningHoriz[0], beginningHoriz[1]);
		ctx.lineTo(canvasWidth, beginningHoriz[1]);
		ctx.strokeStyle = "#b0ddaf";
		ctx.stroke();
		beginningHoriz[1] += 15;
	}

	while (beginningVert[0] <= canvasWidth) {
		ctx.beginPath();
		ctx.moveTo(beginningVert[0], beginningVert[1]);
		ctx.lineTo(beginningVert[0], beginningHoriz[1] - 15);
		ctx.strokeStyle = "#b0ddaf";
		ctx.stroke();
		beginningVert[0] += 15;
	}
}

drawBackground();

function Heartbeat() {
	this.x = 0;
	this.y = 220;
	this.echoX = this.x;
	this.echoY = this.y;
	this.lifespan = 0;
	this.currentAlpha = 0.0;
	this.flatline = false;
	this.coordinates = [];
	this.coordinateCount = 1;

	while(this.coordinateCount--) {
		this.coordinates.push([this.x, this.y]);
	}
}

Heartbeat.prototype.update = function(index) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift([this.x, this.y]);
	if (this.lifespan == 20) {
		this.y = 120;
	} else if (this.lifespan == 21) {
		this.y = 320;
	} else {
		this.y = 220;
	}
	
	if (this.lifespan >= 10 && this.lifespan < 20) {
		this.currentAlpha += 0.1;
	}
	
	if (this.lifespan >= 20 && this.lifespan < 30) {
		this.currentAlpha -= 0.1;
	}
	
	if (this.x < canvasWidth) {
		createEchoes(this.echoX);
		this.x += 29;
		this.lifespan++;
	}

	if (this.x >= canvasWidth) {
		heartbeats.splice(index, 1);
	}
}

Heartbeat.prototype.draw = function() {
		ctx.beginPath();
	  ctx.lineCap = "round";
		ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
		ctx.lineTo(this.x, this.y);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'rgba(75, 70, 214, ' + this.currentAlpha + ')';
		ctx.stroke();
}


function Echo(x) {
	this.x = x - 5;
	this.y = 220;
	this.coordinates = [];
	this.coordinateCount = 1;
	this.lifespan = 5;
	this.currentAlpha = 0.0;
	while (this.coordinateCount--) {
		this.coordinates.push([this.x, this.y]);
	}
}

Echo.prototype.update = function(index) {
	this.coordinates.pop();
	if (echoes.length == 5) {
			echoes.pop();
		}
	this.coordinates.unshift([this.x, this.y]);
	if (this.lifespan == 25) {
		this.y = 120;
	} else if (this.lifespan == 26) {
		this.y = 320;
	} else {
		this.y = 220;
	}
	
	if (this.lifespan >= 10 && this.lifespan < 20) {
		this.currentAlpha += 0.1;
	}
	
	if (this.lifespan >= 20 && this.lifespan < 40) {
		this.currentAlpha -= 0.1;
	}
	
	if (this.x < canvasWidth) {
		this.x += 29;
		this.lifespan++;
	}
	
	if (this.x >= canvasWidth) {
		echoes.splice(index, 1);
	} 
}

Echo.prototype.draw = function() {
		ctx.beginPath();
	  ctx.lineCap = "round";
		ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1] );
		ctx.lineTo(this.x, this.y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'rgba(196, 196, 227, ' + this.currentAlpha + ')';
		ctx.stroke();
}

function createEchoes(x) {
	var echoLength = 5;
	while (echoLength--) {
		echoes.push(new Echo(x));
	}
}

function loop() {
	
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame(loop);
	
	var i = heartbeats.length;
	while(i--) {
		if (heartbeats[i].lifespan < 90) {
			heartbeats[i].draw();
			heartbeats[i].update(i);
		} else {
			heartbeats.splice(i, 1);
		}
	}
	
	var i = echoes.length;
	while(i--) {
		if (echoes[i].lifespan < 90) {
			echoes[i].draw();
			echoes[i].update(i);
		} else {
			echoes.splice(i, 1);
		}
	}

	if(timerTick >= timerTotal) {
		heartbeats.push(new Heartbeat());
		timerTick = 0;
	} else {
		timerTick++;
	}
}

window.onload = loop;
