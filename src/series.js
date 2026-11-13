// The nineteen works of the museum, in the order they hang round the rotunda.
// bay 0 faces you as you come in; bay 10 is the door to the studiolo.
//   wide     panels are 3:4 instead of 9:16
//   sets     which pictures show at each opening: [left, centre, right]; 'q' is the fitting photo in colour
//   say      one of Koko's own catchphrases, where one fits
//   mood     light of the room while the altarpiece is open; weather falls through the oculus
export const SERIES = [
  { id: 'koko', bay: 0, name: 'Koko', latin: 'FORMA PRIMA', line: '血橙夹克，黑高领，永远赤脚。一切从这一只开始。', say: 'Koko 来啦。',
    titles: ['指一下', 'Koko 来啦', '跳一下下'], sets: [[0, 1, 2]], video: true, music: 'cute', mood: { light: 'day', weather: 'motes' } },
  { id: 'dream', bay: 1, name: '梦境', latin: 'SOMNIA', wide: true, line: '在窗边醒来，接住一个圆圆的泡泡，再到云上睡一觉。', say: '晚安，橙子。',
    titles: ['窗边醒来', '圆圆的泡泡', '云上午睡'], sets: [[0, 1, 2]], mood: { light: 'dawn', weather: 'bubbles' } },
  { id: 'cloud', bay: 2, name: '云朵午后', latin: 'NVBES POMERIDIANAE', line: '躺在云上，够一颗星星，荡秋千，放风筝，最后睡着。',
    titles: ['躺在云上', '够星星', '云朵秋千', '放风筝', '云上打盹'], sets: [[0, 1, 2], [3, 'q', 4]], mood: { light: 'noon', weather: 'fluff' } },
  { id: 'cream', bay: 3, name: '奶油素描', latin: 'ADVMBRATIONES', wide: true, line: '铅笔线和奶油色的纸。挂圆圆的小东西，和纸飞机散步。', say: '圆圆的，给我。',
    titles: ['圆圆的挂钩', '纸飞机散步', '空白的日历'], sets: [[0, 1, 2]], mood: { light: 'day', weather: 'motes' } },
  { id: 'closeup', bay: 4, name: '特写', latin: 'COMINVS', line: '凑得很近很近。墨镜、飞行镜，还有趴在桌上看你的那一眼。', say: '别碰钉钉。',
    titles: ['墨镜', '飞行镜', '趴着看你'], sets: [[0, 1, 2]], mood: { light: 'day', weather: 'motes' } },
  { id: 'campus', bay: 5, name: '校园', latin: 'SCHOLA', line: '背着书包出门，在屋檐下给小猫撑伞，坐在窗台听歌。',
    titles: ['背书包', '伞下的小猫', '窗台听歌'], sets: [[0, 1, 2]], video: true, music: 'campus', amb: 'rain', mood: { light: 'overcast', weather: 'rain' } },
  { id: 'amusement', bay: 6, name: '游乐园', latin: 'HORTVS LVDORVM', line: '彩虹条纹衫，吊篮、棉花糖和旋转木马。', say: '再来一次。',
    titles: ['空中吊篮', '棉花糖', '旋转木马'], sets: [[0, 1, 2]], mood: { light: 'noon', weather: 'confetti' } },
  { id: 'sea', bay: 7, name: '软软海风', latin: 'AVRA MARINA', line: '沙滩上留着一串脚印。捡贝壳，踩浪，蹲下来看小螃蟹。', say: '圆圆的，给我。',
    titles: ['捡贝壳', '踩浪', '小螃蟹'], sets: [[0, 1, 2]], video: true, music: 'sea', mood: { light: 'golden', weather: 'glint' } },
  { id: 'sealetter', bay: 8, name: '海上来信', latin: 'EPISTVLA MARIS', line: '一艘慢慢走的船。看海鸥，看舷窗，在甲板上睡着。',
    titles: ['窗外的海鸥', '舷窗', '甲板午睡'], sets: [[0, 1, 2]], mood: { light: 'golden', weather: 'motes' } },
  { id: 'spaceout', bay: 9, name: '放空', latin: 'OTIVM', line: '秋天的长椅，雨窗边的咖啡馆，天台的晚风。什么也不做。',
    titles: ['秋天长椅', '雨窗咖啡馆', '天台晚风'], sets: [[0, 1, 2]], mood: { light: 'dusk', weather: 'leaves' } },
  { id: 'starlight', bay: 11, name: '星光', latin: 'LVX STELLARVM', line: '第一次站到灯下面。两次开屏：初光，与星台。', say: '今天跳一下下。',
    titles: ['第一束光', '舞台中央', '坐在台沿', '星台', '接住星星', '比个心'], sets: [[0, 1, 2], [3, 4, 5]], setNames: ['初光', '星台'], video: true, mood: { light: 'night', weather: 'sparks' } },
  { id: 'muertos', bay: 12, name: '亡灵节', latin: 'DIES MORTVORVM', wide: true, line: '点一支烛，走过万寿菊铺成的路，认识一位骷髅朋友。',
    titles: ['点一支烛', '万寿菊小路', '骷髅朋友'], sets: [[0, 1, 2]], mood: { light: 'night', weather: 'petals' } },
  { id: 'halloween', bay: 13, name: '万圣节', latin: 'VIGILIA', line: '披着白色小熊斗篷，提一盏南瓜灯，走一段有月亮的夜路。',
    titles: ['不给糖就捣蛋', '南瓜灯', '月下夜路'], sets: [[0, 1, 2]], video: true, mood: { light: 'night', weather: 'leaves' } },
  { id: 'monster', bay: 14, name: '小怪兽', latin: 'MONSTRVM PARVVM', wide: true, line: '穿上恐龙斗篷就是怪兽了。冲刺，埋伏，然后变成大怪兽。',
    titles: ['小怪兽冲刺', '埋伏', '大怪兽'], sets: [[0, 1, 2]], mood: { light: 'dusk', weather: 'motes' } },
  { id: 'wizard', bay: 15, name: '小巫师', latin: 'MAGVS PARVVS', line: '尖尖的帽子，抱着书去上学，练扫帚，夜里偷看地图。',
    titles: ['抱书上学', '扫帚练习', '夜读地图'], sets: [[0, 1, 2]], mood: { light: 'dusk', weather: 'sparks' } },
  { id: 'magician', bay: 16, name: '小小魔术师', latin: 'PRAESTIGIATOR', line: '礼帽一掀，兔子出来。魔术偶尔失手，谢幕永远认真。', say: '再来一次。',
    titles: ['月下登场', '帽子里的兔子', '谢幕鞠躬'], sets: [[0, 1, 2]], mood: { light: 'night', weather: 'sparks' } },
  { id: 'diner', bay: 17, name: '雨天小馆', latin: 'CAVPONA SVB IMBRE', wide: true, line: '下雨的一天：醒来，等雨停，吃一口布丁，路过花店，浇花。',
    titles: ['醒来', '等雨停', '窗边布丁', '花店', '浇花'], sets: [[0, 1, 2], [3, 'q', 4]], amb: 'rain', mood: { light: 'overcast', weather: 'rain' } },
  { id: 'snow', bay: 18, name: '雪色粉彩', latin: 'NIX', wide: true, line: '在雪地里躺成一个雪天使，冰上滑一圈，窗里放着一颗橙子。',
    titles: ['雪天使', '冰上滑行', '窗里的橙子'], sets: [[0, 1, 2]], mood: { light: 'snow', weather: 'snow' } },
  { id: 'starry', bay: 19, name: '星星小屋', latin: 'DOMVS STELLARVM', wide: true, line: '在小屋里：摆好收集来的圆东西，拉伸，对着镜子发呆。', say: '晚安，橙子。',
    titles: ['圆物收藏', '练习拉伸', '镜前发呆'], sets: [[0, 1, 2]], mood: { light: 'dawn', weather: 'motes' } },
];

const RN = [['M', 1000], ['CM', 900], ['D', 500], ['CD', 400], ['C', 100], ['XC', 90], ['L', 50], ['XL', 40], ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]];
export const roman = (n) => { let s = ''; for (const [r, v] of RN) while (n >= v) { s += r; n -= v; } return s; };
SERIES.forEach((s, i) => { s.index = i; s.no = roman(i + 1); s.count = s.titles.length; });
export const byBay = (bay) => SERIES.find((s) => s.bay === bay) || null;
export const asset = (s, f) => `./assets/s/${s.id}/${f}`;
