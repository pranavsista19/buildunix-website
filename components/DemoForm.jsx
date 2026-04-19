"use client";

import { useState } from "react";
import BrandText from "@/components/BrandText";
import styles from "@/components/DemoForm.module.css";
import { formOptions } from "@/lib/site-content";

const initialValues = {
  fullName: "",
  companyName: "",
  role: "",
  phone: "",
  email: "",
  city: "",
  projectSize: "",
  referralSource: ""
};

function validateField(name, value) {
  const trimmedValue = value.trim();
  const phonePattern = /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (["fullName", "companyName", "role", "phone", "email", "city"].includes(name) && !trimmedValue) {
    return "This field is required.";
  }

  if (name === "email" && trimmedValue && !emailPattern.test(trimmedValue)) {
    return "Enter a valid email address.";
  }

  if (name === "phone" && trimmedValue && !phonePattern.test(trimmedValue)) {
    return "Enter a valid Indian phone number.";
  }

  return "";
}

export default function DemoForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formAction = "https://formsubmit.co/info@buildunix.com";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({
      ...current,
      [name]: validateField(name, value)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextTouched = Object.keys(initialValues).reduce((accumulator, key) => {
      accumulator[key] = true;
      return accumulator;
    }, {});

    const nextErrors = Object.keys(initialValues).reduce((accumulator, key) => {
      const error = validateField(key, values[key]);

      if (error) {
        accumulator[key] = error;
      }

      return accumulator;
    }, {});

    setTouched(nextTouched);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const payload = new FormData();
      payload.append("Full Name", values.fullName);
      payload.append("Company / Firm Name", values.companyName);
      payload.append("Role / Designation", values.role);
      payload.append("Phone Number", values.phone);
      payload.append("Email Address", values.email);
      payload.append("City", values.city);
      payload.append("Project Size", values.projectSize || "Not provided");
      payload.append(
        "How did you hear about us?",
        values.referralSource || "Not provided"
      );
      payload.append("_subject", "New BuildUnix Demo Request");
      payload.append("_replyto", values.email);
      payload.append("_next", "https://www.buildunix.com/contact#success");

      const response = await fetch("https://formsubmit.co/ajax/info@buildunix.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: payload
      });

      if (!response.ok) {
        throw new Error("Form submission failed.");
      }

      setSubmitted(true);
      setValues(initialValues);
    } catch (error) {
      setSubmitError(
        "We couldn't send your request automatically. Please email info@buildunix.com directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id="success" className={styles.successCard} aria-live="polite">
        <div className={styles.successIcon} aria-hidden="true">
          {"\u2713"}
        </div>
        <h3 className={styles.successTitle}>We've received your request.</h3>
        <p className={styles.successBody}>
          Expect a reply at the email you provided within 24 hours. In the meantime,
          feel free to reach us directly at{" "}
          <a href="mailto:info@buildunix.com">info@buildunix.com</a>.
        </p>
      </div>
    );
  }

  const fields = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    {
      name: "companyName",
      label: "Company / Firm Name",
      type: "text",
      required: true
    },
    { name: "role", label: "Role / Designation", type: "select", required: true },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      required: true,
      placeholder: "+91 98765 43210"
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true
    },
    { name: "city", label: "City", type: "text", required: true },
    { name: "projectSize", label: "Project Size", type: "select", required: false },
    {
      name: "referralSource",
      label: "How did you hear about us?",
      type: "text",
      required: false
    }
  ];

  return (
    <form
      action={formAction}
      method="POST"
      noValidate
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="_subject" value="New BuildUnix Demo Request" />
      <input type="hidden" name="_replyto" value={values.email} />
      <input
        type="hidden"
        name="_next"
        value="https://www.buildunix.com/contact#success"
      />

      <div className={styles.grid}>
        {fields.map((field) => {
          const error = errors[field.name];
          const showError = touched[field.name] && Boolean(error);
          const showValid =
            touched[field.name] && !error && values[field.name].trim() !== "";

          return (
            <div
              key={field.name}
              className={`${styles.field} ${field.name === "projectSize" || field.name === "referralSource" ? styles.fieldFull : ""}`}
            >
              <label className={styles.label} htmlFor={field.name}>
                {field.label}
                {field.required ? " *" : ""}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={showError}
                  aria-describedby={showError ? `${field.name}-error` : undefined}
                  className={`${styles.input} ${showError ? styles.inputError : ""} ${showValid ? styles.inputValid : ""}`}
                >
                  <option value="">{`Select ${field.label}`}</option>
                  {(field.name === "role"
                    ? formOptions.roles
                    : formOptions.projectSizes
                  ).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={values[field.name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={field.placeholder}
                  aria-invalid={showError}
                  aria-describedby={showError ? `${field.name}-error` : undefined}
                  className={`${styles.input} ${showError ? styles.inputError : ""} ${showValid ? styles.inputValid : ""}`}
                />
              )}

              {showError ? (
                <span id={`${field.name}-error`} className={styles.errorText}>
                  {error}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {submitError ? (
        <p className={styles.submitError} aria-live="polite">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={`button buttonPrimary ${styles.submitButton}`}
      >
        {submitting ? (
          <span className={styles.spinnerWrap}>
            <span className={styles.spinner} aria-hidden="true" />
            Sending...
          </span>
        ) : (
          <>
            Book My Demo <span className="buttonArrow">{"\u2192"}</span>
          </>
        )}
      </button>

      <p className={styles.privacyText}>
        We respect your privacy. Your information is used only to contact you
        {" "}
        <BrandText text="about BuildUNIX." /> We don&apos;t spam.
      </p>
    </form>
  );
}
