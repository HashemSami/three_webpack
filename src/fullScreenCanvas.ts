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

const fullScreenCanvas = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */
  const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
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

  // set full size screen with double click
  window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
      console.log("go fullscreen");
      canvas.requestFullscreen();
    } else {
      console.log("exit fullscreen");
      document.exitFullscreen();
    }
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

  const getDeltaTime = timeDelta();

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

export { fullScreenCanvas };
