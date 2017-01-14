window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = window.innerWidth,
	canvasHeight = window.innerHeight,
	heartbeats = [],
	timerTotal = 170,
	timerTick = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function Heartbeat() {
	this.x = 0;
	this.y = 240;
	this.lifespan = 0;
	this.coordinates = [];
	this.coordinateCount = 1;

	while (this.coordinateCount--) {
		this.coordinates.push([this.x, this.y]);
	}
}

Heartbeat.prototype.update = function(index) {
	this.coordinates.pop();
	this.coordinates.unshift([this.x, this.y]);
	if (this.y == 340) {
		this.y = 240;
	}
	if (this.y == 140) {
		this.y = 340;
	}
	if (this.lifespan % 80 == 0) {
		this.y = 140;
	}

	if (this.x < canvasWidth) {
		this.x += 6;
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
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#93b5ed';
	ctx.stroke();
}

function loop() {
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame(loop);
	ctx.globalCompositeOperation = 'destination-out';
	ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.globalCompositeOperation = 'lighter';

	var i = heartbeats.length;
	while (i--) {
		if (heartbeats[i].lifespan < 450) {
			heartbeats[i].draw();
			heartbeats[i].update(i);
		} else {
			heartbeats.splice(i, 1);
		}
	}

	if (timerTick >= timerTotal) {
		heartbeats.push(new Heartbeat());
		timerTick = 0;
	} else {
		timerTick++;
	}
}

window.onload = loop;
