// Base de Conocimiento del Chatbot LaserBot AI
const CHATBOT_KNOWLEDGE = {
  greetings: "¡Hola! Soy **LaserBot AI**, asistente virtual de Creatividad Láser. ¿En qué le puedo asesorar hoy?",
  options: [
    { label: "Buscar un obsequio especial", action: "find_gift" },
    { label: "Ver Lámparas LED 3D", action: "show_lamps" },
    { label: "Cúpulas Florales Eternas", action: "show_cupulas" },
    { label: "Placas & Recuerdos de Eventos", action: "show_events" },
    { label: "Información de Envíos y Tiempos", action: "shipping_info" },
    { label: "Cotización a Medida en WhatsApp", action: "custom_quote" }
  ]
};

// Clase Principal del Chatbot
class LaserBot {
  constructor() {
    this.triggerBtn = document.getElementById('chatbotTrigger');
    this.window = document.getElementById('chatbotWindow');
    this.closeBtn = document.getElementById('chatbotClose');
    this.messagesContainer = document.getElementById('chatbotMessages');
    this.input = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('chatbotSend');

    this.isOpen = false;
    this.hasGreeting = false;

    this.init();
  }

  init() {
    if (!this.triggerBtn || !this.window) return;

    this.triggerBtn.addEventListener('click', () => this.toggle());
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleUserSubmit());
    }

    if (this.input) {
      this.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleUserSubmit();
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.window.classList.add('active');
    this.isOpen = true;

    if (!this.hasGreeting) {
      this.showGreeting();
      this.hasGreeting = true;
    }
  }

  close() {
    this.window.classList.remove('active');
    this.isOpen = false;
  }

  showGreeting() {
    this.addMessage(CHATBOT_KNOWLEDGE.greetings, 'bot');
    this.showQuickOptions(CHATBOT_KNOWLEDGE.options);
  }

  addMessage(text, sender = 'bot') {
    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble', sender);
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    
    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
  }

  showQuickOptions(options) {
    const container = document.createElement('div');
    container.classList.add('chat-quick-options');

    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.classList.add('chat-option-btn');
      btn.innerHTML = `<i class="fas fa-chevron-right" style="font-size: 0.7rem; margin-right: 0.3rem;"></i> ${opt.label}`;
      btn.addEventListener('click', () => {
        container.remove();
        this.addMessage(opt.label, 'user');
        this.handleAction(opt.action);
      });
      container.appendChild(btn);
    });

    this.messagesContainer.appendChild(container);
    this.scrollToBottom();
  }

  handleUserSubmit() {
    const text = this.input.value.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.input.value = '';

    setTimeout(() => {
      this.processQuery(text.toLowerCase());
    }, 500);
  }

  handleAction(action) {
    setTimeout(() => {
      switch (action) {
        case 'find_gift':
          this.addMessage('¿Para qué ocasión o persona está buscando el obsequio especial?', 'bot');
          this.showQuickOptions([
            { label: 'Para Papá / Hombre', action: 'gift_padre' },
            { label: 'Para Mamá / Mujer', action: 'gift_madre' },
            { label: 'Graduación o Logros', action: 'gift_grado' },
            { label: 'Bautizos y Baby Shower', action: 'gift_bautizo' },
            { label: 'Bodas y Aniversarios', action: 'gift_boda' }
          ]);
          break;

        case 'show_lamps':
          this.addMessage('Nuestras Lámparas LED son personalizables en acrílico con base de madera, base multicolor o parlante Bluetooth:', 'bot');
          this.suggestProducts(['lamp-led-madera', 'lamp-led-parlante', 'lamp-led-grietas']);
          break;

        case 'show_cupulas':
          this.addMessage('Cúpulas de cristal con flores naturales preservadas y luces cálidas:', 'bot');
          this.suggestProducts(['cupula-girasol', 'cupula-rosa-eterna']);
          break;

        case 'show_events':
          this.addMessage('Disponemos de recuerdos finamente cortados y grabados a láser para eventos:', 'bot');
          this.suggestProducts(['recuerdos-graduacion', 'recuerdos-bautizo', 'placa-reconocimiento']);
          break;

        case 'shipping_info':
          this.addMessage('**Información de Elaboración y Envíos:**\n\n- **Tiempo de producción:** 3 a 5 días hábiles.\n- **Taller principal:** Calle 12 de Febrero, Lago Agrio.\n- **Envíos:** Envíos a todo el país vía Servientrega con número de rastreo.', 'bot');
          this.showQuickOptions([
            { label: 'Cotizar envío por WhatsApp', action: 'whatsapp_contact' },
            { label: 'Volver al Menú Principal', action: 'main_menu' }
          ]);
          break;

        case 'custom_quote':
          this.addMessage('Realizamos corte y grabado personalizado en Acrílico, Madera MDF, Cuero y Papel Fino.\n\nPuede enviarnos sus medidas e imagen por WhatsApp:', 'bot');
          this.showQuickOptions([
            { label: 'Conversar con un Asesor en WhatsApp', action: 'whatsapp_contact' }
          ]);
          break;

        case 'gift_padre':
          this.addMessage('Para caballeros, la Lámpara LED con Base de Madera Grabada o Agendas en Cuero son excelentes alternativas:', 'bot');
          this.suggestProducts(['lamp-led-madera', 'agendas-cuero-laser']);
          break;

        case 'gift_madre':
          this.addMessage('Para damas, la Cúpula de Cristal con Girasol Eterno o Portarretratos Dobles son los preferidos:', 'bot');
          this.suggestProducts(['cupula-girasol', 'portarretrato-doble']);
          break;

        case 'gift_grado':
          this.addMessage('Para graduaciones, las Placas Honoríficas y Recuerdos con Birrete son las mejores opciones:', 'bot');
          this.suggestProducts(['placa-reconocimiento', 'recuerdos-graduacion']);
          break;

        case 'gift_bautizo':
          this.addMessage('Para bautizos y baby shower, contamos con delicadas cruces y figuras en acrílico espejado:', 'bot');
          this.suggestProducts(['recuerdos-bautizo', 'recuerdos-babyshower']);
          break;

        case 'gift_boda':
          this.addMessage('Para bodas y aniversarios, le recomendamos los letreros de bienvenida en acrílico y cúpulas encantadas:', 'bot');
          this.suggestProducts(['recuerdos-matrimonio', 'cupula-rosa-eterna']);
          break;

        case 'main_menu':
          this.showGreeting();
          break;

        case 'whatsapp_contact':
          window.open('https://wa.me/593989926138?text=Hola,%20solicito%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios.', '_blank');
          break;

        default:
          this.addMessage('¿En qué más le puedo colaborar?', 'bot');
          this.showQuickOptions(CHATBOT_KNOWLEDGE.options);
      }
    }, 400);
  }

  processQuery(query) {
    if (query.includes('lámpara') || query.includes('lampara') || query.includes('luz')) {
      this.handleAction('show_lamps');
    } else if (query.includes('flor') || query.includes('girasol') || query.includes('rosa') || query.includes('cupula')) {
      this.handleAction('show_cupulas');
    } else if (query.includes('envio') || query.includes('entrega') || query.includes('tiempo') || query.includes('lago agrio')) {
      this.handleAction('shipping_info');
    } else if (query.includes('precio') || query.includes('costo') || query.includes('cuanto')) {
      this.addMessage('Nuestros productos son personalizados y elaborados bajo pedido. Si desea cotizar un modelo o requerimiento por mayor, con gusto le atendemos por WhatsApp.', 'bot');
      this.showQuickOptions([
        { label: 'Cotizar por WhatsApp', action: 'whatsapp_contact' },
        { label: 'Volver al Menú Principal', action: 'main_menu' }
      ]);
    } else {
      this.addMessage('He recibido su consulta. Le sugiero estas opciones o si prefiere, conversemos por WhatsApp:', 'bot');
      this.showQuickOptions(CHATBOT_KNOWLEDGE.options);
    }
  }

  suggestProducts(productIds) {
    productIds.forEach(id => {
      const p = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(item => item.id === id) : null;
      if (p) {
        const card = document.createElement('div');
        card.style.cssText = 'background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.75rem; border-radius: var(--radius-md); margin-top: 0.5rem; display: flex; gap: 0.75rem; align-items: center;';
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
          <div style="flex-grow: 1;">
            <h5 style="font-size: 0.85rem; color: var(--text-primary); font-weight: 600; line-height: 1.2;">${p.name}</h5>
          </div>
          <button onclick="window.productModal.openProduct('${p.id}')" style="background: var(--color-celeste-dark); color: #fff; padding: 0.35rem 0.65rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700;">
            Ver
          </button>
        `;
        this.messagesContainer.appendChild(card);
      }
    });

    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

// Inicializar globalmente
document.addEventListener('DOMContentLoaded', () => {
  window.laserBot = new LaserBot();
});
