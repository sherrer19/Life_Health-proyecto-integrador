document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Obtener usuarios registrados
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Buscar usuario
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Guardar sesión
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirigir según plan
            switch(user.recommendedPlan) {
                case 'Perder Peso':
                    window.location.href = '/html/dashboardPeso.html';
                    break;
                case 'Ganar Masa Muscular':
                    window.location.href = '/html/dashboard-masa-muscular.html';
                    break;
                case 'Tonificar':
                    window.location.href = '/html/dashboard-tonificar.html';
                    break;
                default:
                    window.location.href = '/html/dashboard.html';
            }
        } else {
            alert('Correo o contraseña incorrectos. Por favor intenta nuevamente.');
        }
    });
});