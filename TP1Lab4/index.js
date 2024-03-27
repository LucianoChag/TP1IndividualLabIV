// Evento de envío del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener los valores de usuario y contraseña
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // URL para la solicitud de inicio de sesión
    var url = "http://168.194.207.98:8081/tp/login.php?user=" + encodeURIComponent(username) + "&pass=" + encodeURIComponent(password);

    // Realizar la solicitud de inicio de sesión mediante fetch
    fetch(url)
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            // Si la respuesta es "OK", redirigir a lista.html
            if (data.respuesta === "OK") {
                window.location.href = "lista.html";
            } else {
                // Si hay un error, mostrar un mensaje de alerta con el mensaje de error
                alert(data.mje);
            }
        })
        .catch(error => {
            // Manejar errores de solicitud
            console.error('Error al realizar la solicitud:', error);
        });
});
