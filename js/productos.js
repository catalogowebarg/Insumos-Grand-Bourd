// ========================================
// PRODUCTOS BASE
// ========================================
//
// Este archivo contiene la base local del catálogo.
//
// Los productos pueden actualizarse desde SheetDB
// sin romper la arquitectura actual.
//
// ========================================

// ========================================
// CATÁLOGO BASE
// ========================================

const PRODUCTOS = [

  {
    id: "richs-bettercreme-chantilly",
    tipoVariante: "selector",
    nombre: "Rich's Bettercreme",
    categoria: "Cremas",
    imagen: "img/productos/richs-bettercreme-907.jpg",
    descripcion: "Crema vegetal ideal para decoración y rellenos",
    precio: 9600,
    stock: 10,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "453g",
        precio: 8000,
        stock: 10,
        imagen: "img/productos/richs-bettercreme-453.jpg"
      },
      {
        nombre: "907g",
        precio: 9600,
        stock: 10,
        imagen: "img/productos/richs-bettercreme-907.jpg"
      }
    ]
  },

  {
    id: "ledevit-chantilly",
    tipoVariante: "carrusel",
    nombre: "Ledevit Chantilly",
    categoria: "Cremas",
    imagen: "img/productos/ledevit-vainilla.jpg",
    descripcion: "Crema vegetal disponible en distintos sabores",
    precio: 10200,
    stock: 10,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "Vainilla (1kg)",
        precio: 10200,
        stock: 10,
        imagen: "img/productos/ledevit-vainilla.jpg"
      },
      {
        nombre: "Chocolate (1kg)",
        precio: 10200,
        stock: 10,
        imagen: "img/productos/ledevit-chocolate.jpg"
      },
      {
        nombre: "Frutilla (500g)",
        precio: 4900,
        stock: 10,
        imagen: "img/productos/ledevit-frutilla.jpg"
      }
    ]
  },

  {
    id: "vacanil-repostero",
    tipoVariante: "selector",
    nombre: "Vacanil Repostero",
    categoria: "Dulce de Leche",
    imagen: "img/productos/vacanil-1kg.jpg",
    descripcion: "Dulce de leche repostero Vacanil",
    precio: 4800,
    stock: 10,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "1kg",
        precio: 4800,
        stock: 10,
        imagen: "img/productos/vacanil-1kg.jpg"
      },
      {
        nombre: "4kg",
        precio: 0,
        stock: 10,
        imagen: "img/productos/vacanil-4kg.jpg"
      },
      {
        nombre: "10kg",
        precio: 0,
        stock: 10,
        imagen: "img/productos/vacanil-10kg.jpg"
      }
    ]
  },

  {
    id: "el-serranito-1-kg",
    tipoVariante: "selector",
    nombre: "El serranito repostero",
    categoria: "Dulce de Leche",
    imagen: "img/productos/el-serranito-1kg.jpg",
    descripcion: "Dulce de leche repostero El serranito",
    precio: 4800,
    stock: 10,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "1kg",
        precio: 4800,
        stock: 10,
        imagen: "img/productos/el-serranito-1kg.jpg"
      },
      {
        nombre: "10kg",
        precio: 0,
        stock: 10,
        imagen: "img/productos/el-serranito-10kg.jpg"
      }
    ]
  },


  {
    id: "pasta-frutilla",
    tipoVariante: "carrusel",
    nombre: "Top Class",
    categoria: "Pastas Saborizantes",
    imagen: "img/productos/pasta-frutilla.jpg",
    descripcion: "Pasta saborizante ideal para decoración y rellenos",
    precio: 1000,
    stock: 20,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "Frutilla",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/pasta-frutilla.jpg"
      },
      {
        nombre: "Fruto del Bosque",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/pasta-frutos-bosque.jpg"
      },
      {
        nombre: "Nutechoc",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/pasta-nutechoc.jpg"
      },
      {
        nombre: "Pistacho",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/pasta-pistacho.jpg"
      },
      {
        nombre: "Avellana",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/pasta-avellana.jpg"
      }
    ]
  },

   {
    id: "manteca-inty",
    tipoVariante: "selector",
    nombre: "Manteca Vegetal",
    categoria: "Grasas y Mantecas",
    imagen: "img/productos/manteca-inty.jpg",
    descripcion: "Manteca marca Inty ideal para repostería",
    precio: 4800,
    stock: 10,  
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "500g",
        precio: 4800,
        stock: 10,
        imagen: "img/productos/manteca-inty.jpg"
      }
    ]
    
  },

  {
    id: "pirotines-x20",
    tipoVariante: "carrusel",
    nombre: "Pirotines x20",
    categoria: "Descartables",
    imagen: "img/productos/pirotines-verde.jpg",
    descripcion: "Pirotines para cupcakes y muffins",
    precio: 1000,
    stock: 20,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "Verdes",
        precio: 1000,
        stock:2,
        imagen: "img/productos/pirotines-verde.jpg"
      },
      {
        nombre: "Rojos",
        precio: 1000,
        stock: 2,
        imagen: "img/productos/pirotines-rojo.jpg"
      },
      {
        nombre: "Lilas",
        precio: 1000,
        stock: 3,
        imagen: "img/productos/pirotines-lilas.jpg"
      },
      {
        nombre: "Amarillos",
        precio: 1000,
        stock: 4,
        imagen: "img/productos/pirotines-amarillos.jpg"
      },{
        nombre: "Celestes",
        precio: 1000,
        stock: 5,
        imagen: "img/productos/pirotines-celestes.jpg"
      },
{
        nombre: "Rosas",
        precio: 1000,
        stock: 6,
        imagen: "img/productos/pirotines-rosa.jpg"
      },
      {
        nombre: "Violetas",
        precio: 1000,
        stock: 7,
        imagen: "img/productos/pirotines-violeta.jpg"
      }
    ]
  },

  {
    id: "esencia-de-vainilla-feibor",
    tipoVariante: "carrusel",
    nombre: "Esencia de Vainilla",
    categoria: "Esencias",
    imagen: "img/productos/esencia-vainilla.jpg",
    descripcion: "Esencia de vainilla de alta calidad",
    precio: 1000,
    stock: 20,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "vainilla",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/Esencia de vainilla-feibor.jpg"
      }
    ]
  },

   {
    id: "cereales-y-semillas",
    tipoVariante: "carrusel",
    nombre: "Micro Cereales",
    categoria: "Decoraciones",
    imagen: "img/productos/cereales-semillas.jpg",
    descripcion: "Cereales y semillas para decoración de repostería",
    precio: 1000,
    stock: 20,
    visible: true,
    destacado: false,
    variantes: [
      {
        nombre: "Micro galletitas negras",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/micro-cereal-negro.jpg"
      },
      {
        nombre: "Micro galletitas blancas",
        precio: 1000,
        stock: 20,
        imagen: "img/productos/micro-cereal-blanco.jpg"
      },

    ]
  },

  

];

window.PRODUCTOS = PRODUCTOS;

// ========================================
// NOTA IMPORTANTE
// ========================================
//
// La función obtenerProducto() se mantiene en carrito.js.
//
// ========================================
