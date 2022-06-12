import './style.css'
import * as THREE from 'three'

//* Helper
const generateBasicCube = ({ color, position }) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(...position)
    return cube
}
const axesHelper = new THREE.AxesHelper(1)

/** ---------------- */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
//* Group
const group = new THREE.Group()
scene.add(group, axesHelper)

const cube1 = generateBasicCube({ color: 0xff6347, position: [-1.5, 0, 0] })
const cube2 = generateBasicCube({ color: 0x2e8b57, position: [0, 0, 0] })
const cube3 = generateBasicCube({ color: 0x4169e1, position: [1.5, 0, 0] })
group.add(cube1, cube2, cube3)

group.position.set(0, -.2, -.6)
group.scale.set(.5, .5, .5)
/**
 * ! Can generate bugs, because, while you rotate the x axis, you also change the other axes' orientation.
 * ! We can reorder the axes using the method '.reorder', but normally the engines work with another solution called Quaternion, which will not be seen in this chapter
 */
group.rotation.set(.6, .4, 0)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
camera.position.set(0, 0, 3)
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)