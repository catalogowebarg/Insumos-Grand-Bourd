// ========================================
// ESTADO DEL CARRITO
// ========================================
function obtenerVarianteSeleccionada(
  productoId
){

  return window
    .variantesSeleccionadas?.[
      productoId
    ] || null;

}

let carrito =

  JSON.parse(
    localStorage.getItem(
      "carrito"
    )
  ) || [];

// ========================================
// UTILIDADES
// ========================================

function guardarCarrito() {

  localStorage.setItem(

    "carrito",

    JSON.stringify(carrito)

  );

}

function obtenerProducto(
  idProducto
) {

  return PRODUCTOS.find(

    producto =>
      producto.id === idProducto

  );

}

// ========================================
// REFRESCAR UI
// ========================================

function actualizarCarritoUI() {

  guardarCarrito();

  renderizarCarrito();

  actualizarContadorCarrito();

}

// ========================================
// AGREGAR PRODUCTO
// ========================================

function agregarAlCarrito(
  idProducto
) {

  const producto =
    obtenerProducto(
      idProducto
    );

  if (!producto) return;

  const itemExistente =
    carrito.find(

      item =>
        item.id === idProducto

    );

  // ========================================
  // PRODUCTO EXISTENTE
  // ========================================

  if (itemExistente) {

    if (

      itemExistente.cantidad <
      producto.stock

    ) {

      itemExistente.cantidad++;

    }

  }

  // ========================================
  // NUEVO PRODUCTO
  // ========================================

  else {

    carrito.push({

      id:
        producto.id,

      cantidad:
        1

    });

  }

  actualizarCarritoUI();

}

// ========================================
// AUMENTAR CANTIDAD
// ========================================

function aumentarCantidad(
  idProducto,
  variante = null
){

  const item =
    carrito.find(

      item =>

        item.id === idProducto &&

        item.variante === variante

    );

  if(!item) return;

  const producto = obtenerProducto(idProducto);

  if (!producto || item.cantidad >= obtenerStockItem(producto, item)) return;

  item.cantidad++;

  actualizarCarritoUI();

}
// ========================================
// DISMINUIR CANTIDAD
// ========================================

function disminuirCantidad(
  idProducto,
  variante = null
){

  const item =
    carrito.find(

      item =>

        item.id === idProducto &&

        item.variante === variante

    );

  if(!item) return;

  if(item.cantidad > 1){

    item.cantidad--;

  }

  else{

    carrito = carrito.filter(

      item =>

        !(
          item.id === idProducto &&

          item.variante === variante
        )

    );

  }

  actualizarCarritoUI();

}

// ========================================
// VACIAR CARRITO
// ========================================

function vaciarCarrito() {

  carrito = [];

  actualizarCarritoUI();

}

// ========================================
// RENDERIZAR CARRITO
// ========================================

function renderizarCarrito() {

  const lista =
    document.getElementById(
      "lista-carrito"
    );

  const totalContainer =
    document.getElementById(
      "total-carrito"
    );

  const mensajeVacio =
    document.getElementById(
      "carrito-vacio"
    );

  if (

    !lista ||
    !totalContainer ||
    !mensajeVacio

  ) {

    return;

  }

  lista.innerHTML = "";

  mensajeVacio.style.display =

    carrito.length === 0
      ? "block"
      : "none";

  let total = 0;

  carrito.forEach(item => {

    const producto =
      obtenerProducto(
        item.id
      );

    if (!producto) return;

    const subtotal =
  item.precio *
  item.cantidad;

    total += subtotal;

    const li =
      document.createElement(
        "li"
      );

    li.className =
      "item-carrito";

    li.innerHTML = `

      <img
        src="${item.imagen || obtenerVarianteProducto(producto, item.variante)?.imagen || producto.imagen}"
        alt="${producto.nombre}${item.variante ? ` - ${item.variante}` : ""}"
      >

      <div class="info-item">

        <h4>
  ${producto.nombre}
</h4>

${
  item.variante
  ? `
      <small>
        ${item.variante}
      </small>
    `
  : ""
}
        <p>
          ${CONFIG.catalogo.moneda}
         ${item.precio}
        </p>

        <div class="controles">

          <button
            onclick="disminuirCantidad('${producto.id}','${item.variante}')"
          >
            -
          </button>

          <span>
            ${item.cantidad}
          </span>

          <button
           onclick="aumentarCantidad('${producto.id}','${item.variante}')"
          >
            +
          </button>

        </div>

      </div>

    `;

    lista.appendChild(li);

  });

  totalContainer.textContent =

    `Total: ${CONFIG.catalogo.moneda}${total}`;

}

// ========================================
// CONTADOR + BARRA FLOTANTE
// ========================================

function actualizarContadorCarrito() {

  const contadorInferior =
    document.getElementById(
      "contador-bottom"
    );

  const barra =
    document.getElementById(
      "barra-flotante"
    );

  const barraCantidad =
    document.getElementById(
      "barra-cantidad"
    );

  const barraTotal =
    document.getElementById(
      "barra-total"
    );

  const totalCantidad =

    carrito.reduce(

      (acumulado, item) =>

        acumulado +
        item.cantidad,

      0

    );

  const totalPrecio =

    carrito.reduce(

      (
        acumulado,
        item
      ) => {

        const producto =
          obtenerProducto(
            item.id
          );

        if (!producto) {

          return acumulado;

        }

        return (

          acumulado +

          (
            item.precio *
            item.cantidad
          )

        );

      },

      0

    );

  // ========================================
  // CONTADOR INFERIOR
  // ========================================

  if (contadorInferior) {

    contadorInferior.textContent =
      totalCantidad;

    contadorInferior.style.display =

      totalCantidad > 0
        ? "flex"
        : "none";

  }

  // ========================================
  // BARRA FLOTANTE
  // ========================================

  if (

    barra &&
    barraCantidad &&
    barraTotal

  ) {

    if (totalCantidad > 0) {

      barra.style.display =
        "flex";

      barraCantidad.textContent =

        `${totalCantidad} producto${totalCantidad > 1 ? "s" : ""} en el carrito`;

      barraTotal.textContent =

        `Total: ${CONFIG.catalogo.moneda}${totalPrecio}`;

    }

    else {

      barra.style.display =
        "none";

    }

  }

}
function agregarAlCarritoConVariante(
  idProducto
){

  const producto =
    obtenerProducto(
      idProducto
    );

  if(!producto) return;

  const variante =
    obtenerVarianteSeleccionada(
      idProducto
    );

  const precio =

    variante?.precio ??

    producto.precio;

  const nombreVariante =

    variante?.nombre ??

    "Mediano";

  const stockVariante = variante?.stock ?? producto.stock ?? 0;

  const itemExistente =
    carrito.find(

      item =>

        item.id === idProducto &&

        item.variante ===
        nombreVariante

    );

  if (stockVariante <= 0) return;

  if(itemExistente){

    if (itemExistente.cantidad < stockVariante) {
      itemExistente.cantidad++;
    }

  }

  else{

    carrito.push({

      id:idProducto,

      cantidad:1,

      variante:nombreVariante,

      precio,

      imagen: variante?.imagen || producto.imagen

    });

  }

  actualizarCarritoUI();

}

function obtenerVarianteProducto(producto, nombreVariante) {
  const variantes = Array.isArray(producto?.variantes)
    ? producto.variantes
    : producto?.variantes ? [producto.variantes] : [];

  return variantes.find(variante => variante.nombre === nombreVariante) || null;
}

function obtenerStockItem(producto, item) {
  return obtenerVarianteProducto(producto, item.variante)?.stock ?? producto.stock ?? 0;
}
