// EXPORTS: CardFamily, IOshoCard, MOCK_OSHO_CARDS
export type CardFamily = 'major' | 'fire' | 'water' | 'cloud' | 'rainbow';

export interface IOshoCard {
  id: string;
  number: number;
  name: string;
  nameFr: string;
  family: CardFamily;
  familyLabel: string;
  imageUrl: string;
  meaning: string;
  keywords: string[];
}

export const MOCK_OSHO_CARDS: IOshoCard[] = [
  // ===== 大阿卡纳 Major Arcana (23 张) =====
  {
    id: '0',
    number: 0,
    name: '愚者',
    nameFr: "Le Fou",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/WvYCxjqv/osho-00-le-fou.png',
    meaning:
      '愚者无论经历多少，始终保有一种对生命的信任。你可以欺骗他，但他下一次仍然愿意敞开——不是因为愚蠢，而是因为他深知信任是生命的本质。\n\n' +
      '现在是时候相信你的直觉，跟随内心那"感觉对了"的声音。头脑会算计得失，但愚者的智慧在于：他纵身一跃，因为他知道存在会接住他。\n\n' +
      '放下谨慎与算计，以赤子之心踏入未知。生命最珍贵的礼物，永远留给敢先信任的人。',
    keywords: ['信任', '赤子之心', '纵身一跃', '直觉'],
  },
  {
    id: '1',
    number: 1,
    name: '存在',
    nameFr: "L'Existence",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/Vcw1bm2s/osho-01-lexistence.png',
    meaning:
      '你不是一个偶然的现象。存在需要你——少了你，宇宙中就少了某种独一无二的东西。你的存在本身，就是一个神圣的答案。\n\n' +
      '问问自己：无论身在何处，你是否感到"回家"？如果答案是否定的，那是因为你还没有认出自己本就是存在的一部分，从来不是异乡人。\n\n' +
      '当你深深地扎根于当下，接受生命本来的样子，一种前所未有的归属感会从心底升起。你就是存在本身，在这一刻醒来。',
    keywords: ['归属感', '生命意义', '扎根当下', '本然'],
  },
  {
    id: '2',
    number: 2,
    name: '内在之声',
    nameFr: "La Voix Intérieure",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/tPLjpKQD/osho-02-la-voix-interieure.png',
    meaning:
      '当你在内心深处发现了属于自己的真理，你就不再需要向外追寻任何东西。那股来自核心的声音，清晰、安静、不容置疑。\n\n' +
      '生活中太多声音从四面八方拉扯着我们：他人的期待、社会的标准、头脑的辩论……它们制造喧嚣，让你听不见自己的心。\n\n' +
      '停下。安静下来。你内在那个最微小也最坚定的声音，一直在等你倾听。它不需要说服任何人，它只需要你相信。',
    keywords: ['直觉', '内心真理', '安静', '倾听'],
  },
  {
    id: '3',
    number: 3,
    name: '创造力',
    nameFr: "La Créativité",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/HpzFs5Dw/osho-03-la-creativite.png',
    meaning:
      '创造力不是一种技能，而是一种品质——你将自身的活力注入你正在做的事情。无论你是画画、做饭、走路还是说话，你都可以带着创造的喜悦。\n\n' +
      '做什么不重要，怎么做才重要。当你全然地投入当下的行动，不期待结果，只是享受过程本身，你就触碰到了创造的本源。\n\n' +
      '让你的生命成为一件艺术品。不是为了被欣赏，而是因为创造本身就是你最深的渴望。',
    keywords: ['创造', '全然投入', '过程之美', '活力'],
  },
  {
    id: '4',
    number: 4,
    name: '叛逆者',
    nameFr: "Le Rebelle",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/04dR3f1/osho-04-le-rebelle.png',
    meaning:
      '一个觉悟的人无法被奴役，也无法被囚禁——这正是权力害怕他的原因。叛逆不是愤怒的对抗，而是从内在打破所有枷锁的自由。\n\n' +
      '无论贫穷或富有，叛逆者都是真正的帝王。他打碎了他人认同的锁链，不再活在任何人的期待里。\n\n' +
      '现在是时候质疑那些你从不怀疑的"应该"与"必须"了。真正的自由不是反抗外在，而是从内在的制约中走出。',
    keywords: ['自由', '打破枷锁', '勇气', '不认同'],
  },
  {
    id: '5',
    number: 5,
    name: '空性',
    nameFr: "La Vacuité",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/6RVxhbpB/osho-05-la-vacuite.png',
    meaning:
      '佛陀用了一个非常有力量的词："空性"。空不是什么都没有，而是一切都在流动、变化、互相依存，没有任何东西是固定不变的。\n\n' +
      '空性的体验起初令人恐惧——没有什么可以抓住。但当你真正进入它，你会发现这份空是多么广阔、多么自由。\n\n' +
      '放下对确定性的执着，让自己沉入未知的深处。在空的中心，所有的可能性同时存在。',
    keywords: ['空性', '放下执着', '未知', '流动'],
  },
  {
    id: '6',
    number: 6,
    name: '爱人',
    nameFr: "Les Amoureux",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/SX5KZw5d/osho-06-les-amoureux.png',
    meaning:
      '性是爱的最原始层面——身体之爱。慈悲是爱的更高层面——心灵之爱。而终极的爱，是你与存在本身合一的体验。\n\n' +
      '无论此刻你经历的爱是什么模样，花一点时间去感受它，不评判，不抗拒。每一种爱都是通往终极的一扇门。\n\n' +
      '当你不再寻找完美的爱人，而是成为爱本身，整个宇宙都会回应你。',
    keywords: ['爱', '合一', '慈悲', '关系'],
  },
  {
    id: '7',
    number: 7,
    name: '觉知',
    nameFr: "La Conscience",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/7drTpC9W/osho-07-la-conscience.png',
    meaning:
      '头脑无法拥有真正的智慧。只有当头脑安静下来，当"观者"出现的那一刻，原创性和洞见才会到来。\n\n' +
      '此刻在你内心生长的觉知，不是努力的结果。它更像是日出——你无法让太阳升起，你只能等待它，然后看见它。\n\n' +
      '不要做任何事，只是观照。看着你的念头来去，像天空看着云朵飘过。你不是云，你是天空。',
    keywords: ['觉知', '观照', '头脑的安静', '临在'],
  },
  {
    id: '8',
    number: 8,
    name: '勇气',
    nameFr: "Le Courage",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/ZRCLbqxg/osho-08-le-courage.png',
    meaning:
      '种子不知道前方有什么。它不知道花是什么样子，也无法想象绽放的模样。但它仍然向着黑暗深处扎根，向着光明破土——这就是勇气。\n\n' +
      '与生命的挑战对抗、逃避或否认，都是徒劳的。真正的勇气不是无惧，而是即使害怕，仍然向前走去。\n\n' +
      '你正处在一个需要纵身一跃的时刻。不用担心会落在哪里，相信你的翅膀会在坠落中展开。',
    keywords: ['勇气', '冒险', '信任生命', '绽放'],
  },
  {
    id: '9',
    number: 9,
    name: '孤独',
    nameFr: "La Solitude",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/Kx5Gfpwf/osho-09-la-solitude.png',
    meaning:
      '当你独自一人时，你并不真的孤单——你只是感到"孑然"。孤单是一种空虚的感觉，而孤独是一种完整的状态。\n\n' +
      '如果生命中没有任何人扮演重要角色，我们会感到失落。但正是在这样的时刻，我们才有机会遇见自己。\n\n' +
      '孤独不是惩罚，而是一份礼物。它让你回到自己的中心，发现你本身就是圆满的，不需要任何人来填满。',
    keywords: ['孤独', '独处', '自我发现', '圆满'],
  },
  {
    id: '10',
    number: 10,
    name: '变化',
    nameFr: "Le Changement",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/Xf9BCHm2/osho-10-le-changement.png',
    meaning:
      '生命像轮子一样永恒重复，直到你变得有意识。无意识的人被困在循环中，一遍又一遍地经历同样的模式。\n\n' +
      '如果你紧抓着轮子的边缘，你会头晕目眩。走向轮子的中心吧——在那里，一切都在转动，但你如如不动。\n\n' +
      '变化是唯一不变的真理。当你学会与变化共舞，而不是抗拒它，你就从轮子中解脱了。',
    keywords: ['变化', '循环模式', '如如不动', '接纳'],
  },
  {
    id: '11',
    number: 11,
    name: '突破',
    nameFr: "La Percée",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/MyPDF8BG/osho-11-la-percee.png',
    meaning:
      '师父的独特功能，是把抑郁转化为突破。普通的治疗会分析问题，而禅的方式是直接将你推入更深的地方，直到你触底反弹。\n\n' +
      '鼓起勇气打破旧有的模式，卸下不必要的重担。你会惊讶于另一边等待你的是何等的自由与光明。\n\n' +
      '最深的黑暗之后，往往是最大的破晓。你此刻感受到的压力，正是突破前的最后积蓄。',
    keywords: ['突破', '转化', '触底反弹', '释放'],
  },
  {
    id: '12',
    number: 12,
    name: '新视野',
    nameFr: "La Nouvelle Vision",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/23sc4s41/osho-12-la-nouvelle-vision.png',
    meaning:
      '当你内在深处的眼睛睁开，你会同时体验到两个方向：向上仰望天空，向下深入深渊。生命是立体的，不是平面的。\n\n' +
      '现在你有机会在所有维度中看见生命——从最低的深谷到最高的山巅。这些极端的体验丰富了你的灵魂。\n\n' +
      '不要只选择光明而逃避黑暗。当你能接纳完整的生命，你的视野才真正变得深邃而广阔。',
    keywords: ['新视野', '多维度', '接纳', '完整'],
  },
  {
    id: '13',
    number: 13,
    name: '转化',
    nameFr: "La Transformation",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/PvMs7Hgy/osho-13-la-transformation.png',
    meaning:
      '禅的世界不属于信徒，而属于那些有勇气纵身跃入火焰的灵魂。转化不是改良自己，而是彻底的死亡与重生。\n\n' +
      '允许痛苦、忧虑和问题存在。接受事实。转化不在抗拒中发生，而在全然的接纳中悄然进行。\n\n' +
      '毛毛虫永远无法想象蝴蝶的模样。你也无法想象转化后的自己——但你可以信任这个过程，纵身跃入。',
    keywords: ['转化', '重生', '接纳', '蜕变'],
  },
  {
    id: '14',
    number: 14,
    name: '整合',
    nameFr: "L'Intégration",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/wh9Vv1XS/osho-14-lintegration.png',
    meaning:
      '所有的冲突都在你之内，除了在你自己内心，没有任何地方能真正解决它。外在的战争，只是内在分裂的投影。\n\n' +
      '此刻，你生命中的二元性开始合而为一，成为一个统一的整体。巨大的能量从内耗中释放出来。\n\n' +
      '不再与自己对抗，不再评判自己的任何部分。当你接纳了自己的全部，你就整合了——你变成了一。',
    keywords: ['整合', '合一', '接纳自己', '内在和平'],
  },
  {
    id: '15',
    number: 15,
    name: '制约',
    nameFr: "Le Conditionnement",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/M5yhxk69/osho-15-le-conditionnement.png',
    meaning:
      '只要你还执着于你的人格、你的"自我"，你就找不到真正的自己。人格是社会和过去塑造的面具，不是你的本来面目。\n\n' +
      '这张牌讲述了一个古老的禅宗故事：一只狮子被羊群养大，它以为自己也是羊。直到有一天，它在水边看到了自己的倒影。\n\n' +
      '你也是如此。你被教导成为别人期待的样子，但你的本性是狮子。是时候记起你真正是谁了。',
    keywords: ['制约', '自我认同', '本性', '觉醒'],
  },
  {
    id: '16',
    number: 16,
    name: '闪电',
    nameFr: "La Foudre",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/0jY4vZ2G/osho-16-la-foudre.png',
    meaning:
      '冥想需要慢慢积累的成果，有时会在师父一声突如其来的棒喝下瞬间发生——就像闪电劈开黑夜。\n\n' +
      '此刻你可能感到地动山摇，脚下的根基仿佛在崩塌。那些你一直以为坚固的东西正在碎裂。\n\n' +
      '不要害怕。闪电摧毁的是虚假的，留下的才是真实的。这场震荡之后，你会获得前所未有的清明。',
    keywords: ['突变', '觉醒', '摧毁幻觉', '震撼'],
  },
  {
    id: '17',
    number: 17,
    name: '寂静',
    nameFr: "Le Silence",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/KzXf9Gdj/osho-17-le-silence.png',
    meaning:
      '整体的能量占据了你。你被"一"所拥有——你消失了，只有那个浩瀚的存在。这不是死亡，而是最真实的活着。\n\n' +
      '时间变得珍贵。现在很容易进入深度的寂静，探索你内在存在的深渊。话语变得多余，因为一切都已被知晓。\n\n' +
      '给自己一些完全独处的时间。什么都不做，什么都不想。只是存在。在那份寂静中，你会遇见自己。',
    keywords: ['寂静', '合一', '冥想', '存在'],
  },
  {
    id: '18',
    number: 18,
    name: '前世',
    nameFr: "Les Vies Antérieures",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/Qj7SpKsV/osho-18-les-vies-anterieures.png',
    meaning:
      '一个孩子能够早早变得有意识，是因为他在前世已经耕耘过冥想的土壤。你现在的觉醒，不是起点，而是延续。\n\n' +
      '瞥见我们存在的永恒性是一份礼物。理解业力在我们生命中的作用，不是为了宿命论，而是为了更清醒地选择。\n\n' +
      '你身上发生的事不是偶然。那些莫名的吸引、恐惧和共鸣，都有源流。带着觉知去看它们，你会找到答案。',
    keywords: ['前世', '永恒', '业力', '灵魂旅程'],
  },
  {
    id: '19',
    number: 19,
    name: '天真',
    nameFr: "L'Innocence",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/4vzg5Rn/osho-19-linnocence.png',
    meaning:
      '禅说：如果你放下你的所知——包括你的名字、你的身份和所有你以为自己知道的东西——你就会回到天真。\n\n' +
      '这份天真来自深刻的生命体验，它是童心，不是幼稚。孩童式的天真，是智慧的顶峰，不是知识的起点。\n\n' +
      '像第一次看世界一样去看。像第一次爱人一样去爱。像第一次活着一样去活。天真，是放下一切已知后的自由。',
    keywords: ['天真', '童心', '放下所知', '初体验'],
  },
  {
    id: '20',
    number: 20,
    name: '超越幻象',
    nameFr: "Au-delà de l'Illusion",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/JRTCJyNZ/osho-20-au-dela-de-lillusion.png',
    meaning:
      '为什么佛陀如此坚持说整个存在——包括你自己——都是幻象？不是因为它不存在，而是因为它不是你以为的那个样子。\n\n' +
      '这张牌邀请你不要向外寻找真实，而是将注意力转向内在。那个在看的人，那个观者，才是唯一真实的。\n\n' +
      '你所看到的世界，是你心的投射。当你改变你的心，世界也随之改变。从梦中醒来吧。',
    keywords: ['幻象', '内观', '觉醒', '投射'],
  },
  {
    id: '21',
    number: 21,
    name: '完成',
    nameFr: "L'Achèvement",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/WWsk9tNH/osho-21-lachevement.png',
    meaning:
      '禅的典型道路是不把事物说满。努力去理解它，但要在它完全完成之前，就把它放下。圆满的最高境界，是永远留一点余地。\n\n' +
      '那些一直占据你时间和精力的事情，正在走向终点。一个周期即将闭合，新的即将开始。\n\n' +
      '不要执着于过去的成就，也不要急于奔向下一个目标。在完成与未完成之间的那个间隙，才是真正的礼物。',
    keywords: ['完成', '圆满', '周期结束', '留白'],
  },
  {
    id: '22',
    number: 22,
    name: '师父',
    nameFr: "Le Maître",
    family: 'major',
    familyLabel: '大阿卡纳',
    imageUrl: 'https://i.ibb.co/mCvXMDks/osho-22-le-maitre.png',
    meaning:
      '师父不传授真理，因为真理无法被传递。师父能做的，是创造一个空间，让你自己的真理有机会绽放。\n\n' +
      '在禅中，师父不统治任何人，因为他是自己的主人。他的每一个动作、每一个沉默，都是在说：醒来吧。\n\n' +
      '师父的存在是一面镜子，让你照见自己的本来面目。当你准备好了，师父就会出现——有时候在外面，有时候在你心里。',
    keywords: ['师父', '真理', '觉醒', '引导'],
  },

  // ===== 火 Feu (14 张) =====
  {
    id: '23',
    number: 23,
    name: '创造者',
    nameFr: "Le Créateur",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/DDJdKQjh/osho-23-le-createur.png',
    meaning:
      '世界上有两种创造者：一种用外在的材料创造事物，另一种用自己的生命创造自己。后者才是真正的创造——你把自己的存在活成一件艺术品。\n\n' +
      '火之王告诉你：此刻你带着觉知所做的一切，都会获得成功和祝福。创造的能量正在你的血管中燃烧。\n\n' +
      '把你的热情投入你真正热爱的事。不是为了结果，而是因为创造本身，就是对生命最深的赞美。',
    keywords: ['创造', '热情', '行动', '火的能量'],
  },
  {
    id: '24',
    number: 24,
    name: '分享',
    nameFr: "Le Partage",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/9k4Hx1MP/osho-24-le-partage.png',
    meaning:
      '当你到达第四个能量中心——心轮，你的整个生命都充满了分享的渴望。你拥有的越多，你就越想给予——因为给予让你更丰富。\n\n' +
      '现在你有机会分享你的爱、你的喜悦、你的笑声。在分享中，你会感受到一种深深的满足，这是任何获取都无法给予的。\n\n' +
      '把你手中的光传递出去。一根蜡烛点燃另一根，它自己的火焰不会减少分毫。这就是分享的奥秘。',
    keywords: ['分享', '心轮', '喜悦', '丰盛'],
  },
  {
    id: '25',
    number: 25,
    name: '强度',
    nameFr: "L'Intensité",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/czps9vj/osho-25-lintensite.png',
    meaning:
      '禅说：把所有美丽的言辞和伟大的教导都视为敌人。真正的事，只有当你带着百分之百的强度去行动时才会发生。\n\n' +
      '当你如火骑士一般带着强度行动，准备好迎接强烈的反应。强度会搅动沉睡的能量，带来冲击性的改变。\n\n' +
      '不要再半心半意地生活。要么全情投入，要么不做。燃烧吧，像火焰一样——不留下一丝遗憾。',
    keywords: ['强度', '全情投入', '火焰', '激情'],
  },
  {
    id: '26',
    number: 26,
    name: '嬉戏',
    nameFr: "L'Espièglerie",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/qLV55bcb/osho-26-lespieglerie.png',
    meaning:
      '一旦你开始看到生活不是一件严肃的事，所有的重担都会从肩上滑落。生命是一场游戏，一场庆祝，一次玩耍。\n\n' +
      '火的侍从进入你的生命，意味着你准备好迎接一切新鲜、充满乐趣的事物。是时候把严肃放在一边了。\n\n' +
      '像孩子一样嬉戏。不追求意义，不担心结果。只是纯粹地、全然地享受当下这一刻的活力。',
    keywords: ['嬉戏', '轻松', '童心', '活力'],
  },
  {
    id: '27',
    number: 27,
    name: '源头',
    nameFr: "La Source",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/MxDybm6k/osho-27-la-source.png',
    meaning:
      '禅让你离开头脑，回到你的源头。禅不否认头脑的用处，但它提醒你：头脑只是工具，不是主人。你的根源在更深的地方。\n\n' +
      '如果你正在开始某件事、感到灵感枯竭，或者刚刚完成了某件事，现在是回到源头充电的时候了。\n\n' +
      '就像河流总有它的源头，你的生命能量也有一个源头。回到那里，你会再次充满力量与方向。',
    keywords: ['源头', '回归', '能量补充', '本源'],
  },
  {
    id: '28',
    number: 28,
    name: '可能性',
    nameFr: "Les Possibilités",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/Fk1mxvX8/osho-28-les-possibilites.png',
    meaning:
      '头脑喜欢接受"到处都有界限"这个事实。但实际上，存在是无边无际的，可能性是无穷无尽的。你的限制，只存在于你的想象中。\n\n' +
      '无数可能性正在向你敞开。因为你对自己和生活有了更多的爱，所以你能看到更多的选择。\n\n' +
      '不要让头脑告诉你"不可能"。迈出第一步，新的道路会自动展开。生命比你想象的要广阔得多。',
    keywords: ['可能性', '无限', '开拓', '希望'],
  },
  {
    id: '29',
    number: 29,
    name: '存在的体验',
    nameFr: "L'Expérience de l'Existence",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/gpnj5Mt/osho-29-lexperience-de-lexistence.png',
    meaning:
      '看看你的周围，凝视一个孩子的眼睛、你爱人的眼睛、你母亲的眼睛。在那深处，你会看到同一个存在，以不同的形式闪耀。\n\n' +
      '有些体验可以被记录、被拍照、被贴进相册。但还有一些体验——存在本身的体验——无法被任何东西捕捉。\n\n' +
      '此刻，你被邀请去感受这份纯粹的存在。它不依赖任何理由，不需要任何成就。你存在，这本身就够了。',
    keywords: ['存在', '体验', '当下', '纯粹'],
  },
  {
    id: '30',
    number: 30,
    name: '参与',
    nameFr: "La Participation",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/TV1fbhg/osho-30-la-participation.png',
    meaning:
      '你见过黑夜如何消失吗？很少有人真正注意到每天清晨发生的奇迹——黑暗悄然退去，光明缓缓降临。\n\n' +
      '你有机会与他人携手，共同创造一些美好的事物。参与不仅是付出，更是与更大的整体连接。\n\n' +
      '不要做生命的旁观者。跳入河流，参与这场舞蹈。你会发现，当你贡献自己的一份力量时，生命回馈给你的远比你想象的多。',
    keywords: ['参与', '连接', '共创', '融入'],
  },
  {
    id: '31',
    number: 31,
    name: '全然',
    nameFr: "La Totalité",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/V0HtMQBW/osho-31-la-totalite.png',
    meaning:
      '你随时都有机会变得极度专注。无论你在做什么，让你的全部存在都投入其中。那一刻，你就是行动本身。\n\n' +
      '空中飞人的表演中，哪怕只有一瞬间的走神，都是致命的。生命也是如此——当你全然投入，它就是一场艺术。\n\n' +
      '一边做饭一边想工作，一边工作一边想假期——这就是痛苦的根源。全然地活在每一个当下，哪怕只是喝一杯茶。',
    keywords: ['全然', '专注', '当下', '投入'],
  },
  {
    id: '32',
    number: 32,
    name: '成功',
    nameFr: "Le Succès",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/hJvvjFX8/osho-32-le-succes.png',
    meaning:
      '看看海洋的波浪——浪越高，跌得越深。你无法只有高潮而没有低潮。成功与失败是同一枚硬币的两面。\n\n' +
      '现在或很快，你将骑上成功这头美妙的老虎。享受它，但不要忘了——骑老虎的人也有可能被摔下来。\n\n' +
      '在巅峰时保持觉知，在低谷时保持信任。真正的成功，是无论成败都能保持内心的平衡。',
    keywords: ['成功', '平衡', '高峰体验', '觉知'],
  },
  {
    id: '33',
    number: 33,
    name: '压力',
    nameFr: "Le Stress",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/p6W0nH3W/osho-33-le-stress.png',
    meaning:
      '所有私人目标都是一种神经症。一个真正的人知道并感受到，他与整体不是分离的。当你忘记了这一点，压力就产生了。\n\n' +
      '这张牌所描绘的紧张和压力会不时地袭击我们所有人，但当压力变成常态时，就该敲响警钟了。\n\n' +
      '停下来，深呼吸。那些你以为必须完成的事，少做几件天不会塌下来。但如果你一直紧绷下去，身体和心灵会先垮掉。',
    keywords: ['压力', '紧张', '放松', '慢下来'],
  },
  {
    id: '34',
    number: 34,
    name: '旅程',
    nameFr: "Le Voyage",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/KxvKN5ch/osho-34-le-voyage.png',
    meaning:
      '生命是一个没有起点也没有终点的连续体。它一直向前流动，没有终极目标——旅程本身就是目的地。\n\n' +
      '这张牌鼓励你接受并欢迎一切新事物，就像旅途中遇见的风景。每一步都是一次发现。\n\n' +
      '不要执着于到达某个地方。享受路上的风、天空的云、擦肩而过的陌生人。你走的每一步，都应该是庆祝。',
    keywords: ['旅程', '流动', '探索', '在路上'],
  },
  {
    id: '35',
    number: 35,
    name: '耗尽',
    nameFr: "L'Épuisement",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/4ZbgqKXG/osho-35-lepuisement.png',
    meaning:
      '按道德良心生活的人变得僵硬，按意识生活的人保持流动。当你耗尽了所有能量却还在逼迫自己，就是灵魂在喊停。\n\n' +
      '生命不是一件需要管理的事情，而是一个需要去活的奥秘。是时候收起你的待办清单了。\n\n' +
      '允许自己休息，允许自己什么都不做，允许自己"浪费时间"。只有当你真正放空，新的能量才会重新流入。',
    keywords: ['耗尽', '疲惫', '休息', '放下'],
  },
  {
    id: '36',
    number: 36,
    name: '压抑',
    nameFr: "La Répression",
    family: 'fire',
    familyLabel: '火',
    imageUrl: 'https://i.ibb.co/wh5ZN0KR/osho-36-la-repression.png',
    meaning:
      '梵语中有一个词叫"阿赖耶识"——那是你把所有想做却被禁止的事都扔进去的地下室。它们不会消失，只是被埋藏，然后以各种扭曲的方式冒出来。\n\n' +
      '现在是释放积累在你内心的紧张和压力的时候了。被压抑的能量不会自己消失，它只会变形。\n\n' +
      '找一个安全的方式表达你被压抑的情绪——哭喊、运动、打枕头、在空旷处大叫。释放之后，你会感到前所未有的轻盈。',
    keywords: ['压抑', '释放', '情绪', '阿赖耶识'],
  },

  // ===== 水 Eau (14 张) =====
  {
    id: '37',
    number: 37,
    name: '疗愈',
    nameFr: "La Guérison",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/HLY69Wky/osho-37-la-guerison.png',
    meaning:
      '你的整个存在都携带着伤痕，无论走到哪里都带着它们。没有人是毫发无损的。但伤口不是你的敌人——它们是你灵魂生长的地方。\n\n' +
      '深藏的旧伤正在浮出水面，等待被疗愈。当我们允许自己去感受那份痛，而不是逃避它，疗愈就已经开始了。\n\n' +
      '疗愈不是回到过去未受伤的状态，而是带着伤口变得更完整、更慈悲。你的伤疤，终将变成你最有力量的地方。',
    keywords: ['疗愈', '伤口', '接纳', '成长'],
  },
  {
    id: '38',
    number: 38,
    name: '感受性',
    nameFr: "La Réceptivité",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/60QCkWCn/osho-38-la-receptivite.png',
    meaning:
      '倾听是进入神圣殿堂的基本奥秘之一。倾听是被动的、是女性的、是接纳的。当你真正倾听，你就变成了一扇门。\n\n' +
      '水之王后开启了一个没有边界的时期——对生命给予的一切心怀感激，像水一样柔软、流动、包容。\n\n' +
      '不再抗拒，不再控制。打开你的心，允许一切流经你。像山谷一样谦卑，像海洋一样接纳——所有的河流最终都会流向你。',
    keywords: ['感受性', '接纳', '倾听', '流动'],
  },
  {
    id: '39',
    number: 39,
    name: '信任',
    nameFr: "La Confiance",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/CK9GW0z4/osho-39-la-confiance.png',
    meaning:
      '不要把生命浪费在追寻那些终将被夺走的东西上。信任生命本身，它比你更懂得如何安排一切。\n\n' +
      '有信心做出量子跳跃，那么所有的准备、计划和方案都变得不再必要。信任不是盲目，而是在未知中依然敢向前走。\n\n' +
      '跳入未知的深处。你不会淹死——你会发现，水一直在托着你。信任生命，它永远不会把你带到你承受不了的地方。',
    keywords: ['信任', '放下控制', '未知', '安全感'],
  },
  {
    id: '40',
    number: 40,
    name: '理解',
    nameFr: "La Compréhension",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/KzycjPwz/osho-40-la-comprehension.png',
    meaning:
      '你不再是囚徒，你已经走出了笼子。你可以展开翅膀，整个天空都属于你——而笼子的门，其实一直是开着的。\n\n' +
      '一个新的理解正在破晓：笼子一直是敞开的，天空一直在等待。困住你的，从来不是栅栏，而是你自己的信念。\n\n' +
      '当你真正理解了，就不会再有抱怨和指责。你只会笑——笑自己曾经多么认真地困在自己建造的牢笼里。',
    keywords: ['理解', '自由', '觉醒', '放下'],
  },
  {
    id: '41',
    number: 41,
    name: '顺流',
    nameFr: "Suivre le Courant",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/bjJ5zBC1/osho-41-suivre-le-courant.png',
    meaning:
      '当我说"成为水"，我的意思是成为活水，像流动的水一样——柔软、适应、从不抗拒，却能穿透最坚硬的岩石。\n\n' +
      '抽到这张牌意味着你已经有能力让自己被生命之流承载。不再挣扎，不再逆流而上。\n\n' +
      '放下你的桨，让河流带你走。你以为你需要掌控方向，但河流比你更清楚大海在哪里。信任水流，它会带你回家。',
    keywords: ['顺流', '放下掌控', '信任生命', '水的智慧'],
  },
  {
    id: '42',
    number: 42,
    name: '友谊',
    nameFr: "L'Amitié",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/4gYMzXh3/osho-42-lamitie.png',
    meaning:
      '先冥想。当你变得宁静，爱会自然到来。它就像一朵花，不是你能强迫它开放的——时机到了，它自然绽放。\n\n' +
      '你的生命和关系正在进入一种新的友谊品质。你会发现，最深的连接不是激情，而是理解与陪伴。\n\n' +
      '友谊是爱的最高形式之一。它没有占有，没有期待，只是两个自由的灵魂一起走一段路，互相照亮。',
    keywords: ['友谊', '连接', '陪伴', '爱'],
  },
  {
    id: '43',
    number: 43,
    name: '庆典',
    nameFr: "La Fête",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/HLcJbTrm/osho-43-la-fete.png',
    meaning:
      '生命是一个值得庆祝和品味的时刻。把生命变成一场庆典，一种喜悦，你就会进入更深的维度。\n\n' +
      '这张牌表示你越来越能够敞开心扉，迎接每一个庆祝的机会。生命本身就是最大的奇迹。\n\n' +
      '不需要等到某个特殊的日子才庆祝。此刻的呼吸、此刻的心跳、此刻的阳光——每一样都值得感恩和欢庆。把每一天活成节日。',
    keywords: ['庆典', '喜悦', '感恩', '活在当下'],
  },
  {
    id: '44',
    number: 44,
    name: '内省',
    nameFr: "L'Introspection",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/Gv17LKg6/osho-44-lintrospection.png',
    meaning:
      '内省不是要倒回去看什么，也不是要去哪里。那束向内转的光，只是静静地照见——你的念头、你的情绪、你的梦境。\n\n' +
      '培养与自己的想法保持距离的能力，是生命中最大的祝福之一。当你能看见你的念头，你就不再被它们牵着走。\n\n' +
      '找一个安静的角落，闭上眼睛，向内看。那里有一片你从未探索过的浩瀚星空。你是观察者，也是被观察者。',
    keywords: ['内省', '观照', '自我觉察', '安静'],
  },
  {
    id: '45',
    number: 45,
    name: '过去的执着',
    nameFr: "L'Attachement au Passé",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/v44LqS9V/osho-45-lattachement-au-passe.png',
    meaning:
      '你的过去、现在和未来不在时间里，而在你的头脑里。你以为过去已经过去了，但它还活在你的记忆里，不断地塑造着你的当下。\n\n' +
      '如果你试图让过去回来，你就会卡在旧模式中——那些你本应早已超越的东西。\n\n' +
      '过去的已经过去了，无论它多么美好或多么痛苦。放开它，不是背叛，而是让自己自由。前方有更广阔的天空在等你。',
    keywords: ['执着', '过去', '放下', '自由'],
  },
  {
    id: '46',
    number: 46,
    name: '梦',
    nameFr: "Le Rêve",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/5h9ynt5L/osho-46-le-reve.png',
    meaning:
      '几个世纪以来，人们一直在说，所有时代的圣人和智者都在宣告：你所经历的一切，不过是一场大梦。\n\n' +
      '真正的爱不是通过满足欲望、依赖他人来获得的。真正的爱是从你的本性中自然流淌出来的——当你不再向外索取的时候。\n\n' +
      '你以为真实的世界，可能只是你心的投影。认识到这一点不是绝望，而是醒来的开始。你可以做梦，也可以选择醒来。',
    keywords: ['梦', '幻象', '觉醒', '投影'],
  },
  {
    id: '47',
    number: 47,
    name: '投射',
    nameFr: "Les Projections",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/zWMC2WGT/osho-47-les-projections.png',
    meaning:
      '在电影院里，你看着屏幕，却从不回头看放映机。然而屏幕上的一切，都来自那台藏在黑暗中的机器。\n\n' +
      '我们都倾向于把自己的内心电影投射到外界的人和事上。你喜欢的人，是你投射了自己的美好；你讨厌的人，是你投射了自己的阴影。\n\n' +
      '当你发现自己被某个人强烈吸引或排斥时，停一停——那可能只是你自己的某一面，在对方身上看到了倒影。',
    keywords: ['投射', '阴影', '自我认知', '镜子'],
  },
  {
    id: '48',
    number: 48,
    name: '放下',
    nameFr: "Le Lâcher Prise",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/S7HxDvss/osho-48-le-lacher-prise.png',
    meaning:
      '在存在中，没有什么更高，也没有什么更低。一棵草和最亮的星同样重要。万物各得其所，各有其时。\n\n' +
      '这张牌表示某个情境正在走向终点或已经结束。可能是一段关系、一份工作，或一个旧的自我形象。\n\n' +
      '放手吧。不是因为失败，而是因为完成。就像熟透的果实自然坠落——放手不是失去，而是回归。空出双手，你才能接住新的礼物。',
    keywords: ['放下', '结束', '释放', '自然'],
  },
  {
    id: '49',
    number: 49,
    name: '懒惰',
    nameFr: "La Paresse",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/8LLRLn6x/osho-49-la-paresse.png',
    meaning:
      '懒惰是一种消极状态：你没有能量，你感到沉重、困倦、无精打采。但懒惰不是因为你累了——而是因为你在逃避。\n\n' +
      '这张牌上的人物似乎以为自己已经成功了，却没有意识到他一直在看一面扭曲的镜子。他的懒惰，不过是自我欺骗。\n\n' +
      '不要用"休息"来掩饰你的逃避。真正的休息是充满活力的，懒惰是死气沉沉的。站起来，动一动，生命的能量会重新流动起来。',
    keywords: ['懒惰', '逃避', '能量停滞', '行动'],
  },
  {
    id: '50',
    number: 50,
    name: '和谐',
    nameFr: "L'Harmonie",
    family: 'water',
    familyLabel: '水',
    imageUrl: 'https://i.ibb.co/FkM35vJy/osho-50-lharmonie.png',
    meaning:
      '倾听你的心，让它引导你，无论代价如何。在绝对朴素的状态中，一切都变得和谐——不是因为没有冲突，而是因为你超越了二元。\n\n' +
      '试着变得更柔软、更有感受性，一种无法言说的喜悦正在你身边等着你，近得你一伸手就能碰到。\n\n' +
      '和谐不是外在的和平，而是内在的平衡。当你与自己和解，整个世界也会与你和解。就像湖水静止时，月亮自然映现。',
    keywords: ['和谐', '平衡', '柔软', '心的引导'],
  },

  // ===== 云 Nuages (14 张) =====
  {
    id: '51',
    number: 51,
    name: '控制',
    nameFr: "Le Contrôle",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/Hfbd8Mnp/osho-51-le-controle.png',
    meaning:
      '被压抑的人总是紧绷的，因为神经的骚动从未停止。控制是一种保护机制，但当控制过度，生命就变成了监狱。\n\n' +
      '云之王建议我们深呼吸，松开领带，放松肩膀。你不需要掌控一切——事实上，你本来也掌控不了。\n\n' +
      '真正的力量不是控制一切，而是允许一切。像天空一样，允许云朵来去，你依然是天空。放下控制，你会获得更大的自由。',
    keywords: ['控制', '紧绷', '放松', '放下掌控'],
  },
  {
    id: '52',
    number: 52,
    name: '道德',
    nameFr: "La Morale",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/GfkbKsDs/osho-52-la-morale.png',
    meaning:
      '只要你还没有活出觉知，你的道德就是虚假的，你的文化就是一层伪装。真正的道德来自内在的清明，不是外在的规则。\n\n' +
      '云之后代表着一种被僵化道德观念灌输的心理状态。你用"应该"和"不应该"来审判自己和他人。\n\n' +
      '放下审判的标尺。没有谁是"好"的，也没有谁是"坏"的。每个人都在自己的意识层面上，做着他能做的最好的选择。',
    keywords: ['道德', '审判', '教条', '接纳'],
  },
  {
    id: '53',
    number: 53,
    name: '斗争',
    nameFr: "La Lutte",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/MyL9SswN/osho-53-la-lutte.png',
    meaning:
      '它刚才还在那里，现在已经消失了。我们只能活在当下——过去已去，未来未来。但我们的头脑总是在别处，与幻影作战。\n\n' +
      '好斗的性格或潜在的愤怒，往往掩盖着深深的痛苦。我们以为通过战斗能解决问题，但战争只会制造更多战争。\n\n' +
      '停下来，看清你在与什么作战。也许你的敌人从未存在过——那只是你头脑中的一个念头。放下武器，和平就在这里。',
    keywords: ['斗争', '愤怒', '痛苦', '和平'],
  },
  {
    id: '54',
    number: 54,
    name: '心智',
    nameFr: "Le Mental",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/HDXMqvBQ/osho-54-le-mental.png',
    meaning:
      '这就是我眼中你的头脑：一堆齿轮、踏板、乱七八糟的零件，你把它们都收进了一个叫"我"的盒子里，然后以为那就是你。\n\n' +
      '云的侍从告诉你：有人完全卡在了头脑层面。小心——当你完全认同于思维，你就失去了与心的连接。\n\n' +
      '你不是你的头脑。你是那个能看见头脑在运作的人。当你意识到这一点，思维的暴政就结束了。',
    keywords: ['心智', '思维', '认同', '观者'],
  },
  {
    id: '55',
    number: 55,
    name: '觉醒',
    nameFr: "L'Éveil",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/0RKKDqJk/osho-55-leveil.png',
    meaning:
      '我们来自未知，也回归未知。我们总是回去，也总是再来。我们已经在这里无数次了——只是忘记了。\n\n' +
      '当这张牌出现在抽牌中，它意味着你内心已经有了觉醒的萌芽。某个东西正在你之内苏醒。\n\n' +
      '觉醒不是一夜之间发生的大事。它是一个渐进的过程——就像黎明，先是微光，然后光线越来越强，直到太阳完全升起。你的太阳正在升起。',
    keywords: ['觉醒', '意识', '黎明', '苏醒'],
  },
  {
    id: '56',
    number: 56,
    name: '分裂',
    nameFr: "La Schizophrénie",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/B5vrcRPv/osho-56-la-schizophrenie.png',
    meaning:
      '此刻你不是你真正的自己。你不存在，因为你没有中心。你有很多个自己，每个都在拉向不同的方向。\n\n' +
      '这张牌的形象让人想起现代版的"布里丹之驴"——一头驴站在两堆干草之间，因为无法选择吃哪一堆而活活饿死。\n\n' +
      '你内在有太多声音在争吵，让你无法做出决定。暂停所有选择，先回到中心。当你找到自己的根，答案会自然浮现。',
    keywords: ['分裂', '内在冲突', '优柔寡断', '回到中心'],
  },
  {
    id: '57',
    number: 57,
    name: '孤立',
    nameFr: "L'Isolation",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/BKPkZ9W8/osho-57-lisolation.png',
    meaning:
      '你要么在存在之中，要么在自我之中。两者无法同时存在。当你活在自我里，你就是一座孤岛——与整体切断了连接。\n\n' +
      '这张牌上人物的多彩眼泪，代表着走出孤立之门必须经历的。不要害怕流泪——泪水之后，心会重新打开。\n\n' +
      '你不是一座孤岛。你以为你是分开的，那只是一个幻觉。伸出手，与外界连接。分享你的脆弱，你会发现，你从未真正孤单。',
    keywords: ['孤立', '自我', '孤独', '连接'],
  },
  {
    id: '58',
    number: 58,
    name: '拖延',
    nameFr: "L'Ajournement",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/Fb8fmrQM/osho-58-lajournement.png',
    meaning:
      '把今天能做的决定推迟到明天是愚蠢的，因为你明天还是要做同样的决定——只是浪费了今天的时间。\n\n' +
      '"今日事今日毕"，这句格言很少有人真正记住。我们总在等一个"更好的时机"，但那个时机永远不会来。\n\n' +
      '现在就是最好的时机。迈出第一步，哪怕很小。行动本身会带来动力，也会带来答案。不要再等了——等待是生命最大的窃贼。',
    keywords: ['拖延', '行动', '当下', '第一步'],
  },
  {
    id: '59',
    number: 59,
    name: '比较',
    nameFr: "La Comparaison",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/x8PccD9t/osho-59-la-comparaison.png',
    meaning:
      '比较滋养了自卑和优越感。当你不再比较，你就是你自己——独特的，无可替代的。\n\n' +
      '面对现实吧：总有人比你更美、更有天赋、更强壮，也总有人不如你。比较是一场永远赢不了的游戏。\n\n' +
      '放下比较，做你自己。你的价值不在于你比别人好多少，而在于你有多深地活出了自己的本性。',
    keywords: ['比较', '嫉妒', '自我价值', '做自己'],
  },
  {
    id: '60',
    number: 60,
    name: '重担',
    nameFr: "Le Fardeau",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/TBszDXxL/osho-60-le-fardeau.png',
    meaning:
      '真理不是你需要去"实现"的东西。它一直都在。我们只需要放下那些遮挡它的东西。你的重担，就是那些你以为需要扛着的东西。\n\n' +
      '如果你觉得生命从生到死只是一场斗争，那么是时候问问自己：这些重担真的有必要吗？\n\n' +
      '放下那些不属于你的责任，放下别人的期待，放下过去的愧疚。你不需要证明什么，也不需要向任何人交代。你的生命是你自己的。',
    keywords: ['重担', '责任', '放下', '自由'],
  },
  {
    id: '61',
    number: 61,
    name: '诡计',
    nameFr: "La Politique",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/YB3csFdp/osho-61-la-politique.png',
    meaning:
      '任何虚伪的人都可能成为政客或宗教领袖。你只需要足够聪明地操纵他人，足够熟练地隐藏真实的自己。\n\n' +
      '你认出这个人了吗？即使是最无辜、最真诚的人，内心深处也藏着一个政客。策略、算计、伪装……\n\n' +
      '诚实面对你内在的政客。承认它的存在，它就失去了力量。真实不是因为你完美，而是因为你敢于面对自己的不完美。',
    keywords: ['诡计', '虚伪', '操纵', '真实'],
  },
  {
    id: '62',
    number: 62,
    name: '内疚',
    nameFr: "La Culpabilité",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/prJZpNpf/osho-62-la-culpabilite.png',
    meaning:
      '忘掉你所知的一切关于罪与德的观念。这两者都是愚蠢的，它们合在一起，摧毁了人类所有的喜悦。\n\n' +
      '你现在这样就很好。偶尔犯错是完全自然的。从错误中学习，然后继续前行——不要背负着内疚的包袱。\n\n' +
      '内疚不是真正的忏悔。真正的忏悔是看清发生了什么，承担责任，然后改变。内疚只是自我惩罚，它解决不了任何问题。',
    keywords: ['内疚', '自我惩罚', '宽恕', '前进'],
  },
  {
    id: '63',
    number: 63,
    name: '痛苦',
    nameFr: "La Douleur",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/B5pyYG9B/osho-63-la-douleur.png',
    meaning:
      '痛苦是一种变得有意识的方式：只有当箭刺穿你的心，你才会真正停下脚步，开始思考生命中真正重要的事。\n\n' +
      '巨大的痛苦拥有巨大的转化力量。但要让改变发生，你需要直面痛苦，而不是逃避它。\n\n' +
      '痛苦不是惩罚，而是一个信使。它告诉你，有些东西需要被看见、被疗愈。倾听它，拥抱它，然后让它带你走向更深的觉醒。',
    keywords: ['痛苦', '转化', '疗愈', '觉醒'],
  },
  {
    id: '64',
    number: 64,
    name: '重生',
    nameFr: "La Renaissance",
    family: 'cloud',
    familyLabel: '云',
    imageUrl: 'https://i.ibb.co/20XZQ5pN/osho-64-la-renaissance.png',
    meaning:
      '禅说你不来自任何地方，也不去任何地方。你只是在这里——出生和死亡只是你脑海中的概念。\n\n' +
      '无论你此刻处于什么样的意识水平，无论你是冷漠还是痛苦，重生永远是可能的。改变可以在一瞬间发生。\n\n' +
      '每一个呼吸都是一次新的开始。每一个当下，你都可以选择重生。过去的你已经死去，此刻的你是全新的。拥抱这个新生吧。',
    keywords: ['重生', '新生', '改变', '当下'],
  },

  // ===== 彩虹 Arc-en-ciel (14 张) =====
  {
    id: '65',
    number: 65,
    name: '丰盛',
    nameFr: "L'Abondance",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/S4DDBmhH/osho-65-labondance.png',
    meaning:
      '在东方，身体和物质曾被谴责，物质被称为"幻象"。但禅说：真正的灵性不在否定物质，而是在物质中看见神圣。\n\n' +
      '彩虹之王象征着一个内在整合的时期——女性能量与男性能量的融合，物质与灵性的统一。\n\n' +
      '丰盛不是你拥有多少，而是你感受到多少。当你与自己和谐一致，你会发现生命给予你的，比你期望的还要多。',
    keywords: ['丰盛', '整合', '物质与灵性', '感恩'],
  },
  {
    id: '66',
    number: 66,
    name: '绽放',
    nameFr: "L'Épanouissement",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/xqM4RPpV/osho-66-lepanouissement.png',
    meaning:
      '禅鼓励你全然、完整、深入地生活。不是像清教徒那样开着小灯过日子，而是像太阳一样，熊熊燃烧，照亮整个存在。\n\n' +
      '此刻你可能感觉自己像一座花园，百花盛放，接收到来自四面八方的祝福。生命在你身上开出了最美的花。\n\n' +
      '允许自己绽放。不要因为别人还没开，就把自己的花朵收起来。你的绽放会激励更多人——他们会知道，原来人可以活得如此灿烂。',
    keywords: ['绽放', '全然', '灿烂', '生命之花'],
  },
  {
    id: '67',
    number: 67,
    name: '放缓',
    nameFr: "Le Ralentissement",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/wZ52dKyv/osho-67-le-ralentissement.png',
    meaning:
      '冥想是一种药，暂时使用。当你领会了它的本质，你就不再需要它——它变成了你的生活方式。\n\n' +
      '你不需要做任何事，只需安住在你的宁静中。享受这份从容，享受这个什么都不做的空间。\n\n' +
      '慢下来，不是懒惰，而是智慧。就像河水缓缓流淌时才能倒映天空，心安静下来时才能映照真理。放缓脚步，你会看到更多。',
    keywords: ['放缓', '宁静', '冥想', '慢下来'],
  },
  {
    id: '68',
    number: 68,
    name: '冒险',
    nameFr: "L'Aventure",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/4Z9TVSyY/osho-68-laventure.png',
    meaning:
      '禅说，真理与权威、传统或过去无关。真理是一种体验，每个人都必须亲自去发现，没有人能替你完成。\n\n' +
      '每一次我们带着孩子般的信任进入新奇未知的事物，都是一场冒险。冒险不一定在远方，它可以发生在每一个当下。\n\n' +
      '踏上这段旅程吧。没有地图，没有向导，只有你自己。但这正是冒险的美妙——你不知道会发生什么，而每一步都是发现。',
    keywords: ['冒险', '探索', '未知', '勇气'],
  },
  {
    id: '69',
    number: 69,
    name: '圆满',
    nameFr: "La Plénitude",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/Q7YNm4YY/osho-69-la-plenitude.png',
    meaning:
      '种子与花朵的差别，就如同你不知道自己是圆满的，与你发现自己本来就是圆满的之间的差别。圆满不是目标，而是你的本性。\n\n' +
      '这张牌上的人物可以向任何方向移动——向内也向外，向上也向下。他是完整的，不缺任何东西。\n\n' +
      '你一直在向外寻找的圆满，其实一直在你之内。当你停止寻找，它就会自然显现。你就是你一直在等待的那个人。',
    keywords: ['圆满', '完整', '本性', '内在富足'],
  },
  {
    id: '70',
    number: 70,
    name: '当下',
    nameFr: "L'Instant Présent",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/twVkSVdm/osho-70-linstant-present.png',
    meaning:
      '过去已经消失，未来还未到来。两者都没有真实的形态。只有当下这一刻——鲜活的、真实的、触手可及的——才是你真正拥有的。\n\n' +
      '这张牌邀请我们不要再把注意力放在"别处"和"别时"，而是回到此时此地。生命只在当下发生。\n\n' +
      '如果你在等未来某个时刻才快乐，你永远等不到。因为当那个时刻到来，你又会开始等下一个。快乐不在未来，它就在当下这一刻。',
    keywords: ['当下', '临在', '此时此地', '当下即永恒'],
  },
  {
    id: '71',
    number: 71,
    name: '指引',
    nameFr: "Le Guide",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/0ycLRtrL/osho-71-le-guide.png',
    meaning:
      '你向外寻找向导，是因为你还没有意识到你内在就有那盏灯。真正的向导不在外面，他在你内心最深处。\n\n' +
      '你内在的光一直在试图指引你。内在的向导从不多说，它只是静静地、温柔地指明方向。\n\n' +
      '不需要找大师、找课程、找方法。停下来，向内看。你的心一直在说话，只是你太吵了没听见。安静下来，你就会听到那指引的声音。',
    keywords: ['指引', '内在之光', '智慧', '向内看'],
  },
  {
    id: '72',
    number: 72,
    name: '吝啬',
    nameFr: "L'Avarice",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/dwWKgwB8/osho-72-lavarice.png',
    meaning:
      '吝啬剥夺了生命最基本的现象——扩展和分享。当你紧抓不放，你就切断了生命的流动。给予不是失去，而是让能量流通。\n\n' +
      '这张牌邀请你审视你执着的事物。它们对你来说是珍贵的，但你也可能因为它们而失去了自由。\n\n' +
      '把手松开。你紧抓的东西并没有你以为的那么有价值。真正的宝藏不在你抓在手里的东西里，而在你愿意分享出去的爱与善意中。',
    keywords: ['吝啬', '执着', '分享', '放手'],
  },
  {
    id: '73',
    number: 73,
    name: '被排斥者',
    nameFr: "L'Exclu",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/h1XbLkC5/osho-73-lexclu.png',
    meaning:
      '你感到被排斥。这很好——你刚刚进入了一个过渡阶段。旧的已经不属于你，新的还没到来。这个间隙，是灵性成长的黄金期。\n\n' +
      '当我们被排斥或拒绝时，是我们内在的小孩感到被遗弃、不被爱。但排斥也可以是一份礼物——它迫使你回到自己。\n\n' +
      '也许你被排斥，不是因为你不够好，而是因为你太好了，好到那个容纳不下你的地方必须推开你。飞向属于你的天空吧。',
    keywords: ['排斥', '过渡', '自我价值', '成长'],
  },
  {
    id: '74',
    number: 74,
    name: '妥协',
    nameFr: "Le Compromis",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/7m6Gnn9/osho-74-le-compromis.png',
    meaning:
      '试着理解你为什么妥协。迟早你会发现，每一次妥协，都让你失去了一部分自己。妥协换不来和平，只会换来怨恨。\n\n' +
      '这张牌上的两个人物，让我们想起那些卑微、虚伪的关系——两个人都不快乐，但谁也不肯先离开。\n\n' +
      '不要为了被爱而妥协你的真实。真正的爱不会要求你变成另一个人。如果你必须不断妥协才能维持关系，那也许是时候问问自己：这段关系真的值得吗？',
    keywords: ['妥协', '虚伪', '真实', '关系'],
  },
  {
    id: '75',
    number: 75,
    name: '耐心',
    nameFr: "La Patience",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/84DyM316/osho-75-la-patience.png',
    meaning:
      '我们已经不知道耐心是什么了。然而，没有什么比等待的能力更珍贵。种子不会因为你着急就提早发芽——它有自己的时节。\n\n' +
      '这张牌上的女人是耐心的。她内心深处知道，她必须等待——不是消极地等待，而是带着信任和觉知地等待。\n\n' +
      '不要催逼生命。一切都在它该来的时候到来。耐心不是等待时什么都不做——而是在等待中，继续好好地生活。',
    keywords: ['耐心', '等待', '信任', '时节'],
  },
  {
    id: '76',
    number: 76,
    name: '平凡',
    nameFr: "La Banalité",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/WWGzsXtM/osho-76-la-banalite.png',
    meaning:
      '有时候你会感到自己处于中心、完整合一。这些时刻很稀有。你看着海洋、听着风声，在那个片刻，你消失了，只有平凡存在。\n\n' +
      '无论身处何种境遇，都保持一种平静、自然、简单的态度。你会获得比追求非凡时多得多的东西。\n\n' +
      '平凡不是平庸。平凡是回到生活的本质——吃饭就是吃饭，走路就是走路，睡觉就是睡觉。在最简单的事物中，藏着最深的奥秘。',
    keywords: ['平凡', '简单', '自然', '平常心'],
  },
  {
    id: '77',
    number: 77,
    name: '成熟',
    nameFr: "La Maturité",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/h11r3DVJ/osho-77-la-maturite.png',
    meaning:
      '当你通过冥想找到那盏在所有黑夜中都闪耀的灯，那么成熟就降临了。你不再从外界寻找光，因为你自己就是光。\n\n' +
      '这张牌告诉你，你已经准备好分享你内在的财富、你的智慧之液。你有东西可以给予这个世界了。\n\n' +
      '成熟不是变老，而是变甜。就像果实成熟后会自然散发芬芳，一个成熟的人，他的存在本身就是一份礼物。',
    keywords: ['成熟', '智慧', '分享', '内在财富'],
  },
  {
    id: '78',
    number: 78,
    name: '我们即世界',
    nameFr: "Nous Sommes le Monde",
    family: 'rainbow',
    familyLabel: '彩虹',
    imageUrl: 'https://i.ibb.co/p65ytTHX/osho-78-nous-sommes-le-monde.png',
    meaning:
      '当成千上万的人一起庆祝他们的狂喜、他们的神性沉醉，那种能量会形成一片海洋——在那里，你不是孤立的一滴，你就是海洋本身。\n\n' +
      '当我们发现人类共同的源泉，那个我们所有梦想和渴望都从中流淌出来的本质，我们就会明白——我们从未分开过。\n\n' +
      '你就是世界，世界就是你。你对他人做的，就是对自己做的。当你真正理解了这一点，慈悲会从你的每一个细胞中自然流淌出来。',
    keywords: ['合一', '共同体', '慈悲', '万物一体'],
  },
];

export const CARD_FAMILIES: { value: CardFamily | 'all'; label: string; count: number }[] = [
  { value: 'all', label: '全部', count: MOCK_OSHO_CARDS.length },
  { value: 'major', label: '大阿卡纳', count: MOCK_OSHO_CARDS.filter((c) => c.family === 'major').length },
  { value: 'fire', label: '火', count: MOCK_OSHO_CARDS.filter((c) => c.family === 'fire').length },
  { value: 'water', label: '水', count: MOCK_OSHO_CARDS.filter((c) => c.family === 'water').length },
  { value: 'cloud', label: '云', count: MOCK_OSHO_CARDS.filter((c) => c.family === 'cloud').length },
  { value: 'rainbow', label: '彩虹', count: MOCK_OSHO_CARDS.filter((c) => c.family === 'rainbow').length },
];
