const routes = ["home", "about", "members"];
const membersDirectory = document.querySelector("#members-directory");

function setRoute(route) {
  const nextRoute = routes.includes(route) ? route : "home";

  document.querySelectorAll("[data-view]").forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === nextRoute);
  });

  document.body.dataset.route = nextRoute;

  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === nextRoute);
  });
}

function textPair(primary, secondary) {
  return secondary ? `${primary}<span lang="zh-Hant">${secondary}</span>` : primary;
}

function assetPath(src) {
  return src;
}

function renderMembersDirectory() {
  if (!members.length) {
    membersDirectory.innerHTML = `
      <div class="empty-state">
        Member profiles have not been added yet. Add entries in members.js to populate this page.
      </div>
    `;
    return;
  }

  membersDirectory.innerHTML = members
    .map(
      (member) => `
        <a class="member-card" href="./members/${member.id}.html" aria-label="Open ${member.name.en} page">
          ${member.portrait ? `<img src="${assetPath(member.portrait)}" alt="${member.name.en} portrait" loading="lazy" />` : ""}
          <span class="member-card-copy">
            <span class="member-card-name">${member.name.en}<br /><span lang="zh-Hant">${member.name.zh}</span></span>
            <span class="member-card-role">${member.role.en}<br /><span lang="zh-Hant">${member.role.zh}</span></span>
          </span>
        </a>
      `
    )
    .join("");
}

window.addEventListener("hashchange", () => {
  const [route, memberId] = window.location.hash.replace("#", "").split("/");
  if (route === "members" && memberId) {
    window.location.href = `./members/${memberId}.html`;
    return;
  }
  setRoute(route);
});

document.addEventListener("DOMContentLoaded", () => {
  const [route, memberId] = window.location.hash.replace("#", "").split("/");
  if (route === "members" && memberId) {
    window.location.href = `./members/${memberId}.html`;
    return;
  }
  setRoute(route);
  renderMembersDirectory();
});
