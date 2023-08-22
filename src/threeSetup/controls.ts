import { Vector3 } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Sizes = {
  width: number;
  height: number;
};

type Coordinates = {
  x: number;
  y: number;
};

type ControlServices = {
  addOrbitControls: (
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    canvas: HTMLCanvasElement
  ) => OrbitControls;
  handleResize: (
    camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
    renderer: THREE.WebGLRenderer
  ) => void;
  getMouseCoordinates: () => Coordinates;
};

const addOrbitControls = (
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  canvas: HTMLCanvasElement
) => {
  const controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;
  controls.target = new Vector3(0, 0, 0);
  return controls;
};

const handleResize = (
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera,
  renderer: THREE.WebGLRenderer,
  sizes: Sizes
) => {
  window.addEventListener("resize", () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera
    const cam = camera as THREE.PerspectiveCamera;
    if (cam.aspect) {
      cam.aspect = sizes.width / sizes.height;
    }
    cam.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    // if the window changed to another screen
    // we will still have the same ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

const getMouseCoordinates = (sizes: Sizes): Coordinates => {
  const cursor = {
    x: 0,
    y: 0,
  };
  window.addEventListener("mousemove", event => {
    // to have numbers between -0.5 to the left, and 0.5 to the right,
    // instead of numbers between 0 and 1
    cursor.x = -(event.clientX / sizes.width - 0.5);
    cursor.y = event.clientY / sizes.height - 0.5;
    console.log(cursor.y);
  });
  return cursor;
};

const controlServices = (): ControlServices => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return {
    addOrbitControls: (camera, canvas) => addOrbitControls(camera, canvas),
    handleResize: (camera, renderer) => handleResize(camera, renderer, sizes),
    getMouseCoordinates: () => getMouseCoordinates(sizes),
  };
};

export { controlServices };
