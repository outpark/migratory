var world;
var sphere;
var plane;
var circle;

var bird;
var cone;

var score = 0;
var cloudCount = 10;
var moutainCount = 7;
var treeCount = 20;

var nextT = {};
var nextM = {};

var treeContainer;
var treeCont1;
var treeCont2;
var treeCont3;
var treeCont4;
var treeCont5;
var treesContainer;

var mountainCont1;
var mountainCont2;
var mountainCont3;
var mountainsContainer;

var mountainContainer;
var cloudContainer;

var changeScene = 0;

// questions to ask: how to remove from world?
// how to smartly do collision for each object
// how to move in y axis

// TODO: progressivly generate scene ahead of the user by 100/150 point and splice the ones behind
// TODO: prevent the user from go too low or too high
// TODO: transparent clounds

function setup() {
	// no canvas needed
	noCanvas();

	world = new World('VRScene');
	world.setUserPosition(0, 5, 10);
	world.setFlying(true);
	// sphere = new Sphere({x:0, y:2, z:0, red:0, green:255, blue:0});
	// world.add(sphere);
	// treeContainer = new Container3D({x:0,y:0,z:0});
	mountainCont1 = new Container3D({x:0,y:0,z:0});
	mountainCont2 = new Container3D({x:0,y:0,z:0});
	mountainCont3 = new Container3D({x:0,y:0,z:0});
	mountainsContainer = [mountainCont1, mountainCont2, mountainCont3];

	cloudContainer = new Container3D({x:0,y:0,z:0});

	treeCont1 = new Container3D({x:0,y:0,z:0});
	treeCont2 = new Container3D({x:0,y:0,z:0});
	treeCont3 = new Container3D({x:0,y:0,z:0});
	treeCont4 = new Container3D({x:0,y:0,z:0});
	treeCont5 = new Container3D({x:0,y:0,z:0});
	treesContainer = [treeCont1,treeCont2,treeCont3,treeCont4,treeCont5];

	setGround();

	bird = world.getUserPosition();
	nextT.z = bird.z - 20;
	nextT.i = 0;

	nextM.z = bird.z - 40;
	nextM.i = 0;

	setTrees(treeCont1, bird.x, bird.z-10);
	setTrees(treeCont2, bird.x, bird.z-30);
	setTrees(treeCont3, bird.x, bird.z-50);
	setTrees(treeCont4, bird.x, bird.z-70);
	setTrees(treeCont5, bird.x, bird.z-90);

	setMountains(mountainCont1, bird.x, bird.z-40);
	setMountains(mountainCont2, bird.x, bird.z-80);
	setMountains(mountainCont3, bird.x, bird.z-120);

	// initMountains(mountainContainer, bird);
	// initTrees(treeContainer,bird);
	setPyramid();
	initClouds(cloudContainer, bird);

	// world.add(treeContainer);
	// world.add(mountainContainer);
	world.add(cloudContainer);
	world.add(treeCont1);
	world.add(treeCont2);
	world.add(treeCont3);
	world.add(treeCont4);
	world.add(treeCont5);

	world.add(mountainCont1);
	world.add(mountainCont2);
	world.add(mountainCont3);
	//adding 3d model for cloud1

}

function draw() {
	movementCtrl();
}
var tCount = 0;
function movementCtrl(){
	bird = world.getUserPosition();

	world.moveUserForward(0.1);

	bird = world.getUserPosition();
	circle.setX(bird.x);
	circle.setZ(bird.z);

	// trees generation
	if(bird.z < nextT.z){
		nextT.z = bird.z - 20;
		setTrees(treesContainer[nextT.i], bird.x, bird.z-110);
		nextT.i +=1;
		if(nextT.i === 5){
			nextT.i = 0;
		}
	}
	// mountains generation
	if(bird.z < nextM.z){
		nextM.z = bird.z - 40;
		setMountains(mountainsContainer[nextM.i], bird.x, bird.z-150);
		nextM.i +=1;
		if(nextM.i === 3){
			nextM.i = 0;
		}
	}

}

function setTrees(container, xPos, zPos){
	console.log("Updating trees");
	for(let i=0;i<treeCount;i++){
		let x = random(xPos-50,xPos+50);
		let height1 = random(6, 9);
		let height2 = random(7, 14);
		let z = random(zPos, zPos-20);
		var trunk = new Cylinder({
			x:x, y:1 , z:z,
			height:height1,
			radius: 0.25,
			red: 83, green: 53, blue:10,
		});
		var leaves = new Cone({
			x:x, y:height1, z:z,
			height:height2,
			radiusBottom:2, radiusTop:0.01,
			red:30, green:147, blue: 45
		});
		container.addChild(trunk);
		container.addChild(leaves);
	}
}

function setMountains(container, xPos, zPos){
	for(let i=0;i<moutainCount;i++){
		var r= random(255);
		var g= random(255);
		var b = random(255);
		var x = random(xPos-50,xPos+50);
		var z = random(zPos-10, zPos-50);
		var height = random(30, 100);
		newCone = new Cone({
			x:x, y:4, z:z,
			red:r, green:g, blue:b,
			height:height,
			radiusBottom:random(15,30), radiusTop:0.1,
		});
		// world.add(newCone);
		container.addChild(newCone);
	}
}




function initClouds(container, bird) {
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

function initMountains(container, bird) {
	for(let i=0;i<moutainCount;i++){
		var r= random(255);
		var g= random(255);
		var b = random(255);
		var xPos = random(-40,40);
		var zPos = random(bird.z-20, bird.z-80);
		var height = random(30, 100);
		newCone = new Cone({
			x:xPos, y:4, z:zPos,
			red:r, green:g, blue:b,
			height:height,
			radiusBottom:random(15,30), radiusTop:0.1,
		});
		// world.add(newCone);
		container.addChild(newCone);
	}
}

function initTrees(container, bird) {
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

function initTrees2(container, bird) {
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
		var leaves = new Box({
			x:xPos, y:5, z:zPos,
			width:random(3,5) , height: random(3,5) , depth:random(3,5),
			red:30, green:147, blue: 45
		});
		// world.add(leaves);
		container.addChild(trunk);
		container.addChild(leaves);
	}
}


function setPyramid(){
	pyramid = new OBJ({
		asset: 'pyramid_obj',
		mtl: 'pyramid_mtl',
		x: 3,
		y: 0,
		z: -10,
		scaleX:10, scaleY:10, scaleZ:10,
		rotationX:0,
		rotationY:0
	});
	world.add(pyramid);

	// pyramid2 = new GLTF({
	// 	asset: 'pyramid2',
	// 	x:0,
	// 	y:0,
	// 	z:-5,
	// });
	// world.add(pyramid2);

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
