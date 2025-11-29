
import type { Universo } from '../universe'


export function conectarUniversos(
  universos: Universo[],
  idA: number,
  idB: number
): boolean {
  const A = universos.find((u) => u.id === idA)
  const B = universos.find((u) => u.id === idB)

  if (!A || !B) return false

  if (A.connections.length >= 6) return false

  if (!A.connections.includes(idB)) {
    A.connections.push(idB)
    return true
  }

  return false
}

export function desconectarUniversos(
  universos: Universo[],
  idA: number,
  idB: number
): boolean {
  const A = universos.find((u) => u.id === idA)
  if (!A) return false
  const idx = A.connections.indexOf(idB)
  if (idx === -1) return false
  A.connections.splice(idx, 1)
  return true
}
