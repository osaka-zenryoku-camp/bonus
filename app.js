const list = document.querySelector("#reward-list");

const appendPhraseParts = (element, parts, fallback) => {
  const phrases = parts?.length ? parts : [fallback];

  phrases.forEach((phrase, index) => {
    const span = document.createElement("span");
    span.className = "phrase";
    span.textContent = phrase;
    element.append(span);

    if (index < phrases.length - 1) {
      element.append(document.createElement("wbr"));
    }
  });
};

REWARDS.forEach((reward, index) => {
  const isReady = Boolean(reward.url);
  const card = document.createElement("article");
  card.className = `reward-card${isReady ? " is-ready" : ""}`;
  card.id = `reward-${index + 1}`;

  const number = document.createElement("div");
  number.className = "number";
  number.setAttribute("aria-hidden", "true");
  number.textContent = String(index + 1).padStart(2, "0");

  const content = document.createElement("div");
  content.className = "reward-content";

  const title = document.createElement("h3");
  title.className = "reward-title";
  appendPhraseParts(title, reward.titleParts, reward.title);

  const status = document.createElement("span");
  status.className = "status";
  status.textContent = isReady ? "公開中" : "準備中";

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
    link.textContent = "特典を受け取る";
    content.append(link);
  }

  card.append(number, content, status);
  list.append(card);
});
