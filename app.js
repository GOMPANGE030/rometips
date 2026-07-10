const appData = typeof APP_DATA !== "undefined" ? APP_DATA : [];

let currentCategory = null;
let currentItem = null;

function initApp() {
  renderHome();
}

function renderHome() {
  const app = document.querySelector(".app");

  app.innerHTML = `
    <h1 class="title">Rometips</h1>
    <p class="subtitle">
      롬스테드 게임 팁을 모아두는 개인용 공략 노트입니다.
    </p>

    <section class="category-list">
      ${appData.map(category => `
        <button class="card" onclick="renderCategory('${category.id}')">
          <div class="card-title">${category.icon} ${category.title}</div>
          <div class="card-desc">${category.description}</div>
        </button>
      `).join("")}
    </section>

    <div class="ready">
      카테고리를 눌러 세부 공략을 확인하세요.
    </div>
  `;
}

function renderCategory(categoryId) {
  currentCategory = appData.find(category => category.id === categoryId);
  currentItem = null;

  const app = document.querySelector(".app");

  if (!currentCategory) {
    renderHome();
    return;
  }

  const itemList = currentCategory.items || [];

  app.innerHTML = `
    <button class="back-button" onclick="renderHome()">← 메인으로</button>

    <h1 class="title">${currentCategory.icon} ${currentCategory.title}</h1>
    <p class="subtitle">${currentCategory.description}</p>

    <section class="category-list">
      ${itemList.length > 0 ? itemList.map(item => `
        <button class="card" onclick="renderDetail('${item.id}')">
          <div class="card-title">${item.icon} ${item.title}</div>
          <div class="card-desc">${item.subtitle || item.summary || ""}</div>
        </button>
      `).join("") : `
        <div class="empty-box">
          아직 등록된 내용이 없습니다.<br />
          나중에 데이터를 추가하면 여기에 표시됩니다.
        </div>
      `}
    </section>
  `;
}

function renderDetail(itemId) {
  if (!currentCategory) {
    renderHome();
    return;
  }

  currentItem = currentCategory.items.find(item => item.id === itemId);

  if (!currentItem) {
    renderCategory(currentCategory.id);
    return;
  }

  const app = document.querySelector(".app");

  app.innerHTML = `
    <button class="back-button" onclick="renderCategory('${currentCategory.id}')">← 목록으로</button>

    <section class="detail-header">
      <div class="detail-icon">${currentItem.icon}</div>
      <h1 class="title">${currentItem.title}</h1>
      <p class="subtitle">${currentItem.subtitle || ""}</p>
      ${currentItem.summary ? `<p class="summary">${currentItem.summary}</p>` : ""}
    </section>

    <section class="detail-content">
      ${(currentItem.sections || []).map(section => renderSection(section)).join("")}
    </section>

    ${currentItem.tip ? `
      <section class="tip-box">
        <div class="tip-title">💡 조합 팁</div>
        <div class="tip-text">${currentItem.tip}</div>
      </section>
    ` : ""}
  `;
}

function renderSection(section) {
  if (section.type === "ranked") {
    return `
      <section class="info-section">
        <h2>${section.title}</h2>
        <div class="rank-list">
          ${section.items.map(item => `
            <div class="rank-item">
              <span class="rank-badge">${item.rank}순위</span>
              <span class="rank-name">${item.name}</span>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (section.type === "explain") {
    return `
      <section class="info-section">
        <h2>${section.title}</h2>
        <div class="explain-list">
          ${section.items.map(item => `
            <div class="explain-item">
              <strong>${item.name}</strong>
              <p>${item.reason}</p>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  return `
    <section class="info-section">
      <h2>${section.title}</h2>
      <p>표시할 수 없는 섹션 형식입니다.</p>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", initApp);
