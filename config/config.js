// ========================================
// CONFIGURACIÓN GLOBAL DE LA PLANTILLA
// ========================================
//
// Toda la personalización del catálogo
// debe realizarse desde este archivo.
//
// ========================================

const CONFIG = {

  // ========================================
  // NEGOCIO
  // ========================================

  negocio: {

    nombre:
      "Insumos Grand Bourd",

    subtitulo:
      "Harinas, chocolates y decoraciones",

    logo:
      "img/logo/logo.png",

    whatsapp:
      "5491138599611"

  },

  // ========================================
  // CONTACTO
  // ========================================

  contacto: {

    email:
      "contacto@mundorepostero.com",

    direccion:
      "Buenos Aires, Argentina",

    horario:
      "Lunes a sábado de 08:00 a 20:00 hs."

  },

  // ========================================
  // REDES SOCIALES
  // ========================================

  redes: {

    instagram:
      "",

    facebook:
      "",

    tiktok:
      "",

    youtube:
      "",

    sitioWeb:
      ""

  },

  // ========================================
  // IDENTIDAD VISUAL
  // ========================================

colores: {

  principal:
    "#F2A7BB",

  secundario:
    "#F2A7BB",

  acento:
    "#D4AF37",

  fondo:
    "#FAFAFA",

  texto:
    "#1A202C"

},
  // ========================================
  // BANNERS
  // ========================================

  banners: [

    "img/banners/banner1.jpg",

    "img/banners/banner2.jpg",

    "img/banners/banner3.jpg"

  ],

  // ========================================
  // CATÁLOGO
  // ========================================

  catalogo: {

    moneda:
      "$",

    usarGoogleSheets:
      false,

    usarSheetDB:
      false,

    sheetDB:
      "",

    sheetDBUrl:
      ""

  },

  // ========================================
  // MÓDULOS VISUALES
  // ========================================

  secciones: {

    mostrarSlider:
      true,

    mostrarBeneficios:
      true,

    mostrarCategorias:
      true,

    mostrarFAQ:
      true,

    mostrarContacto:
      true

  },

  // ========================================
  // FUNCIONALIDADES
  // ========================================

  funciones: {

    buscador:
      true,

    carrito:
      true,

    whatsapp:
      true,

    sliderAutomatico:
      true

  },

  // ========================================
  // BENEFICIOS
  // ========================================

  beneficios: [

    {
  icono:
    "fa-solid fa-boxes-stacked",

  titulo:
    "Amplio stock",

  descripcion:
    "Productos disponibles todo el año"
},

{
  icono:
    "fa-solid fa-tags",

  titulo:
    "Precios mayoristas",

  descripcion:
    "Ideal para emprendedores"
},

{
  icono:
    "fa-solid fa-truck",

  titulo:
    "Envíos",

  descripcion:
    "Entrega según tu zona"
},

{
  icono:
    "fa-brands fa-whatsapp",

  titulo:
    "Pedidos rápidos",

  descripcion:
    "Comprá fácilmente por WhatsApp"
}

]

};