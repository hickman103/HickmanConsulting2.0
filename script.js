const form = document.getElementById("inquiry-form");
const statusText = document.getElementById("form-status");

const HUBSPOT_PORTAL_ID = "245434906";
const HUBSPOT_FORM_ID = "e1794a9a-e90d-4798-9d55-7f72411b164e";
const HUBSPOT_REGION = "na2";
const THANK_YOU_URL =
  "https://hickman103.github.io/HickmanConsulting/thank-you.html";

if (form && statusText) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      fields: [
        { name: "name", value: formData.get("name")?.toString().trim() || "" },
        {
          name: "organization",
          value: formData.get("organization")?.toString().trim() || "",
        },
        { name: "email", value: formData.get("email")?.toString().trim() || "" },
        { name: "role", value: formData.get("role")?.toString().trim() || "" },
        {
          name: "interest",
          value: formData.get("interest")?.toString().trim() || "",
        },
        {
          name: "message",
          value: formData.get("message")?.toString().trim() || "",
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    const submitUrl = `https://api-${HUBSPOT_REGION}.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    statusText.textContent = "Sending inquiry...";

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("HubSpot submission failed");
      }

      window.location.href = THANK_YOU_URL;
    } catch (error) {
      statusText.textContent =
        "Something went wrong while sending the inquiry. Please email hunter.hickman@hickmanconsultingai.com directly.";
    }
  });
}
