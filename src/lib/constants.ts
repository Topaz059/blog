export interface DesktopIconData {
  id: string;
  label: string;
  href?: string;
  isExternal?: boolean;
  column: 'left' | 'right';
  hasFileExtension?: boolean;
}

export const leftIcons: DesktopIconData[] = [
  { id: 'signup', label: '文章', column: 'left' },
  { id: 'product-os', label: '随笔', column: 'left' },
  { id: 'switch-mode', label: '项目', column: 'left' },
  { id: 'pricing', label: '关于', column: 'left' },
  { id: 'customers', label: '友链', column: 'left' },
];

export const rightIcons: DesktopIconData[] = [
  { id: 'why', label: 'GitHub', column: 'right', href: 'https://github.com/Topaz059', isExternal: true },
  { id: 'changelog', label: 'Bilibili', column: 'right', href: 'https://space.bilibili.com/50003864?spm_id_from=333.1007.0.0', isExternal: true },
  { id: 'xiaohongshu', label: '小红书', column: 'right' },
  { id: 'email', label: '邮箱', column: 'right' },
  { id: 'handbook', label: '此电脑', column: 'right' },
  { id: 'trash', label: '回收站', column: 'right' },
];

export const menuLinks = [
  { label: '文章', href: '#', iconId: 'signup' },
  { label: '随笔', href: '#', iconId: 'product-os' },
  { label: '项目', href: '#', iconId: 'switch-mode' },
  { label: '关于', href: '#', iconId: 'pricing' },
  { label: '友链', href: '#', iconId: 'customers' },
];