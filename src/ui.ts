type UIHooks = {
  onAdd: (count: number) => void
  onRemove: (count: number) => void
  onToggleAxes: () => void
  onFindRoute: (destId: number) => Promise<{ found: boolean; path?: number[] }>
  setMessage: (s: string) => void
}

export function initUI(hooks: UIHooks) {
  const btnAdd = document.getElementById('btn-add') as HTMLButtonElement
  const btnRemove = document.getElementById('btn-remove') as HTMLButtonElement
  const addCount = document.getElementById('add-count') as HTMLInputElement
  const removeCount = document.getElementById('remove-count') as HTMLInputElement
  const btnToggleAxes = document.getElementById('btn-toggle-axes') as HTMLButtonElement

  const inputDest = document.getElementById('input-dest') as HTMLInputElement
  const btnFind = document.getElementById('btn-find-route') as HTMLButtonElement

  btnAdd.onclick = () => {
    const n = Math.max(1, Number(addCount.value) || 1)
    hooks.onAdd(n)
    hooks.setMessage(`Se agregaron ${n} universos.`)
  }
  btnRemove.onclick = () => {
    const n = Math.max(1, Number(removeCount.value) || 1)
    hooks.onRemove(n)
    hooks.setMessage(`Se eliminan ${n} universos (si existen).`)
  }
  btnToggleAxes.onclick = () => {
    hooks.onToggleAxes()
  }

  btnFind.onclick = async () => {
    const b = Number(inputDest.value)
    if (!b) {
      hooks.setMessage('Ingresa destino válido')
      return
    }

    hooks.setMessage('Buscando ruta...')
    const res = await hooks.onFindRoute(b)
    if (res.found) {
      hooks.setMessage(`Ruta encontrada: ${res.path!.join(' → ')}`)
    } else {
      hooks.setMessage('No existe ruta')
    }
  }
}
