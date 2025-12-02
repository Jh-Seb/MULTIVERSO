---
# Multiverso Toroidal

Simulación 3D de un **multiverso toroidal**, donde cada universo es representado como un nodo en un espacio tridimensional y se rige por un conjunto de reglas definidas para su correcto funcionamiento. El sistema implementa estructuras de datos personalizadas para gestionar la representación, las conexiones y el comportamiento de los universos.
Proyecto desarrollado para la clase de Estructuras de Datos.

---

## REGLAS

Estas reglas son **inmutables y obligatorias**, aplicadas desde la capa lógica:

1.  Se puede viajar entre universos, pero solo siguiendo conexiones existente.
2.  Cada universo puede conectarse máximo con 6 universos.
3.  Las conexiones son unidireccionales. Si viajas de A → B, no puedes devolver A ← B por esa misma conexión.
4.  El multiverso debe tener mínimo 36 universos. No se permite borrar por debajo de ese límite.
5.  Cada universo debe tener al menos 1 salida obligatoria.  Nunca quedan nodos aislados.
6.  Rutas pasadas se eliminan para dejar visible solo la última ruta generada.

---

## SIMULACION  

 **[Ver Simulacion](https://Jh-Seb.github.io/MULTIVERSO/)**

---

## ARQUITECTURA DEL PROYECTO

El proyecto está organizado en módulos que dividen responsabilidad entre lógica, renderizado, geometría y reglas del multiverso.

### **Estructura general**

```
MULTIVERSO/
│
├src/
│├── logic/
││     ├── addUniverse.ts
││     ├── connectUniverses.ts
││     ├── removeUniverse.ts
││     └── routeFinder.ts
││ 
│├── types/
││    └── index.d.ts
│├── torus.ts
│├── controls.ts
│├── scene.ts
│├── universe.ts
│├── main.ts
│├── styles.css
│└── ui.ts
│
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```
---
## CARACTERISTICAS DEL MULTIVERSO

### **1. Representacion 3D de una Figura Toroidal (T²):**
Los universos están distribuidos en la superficie de un toro parametrizado:
- x = (R + r cos v) cos u
- y = (R + r cos v) sin u
- z = r sin v
### **2. Conexiones unidireccionales con reglas estrictas:**
- Nunca se crea la conexión inversa.
- Siempre se respetan las 6 salidas máximas.
- Eliminación de universos limpia todas las entradas relacionadas.

### **3. Rutado inteligente (BFS):**
-El algoritmo analiza camino mínimo en número de saltos.

---

## ESTRUCTURAS DE DATOS
### **Map<number, Universo>**

- Soporta acceso constante O(1)

- Almacena todos los universos por id

### **Arreglo de adyacencias implícito**

 Cada universo contiene:

- connections: number[]


Cumpliendo:

- Máximo 6 salidas

- Nunca conexiones inversas automáticas

### **BFS (Breadth-First Search)**

Utilizado para encontrar la ruta más corta válida:

- O(V + E) ≈ 36 + (36 * 6)

### **Sistema modular orientado a componentes**

Cada archivo resuelve un problema específico (SRP).

---

## MATEMÁTICA DETRAS DEL PROYECTO
### **1. Distribución de universos en un toro**

Los universos se colocan siguiendo un mapa (u, v) uniforme sobre:

- T² = S¹ × S¹


Usando radios:

- R = radio mayor (centro del toro)
- r = radio menor (grosor del tubo)

### **2. Movimientos interpolados**

Durante el trazado de rutas:

- P(t) = A + (B − A) * t


donde
- t ∈ [0,1] y A,B son vectores 3D.

### **3. Coloración y energía**

Cada nodo cambia color dinámicamente mediante manipulación de materiales Three.js.

---

## LENGUAJES Y TECNOLOGÍAS

- TypeScript

- Three.js

- Vite

- HTML5 / Canvas

- CSS3 (Glassmorphism + Neon)

---



---
