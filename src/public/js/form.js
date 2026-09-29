/* ==========================================================
   Bytescreen — form.js
   Submits any [data-ajax-form] as JSON to its action URL.
     data-success         message shown after a successful submit
     data-fallback-email  address offered if sending fails
   A [name="formLoadedAt"] field is stamped with the load time
   (used by the API's anti-spam check).
   ========================================================== */

(function () {
  'use strict';

  document.querySelectorAll('[data-ajax-form]').forEach(setupForm);

  function setupForm(form) {
    const loadedAt = form.elements.formLoadedAt;
    if (loadedAt) loadedAt.value = String(Date.now());

    const successText = form.dataset.success || 'Thank you. We will be in touch shortly.';
    const fallbackEmail = form.dataset.fallbackEmail || 'sales@bytescreentech.com';

    const status = form.querySelector('[data-form-status]');
    const submit = form.querySelector('button[type="submit"]');
    const submitLabel = submit.textContent;

    const messages = {
      valueMissing: 'This field is required.',
      typeMismatch: 'Please enter a valid email address.',
      tooShort: (field) => `Please enter at least ${field.minLength} characters.`,
      patternMismatch: 'Please enter a valid phone number.',
    };

    function setStatus(text, type) {
      status.textContent = text;
      status.dataset.state = type || '';
    }

    function setFieldError(field, text) {
      const wrap = field.closest('.field');
      if (!wrap) return;
      let error = wrap.querySelector('.field-error');
      if (!text) {
        field.removeAttribute('aria-invalid');
        if (error) error.remove();
        return;
      }
      if (!error) {
        error = document.createElement('p');
        error.className = 'field-error';
        error.id = `${field.id}-error`;
        wrap.appendChild(error);
      }
      error.textContent = text;
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', error.id);
    }

    function checkField(field) {
      const v = field.validity;
      let text = '';
      if (v.valueMissing) text = messages.valueMissing;
      else if (v.typeMismatch) text = messages.typeMismatch;
      else if (v.tooShort) text = messages.tooShort(field);
      else if (v.patternMismatch) text = messages.patternMismatch;
      setFieldError(field, text);
      return !text;
    }

    // Re-check a field once the visitor has interacted with it
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('blur', () => { if (field.value) checkField(field); });
      field.addEventListener('input', () => { if (field.getAttribute('aria-invalid')) checkField(field); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('');

      const fields = Array.from(form.elements).filter((el) => el.name && el.type !== 'hidden');
      const invalid = fields.filter((field) => !checkField(field));
      if (invalid.length) {
        invalid[0].focus();
        setStatus('Please check the highlighted fields.', 'error');
        return;
      }

      // Send only the fields that have a value (hidden fields included)
      const data = {};
      Array.from(form.elements).filter((el) => el.name).forEach((field) => {
        const value = field.value.trim();
        if (value) data[field.name] = value;
      });

      submit.disabled = true;
      submit.textContent = 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await res.json().catch(() => ({}));

        if (res.ok) {
          form.reset();
          if (loadedAt) loadedAt.value = String(Date.now());
          setStatus(successText, 'success');
          return;
        }

        // Validation errors come back as [{ field, message }]
        if (Array.isArray(body.errors)) {
          body.errors.forEach(({ field, message }) => {
            const el = form.elements[field];
            if (el) setFieldError(el, message);
          });
          setStatus('Please check the highlighted fields.', 'error');
          return;
        }

        setStatus(body.message || `Something went wrong. Please try again, or email ${fallbackEmail}.`, 'error');
      } catch (err) {
        setStatus(`We couldn’t send your message. Please check your connection, or email ${fallbackEmail}.`, 'error');
      } finally {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    });
  }
})();
