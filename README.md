# 🌌 Multiverso Toroidal — Simulador Interactivo 3D

Simulación 3D de un **multiverso toroidal** donde cada universo es un nodo en un espacio tridimensional, con reglas estrictas de conectividad, unidireccionalidad y exploración.  
Renderizado con **Three.js**, animado con efectos neon y organizado con una arquitectura modular diseñada para estructuras de datos avanzadas.

---

## REGLAS

Estas reglas son **inmutables y obligatorias**, aplicadas desde la capa lógica:

1️. Se puede viajar entre universos, pero solo siguiendo conexiones existentes.  
2️. Cada universo puede conectarse máximo con 6 universos.  
3️. Las conexiones son unidireccionales. 
&nbsp;&nbsp;&nbsp;&nbsp;Si viajas de A → B, no puedes devolver A ← B por esa misma conexión.  
4️. El multiverso debe tener mínimo 36 universos.
&nbsp;&nbsp;&nbsp;&nbsp;No se permite borrar por debajo de ese límite.  
5️. Cada universo debe tener al menos 1 salida obligatoria.  
&nbsp;&nbsp;&nbsp;&nbsp;Nunca quedan nodos aislados.  
6️. Rutas pasadas se eliminan para dejar visible solo la última ruta generada.
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
