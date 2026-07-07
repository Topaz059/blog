import React from 'react';

// Document file icon - white page with red corner fold
export const FileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="4" width="32" height="40" rx="2" fill="white" stroke="#555" strokeWidth="1.5" />
    <path d="M28 4L28 14C28 15.1 28.9 16 30 16L40 16" fill="#c84040" />
    <path d="M28 4L28 14C28 15.1 28.9 16 30 16L40 16" stroke="#555" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="14" y1="22" x2="34" y2="22" stroke="#999" strokeWidth="1.5" />
    <line x1="14" y1="28" x2="34" y2="28" stroke="#999" strokeWidth="1.5" />
    <line x1="14" y1="34" x2="28" y2="34" stroke="#999" strokeWidth="1.5" />
  </svg>
);

// Folder icon
export const FolderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 12C6 10.9 6.9 10 8 10H18L22 14H40C41.1 14 42 14.9 42 16V36C42 37.1 41.1 38 40 38H8C6.9 38 6 37.1 6 36V12Z" fill="#4a90d9" stroke="#3a7bc8" strokeWidth="1" />
    <path d="M6 12C6 10.9 6.9 10 8 10H18L22 14H8C6.9 14 6 14.9 6 16V12Z" fill="#6aacf0" stroke="#3a7bc8" strokeWidth="1" />
  </svg>
);

// Trash icon - simple recycle bin (24x24 viewBox)
export const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="7" width="12" height="13" rx="1" fill="#ddd" stroke="#999" strokeWidth="0.8" />
    <rect x="5" y="5" width="14" height="3" rx="1" fill="#bbb" stroke="#999" strokeWidth="0.8" />
    <rect x="10" y="3.5" width="4" height="2" rx="0.5" fill="#bbb" stroke="#999" strokeWidth="0.6" />
    <line x1="9" y1="10" x2="9" y2="17" stroke="#999" strokeWidth="0.8" />
    <line x1="11" y1="10" x2="11" y2="17" stroke="#999" strokeWidth="0.8" />
    <line x1="13" y1="10" x2="13" y2="17" stroke="#999" strokeWidth="0.8" />
    <line x1="15" y1="10" x2="15" y2="17" stroke="#999" strokeWidth="0.8" />
  </svg>
);

// Pricing icon - calculator
export const PricingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="10" y="6" width="28" height="36" rx="3" fill="#e8e8e8" stroke="#555" strokeWidth="1.5" />
    <rect x="14" y="10" width="20" height="8" rx="1" fill="#4a7c3f" />
    <text x="24" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">0</text>
    <rect x="15" y="21" width="7" height="5" rx="1" fill="#ccc" />
    <rect x="24" y="21" width="7" height="5" rx="1" fill="#ccc" />
    <rect x="15" y="28" width="7" height="5" rx="1" fill="#ccc" />
    <rect x="24" y="28" width="7" height="5" rx="1" fill="#ccc" />
    <rect x="15" y="35" width="16" height="4" rx="1" fill="#c84040" />
  </svg>
);

// Demo icon - film clapper
export const DemoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="10" width="32" height="24" rx="2" fill="#1a1a1a" stroke="#555" strokeWidth="1.5" />
    <path d="M8 16L22 10L22 34L8 40V16Z" fill="white" stroke="#555" strokeWidth="1" />
    <path d="M22 10L34 14L34 34L22 40V10Z" fill="white" stroke="#555" strokeWidth="1" />
    <rect x="8" y="10" width="6" height="4" fill="#c84040" />
    <text x="11" y="13" textAnchor="middle" fill="white" fontSize="3" fontWeight="bold">DEMO</text>
  </svg>
);

// Docs icon - red book
export const DocsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 10C8 8.9 8.9 8 10 8H16L24 4L32 8H38C39.1 8 40 8.9 40 10V38C40 39.1 39.1 40 38 40H10C8.9 40 8 39.1 8 38V10Z" fill="#c84040" stroke="#a03030" strokeWidth="1.5" />
    <line x1="24" y1="4" x2="24" y2="40" stroke="#a03030" strokeWidth="1.5" />
    <text x="24" y="24" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">P</text>
  </svg>
);

