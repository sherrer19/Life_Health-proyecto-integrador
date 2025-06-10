// Espera a que todo el HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Captura los elementos del HTML para poder usarlos con JavaScript
    const usersTableBody = document.getElementById('usersTableBody'); // Cuerpo de la tabla donde se muestran los usuarios
    const searchInput = document.getElementById('searchInput');       // para escribir la búsqueda
    const searchBtn = document.getElementById('searchBtn');           // Botón para buscar usuarios
    const userModal = document.getElementById('userModal');           // Modal para editar usuarios
    const closeModal = document.querySelector('.close-modal');        // Botón para cerrar venta emergente (modal)
    const userForm = document.getElementById('userForm');             // Formulario de edición
    const logoutBtn = document.getElementById('logoutBtn');           // Botón para cerrar sesión

    // Muestra los usuarios guardados en la tabla al cargar la página
    loadUsers();

    // Eventos para buscar usuarios
    searchBtn.addEventListener('click', searchUsers); // Buscar con botón
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') searchUsers(); // Buscar con Enter
    });

    // Evento para cerrar el modal de edición
    closeModal.addEventListener('click', () => userModal.style.display = 'none');

    // Evento para cerrar sesión (redirige al inicio de sesión)
    logoutBtn.addEventListener('click', () => {
        window.location.href = '../html/index.html';
    });

    // Función que carga los usuarios desde localStorage y los muestra en la tabla
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || []; // Obtiene los usuarios o un array vacío si no hay nada
        usersTableBody.innerHTML = ''; // Limpia la tabla antes de llenarla

        users.forEach(user => {
            const row = document.createElement('tr'); // Crea una fila
            row.innerHTML = `
                <td>${user.id || generarNuevoId()}</td>
                <td>${user.firstName} ${user.lastName || ''}</td>
                <td>${user.email}</td>
                <td>${user.recommendedPlan || 'No definido'}</td>
                <td>${user.imc || 'N/A'}</td>
                <td>
                    <!-- Botones para editar y eliminar -->
                    <button class="action-btn edit-btn" onclick="openEditModal('${user.email}')">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteUser('${user.email}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </td>
            `;
            usersTableBody.appendChild(row); // Agrega la fila a la tabla
        });
    }

    // Función que genera un ID aleatorio de 4 cifras si no hay ID
    function generarNuevoId() {
        return Math.floor(1000 + Math.random() * 9000); // Devuelve número entre 1000 y 9999
    }

    // Función que valida si el correo tiene un formato correcto
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
        return regex.test(email); // Retorna true si es válido
    }

    // Función para buscar usuarios en la tabla por nombre o email
    function searchUsers() {
        const query = searchInput.value.toLowerCase(); // Texto a buscar
        const rows = usersTableBody.querySelectorAll('tr'); // Todas las filas de la tabla

        rows.forEach(row => {
            const name = row.cells[1].textContent.toLowerCase();  // Columna del nombre
            const email = row.cells[2].textContent.toLowerCase(); // Columna del email
            // Muestra u oculta la fila dependiendo si coincide con lo buscado
            if (name.includes(query) || email.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Abre el modal y llena el formulario con los datos del usuario seleccionado
    window.openEditModal = function(email) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email); // Busca el usuario por email

        if (user) {
            document.getElementById('userId').value = user.email;
            document.getElementById('editFirstName').value = user.firstName || '';
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPlan').value = user.recommendedPlan || 'Tonificar';
            userModal.style.display = 'flex'; // Muestra el modal
        }
    };

    // Evento que guarda los cambios del usuario al enviar el formulario
    userForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se recargue

        const email = document.getElementById('editEmail').value;

        // Valida que el email tenga formato correcto
        if (!validarEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido');
            return;
        }

        const originalEmail = document.getElementById('userId').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === originalEmail);

        if (userIndex !== -1) {
            // Verifica si el nuevo email ya existe en otro usuario
            if (email !== originalEmail && users.some(u => u.email === email)) {
                alert('Este correo electrónico ya está registrado');
                return;
            }

            // Actualiza los datos del usuario
            users[userIndex] = {
                ...users[userIndex],
                firstName: document.getElementById('editFirstName').value,
                email: email,
                recommendedPlan: document.getElementById('editPlan').value
            };

            // Guarda los cambios en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers(); // Refresca la tabla
            userModal.style.display = 'none'; // Cierra el modal
            alert('Usuario actualizado correctamente');
        }
    });

    // Elimina un usuario según su email
    window.deleteUser = function(email) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            users = users.filter(u => u.email !== email); // Elimina al usuario
            localStorage.setItem('users', JSON.stringify(users)); // Guarda los cambios
            loadUsers(); // Refresca la tabla
            alert('Usuario eliminado correctamente');
        }
    };
});
