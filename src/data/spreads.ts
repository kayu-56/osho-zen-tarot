// EXPORTS: SpreadType, ISpreadPosition, ISpreadDefinition, SPREADS
export type SpreadType =
  | 'single'
  | 'three-card'
  | 'celtic-cross'
  | 'diamond'
  | 'flying-bird'
  | 'key'
  | 'mirror';

export interface ISpreadPosition {
  /** 牌位序号，从 1 开始 */
  index: number;
  /** 牌位名称 */
  name: string;
  /** 牌位含义说明 */
  meaning: string;
  /** 几何布局位置（百分比，相对牌阵容器） */
  layout: {
    x: number; // 0-100，水平位置
    y: number; // 0-100，垂直位置
  };
}

export interface ISpreadDefinition {
  /** 牌阵类型标识 */
  type: SpreadType;
  /** 牌阵中文名称 */
  name: string;
  /** 牌阵简介 */
  description: string;
  /** 牌的数量 */
  cardCount: number;
  /** 适用场景提示 */
  scenarios: string[];
  /** 所有牌位定义，按抽牌顺序排列 */
  positions: ISpreadPosition[];
  /** 牌阵容器的纵横比（width / height） */
  aspectRatio: number;
  /** 单牌尺寸（相对于容器宽度的百分比） */
  cardSizePercent: number;
}

