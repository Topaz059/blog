export interface FriendLink {
  id: number;
  name: string;
  url: string;
  description: string;
}

export const friendsData: FriendLink[] = [
  { id: 1, name: 'Ivyneko', url: 'https://ivyovo-wiki.tech', description: '莫西莫西，欢迎issue/email me添加友链 (=^.^=)' },
  { id: 2, name: 'Anthony Fu', url: 'https://antfu.me/', description: 'vue core team，神做事就像喝水一样轻松' },
  { id: 3, name: 'Innei 静かな森', url: 'https://innei.in/', description: '支持高产博主喵' },
  { id: 4, name: "Cassie Evans's Blog", url: 'https://www.cassie.codes/', description: 'GASP 和 SVG 动画的厉害姐姐🌈' },
  { id: 5, name: '猫鱼周刊', url: 'https://ameow.xyz/', description: '猫鱼周刊，快乐划水 (.-v-)' },
  { id: 6, name: '十玖八柒', url: 'https://blog.ahzoo.cn/', description: '后端 | Z次元ovo' },
  { id: 7, name: 'Kuro', url: 'https://www.elainafan.one/', description: '好想像kuro一样会算法啊' },
  { id: 8, name: 'loveapple', url: 'https://loveapple.eu/', description: 'RF Engineering | 一条喜欢苹果的水煮鱼🎣' },
  { id: 9, name: 'Jerry Yang', url: 'https://jerryyang.github.io/', description: 'Rust | All in' },
];

const avatarGradients: string[] = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #ff6a88 0%, #ff99ac 100%)',
  'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getAvatarGradient(name: string): string {
  return avatarGradients[hashString(name) % avatarGradients.length];
}

export function getAvatarInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export function getDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
