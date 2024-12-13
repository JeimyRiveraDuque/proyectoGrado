       document.getElementById('mostrarTablaBtn').addEventListener('click', function() {
            var tablaContenedor = document.getElementById('tablaContenedor');
            if (tablaContenedor.style.display === "none") {
                tablaContenedor.style.display = "block";
            } else {
                tablaContenedor.style.display = "none";
            }
        });

        