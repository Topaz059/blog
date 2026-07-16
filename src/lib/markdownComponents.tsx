import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const ACCENT = '#0078d4';

/** 统一的 Markdown 渲染样式，文章/随笔/项目详情共用 */
export const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-bold text-gray-800 mt-6 mb-3" style={{ fontSize: 'clamp(17px, 2.6cqw, 22px)' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-semibold text-gray-800 mt-5 mb-2" style={{ fontSize: 'clamp(15px, 2.2cqw, 19px)' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-medium text-gray-800 mt-4 mb-2" style={{ fontSize: 'clamp(14px, 2cqw, 18px)' }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-600 leading-relaxed mb-4" style={{ fontSize: 'clamp(13px, 2cqw, 16px)' }}>
      {children}
    </p>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === 'string' ? src : ''}
      alt={alt ?? ''}
      className="rounded-xl my-4 w-full h-auto"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    />
  ),
  a: ({ children, href }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#0078d4] underline">
      {children}
    </a>
  ),
  code: ({ className, children }) => {
    const text = String(children ?? '').replace(/\n$/, '');
    const match = /language-(\w+)/.exec(className ?? '');
    const lang = match?.[1];
    const isBlock = !!lang || text.includes('\n');
    if (isBlock) {
      const label = lang || '';
      return (
        <div style={{ position: 'relative', margin: '16px 0' }}>
          {label && (
            <span
              style={{
                position: 'absolute',
                top: 10,
                right: 14,
                fontSize: 11,
                lineHeight: 1,
                color: '#94a3b8',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                letterSpacing: '0.04em',
                userSelect: 'none',
              }}
            >
              {label}
            </span>
          )}
          <SyntaxHighlighter
            language={lang ?? 'text'}
            style={oneLight}
            customStyle={{
              margin: 0,
              borderRadius: 10,
              padding: '16px 18px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              fontSize: 'clamp(12px, 1.8cqw, 14px)',
              lineHeight: 1.6,
              overflowX: 'auto',
            }}
            codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' } }}
          >
            {text}
          </SyntaxHighlighter>
        </div>
      );
    }
    return (
      <code className="bg-gray-100 text-gray-700 rounded px-1.5 py-0.5" style={{ fontSize: '0.9em' }}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gray-200 pl-4 my-4 text-gray-500 italic">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="border-collapse w-full"
        style={{ fontSize: 'clamp(12px, 1.8cqw, 15px)', border: '1px solid #e5e7eb' }}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th
      className="font-semibold text-gray-700 bg-[#f8fafc]"
      style={{ border: '1px solid #e5e7eb', padding: '8px 12px', textAlign: 'left' }}
    >
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-gray-600" style={{ border: '1px solid #e5e7eb', padding: '8px 12px' }}>
      {children}
    </td>
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
      {children}
    </ReactMarkdown>
  );
}
