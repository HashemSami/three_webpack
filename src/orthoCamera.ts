import "./style.css";
import * as THREE from "three";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const addMouseControls = () => {
  const cursor = {
    x: 0,
    y: 0,
  };
  window.addEventListener("mousemove", event => {
    // to have numbers between -0.5 to the left, and 0.5 to the right,
    // instead of numbers betwee 0 and 1
    cursor.x = -(event.clientX / sizes.width - 0.5);
    cursor.y = event.clientY / sizes.height - 0.5;
    console.log(cursor.y);
  });
  return cursor;
};

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

const renderOrthoCamera = () => {
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
  // mesh.position.set(0, 0, 1);
  // mesh.scale.set(2, 0.5, 0.5);
  scene.add(mesh);
  mesh.rotation.reorder("YXZ");

  // will normalize the object distances
  console.log(mesh.position.normalize());

  const aspectRatio = sizes.width / sizes.height;

  /**
   * Camera
   */

  const camera = new THREE.OrthographicCamera(
    -2 * aspectRatio, // left distance
    2 * aspectRatio, // right distance
    2, // above distance
    -2, // below distance
    0.1, //nearest view
    100 // farthest view
  );
  camera.position.z = 3;
  // camera.position.y = 10;
  // camera.position.x = 2;
  // camera.lookAt(new THREE.Vector3());
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

  const cursorPoints = addMouseControls();
  const p = new THREE.Vector3(0, 0, 0);
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // camera.position.x = Math.sin(cursorPoints.x * Math.PI) * 3;
    // camera.position.z = Math.cos(cursorPoints.x * Math.PI) * 3;
    // camera.position.y = cursorPoints.y * 3;

    // camera.lookAt(p);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };
  tick();
};

export { renderOrthoCamera };

// mesh.rotation.y = Math.PI * elapsedTime;
// camera.position.y = Math.sin(elapsedTime * 0.2);
// camera.position.x = Math.cos(elapsedTime * 0.6);
// camera.lookAt(mesh.position);
// mesh.rotateY(Math.PI * 0.015 * elapsedTime);
// mesh.rotateX(Math.PI * 0.015);
