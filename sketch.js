var world;
var sphere;
var plane;
var circle;

var bird;
var cone;
function setup() {
	// no canvas needed
	noCanvas();

	world = new World('VRScene');
	world.setUserPosition(0, 5, 10);
	// sphere = new Sphere({x:0, y:2, z:0, red:0, green:255, blue:0});
	// world.add(sphere);
	setGround();
	setMountains();
}

function draw() {
	// console.log(world.getUserPosition());
	movementCtrl();
}

function movementCtrl(){
	world.moveUserForward(0.05);

	bird = world.getUserPosition();
	circle.setX(bird.x);
	circle.setZ(bird.z);
	console.log(circle.getWorldPosition());
}


function setGround() {
	circle = new Circle({x:0, y:0, z:0, radius:25, red:0, green:255, blue:0, rotationX:-90});
	world.add(circle);
}
function setMountains() {
	cone = new Cone({x:0, y:4, z:-10, red:0, green:0, blue:30});
	world.add(cone);
}

function setSky() {

}

