import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';
import { photos } from '@/app/data';

export const metadata: Metadata = {
  title: 'Gallery | Neel Parpia',
  description: 'A collection of moments I\'ve captured during my travels and hikes. Beautiful photography from national parks, mountains, and adventures.',
  keywords: ['photography', 'travel', 'hiking', 'nature', 'landscape', 'mountains', 'national parks'],
  alternates: {
    canonical: 'https://www.neelparpia.me/gallery',
  },
  openGraph: {
    title: 'Gallery | Neel Parpia',
    description: 'A collection of moments I\'ve captured during my travels and hikes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Neel Parpia\'s Portfolio',
    url: 'https://www.neelparpia.me/gallery',
    images: ['/photos/Angel\'s Landing Chains.JPG'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Neel Parpia',
    description: 'A collection of moments I\'ve captured during my travels and hikes.',
    creator: '@neelparpia',
  },
};

export default function GalleryPage() {
  return <GalleryClient photos={photos} />;
}
