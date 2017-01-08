// Adapted from Mark of the Mouse Click at:
// http://codepen.io/JesGraPa/pen/pvgOQM
// and Luke Shimkus' tutorial at:
// http://codepen.io/programking/pen/ejELv

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
		ripples = [], 
		rippleTotal = 5,
		rippleTick = 0,
		// this will time the auto launches of ripples, one launch per 80 loop ticks
		timerTotal = 80,
		timerTick = 0,
		mousedown = false,
		// mouse x coordinate,
		mx,
		// mouse y coordinate
		my;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

		// get a random number within a range
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// calculate the distance between two points
function calculateDistance( p1x, p1y, p2x, p2y ) {
	var xDistance = p1x - p2x,
			yDistance = p1y - p2y;
	return Math.sqrt( Math.pow( xDistance, 2 ) + Math.pow( yDistance, 2 ) );
}

// create ripple
function Ripple( startingX, startingY, rad ) {
	// actual coordinates
	this.x = startingX;
	this.y = startingY;
	// starting coordinates
	this.startingX = startingX;
	this.startingY = startingY;
	// radius
	this.rad = rad;
	this.lifespan = 0;
	// distance from starting point to target
	this.distanceToTarget = canvasWidth - this.rad;
	this.distanceTraveled = 0;
	// track the past coordinates of each ripple, increase the 
	// coordinate count to create more prominent ripples
	this.coordinates = [];
	this.coordinateCount = 3;
	// populate initial coordinate collection with the current coordinates
	while(this.coordinateCount--) {
		this.coordinates.push( [ this.x, this.y, this.rad ] );
	}
	
	this.angle = Math.atan2( canvasHeight - startingY, canvasWidth - startingX );
	this.speed = 1.2;
	this.acceleration = 1.00009;
	this.borderThickness = 1.0;
	this.brightness = random( 50, 70 );
}

// update ripple
Ripple.prototype.update = function( index ) {
	// remove last item in coordinates array
	this.coordinates.pop();
	
	// add current coordinates to the start of the array
	this.coordinates.unshift( [ this.x, this.y, this.rad ] );
	
	// speed up the ripple
	this.speed *= this.acceleration;
	
	// get the current velocities based on angle and speed
	var vx = Math.cos( this.angle ) * this.speed,
			vy = Math.sin( this.angle ) * this.speed;
	
	// how far will the ripple have traveled with velocities applied?
	this.distanceTraveled = calculateDistance( this.startingX, 
																						this.startingY, 
																						this.x + vx, 
																						this.y + vy );

	// if the distance traveled, including velocities, is greater than the size of the window, then the ripple can be discontinued
	if( this.distanceTraveled >= this.distanceToTarget ) {
		this.coordinates.pop();
		if (ripples.length == 45) {
			ripples.pop();
		}
		// remove the ripple, use the index passed into the update function to determine which to remove
		ripples.splice( index, 1 );
	} else {
		// target not reached, keep traveling
		this.rad += (vx + 0.3);
		this.borderThickness *= 1.02;
		this.lifespan++;
	}
}

// draw ripple
Ripple.prototype.draw = function() {
	ctx.beginPath();
	// move to the last tracked coordinate in the set, then draw a line to the current x and y
	ctx.arc(this.coordinates[this.coordinates.length - 1][ 0 ],
					this.coordinates[ this.coordinates.length - 1][ 1 ], 
					this.coordinates[this.coordinates.length - 1][ 2], 
					0, 2 * Math.PI);
	ctx.shadowBlur=120;
	ctx.shadowColor='#00093d';
	if (this.lifespan <= 40) {
		ctx.strokeStyle='hsl('+242+', '+100+'%, '+this.lifespan+'%)';
	} 
	// else if (this.lifespan <= 90) {
	// 	ctx.strokeStyle='hsl('+242+', '+94+'%, '+(70 - ((this.lifespan)))+'%)';
	// } 
	else {
		ctx.strokeStyle='hsl('+242+', '+100+'%, '+(70 - ((this.lifespan)))+'%)';
	}
	ctx.lineWidth = this.borderThickness;
	ctx.stroke();
}

// main demo loop
function loop() {
	// this function will run endlessly with requestAnimationFrame
	requestAnimFrame( loop );
	
	// normally, clearRect() would be used to clear the canvas
	// we want to create a trailing effect though
	// setting the composite operation to destination-out will allow us to clear the canvas at a specific opacity, rather than wiping it entirely
	ctx.globalCompositeOperation = 'destination-out';
	// decrease the alpha property to create more prominent trails
	ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
	ctx.fillRect( 0, 0, canvasWidth, canvasHeight );
	// change the composite operation back to our main mode
	// lighter creates bright highlight points as the fireworks and particles overlap each other
	ctx.globalCompositeOperation = 'lighter';
	
	// loop over each ripple, draw it, update it
	var i = ripples.length;
	while(i--) {
		if (ripples[i].lifespan <= 130) {
			ripples[i].draw();
			ripples[i].update(i);
		} else {
			ripples.splice(i, 1);
		}
	}
	// launch ripples automatically to random coordinates, when the mouse isn't down
	if( timerTick >= timerTotal ) {
		if( !mousedown ) {
			ripples.push( new Ripple( random( 0, canvasWidth/2 ), random( 0, canvasHeight ), 1 ));
			// start the ripple at the bottom middle of the screen, then set the random target coordinates, the random y coordinates will be set within the range of the top half of the screen
			timerTick = 0;
			// console.log('After', rippleTick, timerTick);
		}
	} else {
		timerTick++;
		
	}
	
	// limit the rate at which fireworks get launched when mouse is down
	if( rippleTick >= rippleTotal ) {
		if( mousedown ) {
			// start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
			ripples.push( new Ripple(mx, my, 1) );
			rippleTick = 0;
		}
	} else {
		rippleTick++;
	}
}

// mouse event bindings
// update the mouse coordinates on mousemove
canvas.addEventListener( 'mousemove', function( e ) {
	mx = e.pageX - canvas.offsetLeft;
	my = e.pageY - canvas.offsetTop;
});

// toggle mousedown state and prevent canvas from being selected
canvas.addEventListener( 'mousedown', function( e ) {
	e.preventDefault();
	mousedown = true;
});

canvas.addEventListener( 'mouseup', function( e ) {
	e.preventDefault();
	mousedown = false;
});

window.onload = loop;