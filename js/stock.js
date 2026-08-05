// ========================================
// SINCRONIZACION DE STOCK CON SHEETDB
// ========================================
//
// Cada fila de la hoja representa un producto o una variante.
// Columnas requeridas: id, variante, stock.
// Para productos sin variantes, dejá "variante" vacía.
//

function valorDeFila(fila, nombres) {
  const clave = Object.keys(fila).find(claveFila =>
    nombres.includes(String(claveFila).trim().toLowerCase())
  );

  return clave === undefined ? undefined : fila[clave];
}

function textoNormalizado(valor) {
  return String(valor ?? "").trim().toLocaleLowerCase();
}

function tieneValor(valor) {
  return valor !== undefined && valor !== null && String(valor).trim() !== "";
}

function numeroStock(valor) {
  if (!tieneValor(valor)) return null;

  const numero = Number(String(valor).trim().replace(",", "."));
  return Number.isFinite(numero) ? Math.max(0, numero) : null;
}

function actualizarDatosDeFila(item, fila) {
  const stock = numeroStock(valorDeFila(fila, ["stock"]));
  const precio = numeroStock(valorDeFila(fila, ["precio"]));
  const descripcion = valorDeFila(fila, ["descripcion", "description", "descripcicon"]);

  if (stock !== null) item.stock = stock;
  if (precio !== null) item.precio = precio;
  if (tieneValor(descripcion)) item.descripcion = String(descripcion).trim();
}

// IDs de la hoja actual: cada fila corresponde a una presentaciÃ³n, aunque
// el sitio las muestre agrupadas en una misma tarjeta.
const VARIANTES_SHEET = {
  "richs-bettercreme-907-g": ["richs-bettercreme-chantilly", "907g"],
  "richs-bettercreme-453-g": ["richs-bettercreme-chantilly", "453g"],
  "ledevit-vainilla": ["ledevit-chantilly", "Vainilla (1kg)"],
  "ledevit-chocolate": ["ledevit-chantilly", "Chocolate (1kg)"],
  "ledevit-frutilla": ["ledevit-chantilly", "Frutilla (500g)"],
  "vacanil-1-kg": ["vacanil-repostero", "1kg"],
  "vacanil-4-kg": ["vacanil-repostero", "4kg"],
  "vacanil-10-kg": ["vacanil-repostero", "10kg"],
  "el-serranito-1-kg": ["el-serranito-1-kg", "1kg"],
  "el-serranito-10-kg": ["el-serranito-1-kg", "10kg"],
  "pasta-frutilla": ["pasta-frutilla", "Frutilla"],
  "pasta-frutos-del-bosque": ["pasta-frutilla", "Fruto del Bosque"],
  "pasta-nutechoc": ["pasta-frutilla", "Nutechoc"],
  "pasta-pistacho": ["pasta-frutilla", "Pistacho"],
  "pasta-avellana": ["pasta-frutilla", "Avellana"],
  "manteca-inty": ["manteca-inty", "500g"],
  "pirotines-verdes": ["pirotines-x20", "Verdes"],
  "pirotines-rojos": ["pirotines-x20", "Rojos"],
  "pirotines-lilas": ["pirotines-x20", "Lilas"],
  "pirotines-amarillos": ["pirotines-x20", "Amarillos"],
  "pirotines-celestes": ["pirotines-x20", "Celestes"],
  "pirotines-rosas": ["pirotines-x20", "Rosas"],
  "pirotines-violetas": ["pirotines-x20", "Violetas"],
  "esencia-de-vainilla-feibor": ["esencia-de-vainilla-feibor", "vainilla"],
  "micro-cereal-negro": ["cereales-y-semillas", "Micro galletitas negras"],
  "micro-cereal-blanco": ["cereales-y-semillas", "Micro galletitas blancas"]
};

function obtenerVariantePorIdSheet(id) {
  const referencia = VARIANTES_SHEET[textoNormalizado(id)];
  if (!referencia) return null;

  const producto = PRODUCTOS.find(item => item.id === referencia[0]);
  return producto?.variantes?.find(item => item.nombre === referencia[1]) || null;
}

function aplicarFilaDeStock(fila) {
  const id = valorDeFila(fila, ["id", "producto_id", "id_producto"]);
  const nombreVariante = valorDeFila(fila, ["variante", "nombre_variante", "opcion"]);

  if (!tieneValor(id)) return;

  const variantePorId = obtenerVariantePorIdSheet(id);
  if (variantePorId) {
    actualizarDatosDeFila(variantePorId, fila);
    return;
  }

  const producto = PRODUCTOS.find(item => textoNormalizado(item.id) === textoNormalizado(id));
  if (!producto) {
    console.warn(`SheetDB: no existe el producto con id "${id}".`);
    return;
  }

  // Una variante se identifica por el ID del producto + su nombre. Nunca se
  // modifica el stock de las demás variantes del mismo producto.
  if (tieneValor(nombreVariante)) {
    const variante = (producto.variantes || []).find(item =>
      textoNormalizado(item.nombre) === textoNormalizado(nombreVariante)
    );

    if (!variante) {
      console.warn(`SheetDB: no existe la variante "${nombreVariante}" de "${id}".`);
      return;
    }

    actualizarDatosDeFila(variante, fila);
    return;
  }

  actualizarDatosDeFila(producto, fila);
}

function actualizarProductos(datosSheets) {
  if (!Array.isArray(datosSheets)) {
    throw new Error("La respuesta de SheetDB no es una lista de filas.");
  }

  datosSheets.forEach(aplicarFilaDeStock);
}

async function cargarDatosSheets() {
  const catalogo = CONFIG?.catalogo;
  const url = catalogo?.sheetDBUrl || catalogo?.sheetDB;

  if (!catalogo?.usarSheetDB || !url) return;

  try {
    const respuesta = await fetch(`${url}?nocache=${Date.now()}`, {
      method: "GET",
      cache: "no-store"
    });

    if (!respuesta.ok) {
      throw new Error(`SheetDB respondió ${respuesta.status}.`);
    }

    actualizarProductos(await respuesta.json());
  } catch (error) {
    // El catálogo local es el respaldo si la API no está disponible.
    console.warn("No se pudo sincronizar el stock con SheetDB:", error);
  }
}

function obtenerClaseStock(stock) {
  if (stock <= 0) return "stock-vacio";
  if (stock <= 5) return "stock-bajo";
  return "stock-ok";
}

function refrescarCatalogo() {
  if (typeof renderizarCategorias === "function") renderizarCategorias();
  if (typeof renderizarProductos === "function") renderizarProductos();
  if (typeof renderizarCarrito === "function") renderizarCarrito();
  if (typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
}
