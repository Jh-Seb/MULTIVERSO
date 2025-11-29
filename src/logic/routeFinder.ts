import * as THREE from 'three'
import type { Universo } from '../universe'

export function buscarRuta(
  universos: Universo[],
  origenId: number,
  destinoId: number
): number[] | null {
  const map = new Map<number, Universo>()
  universos.forEach((u) => map.set(u.id, u))

  if (!map.has(origenId) || !map.has(destinoId)) return null

  const queue: number[] = [origenId]
  const visited = new Set<number>([origenId])
  const parent = new Map<number, number | null>()
  parent.set(origenId, null)

  while (queue.length) {
    const current = queue.shift()!
    if (current === destinoId) {
      const path: number[] = []
      let node: number | null = destinoId
      while (node !== null) {
        path.push(node)
        node = parent.get(node) ?? null
      }
      return path.reverse()
    }

    const u = map.get(current)
    if (!u) continue

    for (const neighId of u.connections) {
      if (!visited.has(neighId)) {
        visited.add(neighId)
        parent.set(neighId, current)
        queue.push(neighId)
      }
    }
  }

  return null
}

export function buscarRutaYAnimar(
  world: {
    universos: Map<number, Universo>
    scene: THREE.Scene
    currentId?: number
    lastRoute?: { lines?: THREE.Line[]; path?: number[] }
  },
  origenId: number,
  destinoId: number
): Promise<{ found: boolean; path?: number[] }> {
  const universosArr = Array.from(world.universos.values())
  const path = buscarRuta(universosArr, origenId, destinoId)
  if (!path) return Promise.resolve({ found: false })

  if (world.lastRoute?.lines) {
    for (const ln of world.lastRoute.lines) {
      world.scene.remove(ln)
      ;(ln.geometry as THREE.BufferGeometry).dispose()
      ;(ln.material as THREE.Material).dispose()
    }
  }
  world.lastRoute = undefined

  const puntos = path.map(id =>
    world.universos.get(id)!.position.clone()
  )

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array([
      puntos[0].x, puntos[0].y, puntos[0].z
    ]), 3)
  )

  const baseMat = new THREE.LineBasicMaterial({
    color: 0x0099ff,
    linewidth: 3
  })
  const baseLine = new THREE.Line(geometry.clone(), baseMat)
  world.scene.add(baseLine)

  const glowMat = new THREE.LineBasicMaterial({
    color: 0x55caff,
    linewidth: 6,
    opacity: 0.35,
    transparent: true
  })
  const glowLine = new THREE.Line(geometry.clone(), glowMat)
  world.scene.add(glowLine)

  world.lastRoute = { lines: [baseLine, glowLine], path }

  return new Promise(resolve => {
    let index = 1
    let subframe = 0
    const framesPerSegment = 18

    const originMesh = world.universos.get(origenId)?.mesh
    if (originMesh) (originMesh.material as any).color.setHex(0x00ff00)

    const timer = setInterval(() => {
      if (index < puntos.length) {
        subframe++
        const t = Math.min(1, subframe / framesPerSegment)

        const positions: number[] = []
        for (let i = 0; i < index; i++) {
          positions.push(puntos[i].x, puntos[i].y, puntos[i].z)
        }

        const pA = puntos[index - 1]
        const pB = puntos[index]
        const ix = pA.x + (pB.x - pA.x) * t
        const iy = pA.y + (pB.y - pA.y) * t
        const iz = pA.z + (pB.z - pA.z) * t
        positions.push(ix, iy, iz)

        const arr = new Float32Array(positions)

        for (const ln of [baseLine, glowLine]) {
          ln.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(arr, 3)
          )
          ln.geometry.setDrawRange(0, arr.length / 3)
          ;(ln.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true
        }

        if (t >= 1) {
          const prev = world.universos.get(path[index - 1])?.mesh
          const next = world.universos.get(path[index])?.mesh

          if (prev) (prev.material as any).color.setHex(0xffffff)
          if (next) (next.material as any).color.setHex(0x00ff00)

          index++
          subframe = 0
        }

      } else {
        clearInterval(timer)

        for (const id of path) {
          const u = world.universos.get(id)
          if (!u?.mesh) continue
          const original = u.mesh.scale.clone()

          u.mesh.scale.set(original.x * 1.35, original.y * 1.35, original.z * 1.35)
          setTimeout(() => {
            if (u.mesh) u.mesh.scale.copy(original)
          }, 350)
        }

        const final = world.universos.get(path[path.length - 1])?.mesh
        if (final) (final.material as any).color.setHex(0xff0000)

        if (origenId !== path[path.length - 1]) {
          const o2 = world.universos.get(origenId)?.mesh
          if (o2) (o2.material as any).color.setHex(0xffffff)
        }

        world.currentId = path[path.length - 1]

        resolve({ found: true, path })
      }
    }, 16)
  })
}
