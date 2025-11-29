import { getWorld } from './scene'
import * as THREE from 'three'

export function facePortalsToCamera() {
  const world = getWorld()
  const camPos = world.camera.position
  for (const u of world.universos.values()) {
    if (!u.mesh) continue
    const toCam = new THREE.Vector3().copy(camPos).sub(u.mesh.position).normalize()
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1), toCam)
    u.mesh.quaternion.copy(q)
  }
}
