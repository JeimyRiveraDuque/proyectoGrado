document.addEventListener('DOMContentLoaded', () => {
    const botonIngresar = document.getElementById('btnIngresar');
    if (botonIngresar) {
        botonIngresar.addEventListener('click', function(event) {
            event.preventDefault();

            const usuario = document.getElementById('Usuario_ing').value;
            const password = document.getElementById('Pass_ing').value;

            if (usuario === "" || password === "") {
                alert("Por favor, ingresa ambos campos.");
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open("POST", "login.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(`usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    const respuesta = JSON.parse(xhr.responseText);
                    if (respuesta.status === "success") {
                        window.location.href = 'servicios.html';
                    } else {
                        alert(respuesta.message);
                    }
                } else {
                    alert("Error al intentar ingresar.");
                }
            };
        });
    } else {
        console.error("El botón con id 'btnIngresar' no se encontró en el DOM.");
    }
});