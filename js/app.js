// Controlador Principal de la Aplicación Multi-Página
class App {
  constructor() {
    this.pageId = document.body.dataset.pageId || 'home';
    this.productsGrid = document.getElementById('productsGrid');
    this.liveSearchInput = document.getElementById('liveSearchInput');
    this.liveSearchClear = document.getElementById('liveSearchClear');
    this.subCategoryContainer = document.getElementById('subCategoryContainer');
    this.mobileNavToggle = document.getElementById('mobileNavToggle');

    // En 'home', activeCategory empieza en 'all' para mostrar todos los productos
    this.activeCategory = this.pageId === 'home' ? 'all' : this.pageId;
    this.activeSubCategory = 'all';
    this.searchQuery = '';

    this.init();
  }

  init() {
    this.renderCategoryHeaderInfo();
    this.renderSubCategoryPills();
    this.renderProducts();
    this.setupLiveSearch();
    this.setupMobileMenu();
    this.setupImageErrorFallbacks();
  }

  renderCategoryHeaderInfo() {
    if (this.pageId === 'home' || this.pageId === 'quienes-somos') return;

    const pageConfig = typeof MAIN_PAGES_CONFIG !== 'undefined' ? MAIN_PAGES_CONFIG[this.pageId] : null;
    if (!pageConfig) return;

    const bannerContainer = document.getElementById('categoryHeaderBanner');
    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div class="container">
          <span class="category-header-badge"><i class="fas ${pageConfig.icon}"></i> Colección Exclusiva</span>
          <h1 class="category-header-title">${pageConfig.title}</h1>
          <p class="category-header-subtitle">${pageConfig.subtitle}</p>
        </div>
      `;
    }
  }

  renderSubCategoryPills() {
    if (!this.subCategoryContainer) return;

    let subCategories = [];

    if (this.pageId === 'home') {
      subCategories = [
        { id: "all", name: "Todos los Productos", icon: "fa-border-all" },
        { id: "lamparas-led", name: "Lámparas LED 3D", icon: "fa-lightbulb" },
        { id: "cupulas-florales", name: "Cúpulas & Florales", icon: "fa-spa" },
        { id: "recuerdos-eventos", name: "Recuerdos & Eventos", icon: "fa-gift" },
        { id: "placas-reconocimientos", name: "Placas & Trofeos", icon: "fa-award" },
        { id: "articulos-personalizados", name: "Artículos Personalizados", icon: "fa-star" },
        { id: "corte-materiales", name: "Corte & Materiales", icon: "fa-scissors" }
      ];
    } else {
      const pageConfig = typeof MAIN_PAGES_CONFIG !== 'undefined' ? MAIN_PAGES_CONFIG[this.pageId] : null;
      if (pageConfig && pageConfig.subCategories) {
        subCategories = pageConfig.subCategories;
      }
    }

    if (subCategories.length === 0) return;

    this.subCategoryContainer.innerHTML = subCategories.map(sub => `
      <button class="filter-btn ${sub.id === (this.pageId === 'home' ? this.activeCategory : this.activeSubCategory) ? 'active' : ''}" 
              onclick="window.app.selectSubCategory('${sub.id}')">
        ${sub.icon ? `<i class="fas ${sub.icon}"></i>` : ''} ${sub.name}
      </button>
    `).join('');
  }

  selectSubCategory(subId) {
    if (this.pageId === 'home') {
      this.activeCategory = subId;
    } else {
      this.activeSubCategory = subId;
    }
    this.renderSubCategoryPills();
    this.renderProducts();
  }

  renderProducts() {
    if (!this.productsGrid) return;

    let filtered = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [];

    // Filtrar por página específica (si no estamos en home ni quienes-somos)
    if (this.pageId !== 'home' && this.pageId !== 'quienes-somos') {
      filtered = filtered.filter(p => p.category === this.pageId);

      // Filtrar por subcategoría dentro de la página
      if (this.activeSubCategory !== 'all') {
        filtered = filtered.filter(p => p.subCategory === this.activeSubCategory);
      }
    } else if (this.pageId === 'home') {
      if (this.activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === this.activeCategory);
      }
    }

    // Buscador en tiempo real letra por letra
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.shortDesc.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      this.productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <i class="fas fa-search" style="font-size: 3rem; color: var(--color-celeste-dark); margin-bottom: 1rem;"></i>
          <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: var(--text-primary);">No se encontraron productos</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
        </div>
      `;
      return;
    }

    this.productsGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='pagina-antigua/assets/images/favicon.png';">
          <button class="product-quick-btn" onclick="window.productModal.openProduct('${p.id}')">
            <i class="fas fa-eye"></i> Vista Rápida
          </button>
        </div>
        <div class="product-content">
          <div class="product-meta">
            <span><i class="fas fa-cube"></i> ${p.material.split('+')[0].trim()}</span>
            <div class="product-rating">
              <i class="fas fa-star"></i> ${p.rating} (${p.reviews})
            </div>
          </div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-desc">${p.shortDesc}</p>
          <div class="product-footer">
            <button class="btn-detail" onclick="window.productModal.openProduct('${p.id}')">
              <i class="fas fa-search-plus"></i> Ver Detalle & Personalizar
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  setupLiveSearch() {
    if (this.liveSearchInput) {
      this.liveSearchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (this.liveSearchClear) {
          this.liveSearchClear.style.display = this.searchQuery ? 'block' : 'none';
        }
        this.renderProducts();
      });
    }

    if (this.liveSearchClear) {
      this.liveSearchClear.addEventListener('click', () => {
        if (this.liveSearchInput) this.liveSearchInput.value = '';
        this.searchQuery = '';
        this.liveSearchClear.style.display = 'none';
        this.renderProducts();
      });
    }
  }

  setupMobileMenu() {
    if (this.mobileNavToggle) {
      this.mobileNavToggle.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
          if (navMenu.style.display === 'flex') {
            navMenu.style.display = 'none';
          } else {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'var(--bg-card)';
            navMenu.style.padding = '1.5rem';
            navMenu.style.boxShadow = 'var(--shadow-lg)';
            navMenu.style.zIndex = '999';
          }
        }
      });
    }
  }

  setupImageErrorFallbacks() {
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        e.target.src = 'pagina-antigua/assets/images/favicon.png';
      }
    }, true);
  }
}

// Inicializar app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
