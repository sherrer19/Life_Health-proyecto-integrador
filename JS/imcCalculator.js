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

    // Mostrar resultados del IMC
    document.getElementById('imcValue').textContent = imc;
    document.getElementById('imcCategory').textContent = category;
    document.getElementById('recommendedPlan').textContent = recommendedPlan;

    // Calcular grasa corporal si hay datos (opcional)
    if (document.getElementById('bodyFatFieldset').style.display === 'block') {
        const gender = document.getElementById('gender').value;
        const neck = parseFloat(document.getElementById('neck').value);
        const waist = parseFloat(document.getElementById('waist').value);
        const hip = gender === "female" ? parseFloat(document.getElementById('hip').value) : 0;

        if (!isNaN(neck) && !isNaN(waist) && (gender === "male" || !isNaN(hip))) {
            const fatPercentage = calculateBodyFat(gender, height*100, neck, waist, hip);
            const fatCategory = classifyBodyFat(gender, fatPercentage);
            
            document.getElementById('fatValue').textContent = `${fatPercentage}%`;
            document.getElementById('fatCategory').textContent = fatCategory;
            document.getElementById('bodyFatResult').style.display = 'block';

            // Mejorar recomendación con ambos datos
            const enhancedPlan = enhanceRecommendation(recommendedPlan, fatPercentage, gender);
            document.getElementById('recommendedPlan').textContent = enhancedPlan;
        }
    }

    // Seleccionar automáticamente el botón del plan recomendado
    document.querySelector(`input[value="${recommendedPlan}"]`).checked = true;

    // Ocultar formulario inicial y mostrar resultados
    document.getElementById('healthForm').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    // Guardar datos en sessionStorage (temporales)
    sessionStorage.setItem('userPhysicalData', JSON.stringify({
        age,
        weight,
        height,
        imc,
        fatPercentage: document.getElementById('fatValue')?.textContent || null,
        recommendedPlan: document.querySelector('input[name="goal"]:checked').value
    }));
}

// Clasifica el IMC según la OMS (original)
function getImcDiagnosis(imc) {
    let category, recommendedPlan;

    if (imc < 18.5) {
        category = "Bajo peso";
        recommendedPlan = "Ganar Masa Muscular";
    } else if (imc < 25) {
        category = "Peso normal";
        recommendedPlan = "Tonificar";
    } else if (imc < 30) {
        category = "Sobrepeso";
        recommendedPlan = "Perder Peso";
    } else {
        category = "Obesidad";
        recommendedPlan = "Perder Peso";
    }

    return { category, recommendedPlan };
}

// ================== NUEVAS FUNCIONES (GRASA CORPORAL) ================== //
function calculateBodyFat(gender, heightCm, neckCm, waistCm, hipCm = 0) {
    // Fórmula de la Marina de EE.UU.
    if (gender === "male") {
        return (86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(heightCm) + 36.76).toFixed(1);
    } else {
        return (163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(heightCm) - 78.387).toFixed(1);
    }
}

function classifyBodyFat(gender, fatPercentage) {
    const fat = parseFloat(fatPercentage);
    
    if (gender === "male") {
        if (fat < 6) return "Grasa esencial";
        if (fat < 14) return "Atlético";
        if (fat < 18) return "Fitness";
        if (fat < 25) return "Promedio";
        return "Obeso";
    } else {
        if (fat < 14) return "Grasa esencial";
        if (fat < 21) return "Atlética";
        if (fat < 25) return "Fitness";
        if (fat < 32) return "Promedio";
        return "Obesa";
    }
}

function enhanceRecommendation(basePlan, fatPercentage, gender) {
    const fat = parseFloat(fatPercentage);
    const isMale = gender === "male";
    
    // Lógica para mejorar la recomendación basada en grasa corporal
    if (basePlan === "Perder Peso") {
        if (isMale && fat > 25 || !isMale && fat > 32) {
            return "Plan Intensivo Quema Grasa (Dieta estricta + Cardio diario)";
        }
        return "Plan Balanceado Pérdida de Peso";
    } else if (basePlan === "Ganar Masa Muscular") {
        if (isMale && fat < 10 || !isMale && fat < 18) {
            return "Plan Volumen Limpio (Superávit calórico controlado)";
        }
        return "Plan Masa Muscular con Definición";
    }
    return basePlan + " (Plan Standard)";
}

// ================== EVENT LISTENERS (ORIGINALES + NUEVOS) ================== //
document.getElementById('healthForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateIMC();
});

// Botón para mostrar/ocultar campos de grasa corporal
document.getElementById('toggleBodyFat').addEventListener('click', function() {
    const fieldset = document.getElementById('bodyFatFieldset');
    if (fieldset.style.display === 'none') {
        fieldset.style.display = 'block';
        this.innerHTML = '<i class="fas fa-minus-circle"></i> Ocultar datos de grasa corporal';
    } else {
        fieldset.style.display = 'none';
        this.innerHTML = '<i class="fas fa-plus-circle"></i> Agregar datos para % de grasa';
    }
});

// Mostrar/ocultar campo cadera según género
document.getElementById('gender').addEventListener('change', function() {
    document.getElementById('hipRow').style.display = 
        this.value === "female" ? 'block' : 'none';
});

// Validaciones originales
document.getElementById('weight').addEventListener('blur', function() {
    if (this.value <= 0) alert("El peso debe ser mayor a 0.");
});

document.getElementById('height').addEventListener('blur', function() {
    if (this.value <= 0) alert("La estatura debe ser mayor a 0.");
});

// Evento al confirmar el plan (original)
document.getElementById('confirmPlanBtn').addEventListener('click', function() {
    const selectedPlan = document.querySelector('input[name="goal"]:checked').value;
    const physicalData = JSON.parse(sessionStorage.getItem('userPhysicalData'));
    physicalData.recommendedPlan = selectedPlan;
    sessionStorage.setItem('userPhysicalData', JSON.stringify(physicalData));
    window.location.href = '/html/registroCompleto.html';
});