// Modal de Detalle de Producto & Productos Relacionados
class ProductModal {
  constructor() {
    this.modalBackdrop = document.getElementById('productModal');
    this.modalBody = document.getElementById('modalBody');
    this.closeBtn = document.getElementById('modalCloseBtn');

    this.init();
  }

  init() {
    if (!this.modalBackdrop) return;

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Cerrar al hacer clic en el backdrop exterior
    this.modalBackdrop.addEventListener('click', (e) => {
      if (e.target === this.modalBackdrop) this.close();
    });

    // Tecla ESC para cerrar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('active')) {
        this.close();
      }
    });
  }

  openProduct(productId) {
    const product = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === productId) : null;
    if (!product) return;

    this.render(product);
    this.modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  render(product) {
    // Galería de imágenes
    const galleryHtml = `
      <div class="modal-gallery-main">
        <img id="mainGalleryImg" src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='pagina-antigua/assets/images/favicon.png';">
      </div>
      <div class="modal-gallery-thumbs">
        ${product.gallery ? product.gallery.map((img, index) => `
          <div class="thumb-item ${index === 0 ? 'active' : ''}" onclick="window.productModal.switchMainImage('${img}', this)">
            <img src="${img}" alt="Thumbnail ${index + 1}" onerror="this.onerror=null; this.src='pagina-antigua/assets/images/favicon.png';">
          </div>
        `).join('') : ''}
      </div>
    `;

    // Campos de personalización
    const customFieldsHtml = product.customFields ? product.customFields.map((field, i) => `
      <div class="form-group-modal">
        <label>${field.name}:</label>
        ${field.options ? `
          <select id="customField_${i}">
            ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
          </select>
        ` : `
          <input type="text" id="customField_${i}" placeholder="${field.placeholder || ''}">
        `}
      </div>
    `).join('') : '';

    // Productos relacionados (sin padding-top roto)
    const relatedProducts = (product.relatedIds || [])
      .map(id => PRODUCTS_DATA.find(p => p.id === id))
      .filter(Boolean);

    const relatedHtml = relatedProducts.length > 0 ? `
      <div class="related-products-section">
        <h4 class="related-title"><i class="fas fa-layer-group"></i> Productos Relacionados</h4>
        <div class="related-grid">
          ${relatedProducts.map(rel => `
            <div class="product-card" onclick="window.productModal.openProduct('${rel.id}')">
              <div class="product-img-wrapper">
                <img src="${rel.image}" alt="${rel.name}" loading="lazy" onerror="this.onerror=null; this.src='pagina-antigua/assets/images/favicon.png';">
              </div>
              <div class="product-content" style="padding: 0.85rem;">
                <h5 class="product-title" style="font-size: 0.9rem; margin-bottom: 0.4rem; line-height: 1.3;">${rel.name}</h5>
                <span style="font-size: 0.8rem; color: var(--color-celeste-dark); font-weight: 700; display: inline-flex; align-items: center; gap: 0.3rem;">Ver Detalle <i class="fas fa-arrow-right"></i></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    // Ensamblar modal completo
    this.modalBody.innerHTML = `
      <div class="modal-product-layout">
        <!-- Galería Izquierda -->
        <div class="modal-gallery-col">
          ${galleryHtml}
        </div>

        <!-- Información Derecha -->
        <div class="modal-info-col">
          <span class="modal-info-badge">${product.badge || 'Personalizable'}</span>
          <h2 class="modal-product-title">${product.name}</h2>
          <p class="modal-product-desc">${product.description}</p>

          <div class="modal-product-specs">
            <div class="spec-item">
              <span>Material:</span>
              <span><strong>${product.material}</strong></span>
            </div>
            <div class="spec-item">
              <span>Tiempo de elaboración:</span>
              <span><strong>${product.leadTime}</strong></span>
            </div>
            <div class="spec-item">
              <span>Garantía:</span>
              <span><strong>100% Calidad Garantizada</strong></span>
            </div>
          </div>

          <div class="modal-custom-form">
            <h4 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.75rem; color: var(--color-celeste-dark); display: flex; align-items: center; gap: 0.5rem;">
              <i class="fas fa-magic"></i> Detalles de Personalización:
            </h4>
            ${customFieldsHtml}
          </div>

          <button class="btn-whatsapp-order" onclick="window.productModal.sendWhatsAppOrder('${product.id}')">
            <i class="fab fa-whatsapp" style="font-size: 1.3rem;"></i> Cotizar y Pedir por WhatsApp
          </button>
        </div>
      </div>

      <!-- Productos Relacionados -->
      ${relatedHtml}
    `;
  }

  switchMainImage(imgUrl, thumbElement) {
    const mainImg = document.getElementById('mainGalleryImg');
    if (mainImg) mainImg.src = imgUrl;

    const thumbs = document.querySelectorAll('.thumb-item');
    thumbs.forEach(t => t.classList.remove('active'));
    if (thumbElement) thumbElement.classList.add('active');
  }

  sendWhatsAppOrder(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    let message = `Hola Creatividad Láser, quisiera cotizar el siguiente producto:\n*${product.name}*\n`;
    message += `• Material: ${product.material}\n`;

    if (product.customFields) {
      product.customFields.forEach((field, i) => {
        const input = document.getElementById(`customField_${i}`);
        if (input && input.value.trim() !== '') {
          message += `• ${field.name}: ${input.value.trim()}\n`;
        }
      });
    }

    message += `\n¿Me pueden dar detalles sobre tiempos de fabricación y envíos? ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/593989926138?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }
}

// Inicializar globalmente
document.addEventListener('DOMContentLoaded', () => {
  window.productModal = new ProductModal();
});
