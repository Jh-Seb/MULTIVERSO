import * as THREE from 'three'
import { torusPosition } from './torus'

export interface Universo {
  id: number
  u: number
  v: number
  position: THREE.Vector3
  connections: number[]
  mesh?: THREE.Mesh
}

export function createUniverseMesh(id: number): THREE.Mesh {
  const size = 0.45
  const geom = new THREE.PlaneGeometry(size, size)

  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#000000'
  ctx.font = 'bold 120px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(String(id), canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true

  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: false,
    color: new THREE.Color(0xffffff)
  })

  const mesh = new THREE.Mesh(geom, mat)
  mesh.renderOrder = 2

  return mesh
}

export function makeUniverso(
  id: number,
  u: number,
  v: number,
  _texture?: THREE.Texture 
): Universo {
  const pos = torusPosition(u, v)

  const mesh = createUniverseMesh(id)
  mesh.position.copy(pos)

  return {
    id,
    u,
    v,
    position: pos,
    connections: [],
    mesh
  }
}
