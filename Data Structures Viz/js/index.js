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
		numbers = [];

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Simple random number generator
function random( min, max ) {
	return Math.random() * ( max - min ) + min;
}

// Generate random numbers to populate the structures
function randomizer() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	numbers = [];
	for (var i = 0; i < 8; i++) {
		numbers.push(Math.floor(random(0, 100)));
	}
	document.getElementById("numbersArea").innerHTML = numbers;
}

function createBinaryTree(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.beginPath();
	// ctx.arc(100,75,50,0,2*Math.PI);
	// ctx.stroke();
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Binary Tree here - " + numbers,50,50);
	return;
}

function createQueue(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.beginPath();
	// ctx.arc(200,150,50,0,2*Math.PI);
	// ctx.stroke();
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Queue here - " + numbers,50,50);
	return;
}

function createStack(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Stack here - " + numbers,50,50);
	return;
}

function createLinkedList(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Linked List here - " + numbers,50,50);
	return;
}

function createHeap(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Heap here - " + numbers,50,50);
	return;
}

function createDblLinkedList(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font="24px Reem Kufi";
	ctx.fillText("Insert Doubly Linked List here - " + numbers,50,50);
	return;
}