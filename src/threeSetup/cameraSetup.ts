import { PerspectiveCamera } from "three";

type CameraServices = {
  getPerspectiveCamera: (options: PerspectiveCamera) => PerspectiveCamera;
};

interface Prespect extends THREE.PerspectiveCamera {}

const getPerspectiveCamera = (p: PerspectiveCamera): PerspectiveCamera => {
  const { fov, aspect } = p;
  const camera = new PerspectiveCamera(fov, aspect);
  camera.position.z = 0.5;
  camera.position.x = 0.5;
  return camera;
};

const cameraServices = (): CameraServices => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  return {
    getPerspectiveCamera: (options: PerspectiveCamera) =>
      getPerspectiveCamera(options),
  };
};

export { cameraServices };
