document.addEventListener("DOMContentLoaded", function () {
  const App = {
    // 1. CONFIGURACIÓN Y ESTADO INICIAL
    config: {
      classes: {
        ACTIVE_SECTION: "active-section",
        ACTIVE_LINK: "active",
      },
      sectionData: {
        inicio: { icon: "fa-home", name: "Inicio" },
        rutinas: { icon: "fa-dumbbell", name: "Mi Rutina" },
        alimentacion: { icon: "fa-utensils", name: "Plan Alimenticio" },
        progreso: { icon: "fa-chart-line", name: "Progreso" },
        "video-coaching": { icon: "fa-video", name: "Video Coaching" },
        convenios: { icon: "fa-handshake", name: "Convenios" },
        membresia: { icon: "fa-credit-card", name: "Membresía" },
        configuracion: { icon: "fa-cog", name: "Configuración" },
      },
      planDetails: {
        "Perder Peso": {
          routines: [
            { day: "Lunes", date: "10 Jun", icon: "fa-fire-alt", title: "Cardio Intenso", time: "45", kcal: "450", status: "completed" },
            { day: "Martes", date: "11 Jun", icon: "fa-dumbbell", title: "Fuerza Superior", time: "50", kcal: "380", status: "pending" },
            { day: "Miércoles", date: "12 Jun", icon: "fa-walking", title: "Cardio Moderado", time: "30", kcal: "300", status: "pending" },
            { day: "Jueves", date: "13 Jun", icon: "fa-dumbbell", title: "Fuerza Inferior", time: "55", kcal: "420", status: "pending" },
            { day: "Viernes", date: "14 Jun", icon: "fa-fire-alt", title: "HIIT", time: "30", kcal: "500", status: "pending" },
            { day: "Sábado", date: "15 Jun", icon: "fa-spa", title: "Día de Descanso", isRest: true, message: "Recuperación activa recomendada." },
            { day: "Domingo", date: "16 Jun", icon: "fa-swimming-pool", title: "Cardio Opcional", time: "40", kcal: "350", status: "pending" },
          ],
          nutrition: { title: "Plan Alimenticio para Perder Peso", subtitle: "Diseñado para un déficit calórico saludable y sostenible.", kcal: "1,800-2,000", macros: "40-30-30", mealsPerDay: 5 },
          progressChart: { labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'], datasets: [{ label: 'Peso (kg)', data: [80.0, 79.5, 79.2, 78.5, 78.0, 77.4], borderColor: 'rgba(231, 76, 60, 1)', backgroundColor: 'rgba(231, 76, 60, 0.1)' }] },
        },
        "Tonificar": {
            routines: [
             { day: "Lunes", date: "10 Jun", icon: "fa-dumbbell", title: "Tren Superior (Empuje)", time: "60", kcal: "480", status: "completed" },
             { day: "Martes", date: "11 Jun", icon: "fa-dumbbell", title: "Tren Inferior (Foco Cuáds)", time: "60", kcal: "550", status: "pending" },
             { day: "Miércoles", date: "12 Jun", icon: "fa-fire-alt", title: "HIIT y Abdominales", time: "35", kcal: "400", status: "pending" },
             { day: "Jueves", date: "13 Jun", icon: "fa-dumbbell", title: "Tren Superior (Tracción)", time: "60", kcal: "460", status: "pending" },
             { day: "Viernes", date: "14 Jun", icon: "fa-dumbbell", title: "Tren Inferior (Foco Glúteo)", time: "60", kcal: "520", status: "pending" },
             { day: "Sábado", date: "15 Jun", icon: "fa-spa", title: "Día de Descanso", isRest: true, message: "Recuperación activa recomendada." },
             { day: "Domingo", date: "16 Jun", icon: "fa-spa", title: "Día de Descanso", isRest: true, message: "El descanso es clave para crecer." },
           ],
           nutrition: { title: "Plan Alimenticio para Tonificar", subtitle: "Diseñado para maximizar la síntesis de proteínas y la recuperación muscular.", kcal: "2,000-2,200", macros: "40-40-20", mealsPerDay: 5 },
           progressChart: { labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'], datasets: [ { label: '% Masa Muscular', data: [42.5, 42.6, 42.8, 42.9, 43.1, 43.3], borderColor: 'rgba(46, 204, 113, 1)', backgroundColor: 'rgba(46, 204, 113, 0.1)'}, { label: '% Grasa Corporal', data: [18.1, 18.0, 17.8, 17.7, 17.5, 17.4], borderColor: 'rgba(243, 156, 18, 1)', backgroundColor: 'rgba(243, 156, 18, 0.1)'} ] },
        },
        "Ganar Masa Muscular": {
            routines: [
              { day: "Lunes", date: "10 Jun", icon: "fa-dumbbell", title: "Pecho y Tríceps", time: "75", kcal: "600", status: "completed" },
              { day: "Martes", date: "11 Jun", icon: "fa-dumbbell", title: "Espalda y Bíceps", time: "75", kcal: "620", status: "pending" },
              { day: "Miércoles", date: "12 Jun", icon: "fa-running", title: "Descanso o Cardio Ligero", isRest: true, message: "La recuperación es clave para el crecimiento." },
              { day: "Jueves", date: "13 Jun", icon: "fa-dumbbell", title: "Piernas (Completo)", time: "90", kcal: "800", status: "pending" },
              { day: "Viernes", date: "14 Jun", icon: "fa-dumbbell", title: "Hombros y Trapecios", time: "60", kcal: "550", status: "pending" },
              { day: "Sábado", date: "15 Jun", icon: "fa-dumbbell", title: "Brazos y Abdominales", time: "45", kcal: "400", status: "pending" },
              { day: "Domingo", date: "16 Jun", icon: "fa-spa", title: "Día de Descanso Total", isRest: true, message: "Nutrición y descanso para reconstruir." },
            ],
            nutrition: { title: "Plan Alimenticio para Masa Muscular", subtitle: "Diseñado para un superávit calórico controlado que maximice el crecimiento.", kcal: "3,000-3,200", macros: "35-45-20", mealsPerDay: 6 },
            progressChart: { labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6'], datasets: [ { label: 'Peso Corporal (kg)', data: [76.0, 77.5, 78.5, 80.0, 81.0, 82.5], borderColor: 'rgba(52, 152, 219, 1)', backgroundColor: 'rgba(52, 152, 219, 0.1)' }, { label: 'Fuerza: Press Banca (kg)', data: [80, 82.5, 85, 87.5, 90, 92.5], borderColor: 'rgba(155, 89, 182, 1)', backgroundColor: 'rgba(155, 89, 182, 0.1)' } ] },
        },
      },
    },

    state: {
      currentUser: null,
      currentChart: null,
    },

    DOMElements: {},

    // 2. FUNCIÓN DE INICIO
    init() {
      this.cacheDOMElements();
      if (!this.handleAuthentication()) return;
      this.updateUserInfoAndRenderContent();
      this.bindEvents();
      this.showInitialSection();
    },

    // 3. MÉTODOS DE PREPARACIÓN
    cacheDOMElements() {
      this.DOMElements = {
        userName: document.getElementById("userName"),
        userPlan: document.getElementById("userPlan"),
        welcomeName: document.getElementById("welcomeName"),
        logoutBtn: document.getElementById("logoutBtn"),
        navContainer: document.querySelector(".dashboard-nav"),
        contentSections: document.querySelectorAll(".content-section"),
        sectionTitle: document.getElementById("section-title"),
        breadcrumbCurrent: document.getElementById("breadcrumb-current"),
        settingsContainer: document.getElementById("configuracion-section"),
        currentEmailField: document.getElementById("current-email"),
        settingsAlertContainer: document.getElementById("settings-alert-container"),
        weekDaysContainer: document.querySelector(".week-days"),
        nutritionTitle: document.querySelector("#alimentacion-section .section-header h2"),
        nutritionSubtitle: document.querySelector("#alimentacion-section .section-subtitle"),
        nutritionFacts: document.querySelectorAll(".nutrition-facts .fact-item"),
        progressChartCanvas: document.getElementById("myProgressChart"),
        conveniosSection: document.getElementById("convenios-section"),
      };
    },

    handleAuthentication() {
      try {
        const userData = sessionStorage.getItem("currentUser");
        if (!userData) {
          window.location.href = "login.html";
          return false;
        }
        this.state.currentUser = JSON.parse(userData);
        if (!this.config.planDetails[this.state.currentUser.recommendedPlan]) {
          console.error(`Plan "${this.state.currentUser.recommendedPlan}" no encontrado.`);
          this.state.currentUser.recommendedPlan = "Perder Peso";
        }
        return true;
      } catch (error) {
        console.error("Error al autenticar:", error);
        window.location.href = "login.html";
        return false;
      }
    },

    // 4. MÉTODOS DE RENDERIZADO Y ACTUALIZACIÓN DE UI
    updateUserInfoAndRenderContent() {
      const { firstName, lastName, recommendedPlan, email } = this.state.currentUser;
      if (this.DOMElements.userName) this.DOMElements.userName.textContent = `${firstName} ${lastName}`;
      if (this.DOMElements.userPlan) this.DOMElements.userPlan.textContent = `Plan: ${recommendedPlan}`;
      if (this.DOMElements.welcomeName) this.DOMElements.welcomeName.textContent = firstName;
      if (this.DOMElements.currentEmailField) this.DOMElements.currentEmailField.value = email;
      const planData = this.config.planDetails[recommendedPlan];
      if (planData) {
        this.renderRoutines(planData.routines);
        this.renderNutrition(planData.nutrition);
        this.renderProgressChart(planData.progressChart);
      }
    },

    renderRoutines(routines) {
      if (!this.DOMElements.weekDaysContainer) return;
      let html = "";
      routines.forEach((r) => {
        if (r.isRest) {
          html += `<div class="day-card rest-day"><div class="day-header"><h3>${r.day}</h3><span>${r.date}</span></div><div class="workout-type"><i class="fas ${r.icon}"></i><span>${r.title}</span></div><p class="rest-message">${r.message}</p><div class="completion-status">Planificado</div></div>`;
        } else {
          html += `<div class="day-card"><div class="day-header"><h3>${r.day}</h3><span>${r.date}</span></div><div class="workout-type"><i class="fas ${r.icon}"></i><span>${r.title}</span></div><ul class="workout-details"><li><i class="fas fa-clock"></i> ${r.time} minutos</li><li><i class="fas fa-burn"></i> ${r.kcal} kcal estimadas</li></ul><div class="completion-status ${r.status}">${r.status === "completed" ? "Completado" : "Pendiente"}</div></div>`;
        }
      });
      this.DOMElements.weekDaysContainer.innerHTML = html;
    },

    renderNutrition(nutrition) {
      if (this.DOMElements.nutritionTitle) this.DOMElements.nutritionTitle.innerHTML = `<i class="fas fa-utensils"></i> ${nutrition.title}`;
      if (this.DOMElements.nutritionSubtitle) this.DOMElements.nutritionSubtitle.textContent = nutrition.subtitle;
      if (this.DOMElements.nutritionFacts.length === 3) {
        this.DOMElements.nutritionFacts[0].querySelector(".fact-value").textContent = nutrition.kcal;
        this.DOMElements.nutritionFacts[1].querySelector(".fact-value").textContent = nutrition.macros;
        this.DOMElements.nutritionFacts[2].querySelector(".fact-value").textContent = nutrition.mealsPerDay;
      }
    },

    renderProgressChart(chartData) {
      if (!this.DOMElements.progressChartCanvas) return;
      if (this.state.currentChart) {
        this.state.currentChart.destroy();
      }
      const ctx = this.DOMElements.progressChartCanvas.getContext("2d");
      this.state.currentChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.labels,
          datasets: chartData.datasets.map((dataset) => ({ ...dataset, fill: true, tension: 0.3 })),
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: false } } },
      });
    },
    
    showInitialSection() {
        const initialSection = "inicio";
        const initialLink = this.DOMElements.navContainer.querySelector(`[data-section="${initialSection}"]`);
        const initialSectionContent = document.getElementById(`${initialSection}-section`);
        if (initialLink) initialLink.classList.add(this.config.classes.ACTIVE_LINK);
        if (initialSectionContent) initialSectionContent.classList.add(this.config.classes.ACTIVE_SECTION);
        this.updateHeader(initialSection);
    },

    updateHeader(sectionKey) {
        const section = this.config.sectionData[sectionKey] || this.config.sectionData["inicio"];
        if (this.DOMElements.sectionTitle) this.DOMElements.sectionTitle.innerHTML = `<i class="fas ${section.icon}"></i> ${section.name}`;
        if (this.DOMElements.breadcrumbCurrent) this.DOMElements.breadcrumbCurrent.textContent = section.name;
    },

    // 5. MANEJADORES DE EVENTOS
    bindEvents() {
      this.DOMElements.navContainer.addEventListener("click", this.handleNavClick.bind(this));
      if (this.DOMElements.logoutBtn) {
        this.DOMElements.logoutBtn.addEventListener("click", this.handleLogout.bind(this));
      }
      if (this.DOMElements.settingsContainer) {
        this.DOMElements.settingsContainer.addEventListener("submit", this.handleSettingsFormSubmit.bind(this));
        this.DOMElements.settingsContainer.addEventListener("click", this.handleSettingsButtonClick.bind(this));
      }
      if (this.DOMElements.conveniosSection) {
        this.DOMElements.conveniosSection.addEventListener("click", this.handleTabClick.bind(this));
      }
    },

    handleNavClick(e) {
      const link = e.target.closest("a");
      if (!link || !this.DOMElements.navContainer.contains(link) || link.id === "logoutBtn") return;
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      if (!sectionId) return;
      this.DOMElements.navContainer.querySelectorAll("a").forEach((navLink) => navLink.classList.remove(this.config.classes.ACTIVE_LINK));
      link.classList.add(this.config.classes.ACTIVE_LINK);
      this.DOMElements.contentSections.forEach((sec) => sec.classList.remove(this.config.classes.ACTIVE_SECTION));
      const activeSection = document.getElementById(`${sectionId}-section`);
      if (activeSection) {
        activeSection.classList.add(this.config.classes.ACTIVE_SECTION);
        this.updateHeader(sectionId);
      }
    },
    
    handleTabClick(e) {
        const tabLink = e.target.closest(".tab-link");
        if (!tabLink) return;
        const conveniosSection = e.currentTarget; 
        const tabId = tabLink.dataset.tab;
        conveniosSection.querySelectorAll(".tab-link").forEach(link => link.classList.remove("active"));
        tabLink.classList.add("active");
        conveniosSection.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
        conveniosSection.querySelector(`#${tabId}-content`).classList.add("active");
    },

    handleLogout() {
      sessionStorage.removeItem("currentUser");
      window.location.href = "index.html";
    },

    showAlert(message, type = "success") {
      const alertDiv = document.createElement("div");
      alertDiv.className = `settings-alert alert-${type}`;
      alertDiv.textContent = message;
      if (this.DOMElements.settingsAlertContainer) {
        this.DOMElements.settingsAlertContainer.innerHTML = "";
        this.DOMElements.settingsAlertContainer.appendChild(alertDiv);
        setTimeout(() => {
          alertDiv.style.transition = "opacity 0.5s";
          alertDiv.style.opacity = "0";
          setTimeout(() => alertDiv.remove(), 500);
        }, 5000);
      }
    },

    handleSettingsFormSubmit(e) {
      e.preventDefault();
      const formId = e.target.id;
      if (formId === 'change-password-form') {
        const newPassword = e.target.elements['new-password'].value;
        const confirmPassword = e.target.elements['confirm-password'].value;
        if (newPassword !== confirmPassword) {
          this.showAlert('Las nuevas contraseñas no coinciden.', 'error');
          return;
        }
        this.showAlert('Contraseña actualizada con éxito.');
        e.target.reset();
      }
      if (formId === 'change-email-form') {
        const newEmail = e.target.elements['new-email'].value;
        if (!newEmail) return;
        this.state.currentUser.email = newEmail;
        sessionStorage.setItem('currentUser', JSON.stringify(this.state.currentUser));
        this.updateUserInfoAndRenderContent();
        this.showAlert('Correo electrónico actualizado con éxito.');
        e.target.reset();
      }
    },

    handleSettingsButtonClick(e) {
      if (e.target.id === 'delete-account-btn') {
        const isConfirmed = confirm('¿Estás SEGURO de que quieres eliminar tu cuenta?');
        if (isConfirmed) {
          this.handleLogout();
        }
      }
    },
  };

  // 6. INICIAR LA APLICACIÓN
  App.init();
});