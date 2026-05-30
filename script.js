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
let toastTimeout;
let selectedService = "";

const serviceDetails = {
  "Desarrollo de páginas web":
    "Diseñamos sitios corporativos claros, responsivos y orientados a convertir visitas en nuevas oportunidades comerciales.",
  "Gestión de redes sociales":
    "Planificamos contenido y presencia digital para comunicar el valor de tu marca de forma consistente en cada canal.",
  "Publicidad digital pagada":
    "Creamos campañas segmentadas para ampliar el alcance, atraer prospectos y medir resultados con mayor precisión.",
  "Diseño de marca y contenido visual":
    "Construimos una identidad visual profesional con piezas coherentes para fortalecer la percepción de tu empresa.",
  "Automatización de procesos":
    "Conectamos tareas y formularios para reducir trabajo manual y acelerar la atención de cada solicitud.",
  "CRM y gestión de clientes":
    "Organizamos el seguimiento comercial con una vista centralizada de clientes, etapas y oportunidades.",
  "Analítica y reportes":
    "Transformamos datos en indicadores simples para evaluar rendimiento y tomar decisiones informadas.",
  "Hosting, dominio y soporte técnico":
    "Mantenemos tu presencia digital disponible y acompañada por soporte técnico cuando lo necesites.",
};

const projectDetails = {
  "Sitio web corporativo":
    "Propuesta institucional ficticia enfocada en jerarquía visual, servicios destacados y canales de contacto directos.",
  "Landing page comercial":
    "Ejemplo de una experiencia de campaña breve, persuasiva y preparada para registrar nuevos prospectos.",
  "Catálogo digital de servicios":
    "Maqueta de un catálogo que facilita explorar alternativas y comprender el alcance de cada solución.",
  "Sistema de atención al cliente":
    "Vista simulada de un CRM ligero para revisar solicitudes, priorizar contactos y ordenar la gestión comercial.",
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
  modalCopy.textContent = copy;
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
    "Un asesor de Bakerwoord se comunicará contigo."
  );
  requestForm.reset();
  selectPlan("Plan Empresarial", false);
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("Mensaje registrado", "Gracias por escribirnos. Te contactaremos muy pronto.");
  contactForm.reset();
});

document.querySelector("#refresh-dashboard").addEventListener("click", (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "Actualizando...";

  window.setTimeout(() => {
    button.innerHTML = 'Actualizar datos <svg class="icon"><use href="#icon-arrow"></use></svg>';
    button.disabled = false;
    showToast("Panel actualizado", "Los datos simulados están al día.");
  }, 700);
});

document.querySelectorAll(".status-filter button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".status-filter button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("tbody tr").forEach((row) => {
      row.hidden = filter !== "Todos" && row.dataset.status !== filter;
    });
  });
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const observedSections = [...document.querySelectorAll("main section[id]")];

function updateScrollState() {
  backToTop.classList.toggle("show", window.scrollY > 700);

  const currentSection = observedSections
    .filter((section) => section.offsetTop <= window.scrollY + 160)
    .at(-1);

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
