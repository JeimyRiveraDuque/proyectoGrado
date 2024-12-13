$.get('payroll.php', function (data) {
  if (data.pagos && data.pagos.length > 0) {
    let rows = ''; // Cadena para acumular filas

    data.pagos.forEach((pago, index) => {
      let total = (pago.cantidadExtra + pago.Totalhoraquincena) * pago.rate; // Cálculo inicial

      rows += `
        <tr>
          <td>${pago.IdPayroll}</td>
          <td>${pago.idCliente}</td>
          <td>${pago.idEmpleado}</td>
          <td><input type="number" class="rate-input" data-index="${index}" value="${pago.rate}" step="0.01"></td>
          <td>${pago.idHoraExtra}</td>
          <td><input type="number" class="extra-input" data-index="${index}" value="${pago.cantidadExtra}"></td>
          <td><input type="number" class="quincena-input" data-index="${index}" value="${pago.Totalhoraquincena}"></td>
          <td class="total-cell" data-index="${index}">${total.toFixed(2)}</td>
          <td>${pago.fechaCreacion}</td>
        </tr>
      `;
    });

    $('#tablapayroll').html(rows); // Añade todas las filas de una sola vez

    // Escuchar cambios en los inputs para recalcular el total dinámicamente
    $('.rate-input, .extra-input, .quincena-input').on('input', function () {
      let index = $(this).data('index'); // Obtener índice de la fila
      let rate = parseFloat($(`.rate-input[data-index="${index}"]`).val()) || 0;
      let extra = parseFloat($(`.extra-input[data-index="${index}"]`).val()) || 0;
      let quincena = parseFloat($(`.quincena-input[data-index="${index}"]`).val()) || 0;

      let total = (extra + quincena) * rate; // Recalcular el total
      $(`.total-cell[data-index="${index}"]`).text(total.toFixed(2)); // Actualizar el total en la tabla
    });
  } else {
    console.error('No se encontraron pagos:', data);
  }
}).fail(function (xhr, status, error) {
  console.error('Error al cargar los pagos:', status, error);
});
document.getElementById('pagarPayrollBtn').addEventListener('click', function () {

  alert("Payroll Pagado")
  // Mostrar mensaje de confirmación
  // Cerrar el modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('confirmarModal'));
  modal.hide();

  // Generar PDF con la tabla
  const { jsPDF } = window.jspdf; // Acceso a jsPDF
  const pdf = new jsPDF();

  // Agregar título al PDF
  pdf.text('Reporte de Payroll', 14, 20);

  // Extraer datos de la tabla
  const tabla = document.querySelector('#tablapayroll');
  const filas = [];
  tabla.querySelectorAll('tr').forEach(tr => {
      const celdas = [];
      tr.querySelectorAll('td, th').forEach(td => {
          celdas.push(td.innerText); // Extraer el texto de cada celda
      });
      filas.push(celdas); // Agregar la fila a la matriz
  });

  // Agregar tabla al PDF usando AutoTable
  pdf.autoTable({
      head: [filas[0]], // Encabezados (primera fila)
      body: filas.slice(1), // Filas del cuerpo de la tabla
      startY: 30, // Espacio para el título
  });

  // Guardar el PDF
  pdf.save('reporte_payroll.pdf');
});