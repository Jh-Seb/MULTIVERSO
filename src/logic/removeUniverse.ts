import type * as THREE from 'three'
import type { Universo } from '../universe'

export function removeUniverses(
  world: {
    universos: Map<number, Universo>
    scene?: THREE.Scene
    lastRoute?: { line?: THREE.Line; path?: number[] }
  },
  count: number
): void {
  if (!world || !world.universos) return

  const total = world.universos.size

  if (total <= 36) {
    const panel = document.getElementById("message")
    if (panel) {
      panel.textContent = "❌ Error: no pueden haber menos de 36 universos existentes."
    }
    return
  }

  if (total - count < 36) {
    const panel = document.getElementById("message")
    if (panel) {
      panel.textContent =
        `❌ Error: la eliminación dejaría menos de 36 universos (mínimo requerido).`
    }
    return
  }

  if (world.lastRoute && world.lastRoute.line) {
    try {
      if (world.scene && world.lastRoute.line) {
        world.scene.remove(world.lastRoute.line)
      }

      const g = (world.lastRoute.line.geometry as THREE.BufferGeometry) || null
      const m = (world.lastRoute.line.material as THREE.Material) || null
      if (g) g.dispose()
      if (m) m.dispose()
    } catch (e) {}
    world.lastRoute = undefined
  }

  const ids: number[] = Array.from(world.universos.keys())
    .sort((a: number, b: number) => b - a) // mayores primero
    .slice(0, count)

  for (const id of ids) {
    const u = world.universos.get(id)
    if (!u) continue

    if (u.mesh && u.mesh.parent) {
      u.mesh.parent.remove(u.mesh)
    }

    for (const other of world.universos.values()) {
      other.connections = other.connections.filter((cid: number) => cid !== id)
    }

    world.universos.delete(id)
  }

  const panel = document.getElementById("message")
  if (panel) {
    panel.textContent = `🗑️ Se eliminaron ${ids.length} universos.`
  }
}
