import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";

const gui = new GUI();

const cubeTextureLoader = () => {
  // used to manage your loaders to the scene
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("onstart");
  };
  loadingManager.onLoad = () => {
    console.log("onLoad");
  };
  loadingManager.onProgress = () => {
    console.log("onProgress");
  };
  loadingManager.onError = () => {
    console.log("onError");
  };

  const textureLoader = new THREE.CubeTextureLoader(loadingManager);

  const environmentMapTexture = textureLoader.load([
    "/textures/environmentMaps/0/px.jpg",
    "/textures/environmentMaps/0/nx.jpg",
    "/textures/environmentMaps/0/py.jpg",
    "/textures/environmentMaps/0/ny.jpg",
    "/textures/environmentMaps/0/pz.jpg",
    "/textures/environmentMaps/0/nz.jpg",
  ]);

  return environmentMapTexture;
};

// using THREE loader
const textureLoader = () => {
  // used to manage your loaders to the scene
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("onstart");
  };
  loadingManager.onLoad = () => {
    console.log("onLoad");
  };
  loadingManager.onProgress = () => {
    console.log("onProgress");
  };
  loadingManager.onError = () => {
    console.log("onError");
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);

  const colorTexture = textureLoader.load("/textures/door/color.jpg");
  const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
  const heightTexture = textureLoader.load("/textures/door/height.jpg");
  const normalTexture = textureLoader.load("/textures/door/normal.jpg");
  const ambientOcclusionTexture = textureLoader.load(
    "/textures/door/ambientOcclusion.jpg"
  );
  const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
  const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

  const matcapTexure = textureLoader.load("/textures/matcaps/7.png");
  const gradientTexure = textureLoader.load("/textures/3.jpg");

  gradientTexure.minFilter = THREE.NearestFilter;
  gradientTexure.magFilter = THREE.NearestFilter;
  gradientTexure.generateMipmaps = false;

  return [
    colorTexture,
    alphaTexture,
    matcapTexure,
    gradientTexure,
    ambientOcclusionTexture,
    heightTexture,
    metalnessTexture,
    roughnessTexture,
    normalTexture,
  ];
};

const geometries = () => {
  const [
    colorTexture,
    alphaTexture,
    matcapTexure,
    gradientTexur,
    ambientOcclusionTexturee,
    heightTexture,
    metalnessTexture,
    roughnessTexture,
    normalTexture,
  ] = textureLoader();

  const environmentMapTexture = cubeTextureLoader();
  // const material = new THREE.MeshBasicMaterial({ map: colorTexture });

  // once the material is initiated, the color method become the three.js color class
  // material.color.set("yellow");
  // material.color = new THREE.Color("green");
  // material.transparent = true;
  // material.opacity = 0.5;
  // material.alphaMap = alphaTexture;

  // to add texure on both sides
  // material.side = THREE.DoubleSide;

  // Matcap material will display a color by using the normals as a reference ot pick the righ color
  // on a texure without using the light reflections
  // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexure });
  // material.side = THREE.DoubleSide;

  // this will add colors on the objects that are close to the camera,
  //  and add transperency to the object that are far from the camera
  // const material = new THREE.MeshDepthMaterial();

  // thismaterial will depend on the lighs created on the scene
  // const material = new THREE.MeshLambertMaterial();

  //
  // const material = new THREE.MeshToonMaterial();
  // material.gradientMap = gradientTexure;

  // MeshStandardMaterial uses physically based rendering principles
  // is also supposts lights but with more realistic algorethm and better parameters like
  // roughnedd and metalness
  const material = new THREE.MeshStandardMaterial({
    // map: colorTexture,
    // aoMap: ambientOcclusionTexturee,
    // aoMapIntensity: 1,
    // displacementMap: heightTexture,
    // displacementScale: 0.05,
    // metalnessMap: metalnessTexture,
    // roughnessMap: roughnessTexture,
    // normalMap: normalTexture,
    // alphaMap: alphaTexture,
    // transparent: true,
    // side: THREE.DoubleSide,
    envMap: environmentMapTexture,
  });

  gui.add(material, "metalness", 0, 1, 0.01).name("metalness");
  gui.add(material, "roughness", 0, 1, 0.01).name("roughness");
  gui.add(material, "aoMapIntensity", 0, 10, 0.01).name("aoMapIntensity");
  gui.add(material, "displacementScale", 0, 1, 0.01).name("displacementScale");

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    material
  );
  // setting a new swe of uv mapping on the geometry, in oder to add the amient mapping to the texture
  sphere.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
  );

  // adding more vertices to the plan gemtry for the displacment map to take effect
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
  );
  plane.geometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
  );

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
  );

  return [sphere, plane, torus];
};

const lights = () => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);

  return [ambientLight, pointLight];
};

const spinFunction = () => {
  console.log("spin");
};

const parameters = {
  spin: spinFunction,
};

const materials = () => {
  // Canvas
  const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;

  // Scene
  const scene = new THREE.Scene();

  /**
   * Objects
   */

  const [sphere, plane, torus] = geometries();

  sphere.position.setX(-2);
  torus.position.setX(2);

  scene.add(sphere, plane, torus);
  sphere.rotation.reorder("YXZ");

  // Debug
  gui.add(sphere.position, "y", -3, 3, 0.01).name("elevation");

  gui.add(sphere, "visible");
  gui.add(sphere, "wireframe");
  // gui.addColor(material, "color");

  gui.add(parameters, "spin");

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  window.addEventListener("resize", () => {
    // update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // update renderer
    renderer.setSize(sizes.width, sizes.height);
    // if the window changed to another screen
    // we will still have the same ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * lights
   */

  const [ambientLight, pointLight] = lights();
  pointLight.position.set(2, 3, 4);

  scene.add(ambientLight, pointLight);

  /**
   * Camera
   */
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = 2;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  // controls.enabled = false;
  controls.enableDamping = true;

  // distance method the length between the object and the camera
  // console.log(mesh.position.distanceTo(camera.position));

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
  // to smooth out the pixels in the canvas, will set
  // the renderer to have a pixel ratio between 1 or two
  // to not overload the device with to many pixels
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // fixing time frame with THREE.clock
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

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

export { materials };
