'use strict';

// Función para alternar clases
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

// Filtros de proyectos (móvil y escritorio)
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

// Seleccionar opción del dropdown móvil
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


filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedText = btn.innerText.trim();
    filterProjects(selectedText);

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");


    selectValue.innerText = selectedText;
  });
});

// Validación de formulario 
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


  const tecnologiasData = [
    { id: 1, nombre: "HTML", imagen: "html" },
    { id: 2, nombre: "CSS", imagen: "css" },
    { id: 3, nombre: "JavaScript", imagen: "javascript" },
    { id: 4, nombre: "React", imagen: "react" },
    { id: 5, nombre: "Node.js", imagen: "nodejs" },
    { id: 6, nombre: "Python", imagen: "python" },
    { id: 7, nombre: "Github", imagen: "github" },
    { id: 8, nombre: "Figma", imagen: "figma" },
    { id: 9, nombre: "Docker", imagen: "docker" },
    { id: 10, nombre: "macOS", imagen: "apple" },
    { id: 11, nombre: "Linux", imagen: "linux" },
    { id: 12, nombre: "Windows", imagen: "windows" },
    { id: 13, nombre: "Android studio", imagen: "androidstudio" },
    { id: 14, nombre: "AWS", imagen: "aws" },
    { id: 15, nombre: "Azure", imagen: "azure" },
    { id: 16, nombre: "Google cloud", imagen: "googlecloud" },
    { id: 17, nombre: "Visual studio", imagen: "visual" },
    { id: 18, nombre: "Visual studio code", imagen: "vscode" },
    { id: 19, nombre: "IntelliJ", imagen: "intellij" },
    { id: 20, nombre: "Unreal", imagen: "unreal" },
    { id: 21, nombre: "Blender", imagen: "blender" },

  ];

  function renderTecnologias(trackId) {
    const track = document.getElementById(trackId);
    for (let i = 0; i < 2; i++) { 
      tecnologiasData.forEach(tecnologia => {
        const item = document.createElement("div");
        item.className = "tecnologia-item";
        item.innerHTML = `
          <img src="./assets/images/${tecnologia.imagen}.svg" alt="imagen de ${tecnologia.nombre}" />
          <span>${tecnologia.nombre}</span>
        `;
        track.appendChild(item);

        item.style.animationDuration = `${Math.random() * 10 + 10}s`; 

      });
    }
  }

  renderTecnologias("scroll-track-1");
  renderTecnologias("scroll-track-2");


    document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
    }
  });

  
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  
  const maxIframes = 4;
  let wrappedCount = 0;

  const observer = new MutationObserver(() => {
    const iframes = document.querySelectorAll('iframe[src*="credly.com"]');
    iframes.forEach(iframe => {
      if (!iframe.dataset.wrapped) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.width = iframe.width + "px";
        wrapper.style.height = iframe.height + "px";

        iframe.parentNode.insertBefore(wrapper, iframe);
        wrapper.appendChild(iframe);

        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "10";
        overlay.style.cursor = "default";

        wrapper.appendChild(overlay);

        iframe.dataset.wrapped = "true";
        wrappedCount++;
      }
    });

    if (wrappedCount >= maxIframes) {
      observer.disconnect(); 
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });