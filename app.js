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

    <div class="search-box">
      <input 
        id="searchInput"
        type="search"
        placeholder="검색어 입력: 상인, 집중, 엉성함..."
        oninput="handleSearch(this.value)"
      />
    </div>

    <section id="searchResults"></section>

    <section class="category-list" id="homeCategories">
      ${appData.map(category => `
        <button class="card" onclick="renderCategory('${category.id}')">
          <div class="card-title">${category.icon} ${category.title}</div>
          <div class="card-desc">${category.description}</div>
        </button>
      `).join("")}
    </section>

    <div class="ready">
      카테고리를 누르거나 검색어를 입력해 세부 공략을 확인하세요.
    </div>
  `;
}

function handleSearch(keyword) {
  const query = keyword.trim().toLowerCase();
  const resultsBox = document.querySelector("#searchResults");
  const homeCategories = document.querySelector("#homeCategories");

  if (!query) {
    resultsBox.innerHTML = "";
    homeCategories.style.display = "grid";
    return;
  }

  homeCategories.style.display = "none";

  const results = [];

  appData.forEach(category => {
    const categoryText = `${category.title} ${category.description}`.toLowerCase();

    if (categoryText.includes(query)) {
      results.push({
        type: "category",
        category,
        item: null
      });
    }

    (category.items || []).forEach(item => {
      const itemText = makeSearchText(category, item).toLowerCase();

      if (itemText.includes(query)) {
        results.push({
          type: "item",
          category,
          item
        });
      }
    });
  });

  if (results.length === 0) {
    resultsBox.innerHTML = `
      <div class="empty-box">
        검색 결과가 없습니다.<br />
        다른 단어로 검색해보세요.
      </div>
    `;
    return;
  }

  resultsBox.innerHTML = `
    <div class="search-count">검색 결과 ${results.length}개</div>
    <section class="category-list">
      ${results.map(result => {
        if (result.type === "category") {
          return `
            <button class="card" onclick="renderCategory('${result.category.id}')">
              <div class="card-title">${result.category.icon} ${result.category.title}</div>
              <div class="card-desc">${result.category.description}</div>
            </button>
          `;
        }

        return `
          <button class="card" onclick="openSearchItem('${result.category.id}', '${result.item.id}')">
            <div class="card-title">${result.item.icon} ${result.item.title}</div>
            <div class="card-desc">${result.category.title} · ${result.item.subtitle || result.item.summary || ""}</div>
          </button>
        `;
      }).join("")}
    </section>
  `;
}

function makeSearchText(category, item) {
  const sectionText = (item.sections || []).map(section => {
    const itemText = (section.items || []).map(sectionItem => {
      return `${sectionItem.name || ""} ${sectionItem.reason || ""}`;
    }).join(" ");

    return `${section.title} ${itemText}`;
  }).join(" ");

  return `
    ${category.title}
    ${category.description}
    ${item.title}
    ${item.subtitle || ""}
    ${item.summary || ""}
    ${sectionText}
    ${item.tip || ""}
  `;
}

function openSearchItem(categoryId, itemId) {
  currentCategory = appData.find(category => category.id === categoryId);

  if (!currentCategory) {
    renderHome();
    return;
  }

  renderDetail(itemId);
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

    <div class="count-box">
      등록된 항목 ${itemList.length}개
    </div>

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
