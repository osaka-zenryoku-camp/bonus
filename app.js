const list = document.querySelector("#reward-list");

const ICON_PATHS = {
  book: `
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
    <path d="M4 5.5v16" />
    <path d="M8 7h8M8 11h6" />
  `,
  analytics: `
    <path d="M4 19V5M4 19h16" />
    <path d="m7 15 4-4 3 2 5-6" />
    <circle cx="7" cy="15" r="1" />
    <circle cx="11" cy="11" r="1" />
    <circle cx="14" cy="13" r="1" />
    <circle cx="19" cy="7" r="1" />
  `,
  laptop: `
    <rect x="4" y="4" width="16" height="12" rx="2" />
    <path d="M2 20h20M10 8l-2 2 2 2M14 8l2 2-2 2" />
  `,
  route: `
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="6" r="2" />
    <path d="M8 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3M10 12l2-2 2 2" />
  `,
  conversation: `
    <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
  `,
};

const appendPhraseParts = (element, parts, fallback) => {
  const phrases = Array.isArray(parts) && parts.length ? parts : [fallback];

  phrases.forEach((phrase, phraseIndex) => {
    const span = document.createElement("span");
    span.className = "phrase";
    span.textContent = phrase;
    element.append(span);

    if (phraseIndex < phrases.length - 1) {
      element.append(document.createTextNode(" "));
    }
  });
};

const createRewardIcon = (name, className = "reward-icon") => {
  const icon = document.createElement("span");
  icon.className = className;
  icon.setAttribute("aria-hidden", "true");
  icon.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round" focusable="false">
      ${ICON_PATHS[name] || ICON_PATHS.book}
    </svg>
  `;
  return icon;
};

REWARDS.forEach((reward, index) => {
  const rewardNumber = String(index + 1).padStart(2, "0");
  const isReady = Boolean(reward.url);
  const card = document.createElement("article");
  card.className = `reward-card${isReady ? " is-ready" : ""}`;
  card.dataset.reward = rewardNumber;
  card.style.setProperty("--accent", reward.accent || "#a87517");
  card.style.setProperty("--accent-soft", reward.accentSoft || "#f7e8ba");

  const marker = document.createElement("div");
  marker.className = "reward-marker";

  const number = document.createElement("div");
  number.className = "number";
  number.textContent = rewardNumber;
  number.setAttribute("aria-hidden", "true");

  marker.append(number);

  const content = document.createElement("div");
  content.className = "reward-content";

  const title = document.createElement("h3");
  title.className = "reward-title";
  appendPhraseParts(title, reward.titleParts, reward.title);

  const description = document.createElement("p");
  description.className = "reward-description";
  appendPhraseParts(description, reward.descriptionParts, reward.description);

  content.append(title, description);

  if (isReady) {
    const link = document.createElement("a");
    link.className = "reward-link";
    link.href = reward.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${reward.cta}：${reward.title}`);

    const linkLabel = document.createElement("span");
    linkLabel.className = "reward-link-label";
    linkLabel.textContent = reward.cta || "特典を受け取る";

    const linkArrow = document.createElement("span");
    linkArrow.className = "reward-link-arrow";
    linkArrow.setAttribute("aria-hidden", "true");
    linkArrow.textContent = "→";

    link.append(createRewardIcon(reward.icon, "reward-link-icon"), linkLabel, linkArrow);
    content.append(link);
  }

  card.append(marker, content);
  list.append(card);
});
