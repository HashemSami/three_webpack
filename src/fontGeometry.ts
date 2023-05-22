import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import GUI from "lil-gui";

const gui = new GUI();

const loadTextToScene = (scene: THREE.Scene) => {
  // doesn't return a value, insteade we need to handle the callback
  // from the loader
  const fontLoader = new FontLoader();
  fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Hashem Sami", {
      font: font,
      size: 0.5,
      height: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });

    const material = new THREE.MeshBasicMaterial({ wireframe: true });
    const text = new THREE.Mesh(textGeometry, material);
    text.rotation.reorder("YXZ");

    // Debug
    gui.add(text.position, "y", -3, 3, 0.01).name("elevation");

    gui.add(text, "visible");
    gui.add(text, "wireframe");

    scene.add(text);
  });
};

const geometries = () => {
  // roughnedd and metalness
  const material = new THREE.MeshBasicMaterial({ color: "white" });

  const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

  return [box];
};

const fontGeometry = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */

  loadTextToScene(scene);

  // gui.addColor(material, "color");

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
   * lights
   */

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 0.5;
  camera.position.x = 0.5;
  // camera.lookAt(new THREE.Vector3(2, 2, 2));
  // scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;
  controls.target = new THREE.Vector3(1, 0, 0);

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

    // sphere.rotation.x = 0.1 * elapsedTime;
    // plane.rotation.x = 0.1 * elapsedTime;
    // torus.rotation.x = 0.1 * elapsedTime;

    // sphere.rotation.y = 0.2 * elapsedTime;
    // plane.rotation.y = 0.2 * elapsedTime;
    // torus.rotation.y = 0.2 * elapsedTime;

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { fontGeometry };
