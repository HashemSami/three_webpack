import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const getTriangelGeometry = () => {
  // triangel custom geometry
  // each three values in the array represents a vertics position in the 3d world
  const positionsArray = new Float32Array([0, 0, 1, 0, 1, 1, 1, 0, 1]);

  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionsAttribute);

  return geometry;
};

const getComplexGeometry = () => {
  // want to create 50 triangles
  // each triange will be composed of 3 vertices
  // and each vertix needs three values
  const count = 500;
  const positionsArray = new Float32Array(count * 3 * 3);

  // fill the vrtics with ramsom values
  for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4;
  }

  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionsAttribute);
  return geometry;
};

const customGeometry = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */
  // const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

  const triangelGeometry = getTriangelGeometry();

  const complexGeomerty = getComplexGeometry();

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(complexGeomerty, material);
  // mesh.position.set(1, 1, 1);
  mesh.scale.set(2, 0.5, 0.5);
  scene.add(mesh);
  mesh.rotation.reorder("YXZ");

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

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { customGeometry };
