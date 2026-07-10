const appData = typeof APP_DATA !== "undefined" ? APP_DATA : [];

let currentCategory = null;
let currentItem = null;
let selectedPositiveTrait = "";
let selectedNegativeTrait = "";

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

const POSITIVE_TRAITS = ["세심함", "신속", "집중", "팔랑귀", "들뜸"];
const NEGATIVE_TRAITS = ["엉성함", "우울", "머뭇거림", "집중력 상실", "불충", "식탐"];

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

function getSectionColorClass(section) {
  const title = section.title || "";

  if (title === "긍정특성") {
    return {
      sectionClass: "positive-section",
      itemClass: "positive-item",
      badgeClass: "positive-badge"
    };
  }

  if (title === "부정특성(피해야함)") {
    return {
      sectionClass: "negative-section",
      itemClass: "negative-item",
      badgeClass: "negative-badge"
    };
  }

  return {
    sectionClass: "neutral-section",
    itemClass: "neutral-item",
    badgeClass: ""
  };
}

function findSection(item, sectionTitle) {
  return (item.sections || []).find(section => section.title === sectionTitle);
}

function sectionHasTrait(section, traitName) {
  if (!section || !traitName) return false;
  return (section.items || []).some(sectionItem => sectionItem.name === traitName);
}

function findPositiveTrait(item, traitName) {
  const positiveSection = findSection(item, "긍정특성");
  if (!positiveSection || !traitName) return null;

  return (positiveSection.items || []).find(sectionItem => sectionItem.name === traitName) || null;
}

function getRecommendation(item) {
  if (!selectedPositiveTrait || !selectedNegativeTrait) {
    return {
      isRecommended: false,
      score: 0,
      reason: ""
    };
  }

  const positiveMatch = findPositiveTrait(item, selectedPositiveTrait);
  const avoidSection = findSection(item, "부정특성(피해야함)");
  const lowImpactSection = findSection(item, "있어도 영향 적은 부정특성");

  const negativeIsAvoid = sectionHasTrait(avoidSection, selectedNegativeTrait);
  const negativeIsLowImpact = sectionHasTrait(lowImpactSection, selectedNegativeTrait);

  if (!positiveMatch || !negativeIsLowImpact || negativeIsAvoid) {
    return {
      isRecommended: false,
      score: 0,
      reason: ""
    };
  }

  const positiveScore = positiveMatch.rank === 1 ? 3 : positiveMatch.rank === 2 ? 2 : 1;
  const lowImpactScore = 3;
  const totalScore = positiveScore + lowImpactScore;

  return {
    isRecommended: true,
    score: totalScore,
    reason: `${selectedPositiveTrait} ${positiveMatch.rank}순위 + ${selectedNegativeTrait} 영향 적음`
  };
}

function getSortedItemMeta(itemList) {
  return itemList
    .map((item, index) => ({
      item,
      index,
      recommendation: getRecommendation(item)
    }))
    .sort((a, b) => {
      if (a.recommendation.isRecommended !== b.recommendation.isRecommended) {
        return b.recommendation.isRecommended - a.recommendation.isRecommended;
      }

      if (a.recommendation.isRecommended && b.recommendation.isRecommended) {
        return b.recommendation.score - a.recommendation.score;
      }

      return a.index - b.index;
    });
}

function getRecommendationCount(itemList) {
  return itemList.filter(item => getRecommendation(item).isRecommended).length;
}

function setPositiveTrait(traitName) {
  selectedPositiveTrait = selectedPositiveTrait === traitName ? "" : traitName;
  renderCategory(currentCategory.id);
}

function setNegativeTrait(traitName) {
  selectedNegativeTrait = selectedNegativeTrait === traitName ? "" : traitName;
  renderCategory(currentCategory.id);
}

function resetTraitFilter() {
  selectedPositiveTrait = "";
  selectedNegativeTrait = "";
  renderCategory(currentCategory.id);
}

function renderFilterButton(type, traitName) {
  const isPositive = type === "positive";
  const isSelected = isPositive
    ? selectedPositiveTrait === traitName
    : selectedNegativeTrait === traitName;

  const buttonClass = [
    "trait-filter-button",
    isPositive ? "positive-filter-button" : "negative-filter-button",
    isSelected ? "is-selected" : ""
  ].join(" ");

  const handlerName = isPositive ? "setPositiveTrait" : "setNegativeTrait";

  return `
    <button class="${buttonClass}" onclick="${handlerName}('${traitName}')">
      ${renderIcon({ name: traitName }, "filter-icon")}
      <span>${traitName}</span>
    </button>
  `;
}

