const form = document.getElementById("inquiry-form");
const statusText = document.getElementById("form-status");
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwQ84dWIufrJGh21ZztMdTzbkC8COdw4LZ92VVoJ8OWlHdI2No8cLQyDQOiqeJcZvoQ/exec";
const THANK_YOU_URL = "thank-you.html";

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = new URLSearchParams({
      name: formData.get("name")?.toString().trim() || "",
      organization: formData.get("organization")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      role: formData.get("role")?.toString().trim() || "",
      interest: formData.get("interest")?.toString().trim() || "",
      message: formData.get("message")?.toString().trim() || "",
      pageUri: window.location.href,
      pageName: document.title,
    });

    statusText.textContent = "Sending inquiry...";

    try {
      if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR")) {
        throw new Error("Missing Google Apps Script URL");
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      window.location.href = THANK_YOU_URL;
    } catch (error) {
      statusText.textContent =
        "Something went wrong while sending the inquiry. Please email hunter.hickman@hickmanconsultingai.com directly.";
    }
  });
}
