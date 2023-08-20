import { WebGLRenderer } from "three";

type RendererServices = {
  newRenderer: () => WebGLRenderer;
};

const createRenderer = (renderer: WebGLRenderer): WebGLRenderer => {
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

const rendererServices = (canvas: HTMLCanvasElement): RendererServices => {
  const renderer = new WebGLRenderer({
    canvas: canvas,
  });

  return {
    newRenderer: () => createRenderer(renderer),
  };
};

export { rendererServices };
