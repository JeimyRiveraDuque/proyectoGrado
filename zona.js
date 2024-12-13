$(document).ready(function () {
    // Al hacer clic en el botón de registro
    $('#form').on('submit', function (e) {
        e.preventDefault();
    
        var Zona = $('#idZona').val();
        var nombreZona = $('#nombrezona').val();
    
        if (!Zona || !nombreZona) {
            alert('Por favor, complete todos los campos.');
            return;
        }
    
        console.log('Datos a enviar:', { idZona: Zona, nombrezona: nombreZona });
    
        $.ajax({
            url: 'zona.php',
            type: 'POST',
            data: {
                idZona: Zona,
                nombrezona: nombreZona,
            },
            success: function (response) {
                console.log('Respuesta del servidor:', response);
    
                var responseData = JSON.parse(response);
                if (responseData.status === 'success') {
                    alert(responseData.message);
                } else {
                    alert(responseData.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', status, error);
                alert('Hubo un error al enviar los datos.');
            }
        });
    });
    
});