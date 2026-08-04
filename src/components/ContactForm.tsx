"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/site";
import { Button } from "./Button";

const FORM_ENABLED =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED === "true";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!FORM_ENABLED) return;
    setSubmitted(true);
  }

  if (!FORM_ENABLED) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <h2 className="text-lg font-medium text-fg">Preferred contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Direct email is currently the preferred contact method. A web form
          will be enabled once SMTP (or equivalent) delivery is configured —
          submissions are not accepted through this page yet.
        </p>
        <div className="mt-5">
          <Button href={siteConfig.email.href} external>
            Email me
          </Button>
        </div>
        <p className="mt-4 text-sm text-fg-subtle">
          <a
            href={siteConfig.email.href}
            className="text-accent-fg underline-offset-2 hover:underline"
          >
            {siteConfig.email.address}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-border bg-surface p-6"
      noValidate={false}
    >
      <h2 className="text-lg font-medium text-fg">Contact form</h2>
      {submitted ? (
        <p className="text-sm text-fg-muted" role="status">
          Message queued for delivery.
        </p>
      ) : null}
      <Field label="Name" name="name" type="text" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Subject" name="subject" type="text" required />
      <div>
        <label
          htmlFor="message-enabled"
          className="mb-1.5 block text-sm text-fg-muted"
        >
          Message
        </label>
        <textarea
          id="message-enabled"
          name="message"
          rows={5}
          required
          className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-fg"
        />
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-fg-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-fg"
      />
    </div>
  );
}
