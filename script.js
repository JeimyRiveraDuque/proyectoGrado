$(document).ready(function () {
    // Al hacer clic en el botón de registro
    $('#registro-form').on('submit', function (e) {
        e.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores de los campos
        var nombre = $('#Nombre').val();
        var usuario = $('#Usuario').val();
        var correo = $('#email').val();
        var password = $('#Pass').val();
        var confirm_password = $('#Confirm').val();

        // Validar que las contraseñas coinciden
        if (password !== confirm_password) {
            alert('Las contraseñas no coinciden');
            return; // Detener el envío si las contraseñas no coinciden
        }

        // Verificar si algún campo está vacío
        if (!nombre || !usuario || !correo || !password || !confirm_password) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Enviar los datos mediante AJAX
        $.ajax({
            url: 'registro.php', // Archivo PHP que manejará el registro
            type: 'POST',
            data: {
                nombre: nombre,
                usuario: usuario,
                email: correo,
                password: password,
                confirm_password: confirm_password
            },
            success: function (response) {
                // Analizar la respuesta JSON del servidor
                var responseData = JSON.parse(response);
                
                // Si el registro fue exitoso
                if (responseData.status === 'success') {
                    alert(responseData.message); // Mostrar mensaje de éxito
                    window.location.href = 'ingreso.html'; // Redirigir al login
                } else {
                    alert(responseData.message); // Mostrar mensaje de error
                }
            },
            error: function () {
                alert('Hubo un error al enviar los datos. Intente de nuevo.');
            }
        });
    });
});