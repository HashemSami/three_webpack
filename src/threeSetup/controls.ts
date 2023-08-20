import { Vector3 } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type ControlServices = {
  addOrbitControls: (
    camera: THREE.PerspectiveCamera,
    canvas: HTMLCanvasElement
  ) => OrbitControls;
  handleResize: (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) => void;
};

const addOrbitControls = (
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement
) => {
  const controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;
  controls.target = new Vector3(1, 0, 0);
  return controls;
};

const handleResize = (
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer
) => {
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
};

const controlServices = (): ControlServices => {
  return {
    addOrbitControls: (camera, canvas) => addOrbitControls(camera, canvas),
    handleResize: (camera, renderer) => handleResize(camera, renderer),
  };
};

export { controlServices };
