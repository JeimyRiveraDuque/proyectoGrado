const circlesContainer = document.querySelector('.circles-container');

function createCircle(x, y) {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    // Cambiar a colores rojo oscuro y azul claro
    circle.style.backgroundColor = Math.random() > 0.5 ? '#C62828' : '#0dcaf0'; // Rojo oscuro y azul claro

    // Posiciona el círculo en las coordenadas dadas
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    // Añadir el círculo al contenedor
    circlesContainer.appendChild(circle);
    return circle; // Devuelve el círculo creado
}

function animateCircle(circle) {
    // Generar un tiempo aleatorio para que el círculo aparezca
    setTimeout(() => {
        circle.classList.add('visible'); // Hace el círculo visible

        // Después de un tiempo, hacer desaparecer el círculo
        setTimeout(() => {
            circle.classList.remove('visible'); // Hace el círculo invisible

            // Después de desaparecer, reiniciar la animación
            setTimeout(() => {
                animateCircle(circle); // Reinicia la animación
            }, Math.random() * 2000 + 1000); // Tiempo aleatorio para reaparecer (1s a 3s)
        }, Math.random() * 3000 + 1000); // Tiempo aleatorio hasta que desaparece (1s a 4s)
    }, Math.random() * 1000); // Tiempo aleatorio hasta que aparece (0s a 1s)
}

// Función para llenar el triángulo
function fillTriangle(rows) {
    const circles = []; // Array para almacenar círculos
    const circleDiameter = 30; // Diámetro del círculo
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j <= i; j++) {
            const x = j * circleDiameter; // Posición en X
            const y = (rows - i - 1) * circleDiameter; // Posición en Y
            const circle = createCircle(x, y); // Crear el círculo
            circles.push(circle); // Almacena el círculo en el array
            animateCircle(circle); // Animar el círculo
        }
    }
}

// Llenar el triángulo en la esquina
fillTriangle(10); // Ajusta el número de filas según sea necesario