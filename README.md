# 🌌 Multiverso Toroidal — Simulador Interactivo 3D

Simulación 3D de un **multiverso toroidal** donde cada universo es un nodo en un espacio tridimensional, con reglas estrictas de conectividad, unidireccionalidad y exploración.  
Renderizado con **Three.js**, animado con efectos neon y organizado con una arquitectura modular diseñada para estructuras de datos avanzadas.

---

## 📌 Demo  
(Coloca aquí el enlace cuando lo subamos con GitHub Pages)

👉 **[Ver Demo](https://TU_USUARIO.github.io/TU_REPO/)**

---

## 🏛️ Arquitectura del Proyecto

El proyecto está organizado en módulos que dividen responsabilidad entre lógica, renderizado, geometría y reglas del multiverso.

### 📂 **Estructura general**

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