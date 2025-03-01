
import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js";
import getLayer from "./libs/getLayer.js";

// add a ? and a value (20, 30, 40, etc...) to the url to change the amount of cubes
// example: http://localhost:3000/noiseGrid-03/?20
const urlAmount = parseInt(window.location.search.slice(1));
const amount = urlAmount || 10;
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(amount * 1.1, amount * 1.1, amount * 1.1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const count = Math.pow(amount, 3);
const dummy = new THREE.Object3D();

const material = new THREE.MeshBasicMaterial();

const size = 0.5;
const geometry = new THREE.BoxGeometry(size, size, size);
const mesh = new THREE.InstancedMesh(geometry, material, count);
mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(mesh);

const offset = (amount - 1) / 2;
const noise = new ImprovedNoise();
const nAmp = 0.1;
const nScale = 3;
const clr = new THREE.Color(0xff0000);

dummy.userData = {
  update: (props) => {
    const { i, x, y, z, time } = props;
    dummy.position.set(offset - x, offset - y, offset - z);
    const nz = noise.noise(time + x * nAmp, time + y * nAmp, time + z * nAmp) * nScale;
    dummy.scale.setScalar(nz);

    clr.setHSL(0.95 + nz * 0.1, 1.0, 0.2 + nz * 0.1);
    mesh.setColorAt(i, clr);
    mesh.instanceColor.needsUpdate = true;

    // dummy.rotation.y = Math.sin(x * 0.25 + time) + Math.sin(y * 0.25 + time) + Math.sin(z * 0.25 + time);
    // dummy.rotation.z = dummy.rotation.y * 2;
  }
}

const sprites = getLayer({
  hue: 0.6,
  numSprites: 8,
  opacity: 0.1,
  radius: 30,
  size: 64,
  z: -20.0,
});
scene.add(sprites);

function animate(t) {
  render(t);
  controls.update();
}

function render(time = 0) {
  time *= 0.0003;
  mesh.rotation.x = Math.sin(time * 0.25);
  mesh.rotation.y = Math.sin(time * 0.2);

  let i = 0;
  for (let x = 0; x < amount; x += 1) {
    for (let y = 0; y < amount; y += 1) {
      for (let z = 0; z < amount; z += 1) {
        dummy.userData.update({ i, x, y, z, time });
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        i += 1;
      }
    }
  }
  renderer.renderAsync(scene, camera);
}

window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}