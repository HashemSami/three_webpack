import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import {
  sceneServices,
  controlServices,
  rendererServices,
  // cameraServices,
} from "./threeSetup";
const gui = new GUI();

const geometries = () => {
  // roughnedd and metalness
  const material = new THREE.MeshBasicMaterial({ color: "white" });

  const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

  return [box];
};

const fontGeometry = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
  const scene = new THREE.Scene();

  // tools
  const rendererTools = rendererServices(canvas);
  const sceneTools = sceneServices(scene);
  const controlTools = controlServices();
  // const cameraTools = cameraServices();

  /**
   * Renderer
   */
  const renderer = rendererTools.newRenderer();

  /**
   * Objects
   */

  // gui.addColor(material, "color");

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

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

  /**
   * controls
   */
  const controls = controlTools.addOrbitControls(camera, canvas);
  controlTools.handleResize(camera, renderer);

  // distance method the length between the object and the camera
  // console.log(mesh.position.distanceTo(camera.position));

  sceneTools.loadTextToScene("Hashem Sami", textMesh => {
    textMesh.rotateX(20);
    // Debug
    gui.add(textMesh.position, "y", -3, 3, 0.01).name("elevation");

    gui.add(textMesh, "visible");
    gui.add(textMesh, "wireframe");
  });

  sceneTools.addAxisToScene();

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
