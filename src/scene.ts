import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Universo } from './universe'

type World = {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  universos: Map<number, Universo>
  nextId: number
  axesHelper?: THREE.AxesHelper
  texturePortal: THREE.Texture
  toggleAxes: () => void
  currentId?: number
}

let world: World | null = null
let animationId: number | null = null

export function getWorld(): World {
  if (!world) throw new Error('World not initialized')
  return world
}

export function initScene(container: HTMLElement) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 2000)
  camera.position.set(12, 8, 12)

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  ;(renderer as any).debug.checkShaderErrors = true

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.08
  controls.minDistance = 5
  controls.maxDistance = 60

  const amb = new THREE.AmbientLight(0xffffff, 0.35)
  const p1 = new THREE.PointLight(0x88ccff, 1.0)
  p1.position.set(10, 15, 10)
  scene.add(amb, p1)

  const torusGeom = new THREE.TorusGeometry(6, 2, 64, 200)
  const torusMat = new THREE.MeshBasicMaterial({
    color: 0x111111,
    wireframe: true,
    transparent: true,
    opacity: 0.02
  })
  const torusMesh = new THREE.Mesh(torusGeom, torusMat)
  torusMesh.visible = false
  scene.add(torusMesh)

  const loader = new THREE.TextureLoader()
  const texturePortal = loader.load('/assets/textures/portal_base.png', () => {
    texturePortal.colorSpace = THREE.SRGBColorSpace
    texturePortal.needsUpdate = true
    console.log('🔥 TEXTURA CARGADA:', texturePortal)
  })

  world = {
    scene,
    camera,
    renderer,
    controls,
    universos: new Map(),
    nextId: 1,
    texturePortal,
    toggleAxes: () => {
      if (!world) return
      if (world.axesHelper) {
        world.scene.remove(world.axesHelper)
        world.axesHelper = undefined
      } else {
        const a = new THREE.AxesHelper(8)
        world.axesHelper = a
        world.scene.add(a)
      }
    },
    currentId: undefined
  }

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.clientWidth, container.clientHeight)
  })

  return { scene, camera, renderer, texturePortal }
}

export function startScene() {
  if (!world) throw new Error('World not initialized')

  function animate() {
    animationId = requestAnimationFrame(animate)

    const w = getWorld()
    const camPos = w.camera.position

    for (const u of w.universos.values()) {
      if (!u.mesh) continue
      u.mesh.lookAt(camPos)
      u.mesh.position.copy(u.position)
    }

    w.controls.update()
    w.renderer.render(w.scene, w.camera)
  }

  animate()
}

export function registerUniverse(u: Universo) {
  const w = getWorld()
  w.universos.set(u.id, u)
  if (u.mesh) w.scene.add(u.mesh)
}
