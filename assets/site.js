const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuToggle && navigation) {
  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.querySelector(".menu-label").textContent = open ? "Close" : "Menu";
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  menuToggle.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (menuToggle.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") {
      setMenu(false);
      menuToggle.focus();
    }
    if (event.key === "Tab") {
      const links = [...navigation.querySelectorAll("a")];
      const first = menuToggle;
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const inquiryForm = document.querySelector("#inquiry-form");

if (inquiryForm) {
  const draftSection = document.querySelector("#inquiry-draft");
  const draftText = document.querySelector("#draft-text");
  const draftStatus = document.querySelector("#draft-status");
  const copyButton = document.querySelector("#copy-draft");
  const downloadButton = document.querySelector("#download-draft");

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(inquiryForm);
    const value = (name) => String(data.get(name) || "").trim();
    for (const name of ["name", "message"]) {
      const field = inquiryForm.elements.namedItem(name);
      const minimum = name === "message" ? 10 : 1;
      field.setCustomValidity(value(name).length < minimum
        ? (name === "message" ? "Please share at least 10 characters about your vision." : "Please enter your name(s).")
        : "");
    }
    if (!inquiryForm.reportValidity()) return;

    draftText.textContent = [
      "A wedding inquiry for Lynh Tran",
      "",
      `Name: ${value("name")}`,
      `Email: ${value("email")}`,
      `Wedding date: ${value("date") || "Still dreaming"}`,
      `Location or venue: ${value("location") || "Not decided yet"}`,
      `Interested in: ${value("service")}`,
      "",
      value("message"),
      "",
      "This is a personal draft. It has not been sent.",
    ].join("\n");
    draftSection.hidden = false;
    draftStatus.textContent = "";
    draftSection.focus();
    draftSection.scrollIntoView({ behavior: "auto", block: "nearest" });
  });

  // An edited form needs a new draft so the saved text never silently goes stale.
  inquiryForm.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      event.target.setCustomValidity("");
    }
    draftSection.hidden = true;
    draftStatus.textContent = "";
  });

  copyButton.addEventListener("click", async () => {
    if (!navigator.clipboard) {
      draftStatus.textContent = "Copy is unavailable in this browser. Select the draft text to copy it, or use Save as text.";
      return;
    }
    try {
      await navigator.clipboard.writeText(draftText.textContent);
      draftStatus.textContent = "Draft copied. Nothing has been sent.";
    } catch {
      draftStatus.textContent = "Your browser could not copy the draft. Select the text to copy it, or use Save as text.";
    }
  });

  downloadButton.addEventListener("click", () => {
    const file = new Blob([draftText.textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lynh-tran-wedding-inquiry.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    draftStatus.textContent = "Draft prepared for download. Nothing has been sent.";
  });

  inquiryForm.hidden = false;
}
