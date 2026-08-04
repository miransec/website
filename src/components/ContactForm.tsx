"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./Button";

const FORM_ENABLED = Boolean(process.env.NEXT_PUBLIC_CONTACT_FORM_ENABLED);

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
        <h2 className="text-lg font-medium text-fg">Contact form</h2>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          The contact form is ready for wiring but currently disabled. Delivery
          will be connected through a server route and SMTP (or equivalent)
          once the professional email address and credentials are configured.
        </p>
        <p className="mt-4 text-sm text-fg-subtle">
          Until then, use GitHub to reach out. Form fields below are visible for
          layout review and remain non-submittable.
        </p>
        <fieldset disabled className="mt-6 space-y-4 opacity-70">
          <legend className="sr-only">Disabled contact form</legend>
          <Field label="Name" name="name" type="text" />
          <Field label="Email" name="email" type="email" />
          <Field label="Subject" name="subject" type="text" />
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm text-fg-muted"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-md border border-border bg-canvas px-3 py-2 text-sm text-fg"
              placeholder="Your message"
            />
          </div>
          <Button type="button" disabled>
            Send message (unavailable)
          </Button>
        </fieldset>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-border bg-surface p-6"
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
        <label htmlFor="message-enabled" className="mb-1.5 block text-sm text-fg-muted">
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
