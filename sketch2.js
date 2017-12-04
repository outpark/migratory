var world;

var bird;
//var material = document.querySelector('a-entity[material]').components.material.material;

function setup() {
	// no canvas needed
	noCanvas();

	world = new World('VRScene');
	//world.setUserPosition(0, 5, 10);
	// sphere = new Sphere({x:0, y:2, z:0, red:0, green:255, blue:0});
	// world.add(sphere);
	setGround();
	setMountains();
	setTree();
	setPyramid();

	//adding 3d model for cloud1
	cloud1 = new OBJ({
		asset: 'cloud1_obj',
		mtl: 'cloud1_mtl',
		x: 5,
		y: 1.3,
		z: 0,
		rotationX:0,
		rotationY:0
	});
	world.add(cloud1);

}

function draw() {
	// console.log(world.getUserPosition());
	//movementCtrl();
}

function movementCtrl(){
	world.moveUserForward(0.05);

	bird = world.getUserPosition();
	circle.setX(bird.x);
	circle.setZ(bird.z);
	console.log(circle.getWorldPosition());
}


function setGround() {
	circle1 = new Circle({x:0, y:0, z:0, radius:25, red:0, green:255, blue:0, rotationX:-90});
	world.add(circle1);
}
function setMountains() {
	var r= random(255);
	var g= random(255);
	var b = random(255);
	cone1 = new Cone({
		x:-10, y:4, z:-10,
		red:r, green:g, blue:b,
		height:30,
		radiusBottom:15, radiusTop:0.01,
	});
	world.add(cone1);
}

function setTree() {
	var trunk = new Cylinder({
		x:4, y:1 , z:-5,
		height:5,
		radius: 0.25,
		red: 83, green: 53, blue:10,
	});
	world.add(trunk);
	var leaves = new Cone({
		x:4, y:5, z:-5,
		height:5,
		radiusBottom:1, radiusTop:0.01,
		red:30, green:147, blue: 45
	});
	world.add(leaves);
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
