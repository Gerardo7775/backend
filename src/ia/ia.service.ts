import { Injectable } from '@nestjs/common';

@Injectable()
export class IaService {
  procesarMenuMenu(datos: { textoEscaneado: string; monedaDestino: string }) {
    // En producción, aquí conectaríamos con OpenAI o Google Cloud Vision.
    // Para la demo, interceptamos las palabras clave del guion.

    const textoBase = datos.textoEscaneado.toLowerCase();
    let traduccion = 'Platillo no identificado.';
    let descripcion = 'Recomendamos preguntar al mesero.';
    let precioConvertido: string | null = null;

    if (textoBase.includes('huarache')) {
      traduccion = 'Huarache (Traditional Mexican Dish)';
      descripcion =
        "An oblong, toasted masa base topped with beans, meat, lettuce, and cheese. It translates to 'sandal' because of its shape, but it's delicious!";
    } else if (textoBase.includes('gordita')) {
      traduccion = 'Gordita (Stuffed Corn Pocket)';
      descripcion =
        "A thick corn tortilla pocket stuffed with savory fillings like pork cracklings or cheese. Don't worry, it just means 'little fat one' in Spanish!";
    }

    // Simulador de tipo de cambio (ej. 1 USD = 17 MXN aprox)
    // Si el texto trae un "$150", lo extraemos
    if (textoBase.includes('150')) {
      const precioMXN = 150;
      const tipoCambio = 17.5;
      precioConvertido = `≈ ${(precioMXN / tipoCambio).toFixed(2)} ${datos.monedaDestino}`;
    }

    return {
      exito: true,
      reconocimiento: datos.textoEscaneado,
      resultado_ia: {
        traduccion,
        descripcion,
        precio_estimado: precioConvertido || 'Precio no detectado',
      },
    };
  }
}
