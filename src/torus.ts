import * as THREE from 'three'

/**
 * Parametrización del toro:
 * u, v en [0, 2PI)
 * R = radio mayor (desde el centro del donut a centro tubular)
 * r = radio tubular
 */
export function torusPosition(u: number, v: number, R = 6, r = 2): THREE.Vector3 {
  const x = (R + r * Math.cos(v)) * Math.cos(u)
  const y = (R + r * Math.cos(v)) * Math.sin(u)
  const z = r * Math.sin(v)
  return new THREE.Vector3(x, y, z)
}

export function randomUV(): { u: number; v: number } {
  return { u: Math.random() * Math.PI * 2, v: Math.random() * Math.PI * 2 }
}

/**
 * Devuelve la distancia 3D mínima entre (u1,v1) y (u2,v2) teniendo en cuenta
 * el wrap (±2PI) en ambas coordenadas. Estrategia: probar desplazamientos
 * de -2π, 0, +2π en u y v para encontrar la mínima distancia euclidiana.
 */
export function minTorusDistance3D(
  u1: number,
  v1: number,
  u2: number,
  v2: number,
  R = 6,
  r = 2
): number {
  const shifts = [-Math.PI * 2, 0, Math.PI * 2]
  const p1 = torusPosition(u1, v1, R, r)
  let minDist = Infinity

  for (const su of shifts) {
    for (const sv of shifts) {
      const p2 = torusPosition(u2 + su, v2 + sv, R, r)
      const d = p1.distanceTo(p2)
      if (d < minDist) minDist = d
    }
  }

  return minDist
}


export function torusUVDistance(
  a: { u: number; v: number },
  b: { u: number; v: number },
  R = 6,
  r = 2
): number {
  return minTorusDistance3D(a.u, a.v, b.u, b.v, R, r)
}