export const SPREADS: Record<SpreadType, ISpreadDefinition> = {
  single: {
    type: 'single',
    name: '单牌抽卡',
    description: '抽取一张牌，直指当下核心，适合简单直接的问题或每日一抽。',
    cardCount: 1,
    scenarios: ['每日一抽', '简单问题', '快速指引'],
    aspectRatio: 1,
    cardSizePercent: 40,
    positions: [
      {
        index: 1,
        name: '当下指引',
        meaning: '此时此刻最需要被看见的信息',
        layout: { x: 50, y: 50 },
      },
    ],
  },

  'three-card': {
    type: 'three-card',
    name: '三牌阵',
    description: '经典的时间流牌阵，从过去、现在、未来三个维度看清问题的脉络与走向。',
    cardCount: 3,
    scenarios: ['关系发展', '事件走向', '选择分析'],
    aspectRatio: 2.8,
    cardSizePercent: 25,
    positions: [
      {
        index: 1,
        name: '过去 / 成因',
        meaning: '问题的根源、过去的影响因素',
        layout: { x: 14, y: 50 },
      },
      {
        index: 2,
        name: '现在 / 情境',
        meaning: '当前的状态、正在经历的事',
        layout: { x: 50, y: 50 },
      },
      {
        index: 3,
        name: '未来 / 走向',
        meaning: '如果保持现状，可能发展的方向',
        layout: { x: 86, y: 50 },
      },
    ],
  },

  diamond: {
    type: 'diamond',
    name: '钻石形排列',
    description: '奥修官方牌阵。从问题本身、内在影响、外在影响、所需条件到最终答案，层层深入核心。',
    cardCount: 5,
    scenarios: ['具体问题', '深度分析', '寻找答案'],
    aspectRatio: 1.4,
    cardSizePercent: 22,
    positions: [
      {
        index: 1,
        name: '问题',
        meaning: '你所面对问题的核心面貌',
        layout: { x: 50, y: 10 },
      },
      {
        index: 2,
        name: '内在影响（你看不到的）',
        meaning: '你未曾察觉的内在心理因素',
        layout: { x: 14, y: 50 },
      },
      {
        index: 3,
        name: '外在影响（你所知道的）',
        meaning: '你已经意识到的外部环境因素',
        layout: { x: 86, y: 50 },
      },
      {
        index: 4,
        name: '解决问题所需要的',
        meaning: '走向解决之道所需的关键品质或行动',
        layout: { x: 50, y: 90 },
      },
      {
        index: 5,
        name: '答案——了解',
        meaning: '问题的终极答案与洞见',
        layout: { x: 50, y: 50 },
      },
    ],
  },

  'flying-bird': {
    type: 'flying-bird',
    name: '飞翔的小鸟',
    description: '奥修官方牌阵。以鸟翼的阴阳能量，探索你从当下困境飞向新觉知层次的完整路径。',
    cardCount: 7,
    scenarios: ['成长突破', '走出困境', '灵性提升'],
    aspectRatio: 1.5,
    cardSizePercent: 18,
    positions: [
      {
        index: 1,
        name: '此时此地「起飞」牌',
        meaning: '你当下的起始点与状态',
        layout: { x: 82, y: 18 },
      },
      {
        index: 2,
        name: '阻抗——对飞翔的恐惧',
        meaning: '阻碍你前进的恐惧与限制',
        layout: { x: 58, y: 30 },
      },
      {
        index: 3,
        name: '对恐惧的回应能力',
        meaning: '你面对恐惧时可调动的内在资源',
        layout: { x: 28, y: 34 },
      },
      {
        index: 4,
        name: '内在支持（直觉）',
        meaning: '来自你直觉与内在的支持力量（阴/接收）',
        layout: { x: 15, y: 60 },
      },
      {
        index: 5,
        name: '外在支持（智慧行动）',
        meaning: '依直觉而行的智慧行动（阳/行动）',
        layout: { x: 85, y: 60 },
      },
      {
        index: 6,
        name: '放松与接纳',
        meaning: '需要放下与接纳的部分',
        layout: { x: 38, y: 82 },
      },
      {
        index: 7,
        name: '到达新的觉知层次',
        meaning: '穿越之后你将抵达的新境界',
        layout: { x: 62, y: 82 },
      },
    ],
  },

  key: {
    type: 'key',
    name: '钥匙牌阵',
    description: '奥修官方牌阵。像一把钥匙打开被压抑的意识之门，从被压抑的内容出发，穿越身心与本质，抵达终极的了知。',
    cardCount: 8,
    scenarios: ['深层潜意识', '解锁卡点', '意识拓展'],
    aspectRatio: 1.1,
    cardSizePercent: 17,
    positions: [
      {
        index: 1,
        name: '什么东西被压抑了',
        meaning: '被你压入潜意识的核心议题（门孔位）',
        layout: { x: 50, y: 7 },
      },
      {
        index: 2,
        name: '阴卡——女性（被动）面',
        meaning: '你内在被动、接纳、感受的面向',
        layout: { x: 28, y: 28 },
      },
      {
        index: 3,
        name: '阳卡——男性（主动）面',
        meaning: '你内在主动、行动、意志的面向',
        layout: { x: 72, y: 28 },
      },
      {
        index: 4,
        name: '静心',
        meaning: '连接身心所需的冥想与静定品质',
        layout: { x: 50, y: 44 },
      },
      {
        index: 5,
        name: '「进入身体」的洞见',
        meaning: '身体层面带给你的信息与智慧',
        layout: { x: 18, y: 64 },
      },
      {
        index: 6,
        name: '「进入心」的洞见',
        meaning: '心灵层面带给你的信息与智慧',
        layout: { x: 50, y: 64 },
      },
      {
        index: 7,
        name: '「进入本质」的洞见',
        meaning: '本质存在层面带给你的信息与智慧',
        layout: { x: 82, y: 64 },
      },
      {
        index: 8,
        name: '意识（了解）',
        meaning: '最终的了知与意识跃升',
        layout: { x: 50, y: 88 },
      },
    ],
  },

  mirror: {
    type: 'mirror',
    name: '镜子牌阵',
    description: '奥修官方牌阵。为深度关系洞察设计，左右两列分别代表双方的身心灵，中间六张映照关系的蜕变与祝福。',
    cardCount: 12,
    scenarios: ['亲密关系', '友谊洞察', '亲人关系'],
    aspectRatio: 1.6,
    cardSizePercent: 14,
    positions: [
      // 左列 - 我方
      { index: 1, name: '我方 · 身体', meaning: '你在关系中的身体层面与物理互动', layout: { x: 12, y: 18 } },
      { index: 2, name: '我方 · 心', meaning: '你在关系中的情感与心的状态', layout: { x: 12, y: 50 } },
      { index: 3, name: '我方 · 头脑', meaning: '你在关系中的思维模式与信念', layout: { x: 12, y: 82 } },
      // 右列 - 对方
      { index: 4, name: '对方 · 身体', meaning: '对方在关系中的身体层面与物理互动', layout: { x: 88, y: 18 } },
      { index: 5, name: '对方 · 心', meaning: '对方在关系中的情感与心的状态', layout: { x: 88, y: 50 } },
      { index: 6, name: '对方 · 头脑', meaning: '对方在关系中的思维模式与信念', layout: { x: 88, y: 82 } },
      // 中列左（靠近我方）- 亲密/蜕变/祝福
      { index: 7, name: '亲密（我方 · 融解与融合）', meaning: '关系中你体验到的亲密与融合', layout: { x: 38, y: 14 } },
      { index: 8, name: '蜕变（我方 · 相互提携）', meaning: '关系带给你的成长与转化', layout: { x: 38, y: 50 } },
      { index: 9, name: '祝福（我方 · 益处与礼物）', meaning: '这段关系给予你的礼物与祝福', layout: { x: 38, y: 86 } },
      // 中列右（靠近对方）- 亲密/蜕变/祝福
      { index: 10, name: '亲密（对方 · 融解与融合）', meaning: '关系中对方体验到的亲密与融合', layout: { x: 62, y: 14 } },
      { index: 11, name: '蜕变（对方 · 相互提携）', meaning: '关系带给对方的成长与转化', layout: { x: 62, y: 50 } },
      { index: 12, name: '祝福（对方 · 益处与礼物）', meaning: '这段关系给予对方的礼物与祝福', layout: { x: 62, y: 86 } },
    ],
  },

  'celtic-cross': {
    type: 'celtic-cross',
    name: '凯尔特十字',
    description: '经典塔罗牌阵，十张牌全面深入地探索问题的过去、现在、未来，以及意识与潜意识、自我与环境的多重维度。',
    cardCount: 10,
    scenarios: ['重大决策', '深度探索', '全面分析'],
    aspectRatio: 1.3,
    cardSizePercent: 15,
    positions: [
      { index: 1, name: '现况', meaning: '问题当前的核心状态', layout: { x: 35, y: 50 } },
      { index: 2, name: '阻碍', meaning: '横亘在面前的挑战或障碍', layout: { x: 35, y: 50 } },
      { index: 3, name: '意识层面 / 目标', meaning: '你有意识追求的目标或理想', layout: { x: 35, y: 18 } },
      { index: 4, name: '潜意识 / 根基', meaning: '深层潜意识中的根源与基础', layout: { x: 35, y: 82 } },
      { index: 5, name: '过去', meaning: '近期过去的影响与已发生的事', layout: { x: 10, y: 50 } },
      { index: 6, name: '近未来', meaning: '即将到来的发展与趋势', layout: { x: 60, y: 50 } },
      { index: 7, name: '自我状态', meaning: '你当下的自我状态与态度', layout: { x: 82, y: 82 } },
      { index: 8, name: '环境与他人影响', meaning: '周围环境和他人对你的影响', layout: { x: 82, y: 60 } },
      { index: 9, name: '希望与恐惧', meaning: '你内心深处的希望与恐惧交织', layout: { x: 82, y: 38 } },
      { index: 10, name: '最终结果', meaning: '事态发展的最终走向与结果', layout: { x: 82, y: 16 } },
    ],
  },
};

export const SPREAD_LIST = [
  SPREADS.single,
  SPREADS['three-card'],
  SPREADS['celtic-cross'],
  SPREADS.diamond,
  SPREADS['flying-bird'],
  SPREADS.key,
  SPREADS.mirror,
];
