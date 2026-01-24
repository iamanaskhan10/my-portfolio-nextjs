"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import FadeInSection from "./FadeInSection";
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/nodemailer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Try again later.");
      }
    } catch (err) {
      console.error("Email error:", err);
      alert("Error sending message.");
    }
  };

  return (
    <section className="text-gray-300 py-20 px-4 sm:px-6 md:px-14 lg:px-24 relative" id="contact">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-[25%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[450px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.28) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[500px] md:h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-[1]">
        {/* Left Side: Image with Aura */}
        <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full shrink-0">
          <div className="absolute inset-0 rounded-full bg-pink-600 blur-2xl opacity-30 animate-pulse z-0" />
          <img
  src="/laptop.jpg"
  alt="Anas Khan"
  className="w-full h-full object-cover rounded-full border-[#0a192f] glitch-hero mask-radial-fade"
/>

        </div>

        {/* Right Side: Contact Form */}
        <FadeInSection>
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <h2 className="text-3xl font-bold border-b-4 border-pink-600 inline-block mb-2">
              Get in Touch
            </h2>
            <p className="text-base text-gray-400">
              Let's build something exceptional — reach out to discuss your project or idea.
            </p>

            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md outline-none focus:border-pink-600 transition-colors"
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md outline-none focus:border-pink-600 transition-colors"
            />

            <textarea
              name="message"
              rows="5"
              required
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-md outline-none focus:border-pink-600 transition-colors"
            ></textarea>

            <PrimaryButton type="submit">Send Message</PrimaryButton>
          </form>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Contact;
