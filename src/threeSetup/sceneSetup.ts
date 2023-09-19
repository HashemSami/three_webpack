import { AxesHelper } from "three";
import { loaders, Loaders } from "./loaders";
type SceneServices = {
  loaders: (scene: THREE.Scene) => Loaders;
  addAxisToScene: (scene: THREE.Scene) => void;
};

const addAxisToScene = (scene: THREE.Scene) => {
  const axisHelper = new AxesHelper();
  scene.add(axisHelper);
};

const sceneServices = (): SceneServices => {
  return {
    loaders,
    addAxisToScene,
  };
};

export { sceneServices };
