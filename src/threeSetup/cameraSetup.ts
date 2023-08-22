import { PerspectiveCamera, OrthographicCamera } from "three";

type CameraServices = {
  getPerspectiveCamera: (
    ...args: ConstructorParameters<typeof PerspectiveCamera>
  ) => THREE.PerspectiveCamera;
  getOrthographicCamera: (
    ...args: ConstructorParameters<typeof OrthographicCamera>
  ) => THREE.OrthographicCamera;
};

const getPerspectiveCamera = (
  ...args: ConstructorParameters<typeof PerspectiveCamera>
): THREE.PerspectiveCamera => {
  // const { fov, aspect } = p;
  const camera = new PerspectiveCamera(...args);
  camera.position.z = 8;
  // camera.position.x = 0.5;
  return camera;
};

const getOrthographicCamera = (
  ...args: ConstructorParameters<typeof PerspectiveCamera>
): THREE.OrthographicCamera => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const aspectRatio = sizes.width / sizes.height;

  const camera = new OrthographicCamera(
    -2 * aspectRatio, // left distance
    2 * aspectRatio, // right distance
    2, // above distance
    -2, // below distance
    0.1, //nearest view
    100 // farthest view
  );
  camera.position.z = 3;
  return camera;
};

const cameraServices = (): CameraServices => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return {
    getPerspectiveCamera,
    getOrthographicCamera,
  };
};

export { cameraServices };
