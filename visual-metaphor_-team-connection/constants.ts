import { ImageCard } from './types';

// A curated list of 100 concepts for visual metaphors
export const IMAGE_CARDS: ImageCard[] = [
  // 1-10: Journey & Direction (여정과 방향)
  { id: '1', keyword: 'path', label: '오솔길', category: 'Journey' },
  { id: '2', keyword: 'highway', label: '고속도로', category: 'Journey' },
  { id: '3', keyword: 'bridge', label: '다리', category: 'Journey' },
  { id: '4', keyword: 'door', label: '문', category: 'Journey' },
  { id: '5', keyword: 'window', label: '창문', category: 'Journey' },
  { id: '6', keyword: 'stairs', label: '계단', category: 'Journey' },
  { id: '7', keyword: 'compass', label: '나침반', category: 'Journey' },
  { id: '8', keyword: 'map', label: '지도', category: 'Journey' },
  { id: '9', keyword: 'signpost', label: '이정표', category: 'Journey' },
  { id: '10', keyword: 'footprints', label: '발자국', category: 'Journey' },

  // 11-20: Nature & Growth (성장과 자연)
  { id: '11', keyword: 'seed', label: '씨앗', category: 'Nature' },
  { id: '12', keyword: 'sprout', label: '새싹', category: 'Nature' },
  { id: '13', keyword: 'tree', label: '큰 나무', category: 'Nature' },
  { id: '14', keyword: 'forest', label: '숲', category: 'Nature' },
  { id: '15', keyword: 'roots', label: '뿌리', category: 'Nature' },
  { id: '16', keyword: 'flower', label: '꽃', category: 'Nature' },
  { id: '17', keyword: 'fruit', label: '열매', category: 'Nature' },
  { id: '18', keyword: 'cactus', label: '선인장', category: 'Nature' },
  { id: '19', keyword: 'bamboo', label: '대나무', category: 'Nature' },
  { id: '20', keyword: 'leaf', label: '나뭇잎', category: 'Nature' },

  // 21-30: Weather & Atmosphere (날씨와 분위기)
  { id: '21', keyword: 'sun', label: '태양', category: 'Weather' },
  { id: '22', keyword: 'rain', label: '비', category: 'Weather' },
  { id: '23', keyword: 'storm', label: '폭풍', category: 'Weather' },
  { id: '24', keyword: 'rainbow', label: '무지개', category: 'Weather' },
  { id: '25', keyword: 'cloud', label: '구름', category: 'Weather' },
  { id: '26', keyword: 'snow', label: '눈', category: 'Weather' },
  { id: '27', keyword: 'fog', label: '안개', category: 'Weather' },
  { id: '28', keyword: 'sunrise', label: '일출', category: 'Weather' },
  { id: '29', keyword: 'stars', label: '별', category: 'Weather' },
  { id: '30', keyword: 'moon', label: '달', category: 'Weather' },

  // 31-40: Water & Flow (물과 흐름)
  { id: '31', keyword: 'ocean', label: '바다', category: 'Water' },
  { id: '32', keyword: 'wave', label: '파도', category: 'Water' },
  { id: '33', keyword: 'river', label: '강', category: 'Water' },
  { id: '34', keyword: 'waterfall', label: '폭포', category: 'Water' },
  { id: '35', keyword: 'lake', label: '호수', category: 'Water' },
  { id: '36', keyword: 'ice', label: '얼음', category: 'Water' },
  { id: '37', keyword: 'dew', label: '이슬', category: 'Water' },
  { id: '38', keyword: 'fountain', label: '분수', category: 'Water' },
  { id: '39', keyword: 'boat', label: '배', category: 'Water' },
  { id: '40', keyword: 'anchor', label: '닻', category: 'Water' },

  // 41-50: Objects of Meaning (의미 있는 사물들)
  { id: '41', keyword: 'clock', label: '시계', category: 'Object' },
  { id: '42', keyword: 'key', label: '열쇠', category: 'Object' },
  { id: '43', keyword: 'mirror', label: '거울', category: 'Object' },
  { id: '44', keyword: 'lightbulb', label: '전구', category: 'Object' },
  { id: '45', keyword: 'puzzle', label: '퍼즐', category: 'Object' },
  { id: '46', keyword: 'book', label: '책', category: 'Object' },
  { id: '47', keyword: 'pen', label: '펜', category: 'Object' },
  { id: '48', keyword: 'gift', label: '선물', category: 'Object' },
  { id: '49', keyword: 'camera', label: '카메라', category: 'Object' },
  { id: '50', keyword: 'umbrella', label: '우산', category: 'Object' },

  // 51-60: Daily Life & Comfort (일상과 편안함)
  { id: '51', keyword: 'coffee', label: '커피', category: 'Daily' },
  { id: '52', keyword: 'bread', label: '빵', category: 'Daily' },
  { id: '53', keyword: 'chair', label: '의자', category: 'Daily' },
  { id: '54', keyword: 'bed', label: '침대', category: 'Daily' },
  { id: '55', keyword: 'house', label: '집', category: 'Daily' },
  { id: '56', keyword: 'candle', label: '양초', category: 'Daily' },
  { id: '57', keyword: 'shoes', label: '신발', category: 'Daily' },
  { id: '58', keyword: 'glasses', label: '안경', category: 'Daily' },
  { id: '59', keyword: 'bag', label: '가방', category: 'Daily' },
  { id: '60', keyword: 'piggybank', label: '저금통', category: 'Daily' },

  // 61-70: Tools & Structure (도구와 구조)
  { id: '61', keyword: 'gear', label: '톱니바퀴', category: 'Tool' },
  { id: '62', keyword: 'ladder', label: '사다리', category: 'Tool' },
  { id: '63', keyword: 'hammer', label: '망치', category: 'Tool' },
  { id: '64', keyword: 'rope', label: '밧줄', category: 'Tool' },
  { id: '65', keyword: 'shield', label: '방패', category: 'Tool' },
  { id: '66', keyword: 'sword', label: '검', category: 'Tool' },
  { id: '67', keyword: 'scale', label: '저울', category: 'Tool' },
  { id: '68', keyword: 'wall', label: '벽', category: 'Structure' },
  { id: '69', keyword: 'fence', label: '울타리', category: 'Structure' },
  { id: '70', keyword: 'pillar', label: '기둥', category: 'Structure' },

  // 71-80: Animals (동물과 성향)
  { id: '71', keyword: 'lion', label: '사자', category: 'Animal' },
  { id: '72', keyword: 'turtle', label: '거북이', category: 'Animal' },
  { id: '73', keyword: 'eagle', label: '독수리', category: 'Animal' },
  { id: '74', keyword: 'ant', label: '개미', category: 'Animal' },
  { id: '75', keyword: 'butterfly', label: '나비', category: 'Animal' },
  { id: '76', keyword: 'dog', label: '강아지', category: 'Animal' },
  { id: '77', keyword: 'cat', label: '고양이', category: 'Animal' },
  { id: '78', keyword: 'owl', label: '부엉이', category: 'Animal' },
  { id: '79', keyword: 'dolphin', label: '돌고래', category: 'Animal' },
  { id: '80', keyword: 'bear', label: '곰', category: 'Animal' },

  // 81-90: Hobbies & Activities (취미와 활동)
  { id: '81', keyword: 'music', label: '음악', category: 'Activity' },
  { id: '82', keyword: 'art', label: '미술', category: 'Activity' },
  { id: '83', keyword: 'running', label: '달리기', category: 'Activity' },
  { id: '84', keyword: 'climbing', label: '등산', category: 'Activity' },
  { id: '85', keyword: 'travel', label: '여행', category: 'Activity' },
  { id: '86', keyword: 'camping', label: '캠핑', category: 'Activity' },
  { id: '87', keyword: 'cooking', label: '요리', category: 'Activity' },
  { id: '88', keyword: 'chess', label: '체스', category: 'Activity' },
  { id: '89', keyword: 'dance', label: '춤', category: 'Activity' },
  { id: '90', keyword: 'writing', label: '글쓰기', category: 'Activity' },

  // 91-100: Concepts & Abstract (추상적 개념)
  { id: '91', keyword: 'fire', label: '불꽃', category: 'Concept' },
  { id: '92', keyword: 'heart', label: '하트', category: 'Concept' },
  { id: '93', keyword: 'handshake', label: '악수', category: 'Concept' },
  { id: '94', keyword: 'crowd', label: '군중', category: 'Concept' },
  { id: '95', keyword: 'alone', label: '고독', category: 'Concept' },
  { id: '96', keyword: 'maze', label: '미로', category: 'Concept' },
  { id: '97', keyword: 'target', label: '과녁', category: 'Concept' },
  { id: '98', keyword: 'dice', label: '주사위', category: 'Concept' },
  { id: '99', keyword: 'balloon', label: '풍선', category: 'Concept' },
  { id: '100', keyword: 'fireworks', label: '불꽃놀이', category: 'Concept' },
];

export const PROMPTS = [
  {
    id: 0,
    title: "나를 잘 나타내는 이미지",
    shortTitle: "나 (Me)",
    description: "현재의 나, 혹은 내가 추구하는 모습을 닮은 이미지는?",
    color: "bg-blue-100 border-blue-300 text-blue-800"
  },
  {
    id: 1,
    title: "내 삶의 낙",
    shortTitle: "기쁨 (Joy)",
    description: "나에게 힘을 주는 것, 나를 웃게 만드는 것은?",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800"
  },
  {
    id: 2,
    title: "요즘 나의 걱정이나 고민",
    shortTitle: "고민 (Worry)",
    description: "요즘 내 마음을 무겁게 하거나 신경 쓰이는 것은?",
    color: "bg-red-100 border-red-300 text-red-800"
  }
];