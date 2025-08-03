'use strict';

// Helper para alternar clases
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Modal de certificados
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const openModal = () => {
  modalContainer.classList.add("active");
  overlay.classList.add("active");
};

const closeModal = () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    openModal();
  });
});

modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Filtros de proyectos (móvil + escritorio)
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const projectItems = document.querySelectorAll("[data-filter-item]");
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

const filterProjects = (category) => {
  const selected = category.toLowerCase();
  projectItems.forEach(item => {
    const itemCategory = item.dataset.category?.toLowerCase();
    const isActive = selected === "todos" || itemCategory === selected;
    item.classList.toggle("active", isActive);
  });
};

// Abrir/ocultar dropdown móvil
select.addEventListener("click", (event) => {
  event.stopPropagation();
  elementToggleFunc(select);
});

// Seleccionar categoría en dropdown móvil
selectItems.forEach(item => {
  item.addEventListener("click", function (event) {
    event.stopPropagation();
    const selectedText = this.innerText.trim();
    selectValue.innerText = selectedText;
    elementToggleFunc(select);
    filterProjects(selectedText);

    filterBtns.forEach(btn => {
      btn.classList.toggle("active", btn.innerText.trim() === selectedText);
    });
  });
});

// Selección desde botones escritorio
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedText = btn.innerText.trim();
    filterProjects(selectedText);

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Sincronizar texto del selector móvil
    selectValue.innerText = selectedText;
  });
});

// Validación de formulario de contacto
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.toggleAttribute("disabled", !form.checkValidity());
  });
});

// Navegación entre páginas
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    const targetPage = this.getAttribute("data-target");

    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    navigationLinks.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});
