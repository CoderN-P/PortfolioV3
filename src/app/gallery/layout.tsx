import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Neel Parpia',
  description: 'A collection of photographs from my travels and hikes, showcasing moments I\'ve captured in nature.',
  alternates: {
    canonical: 'https://www.neelparpia.me/gallery',
  },
  openGraph: {
    title: 'Gallery | Neel Parpia',
    description: 'A collection of photographs from my travels and hikes.',
    url: 'https://www.neelparpia.me/gallery',
    type: 'website',
    locale: 'en_US',
    siteName: 'Neel Parpia Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Neel Parpia',
    description: 'A collection of photographs from my travels and hikes.',
    creator: '@neelparpia',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
