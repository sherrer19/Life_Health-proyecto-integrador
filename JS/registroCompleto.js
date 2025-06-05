document.addEventListener('DOMContentLoaded', function() {
    // Recuperar datos del primer formulario (sessionStorage)
    const physicalData = JSON.parse(sessionStorage.getItem('userPhysicalData'));
    if (!physicalData) {
        window.location.href = '/html/ComenzarAhora.html'; // Redirige si no hay datos
        return;
    }

    // Mostrar el plan recomendado en un campo oculto (opcional para debug)
    document.getElementById('recommendedPlan').value = physicalData.recommendedPlan;

    // Guardar todo al enviar el formulario
    document.getElementById('completeForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar contraseñas
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Crear objeto con todos los datos
        const userData = {
            ...physicalData, // Datos del IMC (edad, peso, estatura, plan)
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            birthDate: document.getElementById('birthDate').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            password: password, // ¡OJO! En producción, esto debe cifrarse.
            registrationDate: new Date().toISOString()
        };

        // Guardar en localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));

        // Redirigir al usuario (ej: a una página de confirmación)
        alert(`¡Registro exitoso! Tu plan es: ${physicalData.recommendedPlan}`);
        window.location.href = '/html/index.html';
    });
});