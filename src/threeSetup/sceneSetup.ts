import { MeshBasicMaterial, Mesh, AxesHelper } from "three";
import { loaders, Loaders } from "./loaders";
type SceneServices = {
  loaders: () => Loaders;
  addAxisToScene: () => void;
};

const addAxisToScene = (scene: THREE.Scene) => {
  const axisHelper = new AxesHelper();
  scene.add(axisHelper);
};

const sceneServices = (scene: THREE.Scene): SceneServices => {
  return {
    loaders: () => loaders(scene),
    addAxisToScene: () => addAxisToScene(scene),
  };
};

export { sceneServices };
