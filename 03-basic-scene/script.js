const $canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'tomato' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const SIZES = {
  width: 800,
  height: 600
}

const camera = new THREE.PerspectiveCamera(75, SIZES.width / SIZES.height);
camera.position.z = 3;
camera.position.y = 0;
camera.position.x = 0;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: $canvas,
});

renderer.setSize(SIZES.width, SIZES.height);
renderer.render(scene, camera);