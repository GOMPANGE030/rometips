const APP_DATA = [
  {
    id: "job-traits",
    title: "직업특성표",
    icon: "🧑‍🌾",
    description: "직업별 긍정특성, 피해야 할 부정특성, 배치 기준 정리",
    items: [
      {
        id: "merchant",
        title: "상인",
        icon: "🛒",
        subtitle: "시장 배치 기준",
        summary: "상인은 시장 배치 기준으로, 판매 라인업과 레벨업 효율을 중심으로 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "집중" },
              { rank: 2, name: "팔랑귀" },
              { rank: 3, name: "들뜸" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "집중력 상실" },
              { rank: 2, name: "불충" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "엉성함",
                reason: "상인은 전문성 활용도가 낮아서 영향이 적습니다."
              },
              {
                name: "머뭇거림",
                reason: "시장은 작업속도보다 레벨업/판매 라인업이 중요해서 상대적으로 덜 아픕니다."
              },
              {
                name: "식탐",
                reason: "식량 여유가 있으면 감수 가능합니다."
              }
            ]
          }
        ],
        tip: "상인에게는 집중 + 엉성함 같은 조합이 오히려 괜찮습니다. 엉성함이 대장장이에겐 최악이지만 상인에겐 큰 문제가 아닙니다."
      },
      {
        id: "blacksmith",
        title: "대장장이",
        icon: "🔨",
        subtitle: "제작 배치 기준",
        summary: "대장장이는 제작 효율과 전문성 영향을 크게 받는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "준비중" },
              { rank: 2, name: "준비중" },
              { rank: 3, name: "준비중" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "엉성함" },
              { rank: 2, name: "준비중" },
              { rank: 3, name: "준비중" }
            ]
          }
        ],
        tip: "대장장이는 추후 데이터를 채워 넣을 예정입니다."
      }
    ]
  },
  {
    id: "weapon-prefix",
    title: "무기수식어",
    icon: "⚔️",
    description: "무기에 붙는 수식어 효과와 추천 사용처 정리",
    items: []
  },
  {
    id: "building-tips",
    title: "건물/배치팁",
    icon: "🏠",
    description: "마을 운영과 건물 배치 관련 팁 정리",
    items: []
  },
  {
    id: "etc-tips",
    title: "기타팁",
    icon: "📌",
    description: "나중에 추가할 여러 공략 메모",
    items: []
  }
];
