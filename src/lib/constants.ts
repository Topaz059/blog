export interface DesktopIconData {
  id: string;
  label: string;
  href?: string;
  isExternal?: boolean;
  column: 'left' | 'right';
  hasFileExtension?: boolean;
}

export const leftIcons: DesktopIconData[] = [
  { id: 'home', label: '首页', column: 'left' },
  { id: 'signup', label: '文章', column: 'left' },
  { id: 'product-os', label: '随笔', column: 'left' },
  { id: 'switch-mode', label: '项目', column: 'left' },
  { id: 'pricing', label: '关于', column: 'left' },
  { id: 'customers', label: '友链', column: 'left' },
];

export const rightIcons: DesktopIconData[] = [
  { id: 'why', label: 'GitHub', column: 'right', href: 'https://github.com/yaoshi1103', isExternal: true },
  { id: 'changelog', label: 'Changelog', column: 'right' },
  { id: 'handbook', label: 'Company handbook', column: 'right' },
  { id: 'store', label: 'Store', column: 'right' },
  { id: 'work', label: 'Work here', column: 'right' },
  { id: 'trash', label: 'Trash', column: 'right' },
];

export const menuLinks = [
  { label: '首页', href: '#' },
  { label: '文章', href: '#' },
  { label: '随笔', href: '#' },
  { label: '项目', href: '#' },
  { label: '关于', href: '#' },
  { label: '友链', href: '#' },
];