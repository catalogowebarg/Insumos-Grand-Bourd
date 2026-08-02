# 📦 Catálogo Web Responsive para Mayoristas

Sistema de catálogo web responsive conectado a Google Sheets, pensado para mayoristas de bebidas y negocios que trabajan principalmente desde celular.

El objetivo de esta plantilla es ofrecer una experiencia rápida, moderna y profesional para mostrar productos, recibir pedidos y facilitar compras por WhatsApp.

---

# 🚀 Características

## ✅ Responsive Mobile First

Diseñado principalmente para celulares.

Incluye:

- navegación móvil optimizada
- menú hamburguesa
- barra flotante
- carrito lateral
- scroll suave
- experiencia táctil moderna

---

## ✅ Google Sheets Integrado

El catálogo puede actualizar:

- precios
- stock
- descripciones
- imágenes
- categorías

sin tocar el código.

---

## ✅ Carrito de Compras

Incluye:

- contador dinámico
- total en tiempo real
- control de cantidades
- validación de stock
- persistencia con LocalStorage

---

## ✅ Pedidos por WhatsApp

Genera automáticamente un pedido profesional listo para enviar.

Incluye:

- productos
- cantidades
- subtotal
- total
- nombre cliente
- tipo de entrega
- dirección

---

## ✅ Fácil de Personalizar

Se pueden cambiar rápidamente:

- colores
- logo
- banners
- categorías
- productos
- textos
- WhatsApp

---

# 📁 Estructura del Proyecto

```bash
catalogo-base-bebidas/

│
├── index.html
│
├── manifest.json
│
├── css/
│   ├── variables.css
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── carrito.js
│   ├── categorias.js
│   ├── productos.js
│   ├── stock.js
│   └── whatsapp.js
│
├── config/
│   └── config.js
│
├── img/
│   ├── banners/
│   ├── logo/
│   └── productos/
│
└── pages/
    ├── faq.html
    └── contacto.html