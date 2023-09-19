import { WebGLRenderer } from "three";

type RendererServices = {
  setRenderer: (renderer: WebGLRenderer) => WebGLRenderer;
};

const setRenderer = (renderer: WebGLRenderer): WebGLRenderer => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  renderer.setSize(sizes.width, sizes.height);
  // to smooth out the pixels in the canvas, will set
  // the renderer to have a pixel ratio between 1 or two
  // to not overload the device with to many pixels
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
};

const rendererServices = (): RendererServices => {
  return {
    setRenderer,
  };
};

export { rendererServices };
