import * as THREE from "three";

type ThreeScene = {
  readonly scene: THREE.Scene;
};

type SceneServices = {};

// function createScene():ThreeScene{
//   return {
//     scene:
//   }
// }

// function Products(name: string, price: number) {
//   this.name = name;
//   this.price = price;
// }

// Product.prototype.getName = function () {
//   return this.name;
// };

class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }
}

const espresso = new Product("Espresso", 399);
