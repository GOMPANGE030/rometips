const appData = typeof APP_DATA !== "undefined" ? APP_DATA : [];

let currentCategory = null;
let currentItem = null;

const ICON_PATH = "";

const ICON_MAP = {
  // 카테고리
  "job-traits": "24px-Town_Core.webp",
  "직업특성표": "24px-Town_Core.webp",
  "weapon-prefix": "Iron_Gladius.webp",
  "무기수식어": "Iron_Gladius.webp",
  "building-tips": "24px-Material_Storage.webp",
  "건물/배치팁": "24px-Material_Storage.webp",
  "etc-tips": "SqqbH_Mf_400x400.jpg",
  "기타팁": "SqqbH_Mf_400x400.jpg",

  // 직업
  "blacksmith": "24px-Blacksmith.webp",
  "대장장이": "24px-Blacksmith.webp",
  "leatherworker": "Leatherworker.webp",
  "가죽 장인": "Leatherworker.webp",
  "woodcutter": "24px-Lumber_Yard.webp",
  "나무꾼": "24px-Lumber_Yard.webp",
  "miner": "24px-Quarry.webp",
  "광부": "24px-Quarry.webp",
  "digger": "24px-Clay_Pit.webp",
  "삽질꾼": "24px-Clay_Pit.webp",
  "merchant": "24px-Market.webp",
  "상인": "24px-Market.webp",
  "farmer": "24px-Farmstead.webp",
  "농부": "24px-Farmstead.webp",
  "baker": "24px-Bakery.webp",
  "제빵사": "24px-Bakery.webp",
  "carpenter": "Carpenter's_Workshop.webp",
  "목수": "Carpenter's_Workshop.webp",
  "potter": "24px-Pottery.webp",
  "도공": "24px-Pottery.webp",
  "philosopher": "24px-University.webp",
  "철학자": "24px-University.webp",
  "sculptor": "24px-Sculptor.webp",
  "조각가": "24px-Sculptor.webp",
  "porter": "24px-Logistics_Tent.webp",
  "짐꾼": "24px-Logistics_Tent.webp",

  // 특성
  "세심함": "Meticulous.webp",
  "들뜸": "24px-Happiness.webp",
  "우울": "24px-Happiness.webp",
  "신속": "Quick.webp",
  "엉성함": "Sloppy.webp",
  "집중": "24px-Experience_Gain.webp",
  "집중력 상실": "Unfocused.webp",
  "팔랑귀": "Impressionable.webp",
  "불충": "Disloyal.webp",
  "머뭇거림": "Tentative.webp",
  "식탐": "24px-Food_Cost.webp"
};

function initApp() {
  renderHome();
}

function getLabel(target) {
  return target.title || target.name || "아이콘";
}

function resolveImage(target) {
  if (!target) return "";

  if (target.image) {
    return target.image;
  }

  if (target.id && ICON_MAP[target.id]) {
    return ICON_PATH + ICON_MAP[target.id];
  }

  if (target.title && ICON_MAP[target.title]) {
    return ICON_PATH + ICON_MAP[target.title];
  }

  if (target.name && ICON_MAP[target.name]) {
    return ICON_PATH + ICON_MAP[target.name];
  }

  return "";
}

function renderIcon(target, className = "inline-icon") {
  const imageSrc = resolveImage(target);

  if (imageSrc) {
    return `<img class="${className}" src="${imageSrc}" alt="${getLabel(target)} 아이콘" />`;
  }

  return `<span class="${className} emoji-icon">${target.icon || "📌"}</span>`;
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
          <div class="card-title">${renderIcon(category)} ${category.title}</div>
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
              <div class="card-title">${renderIcon(result.category)} ${result.category.title}</div>
              <div class="card-desc">${result.category.description}</div>
            </button>
          `;
        }

        return `
          <button class="card" onclick="openSearchItem('${result.category.id}', '${result.item.id}')">
            <div class="card-title">${renderIcon(result.item)} ${result.item.title}</div>
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

    <h1 class="title">${renderIcon(currentCategory, "title-icon")} ${currentCategory.title}</h1>
    <p class="subtitle">${currentCategory.description}</p>

    <div class="count-box">
      등록된 항목 ${itemList.length}개
    </div>

    <section class="category-list">
      ${itemList.length > 0 ? itemList.map(item => `
        <button class="card" onclick="renderDetail('${item.id}')">
          <div class="card-title">${renderIcon(item)} ${item.title}</div>
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
      <div class="detail-icon">${renderIcon(currentItem, "detail-image-icon")}</div>
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
              ${renderIcon(item, "trait-icon")}
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
              <div class="explain-title">
                ${renderIcon(item, "trait-icon")}
                <strong>${item.name}</strong>
              </div>
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
