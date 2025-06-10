// Esperar a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function() {

    // Recuperar los datos físicos del usuario guardados previamente en sessionStorage
    const physicalData = JSON.parse(sessionStorage.getItem('userPhysicalData'));

    // Si no hay datos previos (el usuario llegó sin completar el formulario IMC), redirigir
    if (!physicalData) {
        window.location.href = '/html/ComenzarAhora.html'; // Redirección obligatoria
        return; // Detener la ejecución del script
    }

    // Mostrar el plan recomendado en un input oculto (opcional, útil para depuración o confirmación)
    document.getElementById('recommendedPlan').value = physicalData.recommendedPlan;

    // Evento al enviar el formulario de registro completo
    document.getElementById('completeForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevenir recarga de página

        // Validar que las contraseñas coincidan
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return; // Salir si hay error
        }

        // Crear un objeto con todos los datos del usuario
        const userData = {
            ...physicalData, // Incluir edad, peso, estatura, IMC y plan recomendado
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            birthDate: document.getElementById('birthDate').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            password: password, // IMPORTANTE: En producción, se debe cifrar
            registrationDate: new Date().toISOString() // Fecha/hora de registro
        };

        // Obtener usuarios existentes del localStorage o inicializar como arreglo vacío
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Agregar el nuevo usuario a la lista
        users.push(userData);

        // Guardar el nuevo arreglo actualizado en localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Confirmar registro al usuario y redirigir al inicio o dashboard
        alert(`¡Registro exitoso! Tu plan es: ${physicalData.recommendedPlan}`);
        window.location.href = '/html/login.html';
    });
});