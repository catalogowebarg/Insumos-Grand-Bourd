// ========================================
// GOOGLE SHEETS / SHEETDB
// ========================================
//
// Responsabilidades:
//
// • Obtener datos remotos
// • Validar respuesta
// • Actualizar catálogo local
// • Refrescar interfaz
//
// ========================================

// ========================================
// CARGAR DATOS
// ========================================

async function cargarDatosSheets() {

  if (!CONFIG.catalogo.usarGoogleSheets) {
    return;
  }

  if (window.cargarProductosCatalogo) {
    return window.cargarProductosCatalogo();
  }

  try {

    const respuesta = await fetch(
      `${CONFIG.catalogo.sheetDBUrl || CONFIG.catalogo.sheetDB}?nocache=${Date.now()}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    if (!respuesta.ok) {

      throw new Error(
        `Error ${respuesta.status}`
      );

    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos)) {

      throw new Error(
        "Formato inválido recibido desde SheetDB"
      );

    }

    actualizarProductos(datos);

  }

  catch (error) {

    console.warn(
      "Error cargando Google Sheets, se usará el catálogo local:",
      error
    );

  }

}

// ========================================
// UTILIDADES
// ========================================

function tieneValor(valor) {

  return (
    valor !== undefined &&
    valor !== null &&
    String(valor).trim() !== ""
  );

}

function actualizarTexto(
  producto,
  propiedad,
  valor
) {

  if (!tieneValor(valor)) {
    return;
  }

  producto[propiedad] =
    String(valor).trim();

}

function actualizarNumero(
  producto,
  propiedad,
  valor
) {

  if (!tieneValor(valor)) {
    return;
  }

  const numero = Number(valor);

  if (!Number.isNaN(numero)) {

    producto[propiedad] =
      numero;

  }

}

// ========================================
// ACTUALIZAR CATÁLOGO
// ========================================

function actualizarProductos(
  datosSheets
) {

  if (!Array.isArray(datosSheets)) {
    return;
  }

  if (window.aplicarProductosDesdeFuente) {
    window.aplicarProductosDesdeFuente(datosSheets);
    refrescarCatalogo();
    return;
  }

  // Índice rápido por ID
  const productosPorId =
    new Map(
      PRODUCTOS.map(
        producto => [
          producto.id,
          producto
        ]
      )
    );

  datosSheets.forEach(itemSheet => {

    if (!tieneValor(itemSheet.id)) {
      return;
    }

    const id =
      String(itemSheet.id).trim();

    const producto =
      productosPorId.get(id);

    if (!producto) {

      console.warn(
        `Producto no encontrado: ${id}`
      );

      return;

    }

    // TEXTOS

    actualizarTexto(
      producto,
      "nombre",
      itemSheet.nombre
    );

    actualizarTexto(
      producto,
      "descripcion",
      itemSheet.descripcion
    );

    actualizarTexto(
      producto,
      "categoria",
      itemSheet.categoria
    );

    actualizarTexto(
      producto,
      "imagen",
      itemSheet.imagen
    );

    // NUMÉRICOS

    actualizarNumero(
      producto,
      "precio",
      itemSheet.precio
    );

    actualizarNumero(
      producto,
      "stock",
      itemSheet.stock
    );

  });

  refrescarCatalogo();

}

// ========================================
// STOCK VISUAL
// ========================================

function obtenerClaseStock(
  stock
) {

  if (stock <= 0) {
    return "stock-vacio";
  }

  if (stock <= 5) {
    return "stock-bajo";
  }

  return "stock-ok";

}

// ========================================
// REFRESCAR INTERFAZ
// ========================================

function refrescarCatalogo() {

  renderizarCategorias();

  renderizarProductos();

  renderizarCarrito();

  actualizarContadorCarrito();

}
