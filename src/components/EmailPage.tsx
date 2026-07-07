'use client';

import React from 'react';

export default function EmailPage() {
  return (
    <div
      className="h-full flex items-center justify-center"
      style={{ containerType: 'inline-size' }}
    >
      <p
        style={{
          color: '#1E90FF',
          fontSize: 'clamp(24px, 5cqw, 42px)',
          fontWeight: 700,
          letterSpacing: '0.02em',
        }}
      >
        yaoshi1019@163.com
      </p>
    </div>
  );
}
