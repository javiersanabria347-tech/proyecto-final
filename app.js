const eras = [
  { period: "1946", name: "Primeras computadoras", color: "#b99aff", detail: "eniac" },
  { period: "1973", name: "Ventanas y ratón", color: "#70f6e2", detail: "alto" },
  { period: "1975", name: "Computadoras personales", color: "#8df59a", detail: "altair" },
  { period: "1984", name: "El escritorio Macintosh", color: "#ff9bbd", destination: "Macintosh System 1.0" },
  { period: "1995", name: "Windows llega a casa", color: "#ffbd76", destination: "Windows 95" },
  { period: "2001", name: "Internet y multimedia", color: "#91b8ff", destination: "Windows XP" },
  { period: "2026", name: "La computadora conectada", color: "#83b4ff", destination: "Windows 11" }
];

const demoUrls = {
  "Windows XP": "https://win32.run/",
  "Altair 8800": "https://wixette.github.io/8800-simulator/",
  "Windows 95": "https://win.molroo.com/en/xp",
  "Macintosh System 1.0": "https://infinitemac.org/1984/System%201.0",
  "Windows 11": "https://win11.blueedge.me/"
};

const timeline = document.querySelector("#timeline");

timeline.innerHTML = eras.map((era, index) => `
  ${era.detail ? `
    <button
      class="era-stop"
      type="button"
      style="--era-color:${era.color}"
      data-history-detail="${era.detail}"
      aria-controls="early-computers"
      aria-expanded="false"
      aria-label="Mostrar información sobre ${era.name}, ${era.period}"
      title="Mostrar información sobre ${era.name}"
    >
      <span class="era-node">${String(index + 1).padStart(2, "0")}</span>
      <span class="era-period">${era.period}</span>
      <span class="era-name">${era.name}</span>
    </button>
  ` : `
    <a
      class="era-stop"
      style="--era-color:${era.color}"
      href="${demoUrls[era.destination]}"
      aria-label="Abrir ${era.name}, ${era.period}, en la experiencia de ${era.destination}"
      title="Abrir experiencia de ${era.destination}"
    >
      <span class="era-node">${String(index + 1).padStart(2, "0")}</span>
      <span class="era-period">${era.period}</span>
      <span class="era-name">${era.name}</span>
    </a>
  `}
`).join("");

timeline.addEventListener("click", event => {
  const trigger = event.target.closest("[data-history-detail]");
  if (!trigger) return;

  const section = document.querySelector("#early-computers");
  const selectedDetail = trigger.dataset.historyDetail;
  section.hidden = false;
  section.querySelectorAll(".history-card").forEach(card => {
    card.hidden = card.id !== `history-${selectedDetail}`;
  });
  timeline.querySelectorAll("[data-history-detail]").forEach(button => {
    const selected = button === trigger;
    button.setAttribute("aria-expanded", String(selected));
    button.setAttribute("aria-pressed", String(selected));
  });
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start"
  });
});
