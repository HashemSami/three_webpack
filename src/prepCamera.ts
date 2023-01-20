import "./style.css";
import * as THREE from "three";

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

const renderPrepCamera = () => {
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
  // mesh.position.y = 1;
  // mesh.position.x = 1;
  // mesh.position.z = 1;
  mesh.position.set(1, 1, 1);
  mesh.scale.set(2, 0.5, 0.5);
  scene.add(mesh);
  mesh.rotation.reorder("YXZ");
  // object position is a Vextor3 calss that has many useful methods
  // the length method will give the distance between the object and the center of the scene
  // console.log(mesh.position.length());

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
    // this will be used with evere object animation to unify the
    // animation speed for all deferent devices
    // let deltaTime = getDeltaTime();
    // with clock
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    // mesh.rotation.y = Math.PI * elapsedTime;
    camera.position.y = Math.sin(elapsedTime * 0.2);
    camera.position.x = Math.cos(elapsedTime * 0.2);
    camera.lookAt(mesh.position);
    // mesh.rotateY(Math.PI * 0.015 * elapsedTime);

    // mesh.rotateX(Math.PI * 0.015);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { renderPrepCamera };
