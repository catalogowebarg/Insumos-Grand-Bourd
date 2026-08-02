// ========================================
// CONFIGURACIÓN DE ENVÍOS
// ========================================

const ENVIOS = {

  zonas: [

    {
      nombre: "Zona A",
      costo: 0,

      localidades: [
        "José C. Paz",
        "San Miguel"
      ]
    },

    {
      nombre: "Zona B",
      costo: 1500,

      localidades: [
        "Moreno",
        "Malvinas Argentinas"
      ]
    },

    {
      nombre: "Zona C",
      costo: 3000,

      localidades: [
        "Pilar"
      ]
    }

  ]

};

// ========================================
// OBTENER LOCALIDADES
// ========================================

function obtenerLocalidades() {

  return ENVIOS.zonas.flatMap(
    zona => zona.localidades
  );

}

// ========================================
// COSTO POR LOCALIDAD
// ========================================

function obtenerCostoEnvio(localidad) {

  if (!localidad) {
    return 0;
  }

  const zona = ENVIOS.zonas.find(
    zona =>
      zona.localidades.includes(
        localidad
      )
  );

  return zona
    ? zona.costo
    : 0;

}