// Global variables
// height and width of the browser window
var ww = window.innerWidth;
var wh = window.innerHeight;

var frame = 0;

// radii
var mercury_r = 16;
var venus_r = 24;
var earth_r = 32;

// sizes
var sun_s = 5;
var mercury_s = 2;
var venus_s = 2;
var earth_s = 2;

var speed = 1;

var textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "";


function init() {
  /*Initilization function
    Calls render, camera, light, makeBox, and makes scene
  */

  // Make a renderer
  createRenderer();
  // Make a camera
  createCamera();
  // Make a light
  createLight();

  // Build a scene to glue everything together
  // Need to add in the camera, light, and objects
  scene = new THREE.Scene();
  scene.add(camera);
  scene.add(light);

  // orientation lines helper
  scene.add( new THREE.AxesHelper( 500 ) );

  // helper for shadows
  light.target.position.copy( scene.position );
  scene.add(new THREE.DirectionalLightHelper(light, 3.));

  // get camera to look at origin
  camera.lookAt(scene.position);


   // Create sphere and add to scene
   createSun();
   scene.add(sun);

   // Create sphere and add to scene
   createMercury();
   scene.add(mercury);

   createVenus();
   scene.add(venus);

   createEarth();
   scene.add(earth);


  // get the renderer to render our scene
  // leave the rendering to last
  renderer.render(scene, camera);

  // animate at the end of the setup
  animate();

}

function createRenderer() {
  /* Creates the renderer*/
  // Call rendering engine WebGL
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("scene")
  });

  // set the background colour of our scene
  renderer.setClearColor();

  // render the full screen
  renderer.setSize(ww, wh);
  document.body.appendChild( renderer.domElement );

}

function createCamera() {
	/* Creates the camera*/
  camera = new THREE.PerspectiveCamera(75, ww/wh, 1, 10000);

  // set position of camera
  // x = 0, y = 0, z = 500
  camera.position.set( 100, 20, 100 );

}

function createLight() {
  /* Creates the light*/

  // colour = white, intensity = 1
  // Directional light is like the sun at a direction
  light = new THREE.DirectionalLight(0xffffff, 1.4);

  // We the position of our light
  // x = 50, y = 250, z = 500
  light.position.set(0, 0, 800);
}

function createSun() {
  sun = new THREE.Mesh(
      new THREE.SphereGeometry(sun_s, 32, 16),
      new THREE.MeshPhongMaterial( {
    				    specular: 0x333333,
  					shininess: 10,
  					map: textureLoader.load( 'textures/2k_sun.jpeg' ),
  				} )
  );
  // Add some position
  sun.position.set(0, 0, 0);
}

function createMercury() {

    mercury = new THREE.Mesh(
        new THREE.SphereGeometry(mercury_s, 32, 16),
        new THREE.MeshPhongMaterial( {
      				    specular: 0x333333,
    					shininess: 10,
    					map: textureLoader.load( 'textures/2k_mercury.jpeg' ),
    				} )
    );
    mercury.position.set(mercury_r, 0,0);
}

function createVenus() {

    venus = new THREE.Mesh(
        new THREE.SphereGeometry(venus_s, 32, 16),
        new THREE.MeshPhongMaterial( {
      				    specular: 0x333333,
    					shininess: 10,
    					map: textureLoader.load( 'textures/2k_venus_atmosphere.jpeg' ),
    				} )
    );
    venus.position.set(venus_r, 0,0);
}

function createEarth() {

    earth = new THREE.Mesh(
        new THREE.SphereGeometry(earth_s, 32, 16),
        new THREE.MeshPhongMaterial( {
      				    specular: 0x333333,
    					shininess: 20,
    					map: textureLoader.load( 'textures/earth_atmos_2048.jpeg' ),
    				} )
    );
    earth.position.set(earth_r, 0,0);
}

var animate = function () {
	// Request another frame of the animation
  // call itself
  requestAnimationFrame(animate);

  // Make sphere bob
  //sphere.position.y += 0.65*Math.sin(frame*Math.PI/100);
  frame += 1;

  //Re-render everytime we make change
  renderer.render(scene, camera);
}



/* Finished writing functions */
//Initialize our scene -- run at the end
init();
