#!/usr/bin/env bash
set -e
S="${1:-$(dirname "$0")}"; R="${2:-$(dirname "$0")/..}"
BASE="https://www.mawewe.com.ec"

armar() {
  archivo="$1"; titulo="$2"; desc="$3"; cuerpo="$4"; robots="$5"
  {
    printf '<!DOCTYPE html>\n<html lang="es-EC">\n  <head>\n'
    printf '    <meta charset="utf-8">\n'
    printf '    <meta name="viewport" content="width=device-width, initial-scale=1">\n'
    printf '    <title>%s</title>\n' "$titulo"
    printf '    <meta name="description" content="%s">\n' "$desc"
    printf '    <link rel="canonical" href="%s/%s">\n' "$BASE" "$archivo"
    if [ -n "$robots" ]; then printf '    <meta name="robots" content="%s">\n' "$robots"; fi
    printf '    <meta property="og:type" content="website">\n'
    printf '    <meta property="og:site_name" content="Mawëwë">\n'
    printf '    <meta property="og:locale" content="es_EC">\n'
    printf '    <meta property="og:title" content="%s">\n' "$titulo"
    printf '    <meta property="og:description" content="%s">\n' "$desc"
    printf '    <meta property="og:url" content="%s/%s">\n' "$BASE" "$archivo"
    printf '    <meta property="og:image" content="%s/assets/img/empresa/lago-agrio.jpg">\n' "$BASE"
    printf '    <meta name="twitter:card" content="summary_large_image">\n'
    cat "$S/parte-cabecera.html"
    printf '\n'
    cat "$S/$cuerpo"
    printf '\n'
    cat "$S/parte-pie.html"
  } > "$R/$archivo"
  echo "  ✔ $archivo"
}

armar "index.html" \
  "Mawëwë · Vestuario, perfumería, joyería y regalos en Lago Agrio" \
  "Almacén Mawëwë en Lago Agrio: Chevignon, Americanino, Offcorss, LEGO, Fisher-Price, perfumería original, joyería en plata y detalles para regalo. Envíos a todo el Ecuador." \
  "cuerpo-index.html" ""

armar "catalogo.html" \
  "Catálogo · Mawëwë" \
  "Más de 400 productos publicados: vestuario, perfumería, joyería, relojería, juguetería y detalles. Filtrá por departamento, categoría y marca." \
  "cuerpo-catalogo.html" ""

armar "producto.html" \
  "Producto · Mawëwë" \
  "Ficha de producto del catálogo Mawëwë: marca, presentación y consulta directa por WhatsApp." \
  "cuerpo-producto.html" ""

armar "nosotros.html" \
  "Nosotros · Mawëwë, Lago Agrio" \
  "Más de 20 años en Lago Agrio. Distribuidor autorizado de Chevignon, Americanino, Offcorss, LEGO y Fisher-Price, con perfumería y joyería original." \
  "cuerpo-nosotros.html" ""

armar "contacto.html" \
  "Contacto · Mawëwë" \
  "Matriz en Jorge Añazco y 12 de Febrero, Lago Agrio. WhatsApp 098 183 2313, teléfonos 062 832 572 / 062 834 569 y horarios de atención." \
  "cuerpo-contacto.html" ""

armar "pagos.html" \
  "Cómo comprar, pagar y recibir · Mawëwë" \
  "Formas de pago (efectivo, transferencia, tarjeta y pago en línea), tiempos de envío a todo el Ecuador y política de cambios y garantía." \
  "cuerpo-pagos.html" ""

armar "404.html" \
  "Página no encontrada · Mawëwë" \
  "La página que buscás no existe. Volvé al inicio o explorá el catálogo de Mawëwë." \
  "cuerpo-404.html" "noindex, follow"
