// ========================================
// DATOS DEL CLIENTE
// ========================================

function obtenerDatosCliente() {

  const nombreInput =
    document.getElementById(
      "nombre-cliente"
    );

  const direccionInput =
    document.getElementById(
      "direccion-cliente"
    );

  const entregaSeleccionada =
    document.querySelector(
      'input[name="tipo-entrega"]:checked'
    );

  return {

    nombre:

      nombreInput
        ? nombreInput.value.trim()
        : "",

    entrega:

      entregaSeleccionada
        ? entregaSeleccionada.value
        : "retiro",

    direccion:

      direccionInput
        ? direccionInput.value.trim()
        : "",

    localidad:

      obtenerLocalidadSeleccionada()

  };

}

// ========================================
// LOCALIDAD
// ========================================

function obtenerLocalidadSeleccionada() {

  const select =
    document.getElementById(
      "localidad-cliente"
    );

  return select
    ? select.value
    : "";

}

// ========================================
// MOSTRAR ERROR
// ========================================

function mostrarErrorCampo(
  idCampo,
  mensaje
) {

  const campo =
    document.getElementById(
      idCampo
    );

  if (!campo) return;

  cerrarCarritoValidacion();

  campo.classList.add(
    "campo-error"
  );

  let mensajeError =
    campo.nextElementSibling;

  if (

    !mensajeError ||

    !mensajeError.classList.contains(
      "mensaje-error"
    )

  ) {

    mensajeError =
      document.createElement(
        "p"
      );

    mensajeError.className =
      "mensaje-error";

    campo.insertAdjacentElement(
      "afterend",
      mensajeError
    );

  }

  mensajeError.textContent =
    mensaje;

  setTimeout(() => {

    campo.focus();

  }, 100);

  campo.scrollIntoView({

    behavior: "smooth",

    block: "center"

  });

}

// ========================================
// LIMPIAR ERRORES
// ========================================

function limpiarErroresFormulario() {

  document
    .querySelectorAll(
      ".campo-error"
    )
    .forEach(campo => {

      campo.classList.remove(
        "campo-error"
      );

    });

  document
    .querySelectorAll(
      ".mensaje-error"
    )
    .forEach(error => {

      error.remove();

    });

}

// ========================================
// VALIDACIÓN
// ========================================

function validarPedido() {

  limpiarErroresFormulario();

  if (carrito.length === 0) {

    alert(
      "El carrito está vacío"
    );

    return false;

  }

  const datos =
    obtenerDatosCliente();

  // ========================================
  // NOMBRE
  // ========================================

  if (!datos.nombre) {

    mostrarErrorCampo(

      "nombre-cliente",

      "Ingresá tu nombre para continuar"

    );

    return false;

  }

  // ========================================
  // DELIVERY
  // ========================================

  if (
    datos.entrega === "delivery"
  ) {

    // LOCALIDAD

    if (!datos.localidad) {

      mostrarErrorCampo(

        "localidad-cliente",

        "Seleccioná una localidad"

      );

      return false;

    }

    // DIRECCIÓN

    if (!datos.direccion) {

      mostrarErrorCampo(

        "direccion-cliente",

        "Ingresá una dirección"

      );

      return false;

    }

  }

  return true;

}

// ========================================
// SUBTOTAL PRODUCTOS
// ========================================

function calcularTotalPedido() {

  return carrito.reduce(

    (total, item) => {

      const producto =
        obtenerProducto(
          item.id
        );

      if (!producto) {

        return total;

      }

      return (

        total +

        (
          item.precio *
          item.cantidad
        )

      );

    },

    0

  );

}

// ========================================
// ENVÍO
// ========================================

function calcularEnvioPedido() {

  const datos =
    obtenerDatosCliente();

  if (
    datos.entrega !== "delivery"
  ) {

    return 0;

  }

  return obtenerCostoEnvio(
    datos.localidad
  );

}

// ========================================
// TOTAL FINAL
// ========================================

function calcularTotalFinalPedido() {

  return (

    calcularTotalPedido()

    +

    calcularEnvioPedido()

  );

}

// ========================================
// PRODUCTOS
// ========================================

function generarBloqueProductos() {

  let texto = "";

  carrito.forEach(item => {

    const producto =
      obtenerProducto(
        item.id
      );

    if (!producto) return;

    const subtotal =

      item.precio *
      item.cantidad;

    texto += `

📦 *${producto.nombre}*

${item.variante
  ? `• Tamaño: ${item.variante}`
  : ""}

• Cantidad: ${item.cantidad}

• Precio: ${CONFIG.catalogo.moneda}${item.precio}

• Subtotal: ${CONFIG.catalogo.moneda}${subtotal}
`;

  });

  return texto;

}

// ========================================
// MENSAJE WHATSAPP
// ========================================

function generarMensajeWhatsApp() {

  const datos =
    obtenerDatosCliente();

  const subtotal =
    calcularTotalPedido();

  const envio =
    calcularEnvioPedido();

  const total =
    calcularTotalFinalPedido();

  let mensaje = `

🛒 *NUEVO PEDIDO*
━━━━━━━━━━━━━━

`;

  mensaje +=
    generarBloqueProductos();

  mensaje += `

━━━━━━━━━━━━━━

💰 *SUBTOTAL:* ${CONFIG.catalogo.moneda}${subtotal}

🚚 *ENVÍO:* ${CONFIG.catalogo.moneda}${envio}

💵 *TOTAL FINAL:* ${CONFIG.catalogo.moneda}${total}

`;

  mensaje += `

👤 *Cliente:* ${datos.nombre}

🚚 *Entrega:* ${datos.entrega}

`;

  if (
    datos.entrega === "delivery"
  ) {

    mensaje += `

🏙️ *Localidad:* ${datos.localidad}

📍 *Dirección:* ${datos.direccion}

`;

  }

  mensaje += `

Gracias 🙌
`;

  return encodeURIComponent(
    mensaje
  );

}

// ========================================
// URL WHATSAPP
// ========================================

function obtenerUrlWhatsApp() {

  const telefono =
    CONFIG.negocio.whatsapp;

  const mensaje =
    generarMensajeWhatsApp();

  return `https://wa.me/${telefono}?text=${mensaje}`;

}

// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

  if (
    !validarPedido()
  ) {

    return;

  }

  window.open(

    obtenerUrlWhatsApp(),

    "_blank"

  );

}
// ========================================
// CERRAR CARRITO
// ========================================

function cerrarCarritoValidacion() {

  const panel =
    document.getElementById(
      "seccion-carrito"
    );

  const overlay =
    document.getElementById(
      "overlay-carrito"
    );

  if (panel) {

    panel.classList.remove(
      "carrito-abierto"
    );

  }

  if (overlay) {

    overlay.classList.remove(
      "overlay-activo"
    );

  }

  document.body.style.overflow =
    "";

}
