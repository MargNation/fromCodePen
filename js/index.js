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
		timerTotal = 80,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function drawBackground() {
	for (var i = 0; i < 15; i++) {
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
	this.y = 180;
	this.echoX = this.x - echoes.length;
	this.echoY = this.y;
	this.lifespan = 0;
	this.flatline = false;
	this.coordinates = [];
	this.coordinateCount = 5;

	while(this.coordinateCount--) {
		this.coordinates.push([this.x, this.y]);
	}
}

Heartbeat.prototype.update = function(index) {
	// remove last item in coordinates array
	this.coordinates.pop();
	// add current coordinates to the start of the array
	this.coordinates.unshift([this.x, this.y]);

	if (this.x < canvasWidth) {
		createEchoes(this.echoX);
		this.x += 15;
		this.lifespan++;
	}

	if (this.x >= canvasWidth) {
		heartbeats.splice(index, 1);
	}
}

Heartbeat.prototype.draw = function() {
	// if (this.lifespan <= 45) {
		ctx.beginPath();
		ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
		ctx.lineTo(this.x, this.y);
		ctx.lineWidth = 5;
		ctx.strokeStyle = "#b4b4f7";
		ctx.stroke();
	// } else {
	// 	ctx.strokeStyle = "#b0ddaf";
	// 	ctx.stroke();
	// }
}

function Echo(x) {
	this.x = x - 5;
	this.y = 180;
	this.coordinates = [];
	this.coordinateCount = 5;
	this.lifespan = 0;
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
	if (this.x >= canvasWidth) {
		echoes.splice(index, 1);
	} else {
		this.x += 15;
		this.lifespan++;
	}
}

Echo.prototype.draw = function() {
	// if (this.lifespan <= 45) {
		ctx.beginPath();
		ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1] );
		ctx.lineTo(this.x, this.y);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#7c7cb5";
		ctx.stroke();
	// } else {
	// 	ctx.strokeStyle = "#b0ddaf";
	// 	ctx.stroke();
	// }
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
		heartbeats[i].draw();
		heartbeats[i].update(i);
	}
	
	var i = echoes.length;
	while(i--) {
		echoes[i].draw();
		echoes[i].update(i);
	}

	if(timerTick >= timerTotal) {
		heartbeats.push(new Heartbeat());
		timerTick = 0;
	} else {
		timerTick++;
	}
}

window.onload = loop;