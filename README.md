# Meta Cube with Three.js & WebGPU

A real-time 3D graphics tutorial video on YouTube, demoing how to create an interactive 3D scene using THREE.js with WebGPU, featuring instanced meshes, dynamic noise-based transformations, and more.

![image](./meta-cube.png)

## Features
- **Instanced Mesh**: Renders a grid of cubes using `THREE.InstancedMesh` for efficient rendering.
- **Dynamic Transformations**: Applies noise functions to scale each cube dynamically and adjusts their colors based on noise.
- **WebGPU Rendering**: Uses the `WebGPURenderer` for high-performance rendering.
- **Sprites Layer**: Adds a background layer of sprites using a custom helper module (`libs/getLayer.js`).
- **Responsive**: Automatically adjusts the renderer and camera aspect ratio on window resize.

## Installation
Ensure you have a local development server (such as `live-server` or `http-server`) to serve your files.

```sh
# Clone the repository
git clone https://github.com/bobbyroe/meta-cube.git
cd meta-cube
```

## Dependencies
- [Three.js](https://threejs.org/) (WebGPU Renderer, Orbit Controls)
- Node.js (optional, for serving files locally)

## Development
Modify `main.js` to experiment with different Three.js objects, materials, or effects.

## License
This project is licensed under the MIT License. Feel free to modify and distribute.