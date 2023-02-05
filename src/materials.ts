import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

const geometries = () => {
  const material = new THREE.MeshBasicMaterial();

  material.opacity = 0.5;
  material.transparent = true;

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
  );

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
  );

  return [sphere, plane, torus];
};

const spinFunction = () => {
  console.log("spin");
};

const parameters = {
  spin: spinFunction,
};

const materials = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */

  const [sphere, plane, torus] = geometries();

  sphere.position.setX(-2);
  torus.position.setX(2);

  scene.add(sphere, plane, torus);
  sphere.rotation.reorder("YXZ");

  // Debug
  gui.add(sphere.position, "y", -3, 3, 0.01).name("elevation");

  gui.add(sphere, "visible");
  gui.add(sphere, "wireframe");
  // gui.addColor(material, "color");

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
  // console.log(mesh.position.distanceTo(camera.position));

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

    // camera.lookAt(torus.position);

    sphere.rotation.x = 0.1 * elapsedTime;
    plane.rotation.x = 0.1 * elapsedTime;
    torus.rotation.x = 0.1 * elapsedTime;

    sphere.rotation.y = 0.2 * elapsedTime;
    plane.rotation.y = 0.2 * elapsedTime;
    torus.rotation.y = 0.2 * elapsedTime;
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { materials };
