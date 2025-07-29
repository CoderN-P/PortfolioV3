import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Neel Parpia',
  description: 'A collection of photographs from my travels and hikes, showcasing moments captured in nature.',
  openGraph: {
    title: 'Gallery | Neel Parpia',
    description: 'A collection of photographs from my travels and hikes.',
    url: '/gallery',
  }
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
