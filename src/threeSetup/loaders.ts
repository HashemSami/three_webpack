import { MeshBasicMaterial, Mesh, AxesHelper } from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

type Loaders = {
  loadTextToScene: (
    text: string,
    mesh: (textMesh: Mesh<TextGeometry, MeshBasicMaterial>) => void
  ) => void;
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

    // // by default, three js is using the spear bounding
    // // we need to add the box bounding to each mesh
    // textGeometry.computeBoundingBox();
    // // using the bounding box to center the geometry
    // // around the axises
    // const bevalSizeXY = 0.2;
    // const bevalSizeZ = 0.3;
    // if (textGeometry.boundingBox != null) {
    //   textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - bevalSizeXY) * 0.5,
    //     -(textGeometry.boundingBox.max.y - bevalSizeXY) * 0.5,
    //     -(textGeometry.boundingBox.max.z - bevalSizeZ) * 0.5
    //   );
    // }
    // console.log(textGeometry.boundingBox);

    // or use the center method to center the text
    textGeometry.center();

    const material = new MeshBasicMaterial({ wireframe: true });
    const textMesh = new Mesh(textGeometry, material);
    textMesh.rotation.reorder("YXZ");

    scene.add(textMesh);

    mesh(textMesh);
  });
};

const loaders = (scene: THREE.Scene): Loaders => {
  return {
    loadTextToScene: (
      text: string,
      mesh: (textMesh: Mesh<TextGeometry, MeshBasicMaterial>) => void
    ) => loadText(scene, text, mesh),
  };
};

export type { Loaders };
export { loaders };
