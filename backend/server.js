const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL // frontend URL allow kar rahe
}));
app.use(bodyParser.json());

// Routes
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ajmerlodhi0111@gmail.com,
        pass: process.cbginzktpdtusvkf,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // message receive hone wala
      subject: `New message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`
    });

    res.status(200).json({ 
      message: "Message sent successfully!",
      redirect: process.env.FRONTEND_URL + "/thank-you" // optional redirect
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending message!" });
  }
});

app.get('/', (req, res) => {
  res.send('Contact backend is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
