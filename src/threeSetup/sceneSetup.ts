import { MeshBasicMaterial, Mesh, AxesHelper } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

type SceneServices = {
  loadTextToScene: (
    text: string,
    mesh: (textMesh: Mesh<TextGeometry, MeshBasicMaterial>) => void
  ) => void;
  addAxisToScene: () => void;
};

const loadText = (
  scene: THREE.Scene,
  text: string,
  mesh: (textMesh: Mesh<TextGeometry, MeshBasicMaterial>) => void
) => {
  // doesn't return a value, insteade we need to handle the callback
  // from the loader

  const fontLoader = new FontLoader();
  fontLoader.load("fonts/helvetiker_regular.typeface.json", font => {
    const textGeometry = new TextGeometry(text, {
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

    const material = new MeshBasicMaterial({ wireframe: true });
    const textMesh = new Mesh(textGeometry, material);
    textMesh.rotation.reorder("YXZ");

    scene.add(textMesh);

    mesh(textMesh);
  });
};

const addAxisToScene = (scene: THREE.Scene) => {
  const axisHelper = new AxesHelper();
  scene.add(axisHelper);
};

const sceneServices = (scene: THREE.Scene): SceneServices => {
  return {
    loadTextToScene: (
      text: string,
      mesh: (textMesh: Mesh<TextGeometry, MeshBasicMaterial>) => void
    ) => loadText(scene, text, mesh),
    addAxisToScene: () => addAxisToScene(scene),
  };
};

export { sceneServices };
