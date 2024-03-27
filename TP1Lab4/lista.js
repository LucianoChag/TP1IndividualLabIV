// Evento que se ejecuta al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    fetchData(""); // Obtener todos los datos al cargar la página
    
    // Evento de clic en el botón de búsqueda
    document.getElementById("searchButton").addEventListener("click", () => {
        var searchValue = document.getElementById("searchInput").value;
        fetchData(searchValue); // Obtener datos filtrados por el valor de búsqueda
    });
});

// Función para obtener datos del servidor
function fetchData(searchValue) {
    var url = "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" + encodeURIComponent(searchValue);

    fetch(url)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            renderDataGrid(data); // Renderizar los datos obtenidos en la tabla
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
}

// Función para renderizar los datos en la tabla
function renderDataGrid(data) {
    var table = document.getElementById("dataGrid");
    table.innerHTML = ""; // Limpiar la tabla antes de renderizar los nuevos datos
    
    // Si no se encontraron resultados, mostrar mensaje al usuario
    if (data.length === 0) {
        var row = table.insertRow();
        var cell = row.insertCell();
        cell.colSpan = "7"; // Colspan igual al número de columnas
        cell.appendChild(document.createTextNode("No se encontraron resultados."));
        return;
    }
    
    // Crear encabezados de columna
    var headers = Object.keys(data[0]);
    headers.push("Bloquear/Desbloquear");
    var headerRow = table.insertRow();
    headers.forEach(headerText => {
        var header = document.createElement("th");
        var textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });

    // Llenar la tabla con datos
    data.forEach(obj => {
        var row = table.insertRow();
        headers.forEach(header => {
            var cell = row.insertCell();
            if (header === "Bloquear/Desbloquear") {
                var blockButton = document.createElement("button");
                blockButton.textContent = obj["bloqueado"] === "N" ? "Bloquear" : "Desbloquear";
                blockButton.classList.add("blockButton");
                blockButton.addEventListener("click", () => {
                    toggleBlockStatus(obj["id"], obj["bloqueado"]); // Alternar el estado de bloqueo al hacer clic en el botón
                });
                cell.appendChild(blockButton);
            } else {
                cell.textContent = obj[header];
            }
        });
        // Aplicar clases CSS dinámicamente según el estado de bloqueo
        row.classList.add(obj["bloqueado"] === "N" ? "unblockedUser" : "blockedUser");
    });
}

// Función para alternar el estado de bloqueo/desbloqueo de un usuario
function toggleBlockStatus(userId, currentState) {
    var newState = currentState === "N" ? "Y" : "N"; // Cambiar el estado de bloqueo
    var url = "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=" + userId + "&estado=" + newState;

    fetch(url)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            fetchData(document.getElementById("searchInput").value); // Recargar los datos después de cambiar el estado de bloqueo
        })
        .catch(error => {
            console.error('Error al cambiar el estado de bloqueo:', error);
        });
}