// Email icon
export const EmailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="12" width="36" height="24" rx="3" fill="white" stroke="#555" strokeWidth="1.5" />
    <path d="M6 12L24 28L42 12" stroke="#555" strokeWidth="1.5" fill="none" />
    <path d="M6 36L20 22" stroke="#ccc" strokeWidth="1" />
    <path d="M42 36L28 22" stroke="#ccc" strokeWidth="1" />
  </svg>
);

// Question icon - speech bubble
export const QuestionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="6" width="32" height="24" rx="6" fill="white" stroke="#555" strokeWidth="1.5" />
    <path d="M16 30L22 38L28 30" fill="white" stroke="#555" strokeWidth="1.5" />
    <text x="24" y="22" textAnchor="middle" fill="#4a90d9" fontSize="16" fontWeight="bold">?</text>
  </svg>
);

// Chart icon
export const ChartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="8" width="32" height="32" rx="2" fill="white" stroke="#555" strokeWidth="1.5" />
    <line x1="12" y1="36" x2="12" y2="28" stroke="#4a90d9" strokeWidth="4" strokeLinecap="round" />
    <line x1="20" y1="36" x2="20" y2="18" stroke="#c84040" strokeWidth="4" strokeLinecap="round" />
    <line x1="28" y1="36" x2="28" y2="22" stroke="#4a7c3f" strokeWidth="4" strokeLinecap="round" />
    <line x1="36" y1="36" x2="36" y2="14" stroke="#d4a843" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// Changelog icon - bell/calendar
export const ChangelogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="6" width="32" height="34" rx="3" fill="white" stroke="#555" strokeWidth="1.5" />
    <rect x="10" y="10" width="28" height="6" fill="#c84040" />
    <text x="24" y="15" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold">JUL</text>
    <text x="24" y="30" textAnchor="middle" fill="#555" fontSize="14" fontWeight="bold">5</text>
  </svg>
);

// Bilibili icon - official logo (from simple-icons)
export const BilibiliIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z" fill="#FB7299" />
  </svg>
);

// This PC icon - Windows 10 style monitor with stand
export const ThisPCIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="5" y="5" width="38" height="28" rx="2" fill="#4a5a6c" stroke="#2a3a4c" strokeWidth="1.5" />
    <rect x="7" y="7" width="34" height="24" rx="1" fill="#7eb8e0" />
    <rect x="7" y="7" width="34" height="3" fill="white" opacity="0.25" />
    <path d="M19 33L17 41H31L29 33Z" fill="#5a6878" stroke="#3a4858" strokeWidth="1" strokeLinejoin="round" />
    <rect x="13" y="41" width="22" height="3" rx="1" fill="#5a6878" stroke="#3a4858" strokeWidth="1" />
  </svg>
);

// Handbook icon - open book
export const HandbookIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 8H20C22 8 24 10 24 12V40C24 38 22 36 20 36H8V8Z" fill="white" stroke="#555" strokeWidth="1.5" />
    <path d="M40 8H28C26 8 24 10 24 12V40C24 38 26 36 28 36H40V8Z" fill="white" stroke="#555" strokeWidth="1.5" />
    <line x1="14" y1="14" x2="20" y2="14" stroke="#ddd" strokeWidth="1" />
    <line x1="14" y1="18" x2="20" y2="18" stroke="#ddd" strokeWidth="1" />
    <line x1="14" y1="22" x2="19" y2="22" stroke="#ddd" strokeWidth="1" />
    <line x1="28" y1="14" x2="34" y2="14" stroke="#ddd" strokeWidth="1" />
    <line x1="28" y1="18" x2="34" y2="18" stroke="#ddd" strokeWidth="1" />
    <line x1="28" y1="22" x2="33" y2="22" stroke="#ddd" strokeWidth="1" />
  </svg>
);

// Store icon - shopping bag
export const StoreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 18L16 8H32L36 18V38C36 39.1 35.1 40 34 40H14C12.9 40 12 39.1 12 38V18Z" fill="#d4a843" stroke="#b89230" strokeWidth="1.5" />
    <path d="M16 18C16 14 20 10 24 10C28 10 32 14 32 18" fill="none" stroke="#b89230" strokeWidth="2" />
    <path d="M12 18H36" stroke="#b89230" strokeWidth="1.5" />
  </svg>
);

