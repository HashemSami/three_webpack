import { Camera, PerspectiveCamera, MeshBasicMaterial, Mesh } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import GUI from "lil-gui";

interface GUIoptions {
  property: string;
  $1?: number | object | any[] | undefined;
  max?: number | undefined;
  step?: number | undefined;
}
const gui = new GUI();

type SceneServices = {
  loadTextToScene: (text: string) => { addGui: (o: GUIoptions) => void };
};

const loadText = (scene: THREE.Scene, text: string) => {
  // doesn't return a value, insteade we need to handle the callback
  // from the loader
  return new Promise(resolve, reject)=>{

    const fontLoader = new FontLoader();
    let textMesh: THREE.Mesh;
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
      textMesh = new Mesh(textGeometry, material);
      textMesh.rotation.reorder("YXZ");

      scene.add(textMesh);
    });
    resolve( {
      addGui: (o: GUIoptions) => addGui(textMesh, o),
    });
  }
};

const addGui = (object: object, o: GUIoptions) => {
  const { property, $1, max, step } = o;
  gui.add(object, property, $1, max, step);
};

const sceneServices = (scene: THREE.Scene): SceneServices => {
  return {
    loadTextToScene: (text: string) => loadText(scene, text),
  };
};

export { sceneServices };
