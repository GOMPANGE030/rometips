const APP_DATA = [
  {
    id: "job-traits",
    title: "직업특성표",
    icon: "🧑‍🌾",
    description: "직업별 긍정특성, 피해야 할 부정특성, 배치 기준 정리",
    items: [
      {
        id: "blacksmith",
        title: "대장장이",
        icon: "🔨",
        subtitle: "제작 배치 기준",
        summary: "대장장이는 제작 품질과 작업 안정성이 중요한 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "세심함" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "신속" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "엉성함" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "머뭇거림" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "제작 품질에는 직접 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량만 감당되면 작업 성능에는 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "장기 충성도 보너스는 늦지만 즉시 제작 성능은 직접 깎지 않습니다."
              }
            ]
          }
        ],
        tip: "대장장이는 엉성함을 가장 조심해야 합니다. 제작 품질과 전문성 영향이 큰 직업으로 보는 것이 좋습니다."
      },
      {
        id: "leatherworker",
        title: "가죽 장인",
        icon: "🧵",
        subtitle: "가죽 제작 배치 기준",
        summary: "가죽 장인은 대장장이와 비슷하게 제작 품질과 안정성을 중요하게 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "세심함" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "신속" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "엉성함" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "머뭇거림" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "가죽 제작 품질에는 직접 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량 여유가 있으면 감수 가능합니다."
              },
              {
                name: "불충",
                reason: "장기 육성은 느려지지만 제작 자체에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "가죽 장인은 대장장이와 거의 같은 기준으로 보면 됩니다. 엉성함은 피하고, 세심함을 우선으로 보는 편이 좋습니다."
      },
      {
        id: "woodcutter",
        title: "나무꾼",
        icon: "🪓",
        subtitle: "벌목장 배치 기준",
        summary: "희귀 장신구 파밍까지 보는 기준입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "세심함" },
              { rank: 2, name: "신속" },
              { rank: 3, name: "들뜸" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "엉성함" },
              { rank: 2, name: "머뭇거림" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "나무꾼 레벨을 다 올린 뒤면 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량 자동화 이후엔 감수 가능합니다."
              },
              {
                name: "불충",
                reason: "즉시 벌목/희귀드랍 자체에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "단순 목재 수급만 목적이면 신속이 1순위, 머뭇거림이 최악입니다."
      },
      {
        id: "miner",
        title: "광부",
        icon: "⛏️",
        subtitle: "채석장 배치 기준",
        summary: "광부는 광물 수급과 희귀 드랍 파밍 목적에 따라 우선 특성이 달라집니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "세심함" },
              { rank: 2, name: "신속" },
              { rank: 3, name: "들뜸" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "엉성함" },
              { rank: 2, name: "머뭇거림" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "광부 레벨이 충분하면 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량 여유가 있으면 감수 가능합니다."
              },
              {
                name: "불충",
                reason: "당장 채굴 성능에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "광물 수급만 보면 신속 > 세심함이고, 희귀 드랍 파밍이면 세심함 > 신속입니다."
      },
      {
        id: "digger",
        title: "삽질꾼",
        icon: "🪏",
        subtitle: "점토 채굴장 배치 기준",
        summary: "삽질꾼은 점토/화산재 같은 실사용 자원 수급 압박이 커서 기본적으로 신속을 우선합니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "세심함" },
              { rank: 3, name: "들뜸" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "엉성함" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "삽질꾼 레벨이 충분하면 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "점토/화산재 생산 자체에는 직접 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량 자동화가 되면 감수 가능합니다."
              }
            ]
          }
        ],
        tip: "점토 채굴장은 실사용 자원 수급 압박이 커서 기본은 신속 우선입니다. 다만 희귀 드랍만 노리면 세심함 가치가 올라갑니다."
      },
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
        id: "farmer",
        title: "농부",
        icon: "🌾",
        subtitle: "농장 배치 기준",
        summary: "농부는 농사 자동화와 식량 생산 효율을 중심으로 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "식탐" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "엉성함",
                reason: "농사 자동화에는 전문성 영향이 낮아 보입니다."
              },
              {
                name: "집중력 상실",
                reason: "농부 레벨을 다 올린 뒤면 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "장기 보너스는 늦지만 농사 작업 자체에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "농부는 신속 + 엉성함이면 꽤 쓸 만합니다."
      },
      {
        id: "baker",
        title: "제빵사",
        icon: "🥖",
        subtitle: "제빵소 배치 기준",
        summary: "제빵사는 음식 생산 속도와 안정적인 식량 순환을 중심으로 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "식탐" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "엉성함",
                reason: "음식 생산은 전문성보다 속도 쪽이 중요합니다."
              },
              {
                name: "집중력 상실",
                reason: "제빵사 레벨 완료 후엔 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "즉시 생산 성능에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "제빵사도 신속 + 엉성함은 괜찮은 조합입니다."
      },
      {
        id: "carpenter",
        title: "목수",
        icon: "🪵",
        subtitle: "목공/건축 배치 기준",
        summary: "목수는 건축 자동화와 제작 속도 쪽 효율을 중심으로 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "식탐" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "목수 레벨을 다 올린 뒤면 영향이 적습니다."
              },
              {
                name: "엉성함",
                reason: "일반 건축 보조/자재 제작용이면 상대적으로 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "장기 보너스 지연 외에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "목수는 건축 자동화/제작 속도 쪽이라 신속이 제일 편합니다."
      },
      {
        id: "potter",
        title: "도공",
        icon: "🏺",
        subtitle: "도자기/용기 제작 배치 기준",
        summary: "도공은 단지나 병 같은 대량 생산 효율을 중심으로 보는 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "식탐" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "도공 레벨이 충분하면 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "단지/병 생산 자체에는 직접 영향이 적습니다."
              },
              {
                name: "엉성함",
                reason: "대량 생산용이면 감수 가능합니다."
              }
            ]
          }
        ],
        tip: "도공은 기본적으로 효율직으로 보는 게 맞습니다. 다만 나중에 도자기 공방에서 전문성이 특별히 의미 있는 제작물이 확인되면 엉성함 평가는 내려가야 합니다."
      },
      {
        id: "philosopher",
        title: "철학자",
        icon: "📚",
        subtitle: "대학 배치 기준",
        summary: "철학자는 연구 논문 생산과 레벨업 상태에 따라 집중과 신속의 가치가 달라집니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "집중" },
              { rank: 3, name: "들뜸" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "집중력 상실" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "엉성함",
                reason: "연구 논문 생산용이면 영향이 적습니다."
              },
              {
                name: "식탐",
                reason: "식량 여유가 있으면 감수 가능합니다."
              },
              {
                name: "불충",
                reason: "즉시 연구 생산에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "레벨업 중이면 집중 가치가 올라가고, 레벨이 충분하면 신속이 더 좋습니다."
      },
      {
        id: "sculptor",
        title: "조각가",
        icon: "🗿",
        subtitle: "조각/꾸미기 제작 기준",
        summary: "조각가는 현재 우선도가 낮은 직업으로, 좋은 시민을 먼저 넣기엔 아까운 편입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "우울" },
              { rank: 3, name: "식탐" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "조각가 레벨을 크게 신경 쓰지 않으면 영향이 적습니다."
              },
              {
                name: "엉성함",
                reason: "가구/꾸미기 제작 위주면 상대적으로 영향이 적습니다."
              },
              {
                name: "불충",
                reason: "즉시 제작 속도에는 직접 영향이 적습니다."
              }
            ]
          }
        ],
        tip: "조각가는 현재 우선도가 낮은 직업이라 좋은 시민을 먼저 넣기는 아깝습니다."
      },
      {
        id: "porter",
        title: "짐꾼",
        icon: "📦",
        subtitle: "교역소 배치 기준",
        summary: "짐꾼은 좋은 시민을 오래 투입하기보다는 남는 시민을 활용하는 쪽에 가까운 직업입니다.",
        sections: [
          {
            title: "긍정특성",
            type: "ranked",
            items: [
              { rank: 1, name: "신속" },
              { rank: 2, name: "들뜸" },
              { rank: 3, name: "팔랑귀" }
            ]
          },
          {
            title: "부정특성(피해야함)",
            type: "ranked",
            items: [
              { rank: 1, name: "머뭇거림" },
              { rank: 2, name: "식탐" },
              { rank: 3, name: "우울" }
            ]
          },
          {
            title: "있어도 영향 적은 부정특성",
            type: "explain",
            items: [
              {
                name: "집중력 상실",
                reason: "짐꾼 최대 레벨이 낮아서 거의 의미가 없습니다."
              },
              {
                name: "엉성함",
                reason: "전문성 활용도가 낮습니다."
              },
              {
                name: "불충",
                reason: "좋은 시민을 짐꾼에 오래 쓸 일이 적어서 영향이 낮습니다."
              }
            ]
          }
        ],
        tip: "솔직히 짐꾼은 좋은 시민 넣는 자리 아닙니다. 남는 시민 쓰는 쪽이 맞습니다."
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
