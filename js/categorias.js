// ========================================
// CONFIGURACIÓN DE CATEGORÍAS
// ========================================
//
// Iconos mostrados en cada categoría.
//
// Si una categoría no existe aquí,
// se mostrará el icono por defecto 🌷.
//
// ========================================

const ICONOS_CATEGORIAS = {

  "Harinas": "🌾",

  "Dulce de Leche": "🥛",

  "Chocolates": "🍫",

  "Coberturas": "🍩",

  "Colorantes": "🎨",

  "Esencias": "🧁",

  "Decoración": "✨",

  "Moldes": "🍰",

  "Descartables": "📦",

  "Promociones": "🏷️",

  "Pastas": "🍰",

  "Cremas": "🍦",

  "Pastas Saborizantes": "🍰",

  "Esencias y Aromas": "🧁",

  "Premezclas": "🥣",

  "Cremas Vegetales": "🍦",

  "Grasas y Mantecas": "🧈",

  "Decoraciones": "✨",

  "Pirotines": "🎀"

};

// ========================================
// ESTADO GLOBAL
// ========================================

let categoriaActual = "";

// ========================================
// UTILIDADES
// ========================================

function normalizarCategoria(categoria) {

  if (!categoria) {

    return "";

  }

  return categoria.trim();

}

// ========================================
// OBTENER CATEGORÍAS ÚNICAS
// ========================================

function obtenerCategorias() {

  return [

    ...new Set(

      PRODUCTOS

        .map(producto =>
          normalizarCategoria(
            producto.categoria
          )
        )

        .filter(Boolean)

    )

  ];

}

// ========================================
// CAMBIAR CATEGORÍA ACTIVA
// ========================================

function cambiarCategoria(categoria) {

  categoriaActual = categoria;

  actualizarEstadoCategorias();

  renderizarProductos();

}

// ========================================
// ACTUALIZAR ESTADO VISUAL
// ========================================

function actualizarEstadoCategorias() {

  const botones =
    document.querySelectorAll(
      "#categorias button"
    );

  botones.forEach(button => {

    button.classList.toggle(

      "categoria-activa",

      button.dataset.categoria ===
      categoriaActual

    );

  });

}

// ========================================
// CREAR BOTÓN DE CATEGORÍA
// ========================================

function crearBotonCategoria(categoria) {

  const button =
    document.createElement(
      "button"
    );

  button.dataset.categoria =
    categoria;

  button.innerHTML = `

    <span class="icono-categoria">

      ${
        ICONOS_CATEGORIAS[categoria]
        || "🌷"
      }

    </span>

    <span>
      ${categoria}
    </span>

  `;

  if (
    categoria === categoriaActual
  ) {

    button.classList.add(
      "categoria-activa"
    );

  }

  button.addEventListener(
    "click",
    () => cambiarCategoria(categoria)
  );

  return button;

}

// ========================================
// RENDERIZAR CATEGORÍAS
// ========================================

function renderizarCategorias() {

  const contenedor =
    document.getElementById(
      "categorias"
    );

  if (!contenedor) return;

  contenedor.innerHTML = "";

  const categorias =
    obtenerCategorias();

  // ========================================
  // CATEGORÍA INICIAL
  // ========================================

  if (

    !categoriaActual &&
    categorias.length > 0

  ) {

    categoriaActual =
      categorias[0];

  }

  // ========================================
  // CREAR BOTONES
  // ========================================

  categorias.forEach(categoria => {

    contenedor.appendChild(

      crearBotonCategoria(
        categoria
      )

    );

  });

}