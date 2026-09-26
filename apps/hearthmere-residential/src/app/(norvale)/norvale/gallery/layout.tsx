import { Metadata } from 'next';
import { pageSeoConfig } from '@norvale/config/seo';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: pageSeoConfig.gallery.description,
  alternates: {
    canonical: '/norvale/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
