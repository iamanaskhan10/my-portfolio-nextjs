import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load .env (make sure .env or .env.local exists at root)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // Gmail forces this
    to: "anas23khan2002@gmail.com", // Your inbox
    subject: `New message from ${name}`,
    text: `
You have received a new message from your portfolio contact form:

Name: ${name}
Email: ${email}
Message:
${message}
    `,
    replyTo: email, // So you can reply directly to sender
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
