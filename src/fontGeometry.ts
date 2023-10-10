import "./style.css";
import * as THREE from "three";
import GUI from "lil-gui";
import {
  sceneServices,
  controlServices,
  rendererServices,
  cameraServices,
} from "./threeSetup";
const gui = new GUI();

interface User {
  firstName: string;
  age: number;
}

const useState = (
  state: User
): [state: User, setState: (newState: Partial<User>) => void] => {
  const setState = (newState: Partial<User>) => {
    return () => {
      state = Object.assign(state, newState);
    };
  };
  return [state, setState];
};

const fontGeometry = () => {
  const userState: User = {
    firstName: "hhh",
    age: 0,
  };

  const [state1, setState] = useState(userState);

  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const newRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });

  // tools
  const rendererTools = rendererServices();
  const sceneTools = sceneServices();
  const controlTools = controlServices();
  const cameraTools = cameraServices();

  /**
   * Renderer
   */
  const renderer = rendererTools.setRenderer(newRenderer);

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
  const camera = cameraTools.getOrthographicCamera();
  // camera.position.z = 3;
  // const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  // camera.position.z = 0.5;
  // camera.position.x = 0.5;
  // camera.lookAt(new THREE.Vector3(2, 2, 2));
  // scene.add(camera);

  /**
   * controls
   */
  const controls = controlTools.addOrbitControls(camera, canvas);
  controlTools.handleResize(camera, renderer);
  /**
   * Objects
   */

  // gui.addColor(material, "color");

  // distance method the length between the object and the camera
  // console.log(mesh.position.distanceTo(camera.position));
  const handelText = () => {
    sceneTools.loaders(scene).loadTextToScene(state1.firstName, textMesh => {
      // textMesh.rotateX(20);
      // Debug
      gui.add(textMesh.position, "y", -3, 3, 0.01).name("elevation");

      gui.add(textMesh, "visible");
      // gui.add(textMesh, "wireframe");
    });
  };
  // handelText();

  const but = document.getElementById("but");
  const head = document.getElementById("head");
  const inp = document.getElementById("in") as HTMLInputElement;

  if (head != null) {
    head.innerHTML = state1.firstName;
  }
  but?.addEventListener("click", e => {
    e.preventDefault();
    const val = inp?.value;
    console.log("clicked: ", val);

    setState({ firstName: val });
    if (head != null) {
      head.innerHTML = userState.firstName;
    }
    handelText();
  });

  sceneTools.addAxisToScene(scene);

  // fixing time frame with THREE.clock
  const clock = new THREE.Clock();

  // const cursorPoints = controlTools.getMouseCoordinates();
  const p = new THREE.Vector3(0, 0, 0);

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    // camera.position.x = Math.sin(cursorPoints.x * Math.PI) * 3;
    // camera.position.z = Math.cos(cursorPoints.x * Math.PI) * 3;
    // camera.position.y = cursorPoints.y * 3;

    // camera.lookAt(p);

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
