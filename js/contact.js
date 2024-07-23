"use strict";

var form = document.querySelector('.contactForm');
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var message = messageInput.value.trim();

    // Validación del nombre: solo caracteres alfanuméricos y longitud mínima de 1
    if (!name.match(/^[a-zA-Z0-9]+$/) || name.length === 0) {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    // Validación del correo electrónico: formato de correo electrónico válido
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    // Validación del mensaje: al menos 5 caracteres
    if (message.length < 5) {
        alert('Por favor, ingresa un mensaje con al menos 5 caracteres.');
        return;
    }

    // Si todas las validaciones son exitosas, abre la herramienta de correo electrónico predeterminada
    var subject = 'Mensaje desde formulario de contacto';
    var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) +
                     '&body=' + encodeURIComponent(message);
    window.location.href = mailtoLink;
});

