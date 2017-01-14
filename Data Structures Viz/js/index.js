
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = window.innerWidth - 50,
	canvasHeight = window.innerHeight + 200,
	numbers = [], 
	flags = [];

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.fillRect(0, 0, canvas.width, 7);

// Removes all buttons from canvas as user switches data structures
function removeAllButtons(){
	document.getElementById("enqueue").innerHTML = '';
	document.getElementById("dequeue").innerHTML = '';
	document.getElementById("peek").innerHTML = '';
	document.getElementById("isFull").innerHTML = '';
	document.getElementById("isEmpty").innerHTML = '';
}

// Simple random number generator
function random(min, max) {
	return Math.random() * (max - min) + min;
}

// Generate random numbers to populate the structures
function randomizer() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	numbers = [];
	for (var i = 0; i < 8; i++) {
		numbers.push(Math.floor(random(1, 100)));
		flags.push(true);
	}
	document.getElementById("numbersArea").innerHTML = numbers;
}

function drawNumbers(coords) {
	ctx.clearRect(0, 7, canvas.width, (coords[1] + 100));
	ctx.font="22px Comfortaa";
	ctx.fillText("Index #:", coords[2][0] - 125, coords[2][1] + 75);
	for (var i = 0; i < numbers.length; i++) {
		if (flags[i]) {
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = 7;
			ctx.strokeRect(coords[0], 75, 100, 100);
			ctx.font="28px Comfortaa";
			ctx.fillStyle = "white";
			ctx.fillText(numbers[i], coords[2][0], coords[2][1]);
			ctx.font="22px Comfortaa";
			ctx.fillStyle = "black";
			ctx.fillText(i, coords[2][0], coords[2][1] + 75);
			coords[0] += 100;
			coords[2][0] += 100;
		}
	}
	document.getElementById("numbersArea").innerHTML = numbers;
}

function createBinaryTree() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [];
	// ctx.beginPath();
	// ctx.arc(100,75,50,0,2*Math.PI);
	// ctx.stroke();
	ctx.font = "24px Comfortaa";
	ctx.fillText("Insert Binary Tree here - " + numbers, 50, 50);
	return;
}

function createQueue() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [(canvasWidth / 5.5), 75, [(canvasWidth / 5.5) + 35, 135]];
	drawNumbers(drawingCoords);

	document.getElementById("enqueue").innerHTML = 
	'<button type="submit" class="button" style="z-index: 2; position: relative" onclick="enqueue()">Enqueue()</button>';
	document.getElementById("dequeue").innerHTML = 
	'<button type="submit" class="button" style="z-index: 2; position: relative" onclick="dequeue()">Dequeue()</button>';
	document.getElementById("peek").innerHTML = 
	'<button type="submit" class="button" style="z-index: 2; position: relative" onclick="peek()">Peek()</button>';
	document.getElementById("isFull").innerHTML = 
	'<button type="submit" class="button" style="z-index: 2; position: relative" onclick="isFull()">isFull()</button>';
	document.getElementById("isEmpty").innerHTML = 
	'<button type="submit" class="button" style="z-index: 2; position: relative" onclick="isEmpty()">isEmpty()</button>';
}

function enqueue() {
	numbers.push(Math.floor(random(1, 100)));
	flags.push(true);
	drawNumbers(createQueue().drawingCoords);
}

function dequeue() {
	numbers.pop();
	flags.pop();
	drawNumbers(createQueue().drawingCoords);
}

function peek() {
	drawNumbers(createQueue.drawingCoords);
}

function createStack() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [];
	var startingX = (canvasWidth / 2) - 75;
	var startingY = 75;
	var center = [startingX + 25, startingY + 50];
	ctx.font="22px Comfortaa";
	ctx.fillText("Index #:", center[0] - 155, center[1]);
	for (var i = 0; i < numbers.length; i++) {
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 7;
		ctx.strokeRect(startingX, startingY, 75, 75);
		ctx.font="24px Comfortaa";
		ctx.fillStyle = "white";
		ctx.fillText(numbers[numbers.length - 1 - i], center[0], center[1]);
		ctx.font="20px Comfortaa";
		ctx.fillStyle = "black";
		ctx.fillText((numbers.length - 1 - i), center[0] - 55, center[1]);
		startingY += 75;
		center[1] += 74;
	}
}

function createLinkedList() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [];
	ctx.font = "24px Comfortaa";
	ctx.fillText("Insert Linked List here - " + numbers, 50, 50);
	return;
}

function createHeap() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [];
	ctx.font = "24px Comfortaa";
	ctx.fillText("Insert Heap here - " + numbers, 50, 50);
	return;
}

function createDblLinkedList() {
	removeAllButtons();
	ctx.clearRect(0, 7, canvas.width, canvas.height);
	var drawingCoords = [];
	ctx.font = "24px Comfortaa";
	ctx.fillText("Insert Doubly Linked List here - " + numbers, 50, 50);
	return;
}