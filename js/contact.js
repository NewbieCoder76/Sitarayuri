/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for reaching out! We will get back to you shortly.");
      contactForm.reset();
    });
  }
});