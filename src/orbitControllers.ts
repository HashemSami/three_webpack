import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// fixing the time frame
const timeDelta = () => {
  let time = Date.now();

  return () => {
    let currentTime = Date.now();
    let deltaTime = currentTime - time;
    time = currentTime;
    return deltaTime;
  };
};

const renderOrbitControls = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(1, 1, 1);
  mesh.scale.set(2, 0.5, 0.5);
  scene.add(mesh);
  mesh.rotation.reorder("YXZ");

  // will normalize the object distances
  console.log(mesh.position.normalize());

  /**
   * Sizes
   */
  const sizes = {
    width: 800,
    height: 600,
  };

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = 2;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);

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

  const getDeltaTime = timeDelta();

  // fixing time frame with THREE.clock
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { renderOrbitControls };
