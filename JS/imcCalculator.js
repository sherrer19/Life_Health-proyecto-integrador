// Calcula el IMC y muestra el resultado
function calculateIMC() {
    // Obtener datos del formulario
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Validar campos
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Calcular IMC (Peso / (Estatura^2))
    const imc = (weight / (height * height)).toFixed(1);

    // Obtener diagnóstico y plan recomendado según la OMS
    const { category, recommendedPlan } = getImcDiagnosis(imc);

    // Mostrar resultados en el HTML
    document.getElementById('imcValue').textContent = imc;
    document.getElementById('imcCategory').textContent = category;
    document.getElementById('recommendedPlan').textContent = recommendedPlan;

    // Seleccionar automáticamente el boton del plan recomendado
    document.querySelector(`input[value="${recommendedPlan}"]`).checked = true;

    // Ocultar formulario inicial y mostrar resultados
    document.getElementById('imcForm').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    // Guardar datos en sessionStorage (temporales)
    sessionStorage.setItem('userPhysicalData', JSON.stringify({
        age,
        weight,
        height,
        imc,
        recommendedPlan: document.querySelector('input[name="goal"]:checked').value
    }));
}

// Clasifica el IMC según la OMS y recomienda plan
function getImcDiagnosis(imc) {
    let category, recommendedPlan;

    if (imc < 18.5) {
        category = "Bajo peso";
        recommendedPlan = "Ganar Masa Muscular";
    } else if (imc >= 18.5 && imc < 25) {
        category = "Peso normal";
        recommendedPlan = "Tonificar";
    } else if (imc >= 25 && imc < 30) {
        category = "Sobrepeso";
        recommendedPlan = "Perder Peso";
    } else {
        category = "Obesidad";
        recommendedPlan = "Perder Peso";
    }

    return { category, recommendedPlan };
}

// Evento al enviar el formulario (botón Calcular Mi Plan)
document.getElementById('imcForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateIMC();
});

// Evento al confirmar el plan (boton Confirmar y Registrarme)
document.getElementById('confirmPlanBtn').addEventListener('click', function() {
    // Obtener el plan seleccionado (automático o manual)
    const selectedPlan = document.querySelector('input[name="goal"]:checked').value;

    // Actualizar el plan en sessionStorage
    const physicalData = JSON.parse(sessionStorage.getItem('userPhysicalData'));
    physicalData.recommendedPlan = selectedPlan;
    sessionStorage.setItem('userPhysicalData', JSON.stringify(physicalData));

    // Redirigir al formulario de registro completo
    window.location.href = '/html/registroCompleto.html';
});

// Validación adicional: Asegurar que los campos no estén vacíos
document.getElementById('weight').addEventListener('blur', function() {
    if (this.value <= 0) alert("El peso debe ser mayor a 0.");
});

document.getElementById('height').addEventListener('blur', function() {
    if (this.value <= 0) alert("La estatura debe ser mayor a 0.");
});