const list=document.querySelector("#reward-list");
REWARDS.forEach((reward,index)=>{
  const ready=Boolean(reward.url),card=document.createElement("article");
  card.className="reward-card"+(ready?" is-ready":"");
  const number=document.createElement("div"); number.className="number"; number.textContent=String(index+1).padStart(2,"0");
  const content=document.createElement("div"); content.className="reward-content";
  const top=document.createElement("div"); top.className="reward-topline";
  const title=document.createElement("h3"); title.className="reward-title"; title.textContent=reward.title;
  const status=document.createElement("span"); status.className="status"; status.textContent=ready?"公開中":"準備中";
  const description=document.createElement("p"); description.className="reward-description"; description.textContent=reward.description;
  top.append(title,status); content.append(top,description);
  if(ready){const link=document.createElement("a");link.className="reward-link";link.href=reward.url;link.target="_blank";link.rel="noopener";link.textContent="特典を受け取る";content.append(link)}
  card.append(number,content);list.append(card);
});
