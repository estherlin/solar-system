// Global variables
// height and width of the browser window
var ww = window.innerWidth;
var wh = window.innerHeight;

var frame = 0;

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


  // Create ground
  // Add ground to scene
  //createGround();
  //scene.add(ground);

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
  camera.position.set( 20, 5, 20 );

}

function createLight() {
  /* Creates the light*/

  // colour = white, intensity = 1
  // Directional light is like the sun at a direction
  light = new THREE.DirectionalLight(0xffffff);

  // We the position of our light
  // x = 50, y = 250, z = 500
  light.position.set(0, 0, 14);
}

function createSun() {

  // 1. geometry
  // wdith = 200, hiegh = 200, length = 200
  geometry = new THREE.SphereGeometry(5, 32, 16);

  // 2. texture
	sunMaterial = new THREE.MeshPhongMaterial( {
  				specular: 0x333333,
					shininess: 10,
					map: textureLoader.load( 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg' ),
				} );

  // 3. Mesh
  // give it a geometry and texture
  sun = new THREE.Mesh(geometry, sunMaterial);

  // Add some position
  sun.position.set(0, 0, 0);

  // shadows
  sun.castShadow = true;

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
