import * as THREE from 'three'
import type { Universo } from '../universe'
import { makeUniverso } from '../universe'
import { randomUV, torusUVDistance } from '../torus'
import { conectarUniversos } from './connectUniverses'
import { registerUniverse } from '../scene'


export function addUniverses(
  world: {
    nextId: number
    universos: Map<number, Universo>
    scene: THREE.Scene
  },
  count: number,
  texture: THREE.Texture
): void {
  for (let i = 0; i < count; i++) {
    const { u, v } = randomUV()
    const id = world.nextId++
    const uni: Universo = makeUniverso(id, u, v, texture)

    world.universos.set(id, uni)
    registerUniverse(uni)
  }

  const list: Universo[] = Array.from(world.universos.values())

  const NEIGHBORS = 4

  for (const u of list) {
    const vecinos = list
      .filter((x) => x.id !== u.id)
      .sort((a, b) => torusUVDistance(u, a) - torusUVDistance(u, b))
      .slice(0, NEIGHBORS)

    for (const v of vecinos) {
      conectarUniversos(list, u.id, v.id)
    }
  }

  for (const u of list) {
    if (u.connections.length === 0) {
      const posibles = list.filter((x) => x.id !== u.id)
      if (posibles.length === 0) continue
      posibles.sort((a, b) => torusUVDistance(u, a) - torusUVDistance(u, b))
      conectarUniversos(list, u.id, posibles[0].id)
    }
  }
}
