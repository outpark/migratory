var world;
var sphere;
var plane;
var circle;

var bird;
var cone;

var obstacles = [];

var cloudCount = 10;
var moutainCount = 5;
var treeCount = 20;

// questions to ask: how to remove from world?
// how to smartly do collision for each object
// how to move in y axis

function setup() {
	// no canvas needed
	noCanvas();

	world = new World('VRScene');
	world.setUserPosition(0, 5, 10);
	// sphere = new Sphere({x:0, y:2, z:0, red:0, green:255, blue:0});
	// world.add(sphere);
	treeContainer = new Container3D({
		x:0,
		y:0,
		z:0
	});
	mountainContainer = new Container3D({
		x:0,
		y:0,
		z:0
	});
	cloudContainer = new Container3D({
		x:0,
		y:0,
		z:0
	});
	setGround();
	setMountains();
	setTree();
	setPyramid();
	setClouds();
	//adding 3d model for cloud1
	
}

function draw() {
	console.log(world.getUserPosition());
	movementCtrl();
}

function movementCtrl(){
	bird = world.getUserPosition();
	// if(!bird.y < 2)
		world.moveUserForward(0.1);

	bird = world.getUserPosition();
	circle.setX(bird.x);
	circle.setZ(bird.z);
	console.log(circle.getWorldPosition());

	if(Math.floor(bird.z % 100) === 0){
		// change environment every 100 movement
	}
}

function setClouds() {
	for(let i=0;i<cloudCount;i++){
		cloud = new OBJ({
			asset: 'cloud1_obj',
			mtl: 'cloud1_mtl',
			x: random(-30,30),
			y: random(3,30),
			z: random(-10,-60),
			rotationX:0,
			rotationY:0
		});
		world.add(cloud);
	}
}

function setGround() {
	circle = new Circle({x:0, y:0, z:0, radius:100, red:0, green:255, blue:0, rotationX:-90});
	world.add(circle);
}

function setMountains() {
	for(let i=0;i<5;i++){
		var r= random(255);
		var g= random(255);
		var b = random(255);
		var xPos = random(-40,40);
		var zPos = random(-10, -90);
		newCone = new Cone({
			x:xPos, y:4, z:zPos,
			red:r, green:g, blue:b,
			height:30,
			radiusBottom:15, radiusTop:0.01,
		});
		world.add(newCone);
	}
}

function setTree() {
	for(let i=0;i<20;i++){
		let xPos = random(-30,30);
		let zPos = random(-5, -40)
		let height = random(5, 10);
		var trunk = new Cylinder({
		x:xPos, y:1 , z:zPos,
		height:height,
		radius: 0.25,
		red: 83, green: 53, blue:10,
		});
		world.add(trunk);
		var leaves = new Cone({
			x:xPos, y:5, z:zPos,
			height:height,
			radiusBottom:1, radiusTop:0.01,
			red:30, green:147, blue: 45
		});
		world.add(leaves);
	}
}

function setPyramid(){
	// var tetrahedron1= new Tetrahedron({
	// 	x:3, y:2, z: 10,
	// 	radius: 3,
	// 	red:255, green:0, blue:0,
	// 	rotationY:-90,
	// 	rotationX:-90,
	var base = new Plane({
		x: 0, y:0, z:0,
		width: 4, height:4,
		rotationX:90,
		side: 'double',
		red:random(255), green:random(255), blue:random(255),
	});

	world.add(base);

}


function Mesh(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.form;

	this.collision = function() {

	}

	this.move = function() {

	}

}
