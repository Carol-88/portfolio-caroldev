require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "docs")));


// Configura el transporte para enviar correos
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_MENSAJES,
      pass: process.env.MI_PASS
    }
  });

// Ruta para servir la página principal (HTML, CSS)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "docs", "index.html"));
  });


// Ruta para manejar el envío del formulario
app.post("/send-email", (req, res) => {
    console.log(req.body);
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_MENSAJES,
    to: process.env.MI_CORREO, // Tu dirección de correo
    subject: "Portfolio: nuevo mensaje",
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error al enviar el correo.");
    } else {
      console.log("Correo enviado:", info.response);
      res.status(200).send("Correo enviado correctamente.");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
