const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const planCards = document.querySelectorAll("[data-plan-card]");
const planButtons = document.querySelectorAll(".plan-select");
const planSelect = document.querySelector("#plan-select");
const serviceSelect = document.querySelector("#service-select");
const requestForm = document.querySelector("#request-form");
const contactForm = document.querySelector("#contact-form");
const backToTop = document.querySelector(".back-to-top");
const toast = document.querySelector("#toast");
const toastTitle = document.querySelector("#toast-title");
const toastMessage = document.querySelector("#toast-message");
const detailModal = document.querySelector("#detail-modal");
const modalTitle = document.querySelector("#modal-title");
const modalCopy = document.querySelector("#modal-copy");
const modalAction = document.querySelector("#modal-action");
const crmPanel = document.querySelector("#crm-panel");
const toggleCrm = document.querySelector("#toggle-crm");
let toastTimeout;
let selectedService = "";

const serviceDetails = {
  "Herramientas SaaS":
    "Integramos Schedule o Supercreator, Notion, Slack, Google Workspace y analítica para que el equipo tenga procesos, responsables y seguimiento en un solo ecosistema.",
  "Publicidad pagada":
    "Preparamos la operación de pauta en Reddit Ads, Twitter/X Ads, TikTok, Instagram, X y otros canales según la audiencia y el objetivo comercial.",
  "Almacenamiento y nube":
    "Organizamos Google Drive o Dropbox Business con carpetas, permisos y estructura de respaldos para activos, piezas, reportes y entregables.",
  "VPN y seguridad":
    "Configuramos VPN corporativa, gestión de contraseñas y protección de cuentas para reducir riesgos en accesos, campañas y herramientas críticas.",
  "Software de edición":
    "Centralizamos el uso de Adobe Creative Cloud y herramientas como Premiere, Lightroom y CapCut Pro para producción visual profesional.",
  "Misceláneos operativos":
    "Incluimos dominio, hosting web de la agencia e imprevistos menores que suelen aparecer durante la puesta en marcha de la operación.",
  "Locación de contenido":
    "Consideramos un espacio físico exclusivo para generar contenido, mantener consistencia visual y acelerar la producción de piezas.",
  "Software y herramientas CRM":
    "Integramos CRM de gestión, automatización de publicaciones, licencias de edición y VPNs corporativas para administrar clientes y contenido.",
  "Infraestructura tecnológica":
    "Planificamos el uso de aro de luz, cámaras o smartphone de alta gama, micrófono y estación de edición para producir con calidad constante.",
};

const projectDetails = {
  "Ecosistema SaaS y productividad":
    "Caso simulado que muestra cómo se ordenarían herramientas como Notion, Slack, Google Workspace y analítica para sostener la operación diaria.",
  "Campañas de publicidad pagada":
    "Escenario de pauta multicanal con seguimiento de estados, responsables, presupuesto y tareas asociadas a cada campaña.",
  "Producción de contenido en locación":
    "Vista de trabajo para coordinar espacio, software creativo, equipo técnico y entregables de contenido.",
  "CRM de gestión y automatización":
    "Panel reservado para revisar prospectos, tareas, estados de campaña y automatizaciones sin exponer la administración al público.",
};

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeMenu() {
  mainNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

function selectPlan(plan, shouldScroll = true) {
  planCards.forEach((card) => card.classList.toggle("selected", card.dataset.planCard === plan));
  planButtons.forEach((button) => {
    const isSelected = button.dataset.plan === plan;
    button.textContent = isSelected ? "Plan seleccionado" : "Seleccionar plan";
    button.classList.toggle("btn-primary", isSelected);
    button.classList.toggle("btn-outline", !isSelected);
  });
  planSelect.value = plan;

  if (shouldScroll) {
    showToast("Plan seleccionado", `${plan} se agregó a tu solicitud.`);
    scrollToSection("#solicitud");
  }
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => selectPlan(button.dataset.plan));
});

planSelect.addEventListener("change", () => selectPlan(planSelect.value, false));

function openModal(title, copy, service = "") {
  selectedService = service;
  modalTitle.textContent = title;
  modalCopy.textContent = copy || "Detalle disponible dentro de la propuesta integral.";
  detailModal.classList.add("open");
  detailModal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modalAction.focus();
}

function closeModal() {
  detailModal.classList.remove("open");
  detailModal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
}

document.querySelectorAll("[data-modal-close]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    closeMenu();
  }
});

document.querySelectorAll(".service-more").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.dataset.service;
    openModal(service, serviceDetails[service], service);
  });
});

document.querySelectorAll(".project-more").forEach((button) => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;
    openModal(project, projectDetails[project]);
  });
});

modalAction.addEventListener("click", () => {
  if (selectedService) {
    serviceSelect.value = selectedService;
  }
  closeModal();
  scrollToSection("#solicitud");
});

function showToast(title, message) {
  window.clearTimeout(toastTimeout);
  toastTitle.textContent = title;
  toastMessage.textContent = message;
  toast.classList.add("show");
  toastTimeout = window.setTimeout(() => toast.classList.remove("show"), 5000);
}

toast.querySelector("button").addEventListener("click", () => {
  toast.classList.remove("show");
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast(
    "Solicitud registrada correctamente",
    "Un asesor de INFINIA MEDIA S.A.S se comunicará contigo."
  );
  requestForm.reset();
  selectPlan("Plan Integral INFINIA", false);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Mensaje registrado", "Gracias por escribirnos. Te contactaremos muy pronto.");
  contactForm.reset();
});

toggleCrm.addEventListener("click", () => {
  const shouldShow = crmPanel.hidden;
  crmPanel.hidden = !shouldShow;
  toggleCrm.setAttribute("aria-expanded", String(shouldShow));
  toggleCrm.innerHTML = shouldShow
    ? 'Ocultar demo del CRM <svg class="icon"><use href="#icon-chevron"></use></svg>'
    : 'Ver demo del CRM <svg class="icon"><use href="#icon-arrow"></use></svg>';

  if (shouldShow) {
    showToast("CRM demo habilitado", "La vista interna ya está disponible para revisión.");
    crmPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

document.querySelector("#refresh-dashboard").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "Actualizando...";

  window.setTimeout(() => {
    button.innerHTML = 'Actualizar datos <svg class="icon"><use href="#icon-arrow"></use></svg>';
    button.disabled = false;
    showToast("Panel actualizado", "Los datos simulados del CRM están al día.");
  }, 700);
});

document.querySelectorAll(".status-filter button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".status-filter button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("#crm-panel tbody tr").forEach((row) => {
      row.hidden = filter !== "Todos" && row.dataset.status !== filter;
    });
  });
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const observedSections = [...document.querySelectorAll("main section[id]")];

function updateScrollState() {
  backToTop.classList.toggle("show", window.scrollY > 700);

  let currentSection;
  observedSections.forEach((section) => {
    if (section.offsetTop <= window.scrollY + 160) {
      currentSection = section;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection?.id}`);
  });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateScrollState();
