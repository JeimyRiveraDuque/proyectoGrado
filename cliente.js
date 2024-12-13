$(document).ready(function () {
    // Cargar roles y estados desde el backend
    $.get('cliente.php', function (data) {
        if (data.zonas) {
            // Llenar el select de roles
            data.zonas.forEach(zona => {
                $('#zona').append(`<option value="${zona.idZona}">${zona.nombrezona}</option>`);
            });   
        }
    }, 'json');

    // Manejar el envío del formulario
    $('#form').on('submit', function (e) {
        e.preventDefault();

        const formData = {
            id: $('#id').val(),
            nombre: $('#nombre').val(),
            telefono: $('#telefono').val(),
            correo: $('#correo').val(),
            maneger: $('#maneger').val(),
            direccion: $('#direccion').val(),
            zona: $('#zona').val(),
        };

        $.post('cliente.php', formData, function (response) {
            alert(response.message);
            if (response.status === 'success') {
                $('#form')[0].reset(); // Limpiar el formulario después de guardar
            }
        }, 'json').fail(function () {
            alert('Hubo un error al procesar la solicitud.');
        });
    });
});
