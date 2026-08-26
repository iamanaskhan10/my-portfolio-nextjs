import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Please complete every field." });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email service is not configured.");
    return res.status(503).json({ success: false, message: "Email service is unavailable." });
  }

  let timeoutId;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    const mail = transporter.sendMail({
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: "anas23khan2002@gmail.com",
      subject: `New message from ${name}`,
      replyTo: { name, address: email },
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    const deliveryTimeout = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        const timeoutError = new Error("Email delivery timed out.");
        timeoutError.code = "ETIMEDOUT";
        reject(timeoutError);
      }, 12000);
    });

    await Promise.race([mail, deliveryTimeout]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email error:", error);

    if (["EDNS", "ENOTFOUND", "ETIMEDOUT", "ECONNREFUSED"].includes(error?.code)) {
      return res.status(503).json({
        success: false,
        message: "The email server cannot be reached from this environment right now.",
      });
    }

    return res.status(500).json({ success: false, message: "Message could not be sent." });
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}
