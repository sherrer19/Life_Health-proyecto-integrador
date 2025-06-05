document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = '/html/login.html';
        return;
    }

    // Mostrar información del usuario
    document.getElementById('userName').textContent = currentUser.firstName + ' ' + currentUser.lastName;
    document.getElementById('userPlan').textContent = 'Plan: ' + currentUser.recommendedPlan;
    document.getElementById('welcomeName').textContent = currentUser.firstName;

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        sessionStorage.removeItem('currentUser');
        window.location.href = '/html/index.html';
    });

    
});