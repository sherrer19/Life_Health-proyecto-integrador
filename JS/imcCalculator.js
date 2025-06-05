document.getElementById('imcForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener datos
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    // Calcular IMC
    const imc = (weight / (height * height)).toFixed(1);
    const plan = recommendPlan(imc);

    // Mostrar resultado
    document.getElementById('imcValue').textContent = imc;
    document.getElementById('imcCategory').textContent = getImcCategory(imc);
    document.getElementById('recommendedPlan').textContent = plan;
    document.getElementById('imcForm').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';

    // Guardar datos temporales en SessionStorage (se borran al cerrar la pestaña)
    sessionStorage.setItem('userPhysicalData', JSON.stringify({
        age, weight, height, imc, recommendedPlan: plan
    }));
});

// Botón para redirigir al registro completo
document.getElementById('confirmPlanBtn').addEventListener('click', function() {
    window.location.href = '/html/registroCompleto.html'; // Nueva página
});

// Funciones auxiliares
function recommendPlan(imc) {
    if (imc < 18.5) return 'Ganar Masa Muscular';
    if (imc >= 25) return 'Perder Peso';
    return 'Tonificar';
}

function getImcCategory(imc) {
    if (imc < 18.5) return 'Bajo peso';
    if (imc >= 18.5 && imc < 25) return 'Peso normal';
    if (imc >= 25 && imc < 30) return 'Sobrepeso';
    return 'Obesidad';
}