function renderTraitRecommender(category) {
  if (!category || category.id !== "job-traits") {
    return "";
  }

  const itemList = category.items || [];
  const hasBothSelected = selectedPositiveTrait && selectedNegativeTrait;
  const recommendationCount = hasBothSelected ? getRecommendationCount(itemList) : 0;

  let resultText = "긍정특성 1개와 부정특성 1개를 선택하면, 적합한 직업이 맨 위로 올라옵니다.";

  if (hasBothSelected && recommendationCount > 0) {
    resultText = `${selectedPositiveTrait} + ${selectedNegativeTrait} 조합에 맞는 추천 직업 ${recommendationCount}개`;
  }

  if (hasBothSelected && recommendationCount === 0) {
    resultText = `${selectedPositiveTrait} + ${selectedNegativeTrait} 조합에 맞는 추천 직업이 없습니다.`;
  }

  return `
    <section class="trait-recommender">
      <div class="trait-recommender-title">시민 특성으로 직업 추천</div>
      <p class="trait-recommender-desc">
        시민이 가진 긍정특성 1개와 부정특성 1개를 선택하세요.
      </p>

      <div class="trait-filter-group">
        <div class="trait-filter-label">긍정특성</div>
        <div class="trait-filter-buttons">
          ${POSITIVE_TRAITS.map(trait => renderFilterButton("positive", trait)).join("")}
        </div>
      </div>

      <div class="trait-filter-group">
        <div class="trait-filter-label">부정특성</div>
        <div class="trait-filter-buttons">
          ${NEGATIVE_TRAITS.map(trait => renderFilterButton("negative", trait)).join("")}
        </div>
      </div>

      <div class="recommend-result-box">
        ${resultText}
      </div>

      ${(selectedPositiveTrait || selectedNegativeTrait) ? `
        <button class="filter-reset-button" onclick="resetTraitFilter()">선택 초기화</button>
      ` : ""}
    </section>
  `;
}

function renderHome() {
  const app = document.querySelector(".app");

  app.innerHTML = `
    <img class="logo-image" src="rometips_logo.png" alt="Rometips" />
    <p class="subtitle">
      롬스테드 해부리자
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
  const sortedMeta = getSortedItemMeta(itemList);

  app.innerHTML = `
    <button class="back-button" onclick="renderHome()">← 메인으로</button>

    <h1 class="title">${renderIcon(currentCategory, "title-icon")} ${currentCategory.title}</h1>
    <p class="subtitle">${currentCategory.description}</p>

    <div class="count-box">
      등록된 항목 ${itemList.length}개
    </div>

    ${renderTraitRecommender(currentCategory)}

    <section class="category-list">
      ${sortedMeta.length > 0 ? sortedMeta.map(({ item, recommendation }) => `
        <button class="card ${recommendation.isRecommended ? "recommended-card" : ""}" onclick="renderDetail('${item.id}')">
          <div class="card-title">${renderIcon(item)} ${item.title}</div>
          <div class="card-desc">${item.subtitle || item.summary || ""}</div>
          ${recommendation.isRecommended ? `
            <div class="recommend-reason">
              추천 조합 · ${recommendation.reason}
            </div>
          ` : ""}
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
  const color = getSectionColorClass(section);

  if (section.type === "ranked") {
    return `
      <section class="info-section ${color.sectionClass}">
        <h2>${section.title}</h2>
        <div class="rank-list">
          ${section.items.map(item => `
            <div class="rank-item ${color.itemClass}">
              <span class="rank-badge ${color.badgeClass}">${item.rank}순위</span>
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
      <section class="info-section ${color.sectionClass}">
        <h2>${section.title}</h2>
        <div class="explain-list">
          ${section.items.map(item => `
            <div class="explain-item ${color.itemClass}">
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
    <section class="info-section ${color.sectionClass}">
      <h2>${section.title}</h2>
      <p>표시할 수 없는 섹션 형식입니다.</p>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", initApp);
