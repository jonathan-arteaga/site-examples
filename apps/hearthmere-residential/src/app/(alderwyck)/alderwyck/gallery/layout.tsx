import { Metadata } from 'next';
import { pageSeoConfig } from '@alderwyck/config/seo';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: pageSeoConfig.gallery.description,
  alternates: {
    canonical: '/alderwyck/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
