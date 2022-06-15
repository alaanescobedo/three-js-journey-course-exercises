import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

/**
 * * Helper
 */
const axesHelper = new THREE.AxesHelper(1)

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const textures = {
    matcap: textureLoader.load('/textures/matcaps/8.png'),
}

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const loadFont = async ({ fontPath, text, config = {}, helper }) => {
    const font = await fontLoader.loadAsync(fontPath)
    const textGeometry = new TextGeometry(text, { font, ...config })
    const materia = new THREE.MeshMatcapMaterial({ matcap: textures.matcap })
    const textMesh = new THREE.Mesh(textGeometry, materia)
    scene.add(
        textMesh,
        helper ? axesHelper : null
    )

    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     - (textGeometry.boundingBox.max.x - config.bevelSize) * .5,
    //     - (textGeometry.boundingBox.max.y - config.bevelSize) * .5,
    //     - (textGeometry.boundingBox.max.z - config.bevelThickness) * .5
    // )
    textGeometry.center()
    console.log(textGeometry.boundingBox)

    const donutGeometry = new THREE.TorusGeometry(.3, .2, 20, 45)

    for (let index = 1; index <= 100; index++) {
        const donut = new THREE.Mesh(donutGeometry, materia)

        donut.position.x = (Math.random() - .5) * 10
        donut.position.y = (Math.random() - .5) * 10
        donut.position.z = (Math.random() - .5) * 10

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        donut.scale.set(scale, scale, scale)

        scene.add(donut)
    }

    gui.add(textMateria, 'wireframe')
    gui.addColor(textMateria, 'color')
}
loadFont({
    fontPath: '/fonts/helvetiker_regular.typeface.json',
    text: 'Hello Three.js!',
    config: {
        size: 0.5,
        height: 0.2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    }
})

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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()