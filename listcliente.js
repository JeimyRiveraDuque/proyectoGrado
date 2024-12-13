$(document).ready(function () {
  // Cargar roles y estados desde el backend
  $.get('listCliente.php', function (data) {
      if (data.zonas) {
          // Llenar el select de roles
          data.zonas.forEach(zona => {
              $('#zona').append(`<option value="${zona.idZona}">${zona.nombrezona}</option>`);
          });   
      }
  }, 'json');
})

$(document).ready(function () {
    // Llamada AJAX para obtener la lista de clientes
    $.get('listCliente.php', function (data) {
      if (data.clientes && data.clientes.length > 0) {
        let tbody = $('#tabla-clientes');
        data.clientes.forEach((cliente) => {
          let row = `
            <tr>
              <td>${cliente.codEmpresa}</td>
              <td>${cliente.nombreEmpresa}</td>
              <td>${cliente.direccion}</td>
              <td>${cliente.telefono}</td>
              <td>${cliente.correo}</td>
              <td>${cliente.manager}</td>
              <td>${cliente.idZona}</td>
              <td>${cliente.idEmpleado}</td>
              <td><button class="btn btn-primary btn-sm">Editar</button></td>
              <td><button class="btn btn-primary btn-sm">Eliminar</button></td>
            </tr>
          `;
          tbody.append(row);
        });
      } else {
        console.error('No se encontraron clientes:', data);
      }
    }).fail(function (xhr, status, error) {
      console.error('Error al cargar los clientes:', status, error);
    });
  });