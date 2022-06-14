import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

/**
 * * Utils
 */
const setUv2 = (mesh) => {
    mesh.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh.geometry.attributes.uv.array, 2))
}

/**
 * * Debug
 */

const gui = new lil.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * *Textures
 */

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textures = {
    door: {
        color: textureLoader.load('/textures/door/color.jpg'),
        alpha: textureLoader.load('/textures/door/alpha.jpg'),
        ao: textureLoader.load('/textures/door/ambientOcclusion.jpg'),
        height: textureLoader.load('/textures/door/height.jpg'),
        metallness: textureLoader.load('/textures/door/metalness.jpg'),
        roughness: textureLoader.load('/textures/door/roughness.jpg'),
        normal: textureLoader.load('/textures/door/normal.jpg'),
    },
    environmentMaps: cubeTextureLoader.load([
        '/textures/environmentMaps/2/px.jpg',
        '/textures/environmentMaps/2/nx.jpg',
        '/textures/environmentMaps/2/py.jpg',
        '/textures/environmentMaps/2/ny.jpg',
        '/textures/environmentMaps/2/pz.jpg',
        '/textures/environmentMaps/2/nz.jpg',
    ]),
    gradients: textureLoader.load('/textures/gradients/3.jpg'),
    matcaps: textureLoader.load('/textures/matcaps/1.png')
}

/**
 * * Objects
 */
// const material = new THREE.MeshBasicMaterial()
// material.map = textures.door.color
// // material.color = new THREE.Color(0xff6634)
// // material.wireframe = true
// material.transparent = true
// // material.opacity = 0.5
// material.alphaMap = textures.door.alpha
// material.side = THREE.DoubleSide

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = textures.matcaps

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x663399)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = textures.gradients
// textures.gradients.minFilter = THREE.NearestFilter
// textures.gradients.magFilter = THREE.NearestFilter
// textures.gradients.generateMipmaps = false

const material = new THREE.MeshStandardMaterial()
// material.metalness = 0 //default
// material.roughness = 1 //default
// material.map = textures.door.color
// material.aoMap = textures.door.ao
// material.aoMapIntensity = 1
// material.displacementMap = textures.door.height
// material.displacementScale = 0.1
// material.metalnessMap = textures.door.metallness
// material.roughnessMap = textures.door.roughness
// material.normalMap = textures.door.normal
// material.normalScale.set(.5, .5)
// material.alphaMap = textures.door.alpha
// material.transparent = true

material.metalness = .7
material.roughness = .2
material.envMap = textures.environmentMaps

// ? Debug-texture
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.001)
gui.add(material.normalScale, 'x').min(0).max(1).step(0.001)
gui.add(material.normalScale, 'y').min(0).max(1).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.8, 16, 16),
    material
)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.4, 100, 100),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(.6, .2, 32, 32),
    material
)
setUv2(sphere)
setUv2(plane)
setUv2(torus)

sphere.position.set(-1.8, 0, 0)
torus.position.set(1.8, 0, 0)
scene.add(plane)


/**
 * * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(2, 3, 4)
scene.add(ambientLight, pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    const rotation = 0.1 * elapsedTime

    sphere.rotation.set(rotation, rotation, 0)
    // plane.rotation.set(rotation, rotation, 0)
    torus.rotation.set(rotation, rotation, 0)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()