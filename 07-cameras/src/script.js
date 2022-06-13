import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// * Custom Controls
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
    if (event.clientX > sizes.width) return
    if (event.clientY > sizes.height) return

    cursor.x = event.clientX / sizes.width - .5
    cursor.y = event.clientY / sizes.height - .5
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 400
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff6347 })
)
scene.add(mesh)

// Camera
/**
 * const viewConfig = {
    left: -1 * aspectRatio,
    right: 1 * aspectRatio,
    top: 1,
    bottom: -1,
    near: 0.1,
    far: 100
}
const getValues= (obj) => Object.values(obj)
const camera = new THREE.OrthographicCamera(...getValues(viewConfig))
const aspectRatio = sizes.width / sizes.height
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)
scene.add(camera)

// * Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.x = -1
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // * Update camera
    // camera.position.x = Math.sin(-(cursor.x * Math.PI * 2)) * 3
    // camera.position.y = cursor.y * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.lookAt(mesh.position)

    // * Update controls (for dumping)
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()