document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    };

   
    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log("Formulario enviado exitosamente");
        alert("¡Formulario enviado exitosamente!");
        contactForm.reset();
      } else {
        console.error("Error al enviar el formulario. Estado de respuesta:", response.status);
        alert("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo más tarde.");
    }
  });
});
