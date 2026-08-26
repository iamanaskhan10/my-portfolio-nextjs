"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../../data/portfolio";

export default function PortfolioContactForm({ active }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setStatusMessage("");

    try {
      const response = await fetch("/api/nodemailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send message right now.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Unable to send message right now.");
    }
  };

  const tabIndex = active ? 0 : -1;

  return (
    <form className="engineering-contact-form" onSubmit={handleSubmit}>
      <div className="engineering-contact-form__field">
        <label htmlFor="portfolio-name">Your name</label>
        <input
          id="portfolio-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onChange={handleChange}
          tabIndex={tabIndex}
        />
      </div>
      <div className="engineering-contact-form__field">
        <label htmlFor="portfolio-email">Email address</label>
        <input
          id="portfolio-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange}
          tabIndex={tabIndex}
        />
      </div>
      <div className="engineering-contact-form__field engineering-contact-form__field--full">
        <label htmlFor="portfolio-message">What are you building?</label>
        <textarea
          id="portfolio-message"
          name="message"
          rows="4"
          required
          value={form.message}
          onChange={handleChange}
          tabIndex={tabIndex}
        />
      </div>
      <div className="engineering-contact-form__footer">
        <button type="submit" className="engineering-button engineering-button--solid" disabled={status === "sending"} tabIndex={tabIndex}>
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowUpRight size={16} aria-hidden="true" />
        </button>
        <p className={`engineering-contact-form__status engineering-contact-form__status--${status}`} aria-live="polite">
          {status === "success" && "Message sent. I’ll get back to you soon."}
          {status === "error" && (
            <>
              Couldn’t send it. Email me at <a href={`mailto:${profile.email}`} tabIndex={tabIndex}>{profile.email}</a>.
            </>
          )}
        </p>
        {status === "error" && statusMessage && (
          <p className="engineering-contact-form__detail" role="status">{statusMessage}</p>
        )}
      </div>
    </form>
  );
}
