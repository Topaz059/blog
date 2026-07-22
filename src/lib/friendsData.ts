export interface FriendLink {
  id: number;
  name: string;
  url: string;
  description: string;
  avatar?: string;
}

export const friendsData: FriendLink[] = [
  { id: 1, name: 'Topaz', url: 'https://blog-topaz.pages.dev/', description: 'hello！欢迎找我添加友链', avatar: '/touxiang.jpg' },
  { id: 2, name: 'Chiba', url: 'http://fasit.ngamesart.com.cn', description: '一个自学游戏开发的独立开发者博客，记录 Unity3D 与虚幻5 的学习历程。', avatar: '/chiba-avatar.webp' },
  { id: 3, name: '啊诶', url: 'http://blog.t1an.online/', description: 'T1an 的个人博客，记录前端工程化、全栈开发与 Go、AI 应用实践。', avatar: '/t1an-avatar.webp' },
  { id: 4, name: 'yuil', url: 'https://blog.yuilicarus.com/', description: "Hello, I'm Yuil. 在这里分享技术、ACG等内容", avatar: '/yuil-avatar.png' },
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
