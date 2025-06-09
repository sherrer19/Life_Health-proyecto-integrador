document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const usersTableBody = document.getElementById('usersTableBody');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const userModal = document.getElementById('userModal');
    const closeModal = document.querySelector('.close-modal');
    const userForm = document.getElementById('userForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Cargar usuarios al iniciar
    loadUsers();

    // Buscar usuarios
    searchBtn.addEventListener('click', searchUsers);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchUsers();
    });

    // Cerrar modal
    closeModal.addEventListener('click', () => userModal.style.display = 'none');

    // Cerrar sesión
    logoutBtn.addEventListener('click', () => {
        window.location.href = '../html/index.html';
    });

    // Cargar usuarios desde localStorage
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        usersTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id || generarNuevoId()}</td>
                <td>${user.firstName} ${user.lastName || ''}</td>
                <td>${user.email}</td>
                <td>${user.recommendedPlan || 'No definido'}</td>
                <td>${user.imc || 'N/A'}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="openEditModal('${user.email}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteUser('${user.email}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
    }

    // Generar ID de 4 dígitos
    function generarNuevoId() {
        return Math.floor(1000 + Math.random() * 9000); // Número entre 1000 y 9999
    }

    // Validar formato de email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Buscar usuarios
    function searchUsers() {
        const query = searchInput.value.toLowerCase();
        const rows = usersTableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();
            const email = row.cells[2].textContent.toLowerCase();
            if (name.includes(query) || email.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Abrir modal para editar
    window.openEditModal = function(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        if (user) {
            document.getElementById('userId').value = user.email;
            document.getElementById('editFirstName').value = user.firstName || '';
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPlan').value = user.recommendedPlan || 'Tonificar';
            userModal.style.display = 'flex';
        }
    };

    // Guardar cambios (con validación de email)
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('editEmail').value;
        
        if (!validarEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }

        const originalEmail = document.getElementById('userId').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === originalEmail);

        if (userIndex !== -1) {
            // Verificar si el nuevo email ya existe (excepto para el usuario actual)
            if (email !== originalEmail && users.some(u => u.email === email)) {
                alert('Este correo electrónico ya está registrado');
                return;
            }

            users[userIndex] = {
                ...users[userIndex],
                firstName: document.getElementById('editFirstName').value,
                email: email,
                recommendedPlan: document.getElementById('editPlan').value
            };

            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            userModal.style.display = 'none';
            alert('Usuario actualizado correctamente');
        }
    });

    // Eliminar usuario
    window.deleteUser = function(email) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => u.email !== email);
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
            alert('Usuario eliminado correctamente');
        }
    };
});