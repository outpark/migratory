var world;
var sphere;
var plane;
var circle;

var bird;
var cone;

var obstacles = [];

var cloudCount = 10;
var moutainCount = 7;
var treeCount = 25;


var treeContainer;
var mountainContainer;
var cloudContainer;

var changeScene = 0

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
	bird = world.getUserPosition();

	setMountains(mountainContainer, bird);
	setTrees(treeContainer,bird);
	setPyramid();
	setClouds(cloudContainer, bird);

	world.add(treeContainer);
	world.add(mountainContainer);
	world.add(cloudContainer);
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

	// if(bird.z < -30){
	// 	// world.remove(treeContainer);
	// 	treeContainer.hide();
	// }

	bird = world.getUserPosition();
	circle.setX(bird.x);
	circle.setZ(bird.z);
	console.log(circle.getWorldPosition());

	console.log(bird.z % 50);
	if(-Math.floor(bird.z % 50) === 49 && changeScene < 1){
		// change environment every 100 movement
		// debugger;
		emptyContainer(treeContainer);
		emptyContainer(mountainContainer);
		emptyContainer(cloudContainer);
		setTrees(treeContainer, bird);
		setMountains(mountainContainer, bird);
		setClouds(cloudContainer, bird);
		console.log("Changing!!");
		changeScene++;
	}

	if(-Math.floor(bird.z % 50) === 1){
		changeScene = 0;
	}
}

function setClouds(container, bird) {
	for(let i=0;i<cloudCount;i++){
		cloud = new OBJ({
			asset: 'cloud1_obj',
			mtl: 'cloud1_mtl',
			x: random(-30,30),
			y: random(3,30),
			z: random(bird.z,bird.z-60),
			rotationX:0,
			rotationY:0
		});
		// world.add(cloud);
		container.addChild(cloud);
	}
}

function setGround() {
	circle = new Circle({x:0, y:0, z:0, radius:100, red:0, green:255, blue:0, rotationX:-90});
	world.add(circle);
}

function setMountains(container, bird) {
	for(let i=0;i<moutainCount;i++){
		var r= random(255);
		var g= random(255);
		var b = random(255);
		var xPos = random(-40,40);
		var zPos = random(bird.z-20, bird.z-80);
		newCone = new Cone({
			x:xPos, y:4, z:zPos,
			red:r, green:g, blue:b,
			height:30,
			radiusBottom:15, radiusTop:0.01,
		});
		// world.add(newCone);
		container.addChild(newCone);
	}
}

function setTrees(container, bird) {
	for(let i=0;i<treeCount;i++){
		let xPos = random(-30,30);
		let zPos = random(bird.z, bird.z-60)
		let height = random(5, 10);
		var trunk = new Cylinder({
		x:xPos, y:1 , z:zPos,
		height:height,
		radius: 0.25,
		red: 83, green: 53, blue:10,
		});
		// world.add(trunk);
		var leaves = new Cone({
			x:xPos, y:5, z:zPos,
			height:height,
			radiusBottom:1, radiusTop:0.01,
			red:30, green:147, blue: 45
		});
		// world.add(leaves);
		container.addChild(trunk);
		container.addChild(leaves);
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

function emptyContainer(container){
	let entities = container.getChildren();
	entities.forEach((entity) => {
		container.removeChild(entity);
	});
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
