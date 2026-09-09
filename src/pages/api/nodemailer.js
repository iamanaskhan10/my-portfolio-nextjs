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

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO || emailFrom;

  if (!smtpHost || !smtpUser || !smtpPass || !emailFrom || !emailTo) {
    console.error("Email service is not configured.");
    return res.status(503).json({ success: false, message: "Email service is unavailable." });
  }

  if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
    console.error("Email service has an invalid SMTP port.");
    return res.status(503).json({ success: false, message: "Email service is unavailable." });
  }

  let timeoutId;

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      requireTLS: smtpPort === 587,
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
      },
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });

    const mail = transporter.sendMail({
      from: `Portfolio Contact <${emailFrom}>`,
      to: emailTo,
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
