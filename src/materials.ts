import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

// using THREE loader
const textureLoader = () => {
  // used to manage your loaders to the scene
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("onstart");
  };
  loadingManager.onLoad = () => {
    console.log("onLoad");
  };
  loadingManager.onProgress = () => {
    console.log("onProgress");
  };
  loadingManager.onError = () => {
    console.log("onError");
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
  const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
  const heightTexture = textureLoader.load("/textures/door/height.jpg");
  const normalTexture = textureLoader.load("/textures/door/normal.jpg");
  const ambientOcclusionTexture = textureLoader.load(
    "/textures/door/ambientOcclusion.jpg"
  );
  const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
  const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

  // colorTexture.repeat.setX(2);
  // colorTexture.repeat.setY(3);
  // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
  // colorTexture.wrapT = THREE.MirroredRepeatWrapping;

  // colorTexture.offset.setX(0.5);
  // colorTexture.offset.setY(0.5);

  // rotate 45 deg
  // by default the rotation wil bee done from the 0 origin, form th corner of the cube
  // colorTexture.rotation = Math.PI / 4;

  // we have to chang eht origin of retation be specifying the center value
  // colorTexture.center.set(0.5, 0.5);

  // using the nearest filter will give us a better performance
  // and a better visuals, as it filters out th image in one verion
  // and we will not need the mipmapping where we creates a lot of versions of the texture
  // to match the zoom on the texture
  colorTexture.generateMipmaps = false;
  colorTexture.minFilter = THREE.NearestFilter;
  colorTexture.magFilter = THREE.NearestFilter;

  return colorTexture;
};

const spinFunction = () => {
  console.log("spin");
};

const parameters = {
  spin: spinFunction,
};

const textures = () => {
  const colorTexture = textureLoader();

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */
  const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

  const material = new THREE.MeshBasicMaterial({
    map: colorTexture,
  });

  const mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(1, 1, 1);
  // mesh.scale.set(2, 0.5, 0.5);
  scene.add(mesh);
  mesh.rotation.reorder("YXZ");

  // Debug
  gui.add(mesh.position, "y", -3, 3, 0.01).name("elevation");

  gui.add(mesh, "visible");
  gui.add(material, "wireframe");
  gui.addColor(material, "color");

  gui.add(parameters, "spin");

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    // if the window changed to another screen
    // we will still have the same ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = 2;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;

  // distance method the length between the object and the camera
  console.log(mesh.position.distanceTo(camera.position));

  // axis helpers
  const axisHelper = new THREE.AxesHelper();
  scene.add(axisHelper);

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  // to smooth out the pixels in the canvas, will set
  // the renderer to have a pixel ratio between 1 or two
  // to not overload the device with to many pixels
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // fixing time frame with THREE.clock
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    camera.lookAt(mesh.position);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { textures };
