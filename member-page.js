const memberId = document.body.dataset.member;
const member = members.find((item) => item.id === memberId);
const memberRoot = document.querySelector("#member-page");

function assetPath(src) {
  return src.replace("./", "../");
}

function textPair(primary, secondary) {
  return secondary ? `${primary}<span lang="zh-Hant">${secondary}</span>` : primary;
}

function renderCvSection(section) {
  const items = section.items
    .map((item) => {
      const zh = item.zh ? `<br /><span lang="zh-Hant">${item.zh}</span>` : "";
      return `
        <li>
          <time>${item.year}</time>
          <span>${item.en}${zh}</span>
        </li>
      `;
    })
    .join("");

  return `
    <section class="cv-section">
      <h3>${textPair(section.title.en, section.title.zh)}</h3>
      <ul class="cv-list">${items}</ul>
    </section>
  `;
}

function renderGallery(items, memberName) {
  return items
    .map((item) => {
      const image = `
        <img src="${assetPath(item.src)}" alt="${memberName}, ${item.caption}" loading="lazy" />
        <figcaption>${item.caption}</figcaption>
      `;
      return `
        <figure>
          ${
            item.url
              ? `<a class="work-link" href="${item.url}" target="_blank" rel="noreferrer">${image}</a>`
              : image
          }
        </figure>
      `;
    })
    .join("");
}

function renderProjectSections(memberData) {
  if (memberData.projectSections?.length) {
    return memberData.projectSections
      .map(
        (section) => `
          <section class="project-section">
            <h3>${section.title}</h3>
            <div class="member-gallery">
              ${renderGallery(section.items, memberData.name.en)}
            </div>
          </section>
        `
      )
      .join("");
  }

  if (!memberData.gallery?.length) {
    return "";
  }

  return `
    <section class="project-section">
      <h3>Selected Works</h3>
      <div class="member-gallery">
        ${renderGallery(memberData.gallery, memberData.name.en)}
      </div>
    </section>
  `;
}

function renderMemberPage() {
  if (!member) {
    memberRoot.innerHTML = `<div class="empty-state">Member not found.</div>`;
    return;
  }

  document.title = `${member.name.en} | 原质社 RAW COLLECTIVE`;

  const tags = member.tags.map((tag) => `<span>${tag}</span>`).join("");
  const links = member.links
    .map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`)
    .join("");

  memberRoot.innerHTML = `
    <a class="back-button" href="../index.html#members">Back to members</a>

    <header class="member-hero">
      <div>
        <p class="eyebrow">Member page</p>
        <h1 class="member-name">${member.name.en}<br /><span lang="zh-Hant">${member.name.zh}</span></h1>
        <p class="member-role">${member.role.en}<br /><span lang="zh-Hant">${member.role.zh}</span></p>
      </div>
      <div>
        ${member.portrait ? `<img class="member-portrait" src="${assetPath(member.portrait)}" alt="${member.name.en} portrait" />` : ""}
        <div class="member-tags" aria-label="Member tags">${tags}</div>
      </div>
    </header>

    <section class="member-bio" aria-label="Member biography">
      <p>${member.bio.en}</p>
      <p lang="zh-Hant">${member.bio.zh}</p>
    </section>

    ${member.cv.map(renderCvSection).join("")}

    ${renderProjectSections(member)}

    ${links ? `<nav class="member-links" aria-label="Member links">${links}</nav>` : ""}
  `;
}

document.addEventListener("DOMContentLoaded", renderMemberPage);
