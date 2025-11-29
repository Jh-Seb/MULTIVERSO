import './styles.css'
import { initScene, startScene, getWorld } from './scene'
import { initUI } from './ui'
import { addUniverses } from './logic/addUniverse'
import { removeUniverses } from './logic/removeUniverse'
import { buscarRutaYAnimar } from './logic/routeFinder'

const container = document.getElementById('canvas-container') as HTMLDivElement
const { scene, camera, renderer, texturePortal } = initScene(container)

const world = getWorld()
addUniverses(world, 36, texturePortal)

if (world.universos.has(1)) {
  world.currentId = 1
  const u1 = world.universos.get(1)
  if (u1 && u1.mesh) {
    ;(u1.mesh.material as any).color.setHex(0x00ff00)
  }
}

initUI({
  onAdd: (count) => {
    addUniverses(world, count, texturePortal)
  },
  onRemove: (count) => {
    removeUniverses(world, count)
  },
  onToggleAxes: () => {
    world.toggleAxes()
  },
  onFindRoute: async (destId) => {
    const originId = world.currentId ?? 1
    const res = await buscarRutaYAnimar(world, originId, destId)
    return res
  },
  setMessage: (s) => {
    const msg = document.getElementById('message')!
    msg.textContent = s
  }
})

startScene()
