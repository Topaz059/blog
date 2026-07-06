'use client';

import { useRef } from 'react';
import MenuBar from '@/components/MenuBar';
import Desktop, { DesktopHandle } from '@/components/Desktop';

export default function Home() {
  const desktopRef = useRef<DesktopHandle>(null);

  return (
    <main className="h-screen overflow-hidden">
      <MenuBar onNavigate={(iconId) => desktopRef.current?.openIcon(iconId)} />
      <Desktop ref={desktopRef} />
    </main>
  );
}