// Work icon - briefcase
export const WorkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="8" y="14" width="32" height="24" rx="3" fill="#8b6914" stroke="#6b4f10" strokeWidth="1.5" />
    <rect x="14" y="8" width="20" height="10" rx="2" fill="#8b6914" stroke="#6b4f10" strokeWidth="1.5" />
    <rect x="18" y="6" width="12" height="4" rx="1" fill="#8b6914" stroke="#6b4f10" strokeWidth="1" />
    <rect x="19" y="21" width="10" height="10" rx="1" fill="white" opacity="0.5" />
  </svg>
);

// Switch mode icon
export const SwitchModeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="8" width="28" height="22" rx="2" fill="white" stroke="#555" strokeWidth="1.5" />
    <rect x="8" y="10" width="24" height="4" fill="#ddd" />
    <rect x="24" y="8" width="4" height="4" rx="1" fill="#c84040" />
    <rect x="28" y="8" width="4" height="4" rx="1" fill="#d4a843" />
    <rect x="32" y="8" width="4" height="4" rx="1" fill="#4a7c3f" />
    <path d="M34 28L42 20" stroke="#4a90d9" strokeWidth="2" />
    <path d="M34 20L42 28" stroke="#4a90d9" strokeWidth="2" />
  </svg>
);

// Product OS icon
export const ProductOSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="6" y="6" width="36" height="36" rx="4" fill="#c84040" stroke="#a03030" strokeWidth="1.5" />
    <text x="24" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">P</text>
  </svg>
);

// GitHub icon
export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="24" cy="24" r="20" fill="#1a1a1a" stroke="#555" strokeWidth="1" />
    <path d="M24 6C14.06 6 6 14.06 6 24c0 7.95 5.16 14.7 12.31 17.08.9.17 1.23-.39 1.23-.87 0-.43-.02-1.85-.02-3.35-5.01 1.09-6.06-2.42-6.06-2.42-.82-2.08-2-2.64-2-2.64-1.64-1.12.12-1.1.12-1.1 1.81.13 2.76 1.86 2.76 1.86 1.61 2.76 4.22 1.96 5.25 1.5.16-1.17.63-1.96 1.15-2.41-4.01-.46-8.22-2.01-8.22-8.94 0-1.97.7-3.58 1.86-4.85-.19-.46-.81-2.29.18-4.78 0 0 1.51-.48 4.96 1.85a17.3 17.3 0 019.02 0c3.45-2.33 4.96-1.85 4.96-1.85.99 2.49.37 4.32.18 4.78a7.03 7.03 0 011.86 4.85c0 6.95-4.22 8.48-8.24 8.93.65.56 1.22 1.66 1.22 3.34 0 2.41-.02 4.35-.02 4.94 0 .48.33 1.04 1.23.87A18.02 18.02 0 0042 24c0-9.94-8.06-18-18-18z" fill="white" />
  </svg>
);

// PostHog Logo - hedgehog
export const PostHogLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" {...props}>
    <ellipse cx="12" cy="14" rx="8" ry="7" fill="white" />
    <circle cx="9" cy="11" r="1.5" fill="#1a1a1a" />
    <circle cx="15" cy="11" r="1.5" fill="#1a1a1a" />
    <ellipse cx="12" cy="15" rx="2" ry="1.5" fill="#1a1a1a" />
    <path d="M6 12L4 10M18 12L20 10M8 9L7 7M16 9L17 7" stroke="#1a1a1a" strokeWidth="1" />
  </svg>
);

// Article icon - Windows Notepad .txt style: white page, folded corner, blue text lines
export const ArticleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 4 H30 L40 14 V44 H10 Z" fill="white" stroke="#7a7a7a" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M30 4 V14 H40" fill="#dcdcdc" stroke="#7a7a7a" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="15" y1="20" x2="35" y2="20" stroke="#4a90d9" strokeWidth="1.6" />
    <line x1="15" y1="26" x2="35" y2="26" stroke="#4a90d9" strokeWidth="1.6" />
    <line x1="15" y1="32" x2="35" y2="32" stroke="#4a90d9" strokeWidth="1.6" />
    <line x1="15" y1="38" x2="28" y2="38" stroke="#4a90d9" strokeWidth="1.6" />
  </svg>
);