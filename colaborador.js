$(document).ready(function () {
    // Cargar roles y estados desde el backend
    $.get('colaborador.php', function (data) {
        if (data.roles && data.estados) {
            // Llenar el select de roles
            data.roles.forEach(role => {
                $('#rolColab').append(`<option value="${role.idRol}">${role.rol}</option>`);
    
            });
            // Llenar el select de estados
            data.estados.forEach(state => {
                $('#estaColab').append(`<option value="${state.idEstado}">${state.estado}</option>`);
            });
        }
    }, 'json');

    // Manejar el envío del formulario
    $('#form').on('submit', function (e) {
        e.preventDefault();

        const formData = {
            id: $('#idColab').val(),
            nombre: $('#nombreColab').val(),
            apellido: $('#apeColab').val(),
            telefono: $('#telColab').val(),
            rol: $('#rolColab').val(),
            estado: $('#estaColab').val(),
            direccion: $('#direColab').val()
        };

        $.post('colaborador.php', formData, function (response) {
            alert(response.message);
            if (response.status === 'success') {
                $('#form')[0].reset(); // Limpiar el formulario después de guardar
            }
        }, 'json').fail(function () {
            alert('Hubo un error al procesar la solicitud.');
        });
    });
});
